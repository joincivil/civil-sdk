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
      <BoostPayRadioBtn value={props.value} defaultChecked={props.defaultChecked}>
        Pay with card
      </BoostPayRadioBtn>
      <BoostPayCardDetails>
        <p>
          Continue with adding your payment information. Your payment information will be processed through{" "}
          <a href="https://stripe.com/" target="_blank">
            Stripe
          </a>
          .
        </p>
      </BoostPayCardDetails>
    </BoostPayOption>
  );
};
