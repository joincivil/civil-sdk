import * as React from "react";
import { BoostPayRadioBtn } from "./BoostPayRadioBtn";
import { BoostPayOption, BoostPayCardDetails } from "../BoostStyledComponents";

export const BoostPayCard: React.FunctionComponent = props => {
  return (
    <BoostPayOption>
      <BoostPayRadioBtn name={"boost payments"} value={"card"}>Pay using card</BoostPayRadioBtn>
      <BoostPayCardDetails>
        <p>Coming Soon <a href="" target="_blank">Why only ETH?</a></p>
      </BoostPayCardDetails>
    </BoostPayOption>
  );
}
