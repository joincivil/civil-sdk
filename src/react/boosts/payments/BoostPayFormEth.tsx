import * as React from "react";
import { isValidEmail } from "@joincivil/utils";
import {
  BoostFlexStart,
  BoostPayFormWrapper,
  SubmitInstructions,
  SubmitWarning,
  BoostUserInfoForm,
  BoostInput,
} from "../BoostStyledComponents";
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
  savePayment: MutationFunc;
  handlePaymentSuccess(): void;
}

export interface BoostPayFormEthState {
  email: string;
  validEmail: boolean;
  fromAddr?: EthAddress;
}

export class BoostPayFormEth extends React.Component<BoostPayFormEthProps, BoostPayFormEthState> {
  public static contextType: React.Context<ICivilContext> = CivilContext;
  public context!: React.ContextType<typeof CivilContext>;

  constructor(props: BoostPayFormEthProps) {
    super(props);
    this.state = {
      email: "",
      validEmail: true,
    };
  }

  public async componentDidMount(): Promise<void> {
    const civil = this.context.civil;
    if (civil) {
      const account = await civil.accountStream.first().toPromise();
      this.setState({ fromAddr: account });
    }
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
          <BoostUserInfoForm>
            <label>Email (optional)</label>
            <BoostInput
              valid={this.state.validEmail}
              id="email"
              name="email"
              type="email"
              maxLength={254}
              onChange={() => this.handleOnChange(event)}
              required
            />
          </BoostUserInfoForm>
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

  private handleOnChange = (event: any) => {
    const state = event.target.id;
    const value = event.target.value;

    switch (state) {
      case "email":
        const validEmail = isValidEmail(event.target.value);
        this.setState({ email: value, validEmail });
        break;
      default:
        break;
    }
  };

  private sendPayment = async (): Promise<TwoStepEthTransaction<any> | void> => {
    // @TODO/loginV2 migrate away from window.ethereum
    if (this.context.civil && (window as any).ethereum) {
      const amount = this.context.civil.toBigNumber(this.props.etherToSpend);

      return this.context.civil.simplePayment(this.props.paymentAddr, amount);
    } else {
      // TODO: pop dialog telling them to install metamask/web3
    }
  };

  private handleTransactionHash = async (txHash: TxHash) => {
    await this.props.savePayment({
      variables: {
        postID: this.props.boostId,
        input: {
          transactionID: txHash,
          paymentAddress: this.props.paymentAddr,
          fromAddress: this.state.fromAddr,
          amount: this.props.etherToSpend,
          usdAmount: this.props.usdToSpend.toString(),
          emailAddress: this.state.email,
        },
      },
    });
  };
}
