import * as React from "react";
import { BoostProgress } from "./BoostProgress";
import { BoostData, BoostNewsroomData } from "./types";
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
import { QuestionToolTip } from "@joincivil/components";

export interface BoostCardProps {
  boostData: BoostData;
  newsroomData: BoostNewsroomData;
  open: boolean;
  boostId: string;
  boostOwner?: boolean;
  handlePayments(): void;
}

export class BoostCard extends React.Component<BoostCardProps> {
  public render(): JSX.Element {
    const timeRemaining = this.timeRemaining(this.props.boostData.dateEnd);
    const timeEnded = timeRemaining === "Boost Ended";
    const goalReached = this.props.boostData.paymentsTotal >= this.props.boostData.goalAmount;
    const newsroomAddress = this.props.boostData.channelID;

    return (
      <>
        {this.props.boostOwner && timeEnded && <BoostCompleted goalReached={goalReached} />}

        <BoostWrapper open={this.props.open}>
          <BoostTitle>
            {this.props.open ? (
              <>{this.props.boostData.title}</>
            ) : (
              <a href={"/boosts/" + this.props.boostId}>{this.props.boostData.title}</a>
            )}
          </BoostTitle>

          <BoostImgDiv>
            <BoostImg charterUri={this.props.newsroomData.charter && this.props.newsroomData.charter.uri} />
          </BoostImgDiv>
          <BoostFlexStartMobile>
            <BoostImgDivMobile>
              <BoostImg charterUri={this.props.newsroomData.charter && this.props.newsroomData.charter.uri} />
            </BoostImgDivMobile>
            <BoostNewsroomInfo>
              <BoostNewsroom>{this.props.newsroomData.name}</BoostNewsroom>
              {this.props.open && (
                <>
                  <a href={this.props.newsroomData.url} target="_blank">
                    Visit Newsroom <MobileStyle>&raquo;</MobileStyle>
                  </a>
                  <a href={"https://registry.civil.co/listing/" + newsroomAddress} target="_blank">
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
                goalAmount={this.props.boostData.goalAmount}
                paymentsTotal={this.props.boostData.paymentsTotal}
                timeRemaining={timeRemaining}
              />
            </BoostProgressCol>
            {this.props.open && (
              <BoostButton disabled={timeEnded} onClick={() => this.props.handlePayments()}>
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
                <p>{this.props.boostData.why}</p>
              </BoostDescriptionWhy>
              <BoostDescription>
                <h3>What the outcome will be</h3>
                <p>{this.props.boostData.what}</p>
              </BoostDescription>
              <BoostDescription>
                <h3>About the newsroom</h3>
                <p>{this.props.boostData.about}</p>
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
                    {this.props.boostData.items.map((item: any, i: number) => (
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
