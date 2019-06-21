import * as React from "react";
import { RadioInput } from "@joincivil/components";
import { BoostPayEth } from "./BoostPayEth";
// import { BoostPayStripe } from "./BoostPayStripe";
import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts } from "@joincivil/components";
import { BoostFlexCenter, BoostButton } from "../BoostStyledComponents";
import { PaymentInfoText, PaymentFAQText } from "../BoostTextComponents";

export enum PAYMENT_TYPE {
  DEFAULT = "",
  ETH = "eth",
  STRIPE = "stripe",
}

export interface BoostPayOptionsProps {
  onChange?: any;
  value?: any;
  name?: string;
}

const BoostInstructions = styled.div`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-family: ${fonts.SANS_SERIF};
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 20px;
`;

const BoostPayFooter = styled.div`
  border-top: 1px solid ${colors.accent.CIVIL_GRAY_3};
  margin: 20px 15px;
  padding: 20px;
`;

const BoostPayFooterSection = styled.div`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-size: 14px;
  line-height: 19px;
  margin: 0 0 40px;

  h3 {
    font-size: 14px;
    line-height: 19px;
    font-weight: 600;
    margin: 0 0 20px;
  }

  p {
    margin: 0 0 20px;
  }

  a {
    display: block;
    margin: 0 0 15px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export interface BoostPayOptionsStates {
  paymentType: string;
  etherToSpend: number;
  usdToSpend: number;
}

export class BoostPayOptions extends React.Component<BoostPayOptionsProps, BoostPayOptionsStates> {
  public constructor(props: BoostPayOptionsProps) {
    super(props);
    this.state = {
      paymentType: PAYMENT_TYPE.DEFAULT,
      etherToSpend: 0,
      usdToSpend: 0,
    };
  }

  public render(): JSX.Element {
    return (
      <>
        {this.state.paymentType === PAYMENT_TYPE.DEFAULT ? (
          <BoostInstructions>Select how you would like to support this Boost</BoostInstructions>
        ) : (
          <BoostInstructions>
            <BoostFlexCenter>
              Payment <BoostButton onClick={this.handleEdit}>Edit</BoostButton>
            </BoostFlexCenter>
          </BoostInstructions>
        )}
        <RadioInput name={"BoostPayments"} label={""}>
          {this.getPaymentTypes()}
        </RadioInput>
        {this.state.paymentType === PAYMENT_TYPE.DEFAULT && (
          <BoostPayFooter>
            <BoostPayFooterSection>
              <PaymentInfoText />
            </BoostPayFooterSection>
            <BoostPayFooterSection>
              <PaymentFAQText />
            </BoostPayFooterSection>
          </BoostPayFooter>
        )}
      </>
    );
  }

  private getPaymentTypes = () => {
    switch (this.state.paymentType) {
      case PAYMENT_TYPE.ETH:
        return (
          <BoostPayEth
            value={PAYMENT_TYPE.ETH}
            handleNext={() => this.handleEthNext(this.state.etherToSpend, this.state.usdToSpend)}
            defaultChecked={true}
            paymentStarted={true}
            etherToSpend={this.state.etherToSpend}
            usdToSpend={this.state.usdToSpend}
          />
        );
        {
          /* case PAYMENT_TYPE.STRIPE:
        return (
          <BoostPayStripe value={PAYMENT_TYPE.STRIPE} defaultChecked={true} />
        );*/
        }
      default:
        return (
          <>
            <BoostPayEth value={PAYMENT_TYPE.ETH} handleNext={this.handleEthNext} defaultChecked={true} />
            {/* <BoostPayStripe value={PAYMENT_TYPE.STRIPE} defaultChecked={false} /> */}
          </>
        );
    }
  };

  private handleEthNext = (etherToSpend: number, usdToSpend: number) => {
    this.setState({ paymentType: PAYMENT_TYPE.ETH, etherToSpend, usdToSpend });
  };

  private handleEdit = () => {
    this.setState({ paymentType: PAYMENT_TYPE.DEFAULT });
  };
}
