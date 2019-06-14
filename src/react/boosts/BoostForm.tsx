import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, mediaQueries, Button, buttonSizes, CurrencyInput, InputIcon, TextInput, TextareaInput, QuestionToolTip, defaultNewsroomImgUrl } from "@joincivil/components";
import { Mutation, MutationFunc } from "react-apollo";
import { boostMutation } from "./queries";
import { BoostData } from "./types";
import { BoostImg, BoostWrapper, BoostWrapperFullWidthHr, BoostFormTitle, BoostDescriptionTable, BoostPayFormTitle, BoostSmallPrint } from "./BoostStyledComponents";

const PageWrapper = styled.div`
  color: ${colors.primary.CIVIL_GRAY_0};
  font-size: 14px;
  font-weight: normal;
  margin: auto;
  max-width: 880px;
  padding: 50px 20px 20px;

  p {
    margin-top: 15px;
  }

  a {
    color: ${colors.accent.CIVIL_PURPLE};
  }

  input[disabled] {
    background: white;
    color: ${colors.primary.CIVIL_GRAY_2};
  }

  &:after {
    content: "";
    display: table;
    clear: both;
  }
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: 900;
  line-height: 33px;
`;
const Error = styled.span`
  color: red;
`;

const NewsroomDetailRow = styled.div`
  display: flex;
  justify-content: space-between;
  ${mediaQueries.MOBILE} {
    display: block;
  }
`;
const NewsroomDetailCell = styled.div`
  flex-grow: 1;
  margin-right: 24px;
  &:last-child {
    margin-right: 0;
  }
  ${mediaQueries.MOBILE} {
    margin-right: 0;
  }
`;

const ItemsTableWrapper = styled(BoostDescriptionTable)`
  table td {
    padding-top: 0;
    padding-bottom: 0;
    &:last-child {
      padding-right: 0;
    }
  }
  tfoot tr:first-child td {
    padding-top: 36px;
  }
`;
const ItemLink = styled.a`
  font-size: 16px;
  font-weight: 500;
`;
const RemoveItem = styled(ItemLink)`
  position: relative;
  top: -6px;
`;
const ItemNameInput = styled(TextInput)`
  max-width: 420px;
`;
const ItemCostHeaderCell = styled.th`
  && {
    text-align: right;
  }
`;
const ItemCostCell = styled.td`
  text-align: right;
`;
const StyledCurrencyInput = styled(CurrencyInput)`
  position: relative;
  margin-left: auto;
  width: 100px;
  & input[disabled] {
    color: ${colors.primary.CIVIL_GRAY_0};
  }

  ${InputIcon as any} {
    top: 15px;
    left: 12px;
    pointer-events: none;
    position: absolute;
    z-index: 2;
  }
  input {
    padding-left: 22px;
  }
`;
const ItemsAmountNote = styled.p`
  font-style: italic;
  white-space: nowrap;
`;

const EndDateInput = styled.input`
  margin-right: 32px;
  padding: 10px;
`;
const EndDateNotice = styled.p`
  display: inline-block;
`;

const LaunchDisclaimer = styled(BoostSmallPrint)`
  display: inline-block;
  float: left;
`;
const LaunchButton = styled(Button)`
  background-color: ${colors.accent.CIVIL_PURPLE};
  height: 48px;
  float: right;
  text-transform: none;
  width: 180px;
`;

export interface BoostFormProps {
  newsroomAddress: string;
  newsroomName: string;
  newsroomListingUrl: string;
  newsroomWallet: string;
  newsroomLogoUrl?: string;
  newsroomUrl?: string;
  newsroomTagline?: string;
}
export interface BoostFormState {
  boost: Partial<BoostData>;
  dateEndInput?: string;
  boostId?: string;
  loading?: boolean;
  error?: string;
}

export class BoostForm extends React.Component<BoostFormProps, BoostFormState> {
  constructor(props: BoostFormProps) {
    super(props);
    this.state = {
      boost: {
        about: props.newsroomTagline,
        items: [{ item: "", cost: 0 }],
      },
    };
  }
  public render(): JSX.Element {
    return (
      <PageWrapper>
        <Title>Let's get you started</Title>
        <p>Create and launch your Boost. Boosts will be displayed on the Boost directory in addition to your Registry listing.</p>

        <Mutation mutation={boostMutation}>
          {createBoost => {
            return (
              <form onSubmit={async event => this.handleSubmit(event, createBoost)}>
                <BoostWrapper>
                  <BoostImg>
                    <img
                      src={this.props.newsroomLogoUrl || defaultNewsroomImgUrl as any as string}
                      onError={e => {
                        (e.target as any).src = defaultNewsroomImgUrl;
                      }}
                    />
                  </BoostImg>

                  <NewsroomDetailRow>
                    <NewsroomDetailCell>
                      <BoostFormTitle>
                        Newsroom Name
                        <QuestionToolTip explainerText="You can create a Boost for your newsroom only." />
                      </BoostFormTitle>
                      <TextInput name="newsroomName" value={this.props.newsroomName} disabled />
                    </NewsroomDetailCell>
                    <NewsroomDetailCell>
                      <BoostFormTitle>Newsroom URL</BoostFormTitle>
                      <TextInput name="newsroomUrl" value={this.props.newsroomUrl} disabled />
                    </NewsroomDetailCell>
                    <NewsroomDetailCell>
                      <BoostFormTitle>Registry Listing URL</BoostFormTitle>
                      <TextInput name="newsroomListingUrl" value={this.props.newsroomListingUrl} disabled />
                    </NewsroomDetailCell>
                  </NewsroomDetailRow>

                  <BoostFormTitle>
                    Newsroom Wallet
                    <QuestionToolTip explainerText="This is your newsroom wallet address where you will receive the funds from your Boost." />
                  </BoostFormTitle>
                  <TextInput name="newsroomWallet" value={this.props.newsroomWallet} disabled />
                  <p>Funds from your Boost will be deposited into the Newsroom Wallet. A Newsroom Officer will be able to widthdraw from the newsroom wallet and either deposit or exchange them into other currencies. <a href="#TODO">Learn more</a></p>

                  <BoostWrapperFullWidthHr />

                  <BoostFormTitle>Give your Boost a title</BoostFormTitle>
                  <p>What do you need? Start with an action verb to tell people how they can help. For example: “Help [newsroom] do [thing].”</p>
                  <TextareaInput name="title" value={this.state.boost.title} onChange={this.onInputChange} />

                  <BoostFormTitle>Describe your Boost</BoostFormTitle>
                  <p>What are you raising funds to do, and why you need help. Tell people why they should be excited to support your Boost.</p>
                  <TextareaInput name="why" value={this.state.boost.why} onChange={this.onInputChange} />

                  <BoostFormTitle>Describe what the outcome will be</BoostFormTitle>
                  <p>Tell the community what to expect at the end of the fundraising time. You can be specific, but be clear and brief.</p>
                  <TextareaInput name="what" value={this.state.boost.what} onChange={this.onInputChange} />

                  <BoostFormTitle>Describe your Newsroom</BoostFormTitle>
                  <p>What is your Newsroom’s mission? Tell the community who you are.</p>
                  <TextareaInput name="about" value={this.state.boost.about} onChange={this.onInputChange} />

                  {this.renderItems()}

                  <BoostFormTitle>
                    End date
                    <QuestionToolTip explainerText="All proceeds go directly to the Newsroom. There are small fees charged by the Ethereum network." />
                  </BoostFormTitle>
                  <EndDateInput type="date" name="dateEnd" value={this.state.dateEndInput} onChange={this.onDateEndInputChange} />
                  <EndDateNotice>Your Boost will end at 11:59PM on the date selected.</EndDateNotice>
                </BoostWrapper>

                <LaunchDisclaimer>By creating a Boost, you agree to Civil’s <a href="#TODO">Terms of Use and Privacy Policy</a>.</LaunchDisclaimer>
                <LaunchButton size={buttonSizes.MEDIUM} type="submit" disabled={this.state.loading || !!this.state.boostId}>Launch Boost</LaunchButton>

                {/*@TODO/tobek Temporary feedback until we implement success modal*/}
                <div style={{ clear: "both", float: "right", marginTop: 10 }}>
                  {this.state.loading && "loading..."}
                  {this.state.error && (<Error>{this.state.error}</Error>)}
                  {this.state.boostId && (<>
                    Boost created successfully! <a href={"/boosts/" + this.state.boostId + "?feature-flag=boosts-mvp"}>View boost.</a>
                  </>)}
                </div>
              </form>
            );
          }}
        </Mutation>
      </PageWrapper>
    );
  }

  private renderItems(): JSX.Element {
    return (
      <ItemsTableWrapper>
        <BoostFormTitle>
          List the expenses this Boost can help cover
          <QuestionToolTip explainerText="Itemizing your costs helps educate your audience about the costs of your Boost needs and the running your newsroom." />
        </BoostFormTitle>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <ItemCostHeaderCell>Cost</ItemCostHeaderCell>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.boost.items && this.state.boost.items.map((item: any, i: number) => (
              <tr key={i}>
                <td>
                  <ItemNameInput name="item" value={this.state.boost.items![i].item} onChange={this.onItemInputChange.bind(this, i)} />
                </td>
                <ItemCostCell>
                  <StyledCurrencyInput icon={(<>$</>)} name="cost" type="number" value={"" + (this.state.boost.items![i].cost || "")} onChange={this.onItemInputChange.bind(this, i)} />
                </ItemCostCell>
                <td>
                  {i > 0 && (<ItemLink href="#" onClick={(e) => this.removeItem(e, i)}>x</ItemLink>)}
                </td>
              </tr>
            ))}
            <tr>
              <td>
                <ItemLink href="#" onClick={this.addItem}>Add item</ItemLink>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <td>
                <BoostFormTitle>Boost Goal</BoostFormTitle>
                <p>Your Boost Goal is the amount you would like to raise. If you Boost does not reach it’s amount goal by the end date, the funds sent by supporters will still be collected into your Newsroom Wallet. Once the Boost will ends, you’ll be able to widthdrawl and either dispense or exchange the funds to your wallet or exchange for another currency.</p>
              </td>
              <ItemCostCell>
                <BoostPayFormTitle>Total amount</BoostPayFormTitle>
                <StyledCurrencyInput icon={(<>$</>)} name="goalAmount" value={"" + (this.state.boost.goalAmount || "")} disabled />
                <ItemsAmountNote>
                  Proceeds will be in ETH
                  <QuestionToolTip explainerText="We recommend periods between 14 and 60 days." />
                </ItemsAmountNote>
                <ItemsAmountNote>Civil does not collect any fees.</ItemsAmountNote>
              </ItemCostCell>
              <td>
              </td>
            </tr>
          </tfoot>
        </table>
      </ItemsTableWrapper>
    );
  }

  private onInputChange = (name: string, val: string) => {
    this.setState({
      boost: {
        ...this.state.boost,
        [name]: val,
      },
    })
  };

  private onDateEndInputChange = (event: any) => {
    event.preventDefault();
    this.setState({
      dateEndInput: event.target.value,
      boost: {
        ...this.state.boost,
        dateEnd: new Date(event.target.value),
      },
    })
  };

  private onItemInputChange = (i: number, name: "cost" | "item", val: string) => {
    const items = this.state.boost.items!;

    let goalAmount = this.state.boost.goalAmount || 0;
    if (name === "cost") {
      const oldVal = items[i][name] || 0;
      items[i][name] = parseFloat(val);
      goalAmount = goalAmount - oldVal + items[i][name];
    } else {
      items[i][name] = val;
    }

    this.setState({
      boost: {
        ...this.state.boost,
        goalAmount,
        items,
      },
    });
  };

  private addItem = (event: React.MouseEvent) => {
    event.preventDefault();
    this.setState({
      boost: {
        ...this.state.boost,
        items: this.state.boost.items!.concat({} as any),
      },
    });
  }

  private removeItem = (event: React.MouseEvent, i: number) => {
    event.preventDefault();
    this.setState({
      boost: {
        ...this.state.boost,
        goalAmount: (this.state.boost.goalAmount || 0) - (this.state.boost.items![i].cost || 0),
        items: this.state.boost.items!.slice(0, i).concat(this.state.boost.items!.slice(i+1)),
      },
    });
  }

  private async handleSubmit(event: React.FormEvent, mutation: MutationFunc): Promise<void> {
    event.preventDefault();
    const boost = this.state.boost;
    this.setState({ loading: true, error: undefined });
    try {
      const response = await mutation({
        variables: {
          input: {
            channelID: this.props.newsroomAddress, // @TODO/tobek Is this the right field to use?
            currencyCode: "usd", // @TODO/tobek Is this right? Why is it required, should endpoint default to usd?
            title: boost.title,
            why: boost.why,
            what: boost.what,
            about: boost.about,
            goalAmount: boost.goalAmount,
            items: boost.items,
            dateEnd: boost.dateEnd && boost.dateEnd.toISOString(),
          },
        },
      });
      if (response && response.data && response.data.postsCreateBoost) {
        this.setState({
          boostId: response.data.postsCreateBoost.id,
        });
      } else {
        this.setState({ error: "Error: Unexpected or missing response data" });
      }
    } catch(error) {
      this.setState({ error: error.toString() });
    }

    this.setState({ loading: false });
  }
}
