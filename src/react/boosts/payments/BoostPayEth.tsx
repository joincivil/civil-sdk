import * as React from "react";
import { BoostPayRadioBtn } from "./BoostPayRadioBtn";
import {
  BoostPayOption,
  BoostPayCardDetails,
  LearnMore,
  BoostFlexCenter,
  BoostButton,
  BoostEthConfirm,
} from "../BoostStyledComponents";
import { WhyEthModalText, WhatIsEthModalText, CanUseCVLText } from "../BoostTextComponents";
import { BoostModal } from "../BoostModal";
import { BoostPayForm } from "./BoostPayForm";
import { UsdEthConverter } from "@joincivil/components";

export enum MODEL_CONTENT {
  WHY_ETH = "why eth",
  WHAT_IS_ETH = "what is eth",
  CAN_USE_CVL = "can I use cvl",
}

export interface BoostPayEthProps {
  paymentStarted?: boolean;
  defaultChecked: boolean;
  value: string;
  etherToSpend?: number;
  usdToSpend?: number;
  handleNext(etherToSpend: number, usdToSpend: number): void;
}

export interface BoostPayEthStates {
  isModalOpen: boolean;
  modalContent: string;
  etherToSpend: number;
  usdToSpend: number;
}

export class BoostPayEth extends React.Component<BoostPayEthProps, BoostPayEthStates> {
  public constructor(props: BoostPayEthProps) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalContent: "",
      etherToSpend: this.props.etherToSpend || 0,
      usdToSpend: this.props.usdToSpend || 0,
    };
  }

  public render(): JSX.Element {
    return (
      <>
        <BoostPayOption>
          <BoostPayRadioBtn value={this.props.value} defaultChecked={this.props.defaultChecked}>
            Pay with ETH
          </BoostPayRadioBtn>
          {this.props.paymentStarted
            ? this.getPaymentForm(this.state.etherToSpend, this.state.usdToSpend)
            : this.getPaymentAmount()}
        </BoostPayOption>

        {this.props.paymentStarted && <BoostPayForm />}
      </>
    );
  }

  private getPaymentAmount = () => {
    return (
      <>
        <BoostPayCardDetails>
          <p>
            You will be paying using a digital wallet such as{" "}
            <a href="#TODO" target="_blank">
              MetaMask
            </a>
          </p>
          <p>
            Don’t have one?{" "}
            <a href="#TODO" target="_blank">
              Get a cryptocurrency wallet and ETH
            </a>
          </p>
          <LearnMore>
            Learn more
            <a onClick={() => this.openModal(MODEL_CONTENT.WHAT_IS_ETH)}>What is ETH?</a>
            <a onClick={() => this.openModal(MODEL_CONTENT.WHY_ETH)}>Why ETH?</a>
            <a onClick={() => this.openModal(MODEL_CONTENT.CAN_USE_CVL)}>Can I use CVL?</a>
          </LearnMore>
          <h3>Boost Amount</h3>
          <BoostFlexCenter>
            <UsdEthConverter onConversion={(usd: number, eth: number) => this.setConvertedAmount(usd, eth)} />
            <BoostButton onClick={() => this.props.handleNext(this.state.etherToSpend, this.state.usdToSpend)}>
              Next
            </BoostButton>
          </BoostFlexCenter>
        </BoostPayCardDetails>

        <BoostModal open={this.state.isModalOpen} handleClose={this.handleClose}>
          {this.renderModal()}
        </BoostModal>
      </>
    );
  };

  private setConvertedAmount(usdToSpend: number, etherToSpend: number): void {
    const eth = parseFloat(etherToSpend.toFixed(6));
    this.setState({ usdToSpend, etherToSpend: eth });
  }

  private getPaymentForm = (etherToSpend: number, usdToSpend: number) => {
    return (
      <BoostPayCardDetails>
        <p>
          You will be paying using a digital wallet such as{" "}
          <a href="#TODO" target="_blank">
            MetaMask
          </a>
        </p>
        <h3>Boost Amount</h3>
        <span>
          {etherToSpend + " ETH"} {"($" + usdToSpend + ")"}
        </span>
        <BoostEthConfirm>&#x2714; You have enough ETH in your connected Wallet.</BoostEthConfirm>
      </BoostPayCardDetails>
    );
  };

  private renderModal = () => {
    switch (this.state.modalContent) {
      case MODEL_CONTENT.WHY_ETH:
        return <WhyEthModalText />;
      case MODEL_CONTENT.WHAT_IS_ETH:
        return <WhatIsEthModalText />;
      case MODEL_CONTENT.CAN_USE_CVL:
        return <CanUseCVLText />;
      default:
        return <></>;
    }
  };

  private openModal = (modelContent: string) => {
    this.setState({ isModalOpen: true, modalContent: modelContent });
  };

  private handleClose = () => {
    this.setState({ isModalOpen: false });
  };
}
