import * as React from "react";
import { BoostPayRadioBtn } from "./BoostPayRadioBtn";
import { BoostPayOption, BoostPayCardDetails, LearnMore, BoostFlexCenter, BoostButton } from "../BoostStyledComponents";
import { WhyEthModalText, WhatIsEthModalText } from "../BoostTextComponents";
import { BoostModal } from "../BoostModal";
import { BoostPayForm } from "./BoostPayForm";

export interface BoostPayEthProps {
  paymentStarted?: boolean;
  defaultChecked: boolean;
  value: string;
  handleNext?(): void;
}

export interface BoostPayEthStates {
  isWhyEthModalOpen: boolean;
  isWhatEthModalOpen: boolean;
}

export class BoostPayEth extends React.Component<BoostPayEthProps, BoostPayEthStates> {
  public constructor(props: BoostPayEthProps) {
    super(props);
    this.state = {
      isWhyEthModalOpen: false,
      isWhatEthModalOpen: false,
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
          <p>You will be paying using a digital wallet such as <a href="" target="_blank">MetaMask</a></p>
          <p>Don't have one? <a href="" target="_blank">Get a Digital Wallet and ETH</a></p>
          <LearnMore>
            Learn more
            <a onClick={this.openWhatEthModal}>What is ETH?</a>
            <a onClick={this.openWhyEthModal}>Why ETH?</a>
          </LearnMore>
          <h3>Boost Amount</h3>
          <BoostFlexCenter>
            {/*<UsdEthConverter />*/}
            [USD to ETH Converter]
            <BoostButton onClick={this.props.handleNext}>Next</BoostButton>
          </BoostFlexCenter>
        </BoostPayCardDetails>

        <BoostModal open={this.state.isWhyEthModalOpen} handleClose={this.handleClose}>
          <WhyEthModalText />
        </BoostModal>
        <BoostModal open={this.state.isWhatEthModalOpen} handleClose={this.handleClose}>
          <WhatIsEthModalText />
        </BoostModal>
      </>
    );
  };

  private getPaymentForm = () => {
    return (
      <BoostPayCardDetails>
        <p>You will be paying using a digital wallet such as <a href="" target="_blank">MetaMask</a></p>
        <h3>Boost Amount</h3>
        <BoostFlexCenter>
        </BoostFlexCenter>
      </BoostPayCardDetails>
    );
  };

  private openWhyEthModal = () => {
    this.setState({ isWhyEthModalOpen: true });
  };

  private openWhatEthModal = () => {
    this.setState({ isWhatEthModalOpen: true });
  };

  private handleClose = () => {
    this.setState({ isWhyEthModalOpen: false, isWhatEthModalOpen: false });
  };
}
