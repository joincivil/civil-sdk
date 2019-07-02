import * as React from "react";
import { Query } from "react-apollo";
import { boostQuery, boostNewsroomQuery } from "./queries";
import { BoostData, BoostNewsroomData } from "./types";
import { BoostCard } from "./BoostCard";
import { BoostForm } from "./BoostForm";
import { BoostPayments } from "./payments/BoostPayments";
import { BoostWrapper } from "./BoostStyledComponents";
import { NewsroomWithdraw } from "../NewsroomWithdraw";
import { EthAddress, NewsroomInstance } from "@joincivil/core";
import { LoadingMessage, CivilContext, ICivilContext } from "@joincivil/components";

export interface BoostProps {
  boostId: string;
  open: boolean;
  disableOwnerCheck?: boolean;
  editMode?: boolean;
}

export interface BoostState {
  payment: boolean;
  paymentSuccess: boolean;
  boostOwner?: boolean;
  walletConnected: boolean;
  checkingIfOwner?: boolean;
  newsroomAddress?: EthAddress;
  userEthAddress?: EthAddress;
  newsroomOwners?: EthAddress[];
  newsroom?: NewsroomInstance;
}

export class Boost extends React.Component<BoostProps, BoostState> {
  public static contextType: React.Context<ICivilContext> = CivilContext;
  public context!: React.ContextType<typeof CivilContext>;

  public constructor(props: BoostProps) {
    super(props);
    this.state = {
      payment: false,
      paymentSuccess: false,
      checkingIfOwner: props.editMode, // don't need to display loading state for owner checking if not edit mode, because view only changes slightly in that case
      walletConnected: false,
    };
  }

  public async componentDidMount(): Promise<void> {
    if ((window as any).ethereum) {
      await (window as any).ethereum.enable();
      await this.getUserEthAddress();
    } else {
      this.setState({
        checkingIfOwner: false,
      });
    }
  }

  public async componentDidUpdate(prevProps: BoostProps, prevState: BoostState): Promise<void> {
    if (
      prevState.userEthAddress !== this.state.userEthAddress ||
      prevState.newsroomAddress !== this.state.newsroomAddress
    ) {
      await this.checkIfBoostOwner();
    }
  }

  public render(): JSX.Element {
    const id = this.props.boostId;

    return (
      <Query query={boostQuery} variables={{ id }}>
        {({ loading, error, data }) => {
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
          const boostData = data.postsGet as BoostData;
          const newsroomAddress = boostData.channelID;

          // @HACK/tobek: Bad form to call setState from render (putting in setImmediate to remove React warning) but the conditional prevents an infinite loop, and the only alternative is to use `withApollo` and get apollo client as prop and call this query on `componentDidMount` or something, which is an annoying refactor right now.
          if (this.state.newsroomAddress !== newsroomAddress) {
            setImmediate(() => {
              this.setState({
                newsroomAddress,
              });
            });
          }

          return (
            <Query query={boostNewsroomQuery} variables={{ addr: newsroomAddress }}>
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
                        : `No newsroom listing found at ${newsroomAddress}`}
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
                      amount={20}
                      newsroomName={newsroomData.name}
                      paymentAddr={newsroomData.owner}
                      walletConnected={this.state.walletConnected}
                      handlePaymentSuccess={this.handlePaymentSuccess}
                    />
                  );
                }

                return (
                  <>
                    {/*@TODO/tobek Move to Newsroom Boosts page when we have that.*/}
                    {this.props.open && this.state.newsroom && this.state.boostOwner && (
                      <NewsroomWithdraw newsroom={this.state.newsroom} />
                    )}
                    <BoostCard
                      boostData={boostData}
                      newsroomData={newsroomData}
                      boostOwner={this.state.boostOwner}
                      open={this.props.open}
                      boostId={id}
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
    const listingUrl = "https://registry.civil.co/listing/" + boostData.channelID;

    if (this.state.checkingIfOwner) {
      return (
        <BoostWrapper open={this.props.open}>
          <LoadingMessage>Loading Permissions</LoadingMessage>
        </BoostWrapper>
      );
    }
    if (!this.state.boostOwner) {
      if (!this.state.userEthAddress) {
        return (
          <BoostWrapper open={this.props.open}>
            Please connect your Ethereum account via a browser wallet such as MetaMask so that we can verify your
            ability to edit this Boost.
          </BoostWrapper>
        );
      }
      return (
        <BoostWrapper open={this.props.open}>
          <p>
            Your ETH address <code>{this.state.userEthAddress}</code> doesn't have permissions to edit this newsroom's
            Boost, which is owned by the following address(es):
          </p>
          {this.state.newsroomOwners && (
            <ul>
              {this.state.newsroomOwners.map(owner => (
                <li key={owner}>
                  <code>{owner}</code>
                </li>
              ))}
            </ul>
          )}
          <p>
            If you own one of these wallets, please switch to it. Otherwise, please request that one of these officers
            add you to the newsroom contract.
          </p>
          <p>
            <a href={listingUrl}>View newsroom information.</a>
          </p>
        </BoostWrapper>
      );
    }

    return (
      <BoostForm
        editMode={true}
        initialBoostData={boostData}
        newsroomData={newsroomData}
        newsroomAddress={boostData.channelID}
        newsroomListingUrl={listingUrl}
      />
    );
  }

  private startPayment = () => {
    this.setState({ payment: true });
  };

  private handlePaymentSuccess = () => {
    this.setState({ payment: false, paymentSuccess: true });
  };

  private async getUserEthAddress(): Promise<void> {
    if (this.props.disableOwnerCheck) {
      return;
    }

    let user;
    if (this.context.civil) {
      user = await this.context.civil.accountStream.first().toPromise();

      if (user) {
        this.setState({
          walletConnected: true,
          userEthAddress: user,
        });
      } else {
        this.setState({
          walletConnected: true,
        });
      }
    }

    if (!user) {
      this.setState({
        checkingIfOwner: false,
        boostOwner: false,
      });
    }
  }

  private async checkIfBoostOwner(): Promise<void> {
    if (this.props.disableOwnerCheck) {
      return;
    }

    if (this.state.userEthAddress && this.state.newsroomAddress && this.context.civil) {
      const newsroom = await this.context.civil.newsroomAtUntrusted(this.state.newsroomAddress);
      const newsroomOwners = (await newsroom.getNewsroomData()).owners;

      this.setState({
        checkingIfOwner: false,
        boostOwner: newsroomOwners && newsroomOwners.indexOf(this.state.userEthAddress) !== -1,
        newsroomOwners,
        newsroom,
      });
    }
  }
}
