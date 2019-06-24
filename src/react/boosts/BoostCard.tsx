import * as React from "react";
import { Query } from "react-apollo";
import { boostNewsroomQuery } from "./queries";
import { BoostProgress } from "./BoostProgress";
import {
  BoostButton,
  BoostFlexStart,
  BoostWrapper,
  BoostTitle,
  BoostNewsroomInfo,
  BoostNewsroom,
  BoostDescription,
  BoostDescriptionTable,
  BoostProgressCol,
} from "./BoostStyledComponents";
import { BoostImg } from "./BoostImg";
import { EthAddress } from "@joincivil/core";

export interface Items {
  item: string;
  cost: number;
}

export interface BoostCardProps {
  channelId: string;
  open: boolean;
  boostId: string;
  title: string;
  goalAmount: number;
  paymentsTotal: number;
  dateEnd: string;
  why: string;
  what: string;
  about: string;
  items: Items[];
  handlePayments(newsroom: string, paymentAddr: EthAddress): void;
}

export class BoostCard extends React.Component<BoostCardProps> {
  public render(): JSX.Element {
    const daysLeft = this.daysLeft(this.props.dateEnd);
    const addr = this.props.channelId;
    let newsroomName = "";

    return (
      <BoostWrapper open={this.props.open}>
        <BoostTitle>
          {this.props.open ? <>{this.props.title}</> : <a href={"/boosts/" + this.props.boostId}>{this.props.title}</a>}
        </BoostTitle>

        <Query query={boostNewsroomQuery} variables={{ addr }}>
          {({ loading, error, data }) => {
            if (loading) {
              return <></>;
            } else if (error || !data.listing) {
              console.log(JSON.stringify(error));
              return <>ERROR</>;
            }

            newsroomName = data.listing.name;
            return (
              <>
                <BoostImg charterUri={data.listing.charter.uri} />
                <BoostNewsroomInfo>
                  <BoostNewsroom>{newsroomName}</BoostNewsroom>
                  {this.props.open && (
                    <>
                      <a href={data.listing.url} target="_blank">
                        Visit Newsroom
                      </a>
                      <a href={"https://registry.civil.co/listing/" + addr} target="_blank">
                        Visit Civil Registry
                      </a>
                    </>
                  )}
                </BoostNewsroomInfo>

                <BoostFlexStart>
                  <BoostProgressCol open={this.props.open}>
                    <BoostProgress
                      open={this.props.open}
                      goalAmount={this.props.goalAmount}
                      paymentsTotal={this.props.paymentsTotal}
                      daysLeft={daysLeft}
                    />
                  </BoostProgressCol>
                  {this.props.open && (
                    <BoostButton onClick={() => this.props.handlePayments(newsroomName, data.listing.owner)}>
                      Support
                    </BoostButton>
                  )}
                </BoostFlexStart>
                {this.props.open && (
                  <>
                    <BoostDescription>
                      <p>{this.props.why}</p>
                    </BoostDescription>
                    <BoostDescription>
                      <h3>What the outcome will be</h3>
                      <p>{this.props.what}</p>
                    </BoostDescription>
                    <BoostDescription>
                      <h3>About the newsroom</h3>
                      <p>{this.props.about}</p>
                    </BoostDescription>
                    <BoostDescriptionTable>
                      <h3>Where your support goes</h3>
                      <table>
                        <thead>
                          <tr>
                            <th>Item</th>
                            <th>Cost</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.props.items.map((item: any, i: number) => (
                            <tr key={i}>
                              <td>{item.item}</td>
                              <td>{"$" + item.cost}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </BoostDescriptionTable>
                    <BoostDescription>
                      <h3>Questions about Boosts?</h3>
                      <p>
                        <a href="#TODO">Learn more in our FAQ</a>
                      </p>
                    </BoostDescription>
                  </>
                )}
              </>
            );

            return <></>;
          }}
        </Query>
      </BoostWrapper>
    );
  }

  private daysLeft = (dateEnd: string) => {
    const endDate = Date.parse(dateEnd);
    const currentDate = Date.now();
    const daysLeftNum = Math.trunc((endDate - currentDate) / (24 * 60 * 60 * 1000));
    let daysLeft;

    if (daysLeftNum === 1) {
      daysLeft = "1 day left";
    } else if (daysLeftNum < 1) {
      // TODO(sruddy) consult with design on more granular hours/mins
      daysLeft = "Ends today";
    } else {
      daysLeft = daysLeftNum + " days left";
    }

    return daysLeft;
  };
}
