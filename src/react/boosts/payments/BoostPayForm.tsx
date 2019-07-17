import * as React from "react";
// import { TextInput, Checkbox } from "@joincivil/components";
import { BoostFlexStart } from "../BoostStyledComponents";
import styled from "styled-components";
import {
  colors,
  fonts,
  mediaQueries,
  TransactionButton,
  TransactionButtonModalContentComponentsProps,
  progressModalStates,
  CivilContext,
  ICivilContext,
} from "@joincivil/components";
import { EthAddress, TwoStepEthTransaction, TxHash } from "@joincivil/core";
import { PaymentInProgressModalText, PaymentSuccessModalText, PaymentErrorModalText } from "../BoostTextComponents";
import { MutationFunc } from "react-apollo";
import { urlConstants } from "../../urlConstants";

export interface BoostPayFormProps {
  boostId: string;
  etherToSpend: number;
  usdToSpend: number;
  newsroomName: string;
  paymentAddr: EthAddress;
  amount: number;
  savePayment: MutationFunc;
  handlePaymentSuccess(): void;
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

  button {
    margin-bottom: 20px;

    ${mediaQueries.MOBILE} {
      width: 100%;
    }
  }

  ${mediaQueries.MOBILE} {
    margin: 0;
  }
`;

const SubmitInstructions = styled.p`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  margin: 0 30px 0 0;

  ${mediaQueries.MOBILE} {
    border-bottom: 1px solid ${colors.accent.CIVIL_GRAY_4};
    font-size: 14px;
    line-height: 24px;
    margin: 0 0 30px;
    padding: 0 0 30px;
  }
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

  ${mediaQueries.MOBILE} {
    font-size: 12px;
    line-height: 22px;
  }
}`;

/*
const BoostPayFormContain = styled.div`
  margin-bottom: 30px;
}`;

const CheckboxLabel = styled.span`
  margin-left: 10px;
}`;
*/

export class BoostPayForm extends React.Component<BoostPayFormProps, BoostPayFormState> {
  public static contextType: React.Context<ICivilContext> = CivilContext;
  public context!: React.ContextType<typeof CivilContext>;

  constructor(props: BoostPayFormProps) {
    super(props);
    this.state = {
      name: "",
      comment: "",
      checked: false,
    };
  }

  public render(): JSX.Element {
    const PAY_MODAL_COMPONENTS: TransactionButtonModalContentComponentsProps = {
      [progressModalStates.IN_PROGRESS]: <PaymentInProgressModalText />,
      [progressModalStates.SUCCESS]: (
        <PaymentSuccessModalText
          newsroomName={this.props.newsroomName}
          etherToSpend={this.props.etherToSpend}
          usdToSpend={this.props.usdToSpend}
          handlePaymentSuccess={this.props.handlePaymentSuccess}
        />
      ),
      [progressModalStates.ERROR]: <PaymentErrorModalText />,
    };

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
              All proceeds of the Boost go directly to the newsroom. If a Boost goal is not met, the proceeds will still
              go to fund the selected newsroom. Refunds are not possible.
            </SubmitInstructions>
            <div>
              <TransactionButton
                transactions={[
                  {
                    transaction: this.sendPayment,
                    postTransaction: this.handleTransactionHash,
                  },
                ]}
                modalContentComponents={PAY_MODAL_COMPONENTS}
              >
                Support this Boost
              </TransactionButton>
              <SubmitWarning>
                By sending a Boost, you agree to Civil’s <a href={urlConstants.TERMS}>Terms of Use</a> and{" "}
                <a href={urlConstants.PRIVACY_POLICY}>Privacy Policy</a>. Civil does not charge any fees for this
                transaction. There are small fees charged by the Ethereum network.
              </SubmitWarning>
            </div>
          </BoostFlexStart>
        </form>
      </BoostPayFormWrapper>
    );
  }

  private sendPayment = async (): Promise<TwoStepEthTransaction<any> | void> => {
    // @TODO/loginV2 migrate away from window.ethereum
    if (this.context.civil && (window as any).ethereum) {
      const amount = this.context.civil.toBigNumber(this.props.amount);

      return this.context.civil.simplePayment(this.props.paymentAddr, amount);
    } else {
      // TODO: pop dialog telling them to install metamask/web3
    }
  };

  private handleTransactionHash = async (txHash: TxHash) => {
    await this.props.savePayment({
      variables: {
        postID: this.props.boostId,
        input: { transactionID: txHash },
      },
    });
  };

  /*private onClick = (): void => {
    this.setState({ checked: !this.state.checked });
  };*/
}
