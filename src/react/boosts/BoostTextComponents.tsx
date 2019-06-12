import * as React from "react";
import { ModalHeading, ModalContent } from "@joincivil/components";

export const WhyEthModalText: React.FunctionComponent = props => (
  <>
    <ModalHeading>
      Why ETH?
    </ModalHeading>
    <ModalContent>
      <p>100% of your ETH will go right into the newsroom’s wallet. This way, the Newsroom get’s your full support.</p>
      <p>You’ll to use Ethereum cryptocurrency (ETH) in a Digital wallet like MetaMask in order to continue. Currently it’s not possible to use other cryptocurrencies, or in dollars or other fiat currencies.</p>
      <p>There is a very small network transaction cost for sending Ethereum out of your wallet, usually it’s a matter of a few cents. This cost go to the Ethereum miners who maintain the computational work for your content to be included on the Ethereum blockchain.</p>
      <a href="">Learn more about how to get ETH and support Boosts on our FAQ.</a>
    </ModalContent>
  </>
);

export const WhatIsEthModalText: React.FunctionComponent = props => (
  <>
    <ModalHeading>
      What is ETH?
    </ModalHeading>
    <ModalContent>
      <p>Ether (ETH) is the cryptocurrency for the Ethereum blockchain. You’ll be paying in ETH to support and pay Boosts.</p>
      <p>You can purchase or exchange for ETH using cryptocurrency exchange such as Coinbase or Gemini and fund a digital wallet such as MetaMask. Don’t worry, both Coinbase and Gemini are regulated and in compliance with all applicable laws in each jurisdiction in which they operate. Buying ETH with a debit or certain credit cards is instant, once your account is verified.</p>
      <p>Each transaction includes a small transaction cost, called gas, which is usually a few cents.  These fees cost to the Ethereum miners who maintain the computational work for your content to be included on the Ethereum blockchain.</p>
      <a href="">Learn more about how to get ETH and support Boosts on our FAQ.</a>
    </ModalContent>
  </>
);
