import * as React from "react";
// import { TextInput, Checkbox } from "@joincivil/components";
import { BoostFlexStart, BoostPayFormWrapper, SubmitInstructions, SubmitWarning, BoostButton } from "../BoostStyledComponents";
import { MutationFunc } from "react-apollo";
import { urlConstants } from "../../urlConstants";

export interface BoostPayFormStripeProps {
  boostId: string;
  newsroomName: string;
  amount: number;
  savePayment: MutationFunc;
  handlePaymentSuccess(): void;
}

export interface BoostPayFormStripeState {
  name?: string;
  comment?: string;
  checked: boolean;
  error?: string;
}

export class BoostPayFormStripe extends React.Component<BoostPayFormStripeProps, BoostPayFormStripeState> {
  constructor(props: BoostPayFormStripeProps) {
    super(props);
    this.state = {
      name: "",
      comment: "",
      checked: false,
    };
  }

  public render(): JSX.Element {
    return (
      <BoostPayFormWrapper>
        <form>
          {/*<BoostPayFormContain>
            <BoostPayFormTitle>Your name (optional)</BoostPayFormTitle>
            <TextInput name="userName" />
            <BoostPayFormTitle>Include a comment (optional)</BoostPayFormTitle>
            <TextInput name="userComment" />
            <Checkbox onClick={this.onClick} checked={this.state.checked} id={""} />
            <CheckboxLabel>Email me about progress of this Boost</CheckboxLabel>
          </BoostPayFormContain>*/}
          <BoostFlexStart>
            <SubmitInstructions>
              All proceeds of the Boost go directly to the newsroom minus Stripe processing fees. If a Boost goal is not
              met, the proceeds will still go to fund the selected newsroom.
            </SubmitInstructions>
            <div>
              <BoostButton>Support this Boost</BoostButton>
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
    );
  }

  /*private sendPayment = () => {
    console.log("send payment");
  };

  private onClick = (): void => {
    this.setState({ checked: !this.state.checked });
  };*/
}
