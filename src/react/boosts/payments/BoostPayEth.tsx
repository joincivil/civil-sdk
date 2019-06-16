import * as React from "react";
import { BoostPayRadioBtn } from "./BoostPayRadioBtn";
import { BoostPayOption, BoostPayCardDetails, LearnMore, BoostFlexCenter, BoostButton } from "../BoostStyledComponents";
import { WhyEthModalText, WhatIsEthModalText, CanUseCVLText } from "../BoostTextComponents";
import { BoostModal } from "../BoostModal";
import { BoostPayForm } from "./BoostPayForm";
// import { UsdEthConverter } from "@joincivil/components";

export enum MODEL_CONTENT {
  WHY_ETH = "why eth",
  WHAT_IS_ETH = "what is eth",
  CAN_USE_CVL = "can I use cvl",
}

export interface BoostPayEthProps {
  paymentStarted?: boolean;
  defaultChecked: boolean;
  value: string;
  handleNext?(): void;
}

export interface BoostPayEthStates {
  isModalOpen: boolean;
  modalContent: string;
}

export class BoostPayEth extends React.Component<BoostPayEthProps, BoostPayEthStates> {
  public constructor(props: BoostPayEthProps) {
    super(props);
    this.state = {
      isModalOpen: false,
      modalContent: "",
    };
  }

  public render(): JSX.Element {
    return (
      <>
        <BoostPayOption>
          <BoostPayRadioBtn value={this.props.value} defaultChecked={this.props.defaultChecked}>Pay with ETH</BoostPayRadioBtn>
          {this.props.paymentStarted ? this.getPaymentForm() : this.getPaymentAmount()}
        </BoostPayOption>

        {this.props.paymentStarted && <BoostPayForm />}
      </>
    );
  };

  private getPaymentAmount = () => {
    return (
      <>
        <BoostPayCardDetails>
          <p>You will be paying using a digital wallet such as <a href="#TODO" target="_blank">MetaMask</a></p>
          <p>Don't have one? <a href="#TODO" target="_blank">Get a Digital Wallet and ETH</a></p>
          <LearnMore>
            Learn more
            <a onClick={() => this.openModal(MODEL_CONTENT.WHAT_IS_ETH)}>What is ETH?</a>
            <a onClick={() => this.openModal(MODEL_CONTENT.WHY_ETH)}>Why ETH?</a>
            <a onClick={() => this.openModal(MODEL_CONTENT.CAN_USE_CVL)}>Can I use CVL?</a>
          </LearnMore>
          <h3>Boost Amount</h3>
          <BoostFlexCenter>
            {/*<UsdEthConverter />*/}
            [USD to ETH Converter]
            <BoostButton onClick={this.props.handleNext}>Next</BoostButton>
          </BoostFlexCenter>
        </BoostPayCardDetails>

        <BoostModal open={this.state.isModalOpen} handleClose={this.handleClose}>
          {this.renderModal()}
        </BoostModal>
      </>
    );
  };

  private getPaymentForm = () => {
    return (
      <BoostPayCardDetails>
        <p>You will be paying using a digital wallet such as <a href="#TODO" target="_blank">MetaMask</a></p>
        <h3>Boost Amount</h3>
        <BoostFlexCenter>
        </BoostFlexCenter>
      </BoostPayCardDetails>
    );
  };

  private renderModal = () => {
    switch (this.state.modalContent) {
      case MODEL_CONTENT.WHY_ETH:
        return <WhyEthModalText /> ;
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
