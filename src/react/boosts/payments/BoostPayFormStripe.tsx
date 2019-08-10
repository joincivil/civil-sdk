import * as React from "react";
import { MutationFunc } from "react-apollo";
import {
  injectStripe,
  ReactStripeElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "react-stripe-elements";
import styled from "styled-components";
import { colors, fonts, mediaQueries, FullScreenModal } from "@joincivil/components";
import { isValidEmail } from "@joincivil/utils";
import {
  BoostFlexStart,
  BoostPayFormWrapper,
  SubmitInstructions,
  SubmitWarning,
  BoostButton,
  BoostModalContain,
} from "../BoostStyledComponents";
import { PaymentSuccessCardModalText, PaymentErrorModalText } from "../BoostTextComponents";
import { BoostPayOption } from "./BoostPayOption";
import { Countries } from "./BoostPayCountriesList";
import { urlConstants } from "../../urlConstants";
import { InputValidationUI, InputValidationStyleProps } from "./InputValidationUI";

const StripeWrapper = styled.div`
  color: ${colors.accent.CIVIL_GRAY_1};
  font-family: ${fonts.SANS_SERIF};
  font-size: 16px;
  line-height: 22px;
  margin: 20px 0 0;
  max-width: 575px;
  width: 100%;

  label {
    display: block;
    margin-bottom: 5px;
    width: 100%;
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

  & > div {
    margin-bottom: 10px;
  }
`;

const StripeElement = styled.div`
  border: ${(props: InputValidationStyleProps) =>
    props.valid ? "1px solid " + colors.accent.CIVIL_GRAY_3 : "1px solid " + colors.accent.CIVIL_RED};
  border-radius: 2px;
  padding: 12px;
`;

const StripeCardInfoFlex = styled.div`
  display: flex;

  & > div:first-of-type {
      margin-right: 10px;
    }
  }

  ${mediaQueries.MOBILE} {
    display: block;

    div {
      &:first-of-type {
        margin: 0 0 10px;
      }
    }
  }
`;

const StripeUserInfoWrap = styled.div`
  margin-bottom: 10px;
  width: 100%;

  & > div {
    margin-bottom: 20px;

    ${mediaQueries.MOBILE} {
      width: 100%;
    }
  }
`;

const StripeUserInfoFlex = styled.div`
  display: flex;
  margin-bottom: 10px;

  & > div {
    &:first-of-type {
      margin-right: 10px;
    }

    &:last-of-type {
      width: 130px;

      input {
        width: 100%;
      }
    }
  }

  ${mediaQueries.MOBILE} {
    display: block;

    div {
      &:first-of-type {
        margin: 0 0 10px;
      }
    }
  }
`;

const StripePolicy = styled.div`
  a {
    color: ${colors.accent.CIVIL_GRAY_1};
    font-size: 14px;
    line-height: 19px;

    &:hover {
      text-decoration: underline;
    }

    &:first-of-type {
      margin-right: 15px;
    }
  }
`;

export interface BoostPayFormStripeProps extends ReactStripeElements.InjectedStripeProps {
  boostId: string;
  newsroomName: string;
  usdToSpend: number;
  selected: boolean;
  paymentType: string;
  optionLabel: string | JSX.Element;
  savePayment: MutationFunc;
  handlePaymentSuccess(): void;
}

export interface BoostPayFormStripeStates {
  email: string;
  validEmail: boolean;
  name: string;
  validName: boolean;
  country: string;
  validCountry: boolean;
  postalCode: string;
  validPostalCode: boolean;
  validCardNumber: boolean;
  validCardExpiry: boolean;
  validCardCVC: boolean;
  isSuccessModalOpen: boolean;
  isErrorModalOpen: boolean;
  supportDisabled: boolean;
  paymentProcessing: boolean;
}

class BoostPayFormStripe extends React.Component<BoostPayFormStripeProps, BoostPayFormStripeStates> {
  constructor(props: any) {
    super(props);
    this.state = {
      email: "",
      validEmail: true,
      name: "",
      validName: true,
      country: "",
      validCountry: true,
      postalCode: "",
      validPostalCode: true,
      isSuccessModalOpen: false,
      isErrorModalOpen: false,
      validCardNumber: true,
      validCardExpiry: true,
      validCardCVC: true,
      supportDisabled: true,
      paymentProcessing: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  public render(): JSX.Element {
    let postalCodeVisible = false;
    // Stripe recommends getting the zip/postal codes for the US, UK, and Canada
    if (this.state.country === "USA" || this.state.country === "CAN" || this.state.country === "GBR") {
      postalCodeVisible = true;
    }

    return (
      <form>
        <BoostPayOption
          paymentType={this.props.paymentType}
          optionLabel={this.props.optionLabel}
          selected={this.props.selected}
        >
          <StripeWrapper>
            <StripeCardEmailWrap>
              <label>Email</label>
              <InputValidationUI valid={this.state.validEmail}>
                <input
                  id="email"
                  name="email"
                  type="email"
                  maxLength={254}
                  onBlur={() => this.handleOnBlur(event)}
                  required
                />
              </InputValidationUI>
            </StripeCardEmailWrap>
            <StripeCardInfoWrap>
              <label>Card information</label>
              <InputValidationUI valid={this.state.validCardNumber} width={"500px"}>
                <StripeElement valid={this.state.validCardNumber}>
                  <CardNumberElement id="card-number" onBlur={() => this.handleOnBlurStripe()} />
                </StripeElement>
              </InputValidationUI>
              <StripeCardInfoFlex>
                <InputValidationUI valid={this.state.validCardExpiry} width={"170px"}>
                  <StripeElement valid={this.state.validCardExpiry}>
                    <CardExpiryElement id="card-expiry" onBlur={() => this.handleOnBlurStripe()} />
                  </StripeElement>
                </InputValidationUI>
                <InputValidationUI valid={this.state.validCardCVC} width={"130px"}>
                  <StripeElement valid={this.state.validCardCVC}>
                    <CardCvcElement id="card-cvc" onBlur={() => this.handleOnBlurStripe()} />
                  </StripeElement>
                </InputValidationUI>
              </StripeCardInfoFlex>
            </StripeCardInfoWrap>
            <StripeUserInfoWrap>
              <label>Name on card</label>
              <InputValidationUI valid={this.state.validName} width={"300px"}>
                <input id="name" name="name" onBlur={() => this.handleOnBlur(event)} required />
              </InputValidationUI>
              <StripeUserInfoFlex>
                <div>
                  <label>Country or region</label>
                  <InputValidationUI valid={this.state.validCountry} width={"300px"}>
                    <select id="country" name="country" onBlur={() => this.handleOnBlur(event)}>
                      <option value=""></option>
                      {Countries.map((country: any, i: number) => {
                        return (
                          <option key={i} value={country.value}>
                            {country.name}
                          </option>
                        );
                      })}
                    </select>
                  </InputValidationUI>
                </div>
                <div>
                  {postalCodeVisible && (
                    <>
                      <label>Zip/Postal Code</label>
                      <InputValidationUI valid={this.state.validPostalCode} width={"150px"}>
                        <input id="zip" name="zip" maxLength={12} onBlur={() => this.handleOnBlur(event)} />
                      </InputValidationUI>
                    </>
                  )}
                </div>
              </StripeUserInfoFlex>
            </StripeUserInfoWrap>
            <StripePolicy>
              <a href="https://stripe.com/" target="_blank">
                Powered by Stripe
              </a>
              <a href="https://stripe.com/privacy" target="_blank">
                Privacy and Terms
              </a>
            </StripePolicy>
          </StripeWrapper>
        </BoostPayOption>

        <BoostPayFormWrapper>
          <BoostFlexStart>
            <SubmitInstructions>
              All proceeds of the Boost go directly to the newsroom minus Stripe processing fees. If a Boost goal is not
              met, the proceeds will still go to fund the selected newsroom.
            </SubmitInstructions>
            <div>
              <BoostButton onClick={() => this.handleSubmit()} disabled={this.state.supportDisabled}>
                {this.state.paymentProcessing ? "Payment processing..." : "Support this Boost"}
              </BoostButton>
              <SubmitWarning>
                Refunds are not possible. Civil does not charge any fees for this transaction. There are small fees
                charged by Stripe. By sending a Boost, you agree to Civil’s{" "}
                <a href={urlConstants.TERMS}>Terms of Use</a> and{" "}
                <a href={urlConstants.PRIVACY_POLICY}>Privacy Policy</a>. Depending on your selection, your email and
                comment may be visible to the newsroom.
              </SubmitWarning>
            </div>
          </BoostFlexStart>
        </BoostPayFormWrapper>
        <FullScreenModal open={this.state.isErrorModalOpen}>
          <BoostModalContain textAlign={"center"}>
            <PaymentErrorModalText hideModal={this.hideModal} />
          </BoostModalContain>
        </FullScreenModal>
        <FullScreenModal open={this.state.isSuccessModalOpen}>
          <BoostModalContain>
            <PaymentSuccessCardModalText
              newsroomName={this.props.newsroomName}
              usdToSpend={this.props.usdToSpend}
              handlePaymentSuccess={this.props.handlePaymentSuccess}
            />
          </BoostModalContain>
        </FullScreenModal>
      </form>
    );
  }

  private hideModal = () => {
    this.setState({ isErrorModalOpen: false, supportDisabled: false, paymentProcessing: false });
  };

  private handleOnBlur = (event: any) => {
    const state = event.target.id;
    const value = event.target.value;

    switch (state) {
      case "email":
        const validEmail = isValidEmail(value);
        this.setState({ email: value, validEmail });
        break;
      case "name":
        const validName = value !== "";
        this.setState({ name: value, validName });
        break;
      case "country":
        const validCountry = value !== "";
        this.setState({ country: value, validCountry });
        break;
      case "zip":
        const validPostalCode = this.isValidPostalCode(value);
        this.setState({ postalCode: value, validPostalCode });
        break;
      default:
        break;
    }

    this.handleEnableSubmit();
  };

  private isValidPostalCode = (inputPostalCode: string) => {
    const postalCode = inputPostalCode.toString().trim();
    const usa = /^[0-9]{5}(?:-[0-9]{4})?$/;
    const can = /^[ABCEGHJKLMNPRSTVXY]\d[ -]?\d[A-Za-z]\d$/;
    const gbr = /^[A-Z]{1,2}[0-9]{1,2} ?[0-9][A-Z]{2}$/i;

    switch (this.state.country) {
      case "USA":
        return usa.test(postalCode);
      case "CAN":
        return can.test(postalCode);
      case "GBR":
        return gbr.test(postalCode);
      default:
        return true;
    }
  };

  private handleOnBlurStripe = () => {
    const stripeElements = document.querySelectorAll(".StripeElement");

    stripeElements.forEach(element => {
      const id = element.id;
      const classList = element.classList;
      if (classList.contains("StripeElement--invalid")) {
        this.isStripeElementValid(id, false);
      } else {
        this.isStripeElementValid(id, true);
      }
    });
  };

  private isStripeElementValid = (element: string, valid: boolean) => {
    switch (element) {
      case "card-number":
        this.setState({ validCardNumber: valid });
        break;
      case "card-expiry":
        this.setState({ validCardExpiry: valid });
        break;
      case "card-cvc":
        this.setState({ validCardCVC: valid });
        break;
      default:
        break;
    }

    this.handleEnableSubmit();
  };

  private handleEnableSubmit = () => {
    if (
      !this.state.validEmail ||
      !this.state.validName ||
      !this.state.validCountry ||
      !this.state.validPostalCode ||
      !this.state.validCardNumber ||
      !this.state.validCardExpiry ||
      !this.state.validCardCVC
    ) {
      this.setState({ supportDisabled: true });
    } else {
      this.setState({ supportDisabled: false });
    }
  };

  private async handleSubmit(): Promise<void> {
    this.setState({ paymentProcessing: true });
    if (this.props.stripe) {
      try {
        const token = await this.props.stripe.createToken({
          name: this.state.name,
          address_country: this.state.country,
          address_zip: this.state.postalCode,
        });
        await this.props.savePayment({
          variables: {
            postID: this.props.boostId,
            input: {
              paymentToken: JSON.stringify(token),
              amount: this.props.usdToSpend,
              currencyCode: "usd",
              emailAddress: this.state.email,
            },
          },
        });
        this.setState({ isSuccessModalOpen: true });
      } catch (err) {
        console.error(err);
        this.setState({ isErrorModalOpen: true });
      }
    }
  }
}

export default injectStripe(BoostPayFormStripe);
