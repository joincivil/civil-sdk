import * as React from "react";
import { debounce } from "lodash";
import { BoostProgress } from "./BoostProgress";
import { BoostData, BoostNewsroomData } from "./types";
import {
  BoostButton,
  BoostFlexCenter,
  BoostWrapper,
  BoostTitle,
  BoostDescription,
  BoostDescriptionWhy,
  BoostDescriptionTable,
  BoostProgressCol,
  BoostNotice,
  BoostNotificationContain,
  BoostAmountInputWrap,
  BoostAmountInput,
} from "./BoostStyledComponents";
import { BoostPaymentSuccess } from "./BoostTextComponents";
import { BoostNewsroom } from "./BoostNewsroom";
import { BoostCompleted } from "./BoostCompleted";
import { QuestionToolTip, HelmetHelper, CurrencyInput } from "@joincivil/components";
import * as boostCardImage from "../../images/boost-card.png";
import { urlConstants } from "../urlConstants";
import { renderPTagsFromLineBreaks } from "@joincivil/utils";

export interface BoostCardProps {
  boostData: BoostData;
  newsroomData: BoostNewsroomData;
  open: boolean;
  boostId: string;
  paymentSuccess: boolean;
  boostOwner?: boolean;
  disableHelmet?: boolean;
  handlePayments(amount: number): void;
}

export interface BoostCardStates {
  amount: number;
}

export class BoostCard extends React.Component<BoostCardProps, BoostCardStates> {
  public constructor(props: any) {
    super(props);
    this.state = {
      amount: 0,
    };

    this.handleAmount = debounce(this.handleAmount.bind(this), 300);
  }
  public render(): JSX.Element {
    const timeRemaining = this.timeRemaining(this.props.boostData.dateEnd);
    const timeEnded = timeRemaining === "Boost Ended";
    const goalReached = this.props.boostData.paymentsTotal >= this.props.boostData.goalAmount;
    const newsroomContractAddress = this.props.boostData.channel.newsroom.contractAddress;
    let btnText = "Support";
    if (timeEnded) {
      btnText = "Boost Ended";
    }
    const btnDisabled = timeEnded || !this.props.newsroomData.whitelisted || this.state.amount === 0;

    return (
      <>
        {!this.props.disableHelmet && (
          <HelmetHelper
            title={`${this.props.boostData.title} - ${this.props.newsroomData.name} - The Civil Registry`}
            description={this.props.boostData.about}
            image={boostCardImage}
            meta={{
              "og:site_name": "Civil Registry",
              "og:type": "website",
              "twitter:card": "summary",
            }}
          />
        )}

        {this.props.boostOwner && timeEnded && (
          <BoostNotificationContain>
            <BoostCompleted goalReached={goalReached} />
          </BoostNotificationContain>
        )}
        {this.props.paymentSuccess && (
          <BoostNotificationContain>
            <BoostPaymentSuccess />
          </BoostNotificationContain>
        )}

        <BoostWrapper open={this.props.open}>
          <BoostTitle>
            {this.props.open ? (
              <>{this.props.boostData.title}</>
            ) : (
              <a href={"/boosts/" + this.props.boostId}>{this.props.boostData.title}</a>
            )}
          </BoostTitle>

          <BoostNewsroom
            open={this.props.open}
            boostOwner={this.props.boostOwner}
            boostId={this.props.boostId}
            newsroomContractAddress={newsroomContractAddress}
            charterUri={this.props.newsroomData.charter && this.props.newsroomData.charter.uri}
            newsroomData={this.props.newsroomData}
            disableHelmet={this.props.disableHelmet}
          />

          <BoostFlexCenter>
            <BoostProgressCol open={this.props.open}>
              <BoostProgress
                open={this.props.open}
                goalAmount={this.props.boostData.goalAmount}
                paymentsTotal={this.props.boostData.paymentsTotal}
                timeRemaining={timeRemaining}
              />
            </BoostProgressCol>
            {this.props.open && (
              <BoostAmountInputWrap>
                <BoostAmountInput>
                  <CurrencyInput label={""} placeholder={"0"} name={"BoostAmount"} onChange={this.handleAmount} />
                </BoostAmountInput>
                <BoostButton disabled={btnDisabled} onClick={() => this.props.handlePayments(this.state.amount)}>
                  {btnText}
                </BoostButton>
              </BoostAmountInputWrap>
            )}
          </BoostFlexCenter>
          {this.props.open && !this.props.newsroomData.whitelisted && (
            <>
              <BoostNotice>
                The newsroom that created this boost has been removed from the registry, so users can no longer support
                it via this boost.
              </BoostNotice>
            </>
          )}
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
              <BoostDescriptionWhy>{renderPTagsFromLineBreaks(this.props.boostData.why)}</BoostDescriptionWhy>
              <BoostDescription>
                <h3>What the outcome will be</h3>
                {renderPTagsFromLineBreaks(this.props.boostData.what)}
              </BoostDescription>
              <BoostDescription>
                <h3>About the newsroom</h3>
                {renderPTagsFromLineBreaks(this.props.boostData.about)}
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
                  <a target="_blank" href={urlConstants.FAQ_BOOSTS}>
                    Learn more in our FAQ
                  </a>
                </p>
              </BoostDescription>
            </>
          )}
        </BoostWrapper>
      </>
    );
  }

  private handleAmount = (name: string, value: any) => {
    let amount = Number.parseFloat(value);
    if (isNaN(amount)) {
      amount = 0;
    }
    this.setState({ amount });
  }

  // TODO(sruddy) add to util
  private timeRemaining = (dateEnd: string) => {
    const endDate = Date.parse(dateEnd);
    const currentDate = Date.now();
    let timeRemainingSeconds = (endDate - currentDate) / 1000;
    let timeRemaining;

    if (timeRemainingSeconds <= 0) {
      return (timeRemaining = "Boost Ended");
    }

    const days = Math.floor(timeRemainingSeconds / (3600 * 24));
    timeRemainingSeconds -= days * 3600 * 24;
    const hours = Math.floor(timeRemainingSeconds / 3600);
    timeRemainingSeconds -= hours * 3600;
    const mins = Math.floor(timeRemainingSeconds / 60);

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
