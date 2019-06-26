import * as React from "react";
import { Query } from "react-apollo";
import { boostNewsroomQuery } from "./queries";
import { BoostProgress } from "./BoostProgress";
import {
  BoostImgDiv,
  BoostImgDivMobile,
  BoostButton,
  BoostFlexStart,
  BoostWrapper,
  BoostTitle,
  BoostNewsroomInfo,
  BoostNewsroom,
  BoostDescription,
  BoostDescriptionWhy,
  BoostDescriptionTable,
  BoostProgressCol,
  BoostNotice,
  BoostFlexStartMobile,
  MobileStyle,
} from "./BoostStyledComponents";
import { BoostImg } from "./BoostImg";
import { BoostCompleted } from "./BoostCompleted";
import { EthAddress } from "@joincivil/core";
import { QuestionToolTip } from "@joincivil/components";

export interface Items {
  item: string;
  cost: number;
}

export interface BoostCardProps {
  boostOwner: boolean;
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
    const timeRemaining = this.timeRemaining(this.props.dateEnd);
    const timeEnded = timeRemaining === "Boost Ended";
    const goalReached = this.props.paymentsTotal >= this.props.goalAmount;
    const addr = this.props.channelId;
    let newsroomName = "";

    return (
      <>
        {this.props.boostOwner && timeEnded && <BoostCompleted goalReached={goalReached} />}

        <BoostWrapper open={this.props.open}>
          <BoostTitle>
            {this.props.open ? (
              <>{this.props.title}</>
            ) : (
              <a href={"/boosts/" + this.props.boostId}>{this.props.title}</a>
            )}
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
                  <BoostImgDiv>
                    <BoostImg charterUri={data.listing.charter.uri} />
                  </BoostImgDiv>
                  <BoostFlexStartMobile>
                    <BoostImgDivMobile>
                      <BoostImg charterUri={data.listing.charter.uri} />
                    </BoostImgDivMobile>
                    <BoostNewsroomInfo>
                      <BoostNewsroom>
                        {newsroomName}
                      </BoostNewsroom>
                      {this.props.open && (
                        <>
                          <a href={data.listing.url} target="_blank">
                            Visit Newsroom <MobileStyle>&raquo;</MobileStyle>
                          </a>
                          <a href={"https://registry.civil.co/listing/" + addr} target="_blank">
                            Visit Civil Registry <MobileStyle>&raquo;</MobileStyle>
                          </a>
                        </>
                      )}
                    </BoostNewsroomInfo>
                  </BoostFlexStartMobile>

                  <BoostFlexStart>
                    <BoostProgressCol open={this.props.open}>
                      <BoostProgress
                        open={this.props.open}
                        goalAmount={this.props.goalAmount}
                        paymentsTotal={this.props.paymentsTotal}
                        timeRemaining={timeRemaining}
                      />
                    </BoostProgressCol>
                    {this.props.open && (
                      <BoostButton
                        disabled={timeEnded}
                        onClick={() => this.props.handlePayments(newsroomName, data.listing.owner)}
                      >
                        {timeEnded ? "Boost Ended" : "Support"}
                      </BoostButton>
                    )}
                  </BoostFlexStart>
                  {this.props.open && (
                    <>
                      <BoostNotice>
                        All funds raised will go directly to the newsroom even if this goal is not met.
                        <QuestionToolTip
                          explainerText={
                            "Any money you give goes directly to the newsroom. Civil does not take a cut of any funds raised."
                          }
                        />
                      </BoostNotice>
                      <BoostDescriptionWhy>
                        <p>{this.props.why}</p>
                      </BoostDescriptionWhy>
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
            }}
          </Query>
        </BoostWrapper>
      </>
    );
  }

  // TODO(sruddy) add to util
  private timeRemaining = (dateEnd: string) => {
    const endDate = Date.parse(dateEnd);
    const currentDate = Date.now();
    let timeRemainingSeconds = (endDate - currentDate) / 1000;

    const days = Math.floor(timeRemainingSeconds / (3600 * 24));
    timeRemainingSeconds -= days * 3600 * 24;
    const hours = Math.floor(timeRemainingSeconds / 3600);
    timeRemainingSeconds -= hours * 3600;
    const mins = Math.floor(timeRemainingSeconds / 60);
    let timeRemaining;

    if (days >= 1) {
      timeRemaining = days === 1 ? "1 day left" : days + " days left";
    } else if (days < 1 && hours >= 1) {
      timeRemaining = hours === 1 ? "1 hour left" : hours + " hours left";
    } else if (hours < 1 && mins > 1) {
      timeRemaining = mins + " minutes left";
    } else if (mins <= 1 && mins > 0) {
      timeRemaining = "1 minute left";
    } else {
      timeRemaining = "Boost Ended";
    }

    return timeRemaining;
  };
}
