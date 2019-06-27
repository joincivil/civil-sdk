import * as React from "react";
import { Query } from "react-apollo";
import { boostQuery, boostNewsroomQuery } from "./queries";
import { BoostData, BoostNewsroomData } from "./types";
import { BoostCard } from "./BoostCard";
import { BoostPayments } from "./payments/BoostPayments";
import { EthAddress } from "@joincivil/core";
import { LoadingMessage } from "@joincivil/components";

export interface BoostProps {
  boostOwner: boolean;
  boostId: string;
  open: boolean;
}

export interface BoostState {
  payment: boolean;
  newsroomName: string;
  paymentAddr: EthAddress;
}

export class Boost extends React.Component<BoostProps, BoostState> {
  public constructor(props: BoostProps) {
    super(props);
    this.state = {
      payment: false,
      newsroomName: "",
      paymentAddr: "",
    };
  }

  public render(): JSX.Element {
    const id = this.props.boostId;

    return (
      <Query query={boostQuery} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingMessage />;
          } else if (error) {
            console.error("error loading boost data:", error, data);
            return "Error loading Boost: " + JSON.stringify(error);
          }
          const boostData = data.postsGet as BoostData;

          return (
            <Query query={boostNewsroomQuery} variables={{ addr: boostData.channelID }}>
              {({ loading: newsroomQueryLoading, error: newsroomQueryError, data: newsroomQueryData }) => {
                if (newsroomQueryLoading) {
                  return <LoadingMessage>Loading Newsroom</LoadingMessage>;
                } else if (newsroomQueryError || !newsroomQueryData || !newsroomQueryData.listing) {
                  console.error("error loading newsroom data:", newsroomQueryError, newsroomQueryData);
                  return "Error loading Boost newsroom data: " + JSON.stringify(newsroomQueryError);
                }
                const newsroomData = newsroomQueryData.listing as BoostNewsroomData;

                if (this.state.payment) {
                  return (
                    <BoostPayments
                      boostId={id}
                      title={boostData.title}
                      amount={20}
                      newsroomName={newsroomData.name}
                      paymentAddr={newsroomData.owner}
                    />
                  );
                }

                return (
                  <BoostCard
                    boostData={boostData}
                    newsroomData={newsroomData}
                    boostOwner={this.state.boostOwner}
                    open={this.props.open}
                    boostId={id}
                    handlePayments={this.startPayment}
                  />
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }

  private startPayment = () => {
    this.setState({ payment: true });
  };
}
