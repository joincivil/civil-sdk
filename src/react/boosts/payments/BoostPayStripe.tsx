import * as React from "react";
import makeAsyncScriptLoader from "react-async-script";
import { BoostPayRadioBtn } from "./BoostPayRadioBtn";
import { BoostPayOption, BoostPayCardDetails } from "../BoostStyledComponents";
import { StripeProvider, Elements } from "react-stripe-elements";
import BoostStripe from "./BoostStripeFormElements";
import { LoadingMessage } from "@joincivil/components";

export interface BoostPayStripeProps {
  defaultChecked: boolean;
  value: string;
}

export interface BoostPayStripeStates {
  stripeLoaded: boolean;
  stripe: any;
}

export class BoostPayStripe extends React.Component<BoostPayStripeProps, BoostPayStripeStates> {
  constructor(props: BoostPayStripeProps) {
    super(props);
    this.state = {
      stripeLoaded: false,
      stripe: null,
    };
  }

  public render(): JSX.Element {
    return (
      <BoostPayOption>
        <BoostPayRadioBtn value={this.props.value} defaultChecked={this.props.defaultChecked}>
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
        {this.renderStripeComponent()}
      </BoostPayOption>
    );
  }

  private renderStripeComponent = (): JSX.Element => {
    const AsyncScriptLoader = makeAsyncScriptLoader("https://js.stripe.com/v3/")(LoadingMessage);
    if (this.state.stripeLoaded) {
       return (
        <StripeProvider apiKey={"pk_test_TYooMQauvdEDq54NiTphI7jx"}>
          <Elements>
            <BoostStripe />
          </Elements>
        </StripeProvider>
       )
    }

    return (
      <AsyncScriptLoader
        asyncScriptOnLoad={() => {
          this.setState({stripeLoaded: true});
        }}
      />
    );
  };
}
