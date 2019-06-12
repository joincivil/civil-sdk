import * as React from "react";
import { BoostPayRadioBtn } from "./BoostPayRadioBtn";
import { BoostPayOption, BoostPayCardDetails } from "../BoostStyledComponents";

export interface BoostPayStripeProps {
  name: string;
  value: string;
}

export const BoostPayStripe: React.FunctionComponent<BoostPayStripeProps> = props => {
  return (
    <BoostPayOption>
      <BoostPayRadioBtn name={props.name} value={props.value} disabled={true}>Pay using card</BoostPayRadioBtn>
      <BoostPayCardDetails>
        <p>Coming Soon <a href="" target="_blank">Why only ETH?</a></p>
      </BoostPayCardDetails>
    </BoostPayOption>
  );
}
