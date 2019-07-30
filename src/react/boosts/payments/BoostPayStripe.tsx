import * as React from "react";
import makeAsyncScriptLoader from "react-async-script";
import { BoostPayCardDetails, BoostFlexCenter, BoostButton } from "../BoostStyledComponents";
import { StripeProvider, Elements } from "react-stripe-elements";
import BoostStripe from "./BoostStripeFormElements";
import { LoadingMessage } from "@joincivil/components";
import { BoostPayOption } from "./BoostPayOption";

export interface BoostPayStripeProps {
  amount: number;
  selected: boolean;
  paymentType: string;
  optionLabel: string | JSX.Element;
  paymentStarted?: boolean;
  handleNext(): void;
  handlePaymentSelected?(paymentType: string): void;
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
    if (this.props.paymentStarted) {
      return <>{this.renderPaymentForm()}</>;
    }

    return <>{this.renderDefaultOption()}</>;
  }

  private renderDefaultOption = (): JSX.Element => {
    return (
      <BoostPayOption
        paymentType={this.props.paymentType}
        optionLabel={this.props.optionLabel}
        selected={this.props.selected}
        handlePaymentSelected={this.props.handlePaymentSelected}
      >
        <BoostPayCardDetails>
          <BoostFlexCenter>
            <p>
              Continue with adding your payment information. Your payment information will be processed through{" "}
              <a href="https://stripe.com/" target="_blank">
                Stripe
              </a>
              .
            </p>
            {this.props.selected && <BoostButton onClick={() => this.props.handleNext()}>Next</BoostButton>}
          </BoostFlexCenter>
        </BoostPayCardDetails>
      </BoostPayOption>
    );
  };

  private renderPaymentForm = (): JSX.Element => {
    return (
      <BoostPayOption
        paymentType={this.props.paymentType}
        optionLabel={this.props.optionLabel}
        selected={this.props.selected}
      >
        {this.renderStripeComponent()}
      </BoostPayOption>
    );
  };

  private renderStripeComponent = (): JSX.Element => {
    const AsyncScriptLoader = makeAsyncScriptLoader("https://js.stripe.com/v3/")(LoadingMessage);
    if (this.state.stripeLoaded) {
      return (
        <StripeProvider apiKey={"pk_test_TYooMQauvdEDq54NiTphI7jx"}>
          <Elements>
            <BoostStripe />
          </Elements>
        </StripeProvider>
      );
    }

    return (
      <AsyncScriptLoader
        asyncScriptOnLoad={() => {
          this.setState({ stripeLoaded: true });
        }}
      />
    );
  };
}
