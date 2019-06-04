import * as React from "react";
import { BoostPayRadioBtn } from "./BoostPayRadioBtn";
import { BoostPayOption, BoostPayCardDetails, LearnMore, BoostFlex } from "../BoostStyledComponents";
import { Button } from "@joincivil/components";

export const BoostPayEth: React.FunctionComponent = props => {
  return (
    <BoostPayOption>
      <BoostPayRadioBtn name={"boost payments"} value={"eth"}>Pay with ETH</BoostPayRadioBtn>
      <BoostPayCardDetails>
        <p>You will be paying using a digital wallet such as <a href="" target="_blank">MetaMask</a></p>
        <p>Don't have one? <a href="" target="_blank">Get a Digital Wallet and ETH</a></p>
        <LearnMore>
          Learn more
          <a>What is ETH?</a>
          <a>Why ETH?</a>
        </LearnMore>
        <h3>Boost Amount</h3>
        <BoostFlex>
          {/*<UsdEthConverter />*/}
          [USD to ETH Converter]
          <Button>Next</Button>
        </BoostFlex>
      </BoostPayCardDetails>
    </BoostPayOption>
  );
}
