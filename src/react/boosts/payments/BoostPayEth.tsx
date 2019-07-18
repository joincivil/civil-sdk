import * as React from "react";
import { BoostPayRadioBtn } from "./BoostPayRadioBtn";
import {
  BoostPayOption,
  BoostPayCardDetails,
  LearnMore,
  BoostFlexEth,
  BoostButton,
  BoostEthConfirm,
  BoostAmount,
} from "../BoostStyledComponents";
import {
  WhyEthModalText,
  WhatIsEthModalText,
  CanUseCVLText,
  BoostConnectWalletWarningText,
  BoostPayWalletText,
  BoostMobileWalletModalText,
} from "../BoostTextComponents";
import { BoostModal } from "../BoostModal";
import { BoostPayForm } from "./BoostPayForm";
import { UsdEthConverter, HollowGreenCheck } from "@joincivil/components";
import { EthAddress } from "@joincivil/core";
import { Mutation, MutationFunc } from "react-apollo";
import { boostPayEthMutation } from "../queries";

export enum MODEL_CONTENT {
  WHY_ETH = "why eth",
  WHAT_IS_ETH = "what is eth",
  CAN_USE_CVL = "can I use cvl",
}

export interface BoostPayEthProps {
  boostId: string;
  newsroomName: string;
  paymentAddr: EthAddress;
  paymentStarted?: boolean;
  defaultChecked: boolean;
  value: string;
  etherToSpend?: number;
  usdToSpend?: number;
  walletConnected: boolean;
  handleNext(etherToSpend: number, usdToSpend: number): void;
  handlePaymentSuccess(): void;
}

export interface BoostPayEthStates {
  isMobileWalletModalOpen: boolean;
  isInfoModalOpen: boolean;
  modalContent: string;
  etherToSpend: number;
  usdToSpend: number;
  notEnoughEthError: boolean;
}

export class BoostPayEth extends React.Component<BoostPayEthProps, BoostPayEthStates> {
  public constructor(props: BoostPayEthProps) {
    super(props);
    this.state = {
      isMobileWalletModalOpen: this.showMobileWalletModal(),
      isInfoModalOpen: false,
      modalContent: "",
      etherToSpend: this.props.etherToSpend || 0,
      usdToSpend: this.props.usdToSpend || 0,
      notEnoughEthError: false,
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

        {this.props.paymentStarted && (
          <Mutation mutation={boostPayEthMutation}>
            {(paymentsCreateEtherPayment: MutationFunc) => {
              return (
                <BoostPayForm
                  boostId={this.props.boostId}
                  paymentAddr={this.props.paymentAddr}
                  amount={this.state.etherToSpend}
                  savePayment={paymentsCreateEtherPayment}
                  etherToSpend={this.state.etherToSpend}
                  usdToSpend={this.state.usdToSpend}
                  newsroomName={this.props.newsroomName}
                  handlePaymentSuccess={this.props.handlePaymentSuccess}
                />
              );
            }}
          </Mutation>
        )}

        <BoostModal open={this.state.isMobileWalletModalOpen} handleClose={this.handleClose}>
          <BoostMobileWalletModalText />
        </BoostModal>
      </>
    );
  }

  private getPaymentAmount = () => {
    let disableBtn;
    if (!this.props.walletConnected || this.state.usdToSpend <= 0 || this.state.notEnoughEthError) {
      disableBtn = true;
    } else {
      disableBtn = false;
    }

    return (
      <>
        <BoostPayCardDetails>
          <BoostPayWalletText />
          {!this.props.walletConnected && <BoostConnectWalletWarningText />}
          <LearnMore>
            <a onClick={() => this.openInfoModal(MODEL_CONTENT.WHAT_IS_ETH)}>What is ETH?</a>
            <a onClick={() => this.openInfoModal(MODEL_CONTENT.WHY_ETH)}>Why ETH?</a>
            <a onClick={() => this.openInfoModal(MODEL_CONTENT.CAN_USE_CVL)}>Can I use CVL?</a>
          </LearnMore>
          <h3>Boost Amount</h3>
          <BoostFlexEth>
            <UsdEthConverter
              onNotEnoughEthError={(error: boolean) => this.notEnoughEthError(error)}
              onConversion={(usd: number, eth: number) => this.setConvertedAmount(usd, eth)}
            />
            <BoostButton
              disabled={disableBtn}
              onClick={() => this.props.handleNext(this.state.etherToSpend, this.state.usdToSpend)}
            >
              Continue
            </BoostButton>
          </BoostFlexEth>
        </BoostPayCardDetails>

        <BoostModal open={this.state.isInfoModalOpen} handleClose={this.handleClose}>
          {this.renderInfoModal()}
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
        <BoostPayWalletText />
        <h3>Boost Amount</h3>
        <BoostAmount>
          <span>{etherToSpend + " ETH"}</span> {"($" + usdToSpend.toFixed(2) + ")"}
        </BoostAmount>
        <BoostEthConfirm>
          <HollowGreenCheck height={15} width={15} /> You have enough ETH in your connected wallet.
        </BoostEthConfirm>
      </BoostPayCardDetails>
    );
  };

  private notEnoughEthError = (error: boolean) => {
    this.setState({ notEnoughEthError: error });
  };

  private showMobileWalletModal = () => {
    let showMobileWalletModal = false;

    // TODO(sruddy) do we have a check for mobile browser util?
    if (window.innerWidth < 800 && !this.props.walletConnected) {
      showMobileWalletModal = true;
    }

    return showMobileWalletModal;
  };

  private renderInfoModal = () => {
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

  private openInfoModal = (modelContent: string) => {
    this.setState({ isInfoModalOpen: true, modalContent: modelContent });
  };

  private handleClose = () => {
    this.setState({ isInfoModalOpen: false, isMobileWalletModalOpen: false });
  };
}
