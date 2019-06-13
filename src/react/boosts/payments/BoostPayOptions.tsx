import * as React from "react";
import { RadioInput } from "@joincivil/components";
import { BoostPayEth } from "./BoostPayEth";
import { BoostPayStripe } from "./BoostPayStripe";
import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, Button } from "@joincivil/components";
import { BoostFlexCenter } from "../BoostStyledComponents";

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

const BoostInstructions = styled.p`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-family: ${fonts.SANS_SERIF};
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 20px;
`;

export interface BoostPayOptionsStates {
  paymentType: string;
}

export class BoostPayOptions extends React.Component<BoostPayOptionsProps, BoostPayOptionsStates> {
  public constructor(props: BoostPayOptionsProps) {
    super(props);
    this.state = { paymentType: PAYMENT_TYPE.DEFAULT };
  }

  public render(): JSX.Element {
    return (
      <>
        {
          this.state.paymentType === PAYMENT_TYPE.DEFAULT
          ? <BoostInstructions>Select how you would like to support this Boost</BoostInstructions>
          : <BoostInstructions><BoostFlexCenter>Payment <Button onClick={this.handleEdit}>Edit</Button></BoostFlexCenter></BoostInstructions>
        }
        <RadioInput name={"BoostPayments"} label={""}>
          {this.getPaymentTypes()}
        </RadioInput>
      </>
    );
  }

  private getPaymentTypes = () => {
    switch (this.state.paymentType) {
      case PAYMENT_TYPE.ETH:
        return (
          <BoostPayEth value={PAYMENT_TYPE.ETH} defaultChecked={true} paymentStarted={true} />
        );
      case PAYMENT_TYPE.STRIPE:
        return (
          <BoostPayStripe value={PAYMENT_TYPE.STRIPE} defaultChecked={true} />
        );
      default:
        return (
          <>
            <BoostPayEth value={PAYMENT_TYPE.ETH} handleNext={this.handleEthNext} defaultChecked={true} />
            <BoostPayStripe value={PAYMENT_TYPE.STRIPE} defaultChecked={false} />
          </>
        ); 
    }
  };

  private handleEthNext = () => {
    this.setState({ paymentType: PAYMENT_TYPE.ETH });
  };

  private handleEdit = () => {
    this.setState({ paymentType: PAYMENT_TYPE.DEFAULT });
  };
}
