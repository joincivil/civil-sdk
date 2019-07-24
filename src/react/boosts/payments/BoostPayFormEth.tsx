import * as React from "react";
// import { TextInput, Checkbox } from "@joincivil/components";
import { BoostFlexStart, BoostPayFormWrapper, SubmitInstructions, SubmitWarning } from "../BoostStyledComponents";
import {
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

export interface BoostPayFormEthProps {
  boostId: string;
  etherToSpend: number;
  usdToSpend: number;
  newsroomName: string;
  paymentAddr: EthAddress;
  amount: number;
  savePayment: MutationFunc;
  handlePaymentSuccess(): void;
}

export interface BoostPayFormEthState {
  name?: string;
  comment?: string;
  checked: boolean;
  error?: string;
}

export class BoostPayFormEth extends React.Component<BoostPayFormEthProps, BoostPayFormEthState> {
  public static contextType: React.Context<ICivilContext> = CivilContext;
  public context!: React.ContextType<typeof CivilContext>;

  constructor(props: BoostPayFormEthProps) {
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
                    handleTransactionHash: this.handleTransactionHash,
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
