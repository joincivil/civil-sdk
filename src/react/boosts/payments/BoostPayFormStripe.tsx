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
import { colors, fonts } from "@joincivil/components";
import { isValidEmail } from "@joincivil/utils";
import {
  BoostFlexStart,
  BoostPayFormWrapper,
  SubmitInstructions,
  SubmitWarning,
  BoostButton,
} from "../BoostStyledComponents";
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
  margin: 20px 0;
  max-width: 575px;
  width: 100%;

  label {
    display: block;
    margin-bottom: 5px;
    width: 100%;
  }
`;

const StripeCardInput = styled.input`
  \border: ${(props: BoostPayFormStripeStyleStates) =>
    props.valid ? "1px solid " + colors.accent.CIVIL_GRAY_3 : "1px solid " + colors.accent.CIVIL_RED};
  border-radius: 2px;
  padding: 10px;
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

const StripeFlex = styled.div`
  display: flex;
  margin-bottom: 10px;

  div {
    width: 260px;

    &:first-of-type {
      margin-right: 15px;
      width: 170px;
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
    padding: 10px;
    width: 300px;

    &::-ms-expand {
      display: none;
    }

    &:hover {
      border-color: ${colors.accent.CIVIL_BLUE};
    }

    &:focus {
      box-shadow: 0 0 1px 1px ${colors.accent.CIVIL_BLUE};
      outline: none;
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
  complete: boolean;
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
      complete: false,
    };

    this.handleChangeEmail = debounce(this.handleChangeEmail.bind(this), 500);
    this.handleChangeName = debounce(this.handleChangeName.bind(this), 500);
    this.handleChangeCountry = debounce(this.handleChangeCountry.bind(this), 500);
    this.handleChangePostal = debounce(this.handleChangePostal.bind(this), 500);
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
              <StripeCardInput
                valid={this.state.validEmail}
                id="email"
                name="email"
                type="email"
                onChange={() => this.handleChangeEmail(event)}
                required
              />
            </StripeCardEmailWrap>
            <StripeCardInfoWrap>
              <label>Card information</label>
              <CardNumberElement />
              <StripeFlex>
                <CardExpiryElement />
                <CardCvcElement />
              </StripeFlex>
            </StripeCardInfoWrap>
            <StripeUserInfoWrap>
              <label>Name on card</label>
              <StripeCardInput
                valid={this.state.validName}
                id="name"
                name="name"
                onChange={() => this.handleChangeName(event)}
                required
              />
              <label>Country or region</label>
              <StripeSelect valid={this.state.validCountry} id="country">
                <select name="country" onChange={() => this.handleChangeCountry(event)}>
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

              {postalCodeVisible && (
                <>
                  <label>Zip/Postal Code</label>
                  <StripeCardInput
                    valid={this.state.validPostalCode}
                    id="zip"
                    name="zip"
                    onChange={() => this.handleChangePostal(event)}
                  />
                </>
              )}
            </StripeUserInfoWrap>
          </StripeWrapper>
        </BoostPayOption>

        <BoostPayFormWrapper>
          <BoostFlexStart>
            <SubmitInstructions>
              All proceeds of the Boost go directly to the newsroom minus Stripe processing fees. If a Boost goal is not
              met, the proceeds will still go to fund the selected newsroom.
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
        </BoostPayFormWrapper>
      </form>
    );
  }

  private handleChangeEmail = (event: any) => {
    this.setState({ email: event.target.value });
  };

  private handleChangeName = (event: any) => {
    this.setState({ name: event.target.value });
  };

  private handleChangeCountry = (event: any) => {
    this.setState({ country: event.target.value });
  };

  private handleChangePostal = (event: any) => {
    this.setState({ postalCode: event.target.value });
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
      if (this.props.stripe) {
        try {
          const token = await this.props.stripe
            .createToken({
              name: this.state.name,
              address_country: this.state.country,
              address_zip: this.state.postalCode,
            })
            .then(({ token }) => {
              console.log(token);
            });
          await this.props.savePayment({
            variables: {
              postID: this.props.boostId,
              input: { paymentToken: token, amount: this.props.usdToSpend, currencyCode: "usd" },
            },
          });
        } catch (err) {
          console.error(err);
        }
      }
    }
  }
}

export default injectStripe(BoostPayFormStripe);
