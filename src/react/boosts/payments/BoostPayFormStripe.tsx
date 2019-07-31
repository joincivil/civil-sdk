import * as React from "react";
import { MutationFunc } from "react-apollo";
import { injectStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from "react-stripe-elements";
import styled from "styled-components";
import { colors, fonts } from "@joincivil/components";
import {
  BoostFlexStart,
  BoostPayFormWrapper,
  SubmitInstructions,
  SubmitWarning,
  BoostButton,
} from "../BoostStyledComponents";
import { BoostPayOption } from "./BoostPayOption";
import { urlConstants } from "../../urlConstants";

const StripeWrapper = styled.div`
  color: ${colors.accent.CIVIL_GRAY_1};
  font-family: ${fonts.SANS_SERIF};
  font-size: 16px;
  line-height: 22px;
  margin: 20px 0;

  label {
    display: block;
    margin-bottom: 5px;
    width: 100%;
  }

  input {
    border: 1px solid ${colors.accent.CIVIL_GRAY_3};
    border-radius: 2px;
    padding: 10px;
  }
`;

const StripeCardEmailWrap = styled.div`
  margin-bottom: 20px;

  input {
    width: 100%;
  }
`;

const StripeCardInfoWrap = styled.div`
  width: 100%;

  .StripeElement {
    border: 1px solid ${colors.accent.CIVIL_GRAY_3};
    border-radius: 2px;
    margin-bottom: 10px;
    padding: 10px;
  }
`;

const StripeUserInfoWrap = styled.div`
  margin-bottom: 20px;
  width: 100%;

  input {
    margin-bottom: 20px;
    width: 300px;
  }
`;

export interface BoostPayFormStripeProps {
  boostId: string;
  newsroomName: string;
  amount: number;
  selected: boolean;
  paymentType: string;
  optionLabel: string | JSX.Element;
  savePayment: MutationFunc;
  handlePaymentSuccess(): void;
}

class BoostPayFormStripe extends React.Component<BoostPayFormStripeProps> {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render(): JSX.Element {
    return (
      <>
        <BoostPayOption
          paymentType={this.props.paymentType}
          optionLabel={this.props.optionLabel}
          selected={this.props.selected}
        >
          <StripeWrapper>
            <StripeCardEmailWrap>
              <label>Email</label>
              <input id="email" name="email" type="email" required />
            </StripeCardEmailWrap>
            <StripeCardInfoWrap>
              <label>Card information</label>
              <CardNumberElement />
              <CardExpiryElement />
              <CardCvcElement />
            </StripeCardInfoWrap>
            <StripeUserInfoWrap>
              <label>Name on card</label>
              <input id="name" name="name" required />
              <label>Country or region</label>
              <input id="country" name="country" />
              <label>Zip/Postal Code</label>
              <input id="zip" name="zip" />
            </StripeUserInfoWrap>
          </StripeWrapper>
        </BoostPayOption>

        <BoostPayFormWrapper>
          <form>
            <BoostFlexStart>
              <SubmitInstructions>
                All proceeds of the Boost go directly to the newsroom minus Stripe processing fees. If a Boost goal is
                not met, the proceeds will still go to fund the selected newsroom.
              </SubmitInstructions>
              <div>
                <BoostButton onClick={() => this.handleSubmit()}>Support this Boost</BoostButton>
                <SubmitWarning>
                  Refunds are not possible. Civil does not charge any fees for this transaction. There are small fees
                  charged by Stripe. By sending a Boost, you agree to Civil’s{" "}
                  <a href={urlConstants.TERMS}>Terms of Use</a> and{" "}
                  <a href={urlConstants.PRIVACY_POLICY}>Privacy Policy</a>. Depending on your selection, your email and
                  comment may be visible to the newsroom.
                </SubmitWarning>
              </div>
            </BoostFlexStart>
          </form>
        </BoostPayFormWrapper>
      </>
    );
  }

  private async handleSubmit(): Promise<void> {
    // @ts-ignore
    this.props.stripe
      .createPaymentMethod("card", {
        billing_details: {
          address: {
            country: null,
            postal_code: null,
          },
          email: null,
          name: "Jenny Rosen",
        },
      })
      // @ts-ignore
      .then(({ paymentMethod }) => {
        console.log("Received Stripe PaymentMethod:", paymentMethod);
        this.props.savePayment({
          variables: {
            postID: this.props.boostId,
            input: { paymentToken: "", amount: this.props.amount, currencyCode: "usd" },
          },
        });
      });
  }
}

export default injectStripe(BoostPayFormStripe);
