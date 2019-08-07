import * as React from "react";
import { Mutation, MutationFunc } from "react-apollo";
import { boostPayStripeMutation } from "../queries";
import makeAsyncScriptLoader from "react-async-script";
import { BoostPayCardDetails, BoostFlexCenter, BoostButton } from "../BoostStyledComponents";
import { StripeProvider, Elements } from "react-stripe-elements";
import BoostPayFormStripe from "./BoostPayFormStripe";
import { LoadingMessage } from "@joincivil/components";
import { BoostPayOption } from "./BoostPayOption";

export interface BoostPayStripeProps {
  boostId: string;
  newsroomName: string;
  usdToSpend: number;
  selected: boolean;
  paymentType: string;
  optionLabel: string | JSX.Element;
  paymentStarted?: boolean;
  handleNext(): void;
  handlePaymentSelected?(paymentType: string): void;
  handlePaymentSuccess(): void;
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
      <>
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
      </>
    );
  };

  private renderPaymentForm = (): JSX.Element => {
    // TODO(sruddy) TEST API KEY >> get from CivilContext config
    const AsyncScriptLoader = makeAsyncScriptLoader("https://js.stripe.com/v3/")(LoadingMessage);
    if (this.state.stripeLoaded) {
      return (
        <StripeProvider apiKey={"pk_test_3a5qmy1MuBEcooDr5wL8bRz9"}>
          <Elements>
            <Mutation mutation={boostPayStripeMutation}>
              {(paymentsCreateStripePayment: MutationFunc) => {
                return (
                  <BoostPayFormStripe
                    boostId={this.props.boostId}
                    newsroomName={this.props.newsroomName}
                    usdToSpend={this.props.usdToSpend}
                    paymentType={this.props.paymentType}
                    optionLabel={this.props.optionLabel}
                    selected={this.props.selected}
                    savePayment={paymentsCreateStripePayment}
                    handlePaymentSuccess={this.props.handlePaymentSuccess}
                  />
                );
              }}
            </Mutation>
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
