import * as React from "react";
import { ModalHeading, ModalContent, ClipLoader } from "@joincivil/components";
import { BoostButton } from "./BoostStyledComponents";

export const WhyEthModalText: React.FunctionComponent = props => (
  <>
    <ModalHeading>Why ETH?</ModalHeading>
    <ModalContent>
      100% of your ETH will go right into the newsroom’s wallet. This way, the Newsroom gets your full support.
    </ModalContent>
    <ModalContent>
      You’ll have to use Ethereum cryptocurrency (ETH) in a digital wallet like MetaMask in order to continue. Currently
      it’s not possible to use other cryptocurrencies, dollars or other fiat currencies.
    </ModalContent>
    <ModalContent>
      There is a very small network transaction cost for sending Ethereum out of your wallet, usually it’s a matter of a
      few cents. This cost goes to the Ethereum miners who perform the computational work for your content to be
      included on the Ethereum blockchain.
    </ModalContent>
    <ModalContent>
      <a href="#TODO">Learn more about how to get ETH and support Boosts on our FAQ.</a>
    </ModalContent>
  </>
);

export const WhatIsEthModalText: React.FunctionComponent = props => (
  <>
    <ModalHeading>What is ETH?</ModalHeading>
    <ModalContent>
      Ether (ETH) is the cryptocurrency for the Ethereum blockchain. You’ll be paying in ETH to support and pay Boosts.
    </ModalContent>
    <ModalContent>
      You can purchase or exchange for ETH using a cryptocurrency exchange such as Coinbase or Gemini and fund a digital
      wallet such as MetaMask. Don’t worry, both Coinbase and Gemini are regulated and in compliance with all applicable
      laws in each jurisdiction in which they operate. Buying ETH with a debit or certain credit cards is instant, once
      your account is verified.
    </ModalContent>
    <ModalContent>
      Each transaction includes a small transaction cost, called gas, which is usually a few cents. These fees go to the
      Ethereum miners who perform the computational work for your content to be included on the Ethereum blockchain.
    </ModalContent>
    <ModalContent>
      <a href="#TODO">Learn more about how to get ETH and support Boosts on our FAQ.</a>
    </ModalContent>
  </>
);

export const CanUseCVLText: React.FunctionComponent = props => (
  <>
    <ModalHeading>Can I use CVL to support a Boost?</ModalHeading>
    <ModalContent>
      Civil tokens (CVL) are intended as a governance token to be used on the Civil Registry. You can use them to
      participate in and contribute to Civil’s community. Civil tokens unlock specific activities on the Civil platform,
      including launching a newsroom on the Registry, challenging and voting for/against Newsrooms for ethics violations
      or appealing the outcome of a community vote to the Civil Council.
    </ModalContent>
    <ModalContent>
      <a href="#TODO">Learn more about Civil tokens</a>
    </ModalContent>
  </>
);

export const PaymentInfoText: React.FunctionComponent = props => (
  <>
    <h3>Payment Information</h3>
    <p>
      All Boosts proceeded will be funded using ETH. Civil does not collect any fees on Boosts and your support goes
      directly to the Newsroom.
    </p>
  </>
);

export const PaymentFAQText: React.FunctionComponent = props => (
  <>
    <h3>Frequently Asked Questions</h3>
    <a href="#TODO">How do I support a Boost?</a>
    <a href="#TODO">When is my payment charged?</a>
    <a href="#TODO">Am I still charged even if the Boost does not hit its target date?</a>
    <a href="#TODO">What information can others see about my payment?</a>
  </>
);

export const PaymentConfirmTransactionText: React.FunctionComponent = props => (
  <>
    <h3>Let's Boost</h3>
    <p>Your Wallet has popped up a new window. Confirm the transaction in the Wallet to complete the Boost.</p>
  </>
);

export interface BoostPaymentTextProps {
  newsroomName?: string;
  etherToSpend?: number;
  usdToSpend?: number;
  boostURL?: string;
  hideModal?(): void;
}

export const PaymentSuccessText: React.FunctionComponent = props => <ModalHeading>Payment Successful!</ModalHeading>;

export const PaymentErrorText: React.FunctionComponent = props => (
  <>
    <ModalHeading>Payment Failed</ModalHeading>
    <ModalContent>Your transaction failed. Please try again.</ModalContent>
  </>
);

export const PaymentEthConfirmationText: React.FunctionComponent<BoostPaymentTextProps> = props => (
  <>
    <p>
      Thank you! {props.newsroomName} has received your Boost of {props.etherToSpend} ETH ({props.usdToSpend}} USD)
    </p>
  </>
);

export const PaymentShareText: React.FunctionComponent<BoostPaymentTextProps> = props => (
  <>
    <p>
      Tell your friends about your Boost! <a href={props.boostURL}>Share a link to the Boost</a>
    </p>
  </>
);

export const PaymentJoinCivilText: React.FunctionComponent = props => (
  <p>
    Want to create a Civil account and keep track of your boost? Join the Civil Community and take part in helping to
    support newsrooms.
  </p>
);

export const PaymentInProgressModalText: React.FunctionComponent = props => (
  <>
    <PaymentConfirmTransactionText />
    <ClipLoader />
  </>
);

export const PaymentSuccessModalText: React.FunctionComponent<BoostPaymentTextProps> = props => {
  const handleOnClick = (event: any): void => {
    if (props.hideModal) {
      props.hideModal();
    }
  };

  return (
    <>
      <PaymentSuccessText />
      <PaymentEthConfirmationText usdToSpend={props.usdToSpend} etherToSpend={props.etherToSpend} />
      <PaymentShareText boostURL={props.boostURL} />
      <BoostButton onClick={handleOnClick}>Done</BoostButton>
    </>
  );
};

export const PaymentErrorModalText: React.FunctionComponent<BoostPaymentTextProps> = props => {
  const handleOnClick = (event: any): void => {
    if (props.hideModal) {
      props.hideModal();
    }
  };

  return (
    <>
      <PaymentErrorText />
      <BoostButton onClick={handleOnClick}>Dismiss</BoostButton>
    </>
  );
};
