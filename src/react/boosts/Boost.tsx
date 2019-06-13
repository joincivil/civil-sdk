import * as React from "react";
import { Query } from "react-apollo";
import { boostQuery } from "./queries";
import { BoostCard } from "./BoostCard";
import { BoostPayments } from "./payments/BoostPayments";

export interface BoostProps {
  boostId: string;
  open: boolean;
}

export interface BoostStates {
  payment: boolean;
}

export class Boost extends React.Component<BoostProps, BoostStates> {
  public constructor(props: BoostProps) {
    super(props);
    this.state = {
      payment: false,
    };
  }

  public render(): JSX.Element {
    const id = this.props.boostId;

    return (
      <Query query={boostQuery} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return "Loading...";
          } else if (error) {
            return "Error: " + JSON.stringify(error);
          }

          if (this.state.payment) {
            return (
              <BoostPayments
                boostId={id}
                title={data.postsGet.title}
                amount={20}
                newsroom={"Block Club Chicago"}
              />
            );
          }

          return (
            <BoostCard
              open={this.props.open}
              boostId={id}
              title={data.postsGet.title}
              goalAmount={data.postsGet.goalAmount}
              paymentsTotal={data.postsGet.paymentsTotal}
              why={data.postsGet.why}
              what={data.postsGet.what}
              about={data.postsGet.about}
              items={data.postsGet.items}
              handlePayments={this.startPayment}
            />
          );
        }}
      </Query>
    );
  };

  private startPayment = () => {
    this.setState({ payment: true });
  };
};
