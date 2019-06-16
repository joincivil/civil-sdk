import * as React from "react";
import { BoostPayRadioBtn } from "./BoostPayRadioBtn";
import { BoostPayOption, BoostPayCardDetails } from "../BoostStyledComponents";

export interface BoostPayStripeProps {
  defaultChecked: boolean;
  value: string;
}

export const BoostPayStripe: React.FunctionComponent<BoostPayStripeProps> = props => {
  return (
    <BoostPayOption>
      <BoostPayRadioBtn value={props.value} defaultChecked={props.defaultChecked} disabled={true}>Pay using card</BoostPayRadioBtn>
      <BoostPayCardDetails>
        <p>Coming Soon <a href="#TODO" target="_blank">Why only ETH?</a></p>
      </BoostPayCardDetails>
    </BoostPayOption>
  );
}
