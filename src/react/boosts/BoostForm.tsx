import * as React from "react";
import styled from "styled-components";
import {
  colors,
  mediaQueries,
  Button,
  buttonSizes,
  CurrencyInput,
  InputIcon,
  TextInput,
  TextareaInput,
  QuestionToolTip,
  defaultNewsroomImgUrl,
  LoadingMessage,
} from "@joincivil/components";
import { Query, Mutation, MutationFunc } from "react-apollo";
import { boostNewsroomQuery, boostMutation, editBoostMutation } from "./queries";
import { BoostData, BoostNewsroomData } from "./types";
import {
  BoostWrapper,
  BoostWrapperFullWidthHr,
  BoostFormTitle,
  BoostDescriptionTable,
  BoostPayFormTitle,
  BoostSmallPrint,
  BoostImgDiv,
} from "./BoostStyledComponents";
import { BoostImg } from "./BoostImg";

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
  margin-bottom: 15px;
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
const ItemNameInput = styled(TextInput)`
  max-width: 420px;
`;
const ItemCostHeader = styled.th`
  && {
    padding-right: 0;
  }
`;
const ItemCostHeaderText = styled.div`
  margin-left: auto;
  text-align: left;
  width: 100px;
`;
const ItemCostCell = styled.td`
  text-align: right;
`;
const StyledCurrencyInput = styled(CurrencyInput)`
  position: relative;
  margin-left: auto;
  width: 100px;

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
const TotalGoal = styled(StyledCurrencyInput)`
  & input[disabled] {
    color: ${colors.primary.CIVIL_GRAY_0};
  }
`;
const ItemsAmountNote = styled.div`
  font-style: italic;
  margin-top: 15px;
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
  height: 48px;
  float: right;
  text-transform: none;
  width: 190px;
`;

export interface BoostFormProps {
  newsroomData: BoostNewsroomData;
  newsroomAddress: string;
  newsroomListingUrl: string;
  newsroomLogoUrl?: string;
  newsroomTagline?: string;
  initialBoostData?: BoostData;
  editMode?: boolean;
}
export interface BoostFormState {
  boost: Partial<BoostData>;
  boostId?: string;
  loading?: boolean;
  error?: string;
}

export class BoostForm extends React.Component<BoostFormProps, BoostFormState> {
  constructor(props: BoostFormProps) {
    super(props);
    this.state = {
      boost: props.initialBoostData
        ? { ...props.initialBoostData }
        : {
            about: props.newsroomTagline,
            items: [{ item: "", cost: 0 }],
          },
    };
  }

  public render(): JSX.Element {
    return (
      <PageWrapper>
        {this.renderHeader()}

        <Query query={boostNewsroomQuery} variables={{ addr: this.props.newsroomAddress }}>
          {({ loading, error, data }) => {
            if (loading) {
              return (
                <BoostWrapper>
                  <LoadingMessage />
                </BoostWrapper>
              );
            } else if (error || !data) {
              console.error(`error querying newsroom data for ${this.props.newsroomAddress}:`, error, data);
              return (
                <Error>Error retrieving newsroom data: {error ? JSON.stringify(error) : "no listing data found"}</Error>
              );
            }

            if (!data.listing) {
              return (
                <BoostWrapper>
                  Your newsroom <b>{this.props.newsroomData.name}</b> has not yet applied to the Civil Registry. Please{" "}
                  <a href="/apply-to-registry">continue your newsroom application</a> and then, once you have applied
                  and your newsroom has been approved, you can return to create a Boost.
                </BoostWrapper>
              );
            }

            if (!data.listing.whitelisted) {
              return (
                <BoostWrapper>
                  Your newsroom <b>{this.props.newsroomData.name}</b> is not currently approved on the Civil Registry.
                  Please <a href="/dashboard/newsrooms">visit your newsroom dashboard</a> to check on the status of your
                  application. Once your newsroom is approved, you can return to create a Boost.
                </BoostWrapper>
              );
            }

            return this.renderForm();
          }}
        </Query>
      </PageWrapper>
    );
  }

  private renderHeader(): JSX.Element {
    if (this.props.editMode) {
      return (
        <>
          <Title>Edit Boost</Title>
          <p>
            Note that after a boost has been launched, only copy can be changed. Goal amounts and end date cannot be
            edited.
          </p>
        </>
      );
    }

    return (
      <>
        <Title>Let's get you started</Title>
        <p>
          Create and launch your Boost. Boosts will be displayed on the Boost directory in addition to your Registry
          listing.
        </p>
      </>
    );
  }

  private renderForm(): JSX.Element {
    return (
      <Mutation mutation={this.props.editMode ? editBoostMutation : boostMutation}>
        {mutation => {
          return (
            <form onSubmit={async event => this.handleSubmit(event, mutation)}>
              <BoostWrapper>
                <BoostImgDiv>
                  {this.props.newsroomLogoUrl ? (
                    <img
                      src={this.props.newsroomLogoUrl}
                      onError={e => {
                        (e.target as any).src = defaultNewsroomImgUrl;
                      }}
                    />
                  ) : (
                    <BoostImg charterUri={this.props.newsroomData.charter && this.props.newsroomData.charter.uri} />
                  )}
                </BoostImgDiv>

                <NewsroomDetailRow>
                  <NewsroomDetailCell>
                    <BoostFormTitle>
                      Newsroom Name
                      <QuestionToolTip explainerText="You can create a Boost for your newsroom only." />
                    </BoostFormTitle>
                    <TextInput name="newsroomName" value={this.props.newsroomData.name} disabled />
                  </NewsroomDetailCell>
                  <NewsroomDetailCell>
                    <BoostFormTitle>Newsroom URL</BoostFormTitle>
                    <TextInput name="newsroomUrl" value={this.props.newsroomData.url} disabled />
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
                <TextInput name="newsroomWallet" value={this.props.newsroomData.owner} disabled />
                <p>
                  Funds from your Boost will be deposited into the Newsroom Wallet. A Newsroom Officer will be able to
                  widthdraw from the newsroom wallet and either deposit or exchange them into other currencies.{" "}
                  <a href="#TODO">Learn more</a>
                </p>

                <BoostWrapperFullWidthHr />

                <BoostFormTitle>Give your Boost a title</BoostFormTitle>
                <p>
                  What do you need? Start with an action verb to tell people how they can help. For example: “Help
                  [newsroom] do [thing].”
                </p>
                <TextareaInput name="title" value={this.state.boost.title} onChange={this.onInputChange} />

                <BoostFormTitle>Describe your Boost</BoostFormTitle>
                <p>
                  What are you raising funds to do, and why you need help. Tell people why they should be excited to
                  support your Boost.
                </p>
                <TextareaInput name="why" value={this.state.boost.why} onChange={this.onInputChange} />

                <BoostFormTitle>Describe what the outcome will be</BoostFormTitle>
                <p>
                  Tell the community what to expect at the end of the fundraising time. You can be specific, but be
                  clear and brief.
                </p>
                <TextareaInput name="what" value={this.state.boost.what} onChange={this.onInputChange} />

                <BoostFormTitle>Describe your Newsroom</BoostFormTitle>
                <p>What is your Newsroom’s mission? Tell the community who you are.</p>
                <TextareaInput name="about" value={this.state.boost.about} onChange={this.onInputChange} />

                {this.renderItems()}

                <BoostFormTitle>
                  End date
                  <QuestionToolTip explainerText="All proceeds go directly to the Newsroom. There are small fees charged by the Ethereum network." />
                </BoostFormTitle>
                <EndDateInput
                  type="date"
                  name="dateEnd"
                  value={this.state.boost.dateEnd && this.state.boost.dateEnd.substr(0, 10)}
                  onChange={this.onDateEndInputChange}
                  disabled={this.props.editMode}
                />
                <EndDateNotice>Your Boost will end at 11:59PM on the date selected.</EndDateNotice>
              </BoostWrapper>

              <LaunchDisclaimer>
                By {this.props.editMode ? "using Boosts" : "creating a Boost"}, you agree to Civil’s{" "}
                <a href="#TODO">Terms of Use and Privacy Policy</a>.
              </LaunchDisclaimer>
              <LaunchButton
                size={buttonSizes.MEDIUM}
                type="submit"
                disabled={this.state.loading || !!this.state.boostId}
              >
                {this.props.editMode ? "Save Changes" : "Launch Boost"}
              </LaunchButton>

              {/*@TODO/tobek Temporary feedback until we implement success modal*/}
              <div style={{ clear: "both", float: "right", marginTop: 10 }}>
                {this.state.loading && "loading..."}
                {this.state.error && <Error>{this.state.error}</Error>}
                {this.state.boostId && (
                  <>
                    Boost created successfully!{" "}
                    <a href={"/boosts/" + this.state.boostId + "?feature-flag=boosts-mvp"}>View boost.</a>
                  </>
                )}
              </div>
            </form>
          );
        }}
      </Mutation>
    );
  }

  private renderItems(): JSX.Element {
    return (
      <ItemsTableWrapper>
        <BoostFormTitle>
          List the expenses this Boost can help cover
          <QuestionToolTip explainerText="Itemizing your costs helps educate your audience about the costs of journalism and running of your newsroom." />
        </BoostFormTitle>
        <table>
          <thead>
            <tr>
              <th>Item</th>
              <ItemCostHeader>
                <ItemCostHeaderText>Cost</ItemCostHeaderText>
              </ItemCostHeader>
              {!this.props.editMode && <th />}
            </tr>
          </thead>
          <tbody>
            {this.state.boost.items &&
              this.state.boost.items.map((item: any, i: number) => (
                <tr key={i}>
                  <td>
                    <ItemNameInput
                      name="item"
                      value={this.state.boost.items![i].item}
                      onChange={this.onItemInputChange.bind(this, i)}
                    />
                  </td>
                  <ItemCostCell>
                    <StyledCurrencyInput
                      icon={<>$</>}
                      name="cost"
                      type="number"
                      value={"" + (this.state.boost.items![i].cost || "")}
                      onChange={this.onItemInputChange.bind(this, i)}
                      disabled={this.props.editMode}
                    />
                  </ItemCostCell>
                  {!this.props.editMode && (
                    <td>
                      {i > 0 && (
                        <ItemLink href="#" onClick={e => this.removeItem(e, i)}>
                          x
                        </ItemLink>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            {!this.props.editMode && (
              <tr>
                <td>
                  <ItemLink href="#" onClick={this.addItem}>
                    Add item
                  </ItemLink>
                </td>
              </tr>
            )}
          </tbody>
          <tfoot>
            <tr>
              <td>
                <BoostFormTitle>Boost Goal</BoostFormTitle>
                <p>
                  Your Boost Goal is the amount you would like to raise. If you Boost does not reach it’s amount goal by
                  the end date, the funds sent by supporters will still be collected into your Newsroom Wallet. Once the
                  Boost will ends, you’ll be able to widthdrawl and either dispense or exchange the funds to your wallet
                  or exchange for another currency.
                </p>
              </td>
              <ItemCostCell>
                <BoostPayFormTitle>Total amount</BoostPayFormTitle>
                <TotalGoal icon={<>$</>} name="goalAmount" value={"" + (this.state.boost.goalAmount || "")} disabled />
                <ItemsAmountNote>
                  Proceeds will be in ETH
                  <QuestionToolTip explainerText="We recommend periods between 14 and 60 days." />
                </ItemsAmountNote>
                <ItemsAmountNote>Civil does not collect any fees.</ItemsAmountNote>
              </ItemCostCell>
              {!this.props.editMode && <td />}
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
    });
  };

  private onDateEndInputChange = (event: any) => {
    event.preventDefault();
    this.setState({
      boost: {
        ...this.state.boost,
        dateEnd: new Date(event.target.value).toISOString(),
      },
    });
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
  };

  private removeItem = (event: React.MouseEvent, i: number) => {
    event.preventDefault();
    this.setState({
      boost: {
        ...this.state.boost,
        goalAmount: (this.state.boost.goalAmount || 0) - (this.state.boost.items![i].cost || 0),
        items: this.state.boost.items!.slice(0, i).concat(this.state.boost.items!.slice(i + 1)),
      },
    });
  };

  private async handleSubmit(event: React.FormEvent, mutation: MutationFunc): Promise<void> {
    event.preventDefault();
    // @TODO/toby Implement success modal from designs.

    if (this.props.editMode) {
      // @TODO/toby Update when endpoint is launched.
      alert("Edit Boost not yet implemented in backend");
      return;
    }

    const boost = this.state.boost;
    this.setState({ loading: true, error: undefined });
    try {
      const response = await mutation({
        variables: {
          input: {
            channelID: this.props.newsroomAddress,
            currencyCode: "usd", // @TODO/tobek Is this right? Why is it required, should endpoint default to usd?
            title: boost.title,
            why: boost.why,
            what: boost.what,
            about: boost.about,
            goalAmount: boost.goalAmount,
            items: boost.items,
            dateEnd: boost.dateEnd,
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
    } catch (error) {
      this.setState({ error: error.toString() });
    }

    this.setState({ loading: false });
  }
}
