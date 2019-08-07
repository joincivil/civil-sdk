import * as React from "react";
import { MutationFunc } from "react-apollo";
import { debounce } from "lodash";
import {
  injectStripe,
  ReactStripeElements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
} from "react-stripe-elements";
import styled from "styled-components";
import { colors, fonts, FullScreenModal } from "@joincivil/components";
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

interface BoostPayFormStripeStyleStates {
  valid?: boolean;
}

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

const StripeInput = styled.input`
  border: ${(props: BoostPayFormStripeStyleStates) =>
    props.valid ? "1px solid " + colors.accent.CIVIL_GRAY_3 : "1px solid " + colors.accent.CIVIL_RED};
  border-radius: 2px;
  padding: 10px 12px;

  &:focus {
    border-color: ${colors.accent.CIVIL_BLUE};
    outline: none;
  }
`;

const StripeCardInfoWrap = styled.div`
  width: 100%;

  .StripeElement {
    border: 1px solid ${colors.accent.CIVIL_GRAY_3};
    border-radius: 2px;
    margin-bottom: 10px;
    padding: 12px;
  }
`;

const StripeCardInfoFlex = styled.div`
  display: flex;
  margin-bottom: 10px;

  div {
    width: 130px;

    &:first-of-type {
      margin-right: 15px;
      width: 170px;
    }
  }
`;

const StripeUserInfoWrap = styled.div`
  margin-bottom: 10px;
  width: 100%;

  input {
    margin-bottom: 20px;
    width: 300px;
  }
`;

const StripeUserInfoFlex = styled.div`
  display: flex;
  margin-bottom: 10px;

  & > div {
    &:first-of-type {
      margin-right: 15px;
    }

    &:last-of-type {
      width: 130px;

      ${StripeInput} {
        width: 100%;
      }
    }
  }
`;

const StripeSelect = styled.div`
  margin-bottom: 20px;

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: ${colors.basic.WHITE};
    border: ${(props: BoostPayFormStripeStyleStates) =>
      props.valid ? "1px solid " + colors.accent.CIVIL_GRAY_3 : "1px solid " + colors.accent.CIVIL_RED};
    border-radius: 2px;
    display: block;
    font-family: ${fonts.SANS_SERIF};
    line-height: 16px;
    margin: 0;
    padding: 11px 12px 12px;
    width: 300px;

    &::-ms-expand {
      display: none;
    }

    &:hover {
      cursor: pointer;
    }

    &:focus {
      border-color: ${colors.accent.CIVIL_BLUE};
      outline: none;
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
  isSuccessModalOpen: boolean;
  isErrorModalOpen: boolean;
  supportDisabled: boolean;
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
      supportDisabled: false,
    };

    this.handleOnChange = debounce(this.handleOnChange.bind(this), 500);
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
              <StripeInput
                valid={this.state.validEmail}
                id="email"
                name="email"
                type="email"
                maxLength={254}
                onChange={() => this.handleOnChange(event)}
                required
              />
            </StripeCardEmailWrap>
            <StripeCardInfoWrap>
              <label>Card information</label>
              <CardNumberElement />
              <StripeCardInfoFlex>
                <CardExpiryElement />
                <CardCvcElement />
              </StripeCardInfoFlex>
            </StripeCardInfoWrap>
            <StripeUserInfoWrap>
              <label>Name on card</label>
              <StripeInput
                valid={this.state.validName}
                id="name"
                name="name"
                onChange={() => this.handleOnChange(event)}
                required
              />
              <StripeUserInfoFlex>
                <div>
                  <label>Country or region</label>
                  <StripeSelect valid={this.state.validCountry}>
                    <select id="country" name="country" onChange={() => this.handleOnChange(event)}>
                      <option value=""></option>
                      {Countries.map((country: any, i: number) => {
                        return (
                          <option key={i} value={country.value}>
                            {country.name}
                          </option>
                        );
                      })}
                    </select>
                  </StripeSelect>
                </div>
                <div>
                  {postalCodeVisible && (
                    <>
                      <label>Zip/Postal Code</label>
                      <StripeInput
                        valid={this.state.validPostalCode}
                        id="zip"
                        name="zip"
                        maxLength={12}
                        onChange={() => this.handleOnChange(event)}
                      />
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
                {this.state.supportDisabled ? "Payment processing..." : "Support this Boost"}
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
    this.setState({ isErrorModalOpen: false, supportDisabled: false });
  };

  private handleOnChange = (event: any) => {
    const state = event.target.id;
    const value = event.target.value;

    switch (state) {
      case "email":
        this.setState({ email: value });
        break;
      case "name":
        this.setState({ name: value });
        break;
      case "country":
        this.setState({ country: value });
        break;
      case "zip":
        this.setState({ postalCode: value });
        break;
      default:
        break;
    }
  };

  private isValidPostalCode = () => {
    const postalCode = this.state.postalCode.toString().trim();
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

  private async handleSubmit(): Promise<void> {
    const validEmail = isValidEmail(this.state.email);
    const validName = this.state.name !== "";
    const validCountry = this.state.country !== "";
    const validPostalCode = this.isValidPostalCode();

    if (!validEmail || !validName || !validCountry || !validPostalCode) {
      this.setState({ validEmail, validName, validCountry, validPostalCode });
    } else {
      this.setState({ supportDisabled: true });
      if (this.props.stripe) {
        try {
          const token = await this.props.stripe.createToken({
            name: this.state.name,
            address_country: this.state.country,
            address_zip: this.state.postalCode,
          });
          await this.props
            .savePayment({
              variables: {
                postID: this.props.boostId,
                input: {
                  paymentToken: token,
                  amount: this.props.usdToSpend,
                  currencyCode: "usd",
                  emailAddress: this.state.email,
                },
              },
            })
          this.setState({ isSuccessModalOpen: true });
        } catch (err) {
          console.error(err);
          this.setState({ isErrorModalOpen: true });
        }
      }
    }
  }
}

export default injectStripe(BoostPayFormStripe);
