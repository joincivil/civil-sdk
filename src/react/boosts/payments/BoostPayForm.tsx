import * as React from "react";
// import { TextInput, Checkbox } from "@joincivil/components";
import { BoostPayFormTitle, BoostFlexStart, BoostButton } from "../BoostStyledComponents";
import styled from "styled-components";
import { colors, fonts } from "@joincivil/components";

export interface BoostPayFormProps {
  amount?: number;
}

export interface BoostPayFormState {
  name?: string;
  comment?: string;
  checked: boolean;
  error?: string;
}

const BoostPayFormWrapper = styled.div`
  display: block;
  font-family: ${fonts.SANS_SERIF};
  margin: 0 0 0 20px;
`;

const SubmitInstructions = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  margin: 0 30px 0 0;
}`;

const SubmitWarning = styled.p`
  font-size: 12px;
  font-weight: 500;
  line-height: 16px;
  text-decoration: none;

  a {
    color: ${colors.accent.CIVIL_BLUE};
    text-decoration: underline;
  }
}`;

const BoostPayFormContain = styled.div`
  margin-bottom: 30px;
}`;

const CheckboxLabel = styled.span`
  margin-left: 10px;
}`;

export class BoostPayForm extends React.Component<BoostPayFormProps, BoostPayFormState> {
  constructor(props: BoostPayFormProps) {
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
              Once your Boost is sent, we’ll be sending you a confirmation email if selected of your completed
              transaction. All proceeds of the Boost go directly to the newsroom. If a Boost goal is not met, the
              proceeds will still go to fund the selected newsroom.
            </SubmitInstructions>
            <div>
              <BoostButton>Support this Boost</BoostButton>
              <SubmitWarning>
                Refunds are not possible. Civil does not charge any fees for this transaction. There are small fees
                charged by the Ethereum network. By sending a Boost, you agree to Civil’s Terms of Use and Privacy
                Policy. Depending on your selection, your email and comment may be visible to the newsroom.
              </SubmitWarning>
            </div>
          </BoostFlexStart>
        </form>
      </BoostPayFormWrapper>
    );
  }

  /*private onClick = (): void => {
    this.setState({ checked: !this.state.checked });
  };*/
}
