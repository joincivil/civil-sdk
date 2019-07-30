import * as React from "react";
import { injectStripe, CardNumberElement, CardExpiryElement, CardCvcElement } from "react-stripe-elements";
import styled from "styled-components";
import { colors, fonts, Button } from "@joincivil/components";

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

class BoostStripe extends React.Component {
  constructor(props: any) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render(): JSX.Element {
    return (
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
        <Button onClick={() => this.handleSubmit()}>Send</Button>
      </StripeWrapper>
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
      });
  }
}

export default injectStripe(BoostStripe);
