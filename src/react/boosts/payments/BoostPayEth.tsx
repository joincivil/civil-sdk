import * as React from "react";
import { BoostPayRadioBtn } from "./BoostPayRadioBtn";
import { BoostPayOption, BoostPayCardDetails, LearnMore, BoostFlex, BoostModal } from "../BoostStyledComponents";
import { Button, FullScreenModal, ModalContent, ModalHeading, CloseBtn, CloseXIcon } from "@joincivil/components";
import { colors } from "@joincivil/components";

export interface BoostPayEthProps {
  name: string;
  value: string;
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
          <BoostPayRadioBtn name={this.props.name} value={this.props.value}>Pay with ETH</BoostPayRadioBtn>
          <BoostPayCardDetails>
            <p>You will be paying using a digital wallet such as <a href="" target="_blank">MetaMask</a></p>
            <p>Don't have one? <a href="" target="_blank">Get a Digital Wallet and ETH</a></p>
            <LearnMore>
              Learn more
              <a onClick={this.openWhatEthModal}>What is ETH?</a>
              <a onClick={this.openWhyEthModal}>Why ETH?</a>
            </LearnMore>
            <h3>Boost Amount</h3>
            <BoostFlex>
              {/*<UsdEthConverter />*/}
              [USD to ETH Converter]
              <Button>Next</Button>
            </BoostFlex>
          </BoostPayCardDetails>
        </BoostPayOption>
        <FullScreenModal open={this.state.isWhyEthModalOpen}>
          <BoostModal>
            <CloseBtn onClick={this.handleClose}>
              <CloseXIcon color={colors.accent.CIVIL_GRAY_2} />
            </CloseBtn>
            <ModalHeading>
              Why ETH?
            </ModalHeading>
            <ModalContent>
              <p>100% of your ETH will go right into the newsroom’s wallet. This way, the Newsroom get’s your full support.</p>
              <p>You’ll to use Ethereum cryptocurrency (ETH) in a Digital wallet like MetaMask in order to continue. Currently it’s not possible to use other cryptocurrencies, or in dollars or other fiat currencies.</p>
              <p>There is a very small network transaction cost for sending Ethereum out of your wallet, usually it’s a matter of a few cents. This cost go to the Ethereum miners who maintain the computational work for your content to be included on the Ethereum blockchain.</p>
              <a href="">Learn more about how to get ETH and support Boosts on our FAQ.</a>
            </ModalContent>
          </BoostModal>
        </FullScreenModal>
        <FullScreenModal open={this.state.isWhatEthModalOpen}>
          <BoostModal>
            <CloseBtn onClick={this.handleClose}>
              <CloseXIcon color={colors.accent.CIVIL_GRAY_2} />
            </CloseBtn>
            <ModalHeading>
              What is ETH?
            </ModalHeading>
            <ModalContent>
              <p>Ether (ETH) is the cryptocurrency for the Ethereum blockchain. You’ll be paying in ETH to support and pay Boosts.</p>
              <p>You can purchase or exchange for ETH using cryptocurrency exchange such as Coinbase or Gemini and fund a digital wallet such as MetaMask. Don’t worry, both Coinbase and Gemini are regulated and in compliance with all applicable laws in each jurisdiction in which they operate. Buying ETH with a debit or certain credit cards is instant, once your account is verified.</p>
              <p>Each transaction includes a small transaction cost, called gas, which is usually a few cents.  These fees cost to the Ethereum miners who maintain the computational work for your content to be included on the Ethereum blockchain.</p>
              <a href="">Learn more about how to get ETH and support Boosts on our FAQ.</a>
            </ModalContent>
          </BoostModal>
        </FullScreenModal>
      </>
    );
  }

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
