import * as React from "react";
import { Query } from "react-apollo";
import { boostQuery, boostNewsroomQuery } from "./queries";
import { BoostData, BoostNewsroomData } from "./types";
import { BoostCard } from "./BoostCard";
import { BoostForm } from "./BoostForm";
import { BoostPayments } from "./payments/BoostPayments";
import { BoostWrapper } from "./BoostStyledComponents";
import { NewsroomWithdraw } from "../NewsroomWithdraw";
import { withBoostPermissions, BoostPermissionsInjectedProps } from "./BoostPermissionsHOC";
import { LoadingMessage, CivilContext, ICivilContext } from "@joincivil/components";

export interface BoostInternalProps {
  history?: any;
  boostId: string;
  open: boolean;
  disableOwnerCheck?: boolean;
  disableHelmet?: boolean;
  editMode?: boolean;
  payment?: boolean;
}

export type BoostProps = BoostInternalProps & BoostPermissionsInjectedProps;

export interface BoostStates {
  payment: boolean;
  paymentSuccess: boolean;
}

class BoostComponent extends React.Component<BoostProps, BoostStates> {
  public static contextType: React.Context<ICivilContext> = CivilContext;
  public context!: React.ContextType<typeof CivilContext>;

  public constructor(props: BoostProps) {
    super(props);
    this.state = {
      payment: this.props.payment || false,
      paymentSuccess: false,
    };
  }

  public componentDidMount(): void {
    const { history } = this.props;
    if (history && history.location && history.location.state && history.location.state.paymentSuccess) {
      this.setState({ paymentSuccess: history.location.state.paymentSuccess });
    }
  }

  public render(): JSX.Element {
    const id = this.props.boostId;

    return (
      <Query query={boostQuery} variables={{ id }}>
        {({ loading, error, data, refetch }) => {
          if (loading) {
            return (
              <BoostWrapper open={this.props.open}>
                <LoadingMessage>Loading Boost</LoadingMessage>
              </BoostWrapper>
            );
          } else if (error) {
            console.error("error loading boost data. error:", error, "data:", data);
            return (
              <BoostWrapper open={this.props.open}>
                Error loading Boost: {error ? JSON.stringify(error) : "No Boost data found"}
              </BoostWrapper>
            );
          }

          if (this.state.paymentSuccess) {
            void refetch();
          }

          const boostData = data.postsGet as BoostData;
          const newsroomContractAddress = boostData.channel.newsroom.contractAddress;

          // Set up boost permissions checks HOC:
          this.props.setNewsroomContractAddress(newsroomContractAddress);

          return (
            <Query query={boostNewsroomQuery} variables={{ addr: newsroomContractAddress }}>
              {({ loading: newsroomQueryLoading, error: newsroomQueryError, data: newsroomQueryData }) => {
                if (newsroomQueryLoading) {
                  return (
                    <BoostWrapper open={this.props.open}>
                      <LoadingMessage>Loading Newsroom</LoadingMessage>
                    </BoostWrapper>
                  );
                } else if (newsroomQueryError || !newsroomQueryData || !newsroomQueryData.listing) {
                  console.error("error loading newsroom data. error:", newsroomQueryError, "data:", newsroomQueryData);
                  return (
                    <BoostWrapper open={this.props.open}>
                      Error loading Boost newsroom data:{" "}
                      {newsroomQueryError
                        ? JSON.stringify(newsroomQueryError)
                        : `No newsroom listing found at ${newsroomContractAddress}`}
                    </BoostWrapper>
                  );
                }
                const newsroomData = newsroomQueryData.listing as BoostNewsroomData;

                if (this.props.editMode) {
                  return this.renderEditMode(boostData, newsroomData);
                }

                if (this.state.payment) {
                  return (
                    <BoostPayments
                      boostId={id}
                      title={boostData.title}
                      newsroomName={newsroomData.name}
                      paymentAddr={newsroomData.owner}
                      walletConnected={!!this.props.walletConnected}
                      handleBackToListing={this.handleBackToListing}
                      handlePaymentSuccess={this.handlePaymentSuccess}
                      isStripeConnected={boostData.channel.isStripeConnected}
                      history={this.props.history}
                    />
                  );
                }

                return (
                  <>
                    {/*@TODO/tobek Move to Newsroom Boosts page when we have that.*/}
                    {this.props.open && this.props.newsroom && this.props.boostOwner && (
                      <NewsroomWithdraw
                        newsroom={this.props.newsroom}
                        isStripeConnected={boostData.channel.isStripeConnected}
                      />
                    )}
                    <BoostCard
                      boostData={boostData}
                      newsroomData={newsroomData}
                      boostOwner={this.props.boostOwner}
                      open={this.props.open}
                      boostId={id}
                      disableHelmet={this.props.disableHelmet}
                      handlePayments={this.startPayment}
                      paymentSuccess={this.state.paymentSuccess}
                    />
                  </>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }

  private renderEditMode(boostData: BoostData, newsroomData: BoostNewsroomData): JSX.Element {
    const listingUrl = "https://registry.civil.co/listing/" + boostData.channel.newsroom.contractAddress;
    return (
      <BoostForm
        channelID={boostData.channel.id}
        editMode={true}
        boostId={this.props.boostId}
        initialBoostData={boostData}
        newsroomData={newsroomData}
        newsroomContractAddress={boostData.channel.newsroom.contractAddress}
        newsroomListingUrl={listingUrl}
      />
    );
  }

  private startPayment = (usdToSpend: number) => {
    this.props.history.push({
      pathname: "/boosts/" + this.props.boostId + "/payment",
      state: { usdToSpend },
    });
    this.context.fireAnalyticsEvent("boosts", "start support", this.props.boostId, usdToSpend);
  };

  private handlePaymentSuccess = () => {
    this.props.history.push({
      pathname: "/boosts/" + this.props.boostId,
      state: { paymentSuccess: true },
    });
  };

  private handleBackToListing = () => {
    this.props.history.push("/boosts/" + this.props.boostId);
  };
}

export const Boost = withBoostPermissions(BoostComponent);
