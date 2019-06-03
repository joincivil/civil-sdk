import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, mediaQueries, Button, buttonSizes, CurrencyInput, TextInput, TextareaInput } from "@joincivil/components";
import { Mutation, MutationFunc } from "react-apollo";
import { boostMutation } from "./queries";
import { BoostData } from "./types";

const BoostWrapper = styled.div`
  border: 1px solid ${colors.accent.CIVIL_GRAY_4};
  font-family: ${fonts.SANS_SERIF};
  font-weight: normal;
  font-size: 14px;
  margin: 0 auto 50px;
  padding: 30px;
  position: relative;

  ${mediaQueries.MOBILE} {
    padding: 20px;
  }
`;
const Title = styled.h3`
`;
const FormTitle = styled.h4`
`;
const Error = styled.span`
  color: red;
`;


export interface BoostFormProps {
  loading: boolean;
  newsroomAddress: string;
  newsroomName: string;
  newsroomListingUrl: string;
  newsroomWallet: string;
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
        about: props.newsroomTagline, // @TODO/tobek This is undefined when element first constructed, need to handle that
        items: [{ item: "", cost: 0 }],
      },
    };
  }
  public render(): JSX.Element {
    if (this.props.loading) {
      return (
        <>
          <Title>Create Boost</Title>
          Loading...
        </>
      );
    }

    return (
      <>
        <Title>Create Boost</Title>
        <Mutation mutation={boostMutation}>
          {createBoost => {
            return (
              <form onSubmit={async event => this.handleSubmit(event, createBoost)}>
                <BoostWrapper>
                  <FormTitle>Newsroom</FormTitle>
                  <TextInput name="newsroomName" value={this.props.newsroomName} disabled />
                  <FormTitle>Newsroom Website</FormTitle>
                  <TextInput name="newsroomUrl" value={this.props.newsroomUrl} disabled />
                  <FormTitle>Registry listing</FormTitle>
                  <TextInput name="newsroomListingUrl" value={this.props.newsroomListingUrl} disabled />

                  <FormTitle>Boost title</FormTitle>
                  <p>Describe your Boost in one sentence. We recommend starting with a verb to help readers quickly understand how they can get involved. For example: “Help [newsroom] do [thing].”</p>
                  <TextareaInput name="title" value={this.state.boost.title} onChange={this.onInputChange} />

                  <FormTitle>Why we need this</FormTitle>
                  <TextareaInput name="why" value={this.state.boost.why} onChange={this.onInputChange} />

                  <FormTitle>What the outcome will be</FormTitle>
                  <TextareaInput name="what" value={this.state.boost.what} onChange={this.onInputChange} />

                  <FormTitle>About the newsroom</FormTitle>
                  <TextareaInput name="about" value={this.state.boost.about} onChange={this.onInputChange} />

                  <FormTitle>Where your support goes</FormTitle>
                  <table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Cost</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.state.boost.items && this.state.boost.items.map((item: any, i: number) => (
                        <tr key={i}>
                          <td>
                            <TextInput name="item" value={this.state.boost.items![i].item} onChange={this.onItemInputChange.bind(this, i)} />
                          </td>
                          <td>
                            <CurrencyInput name="cost" type="number" value={"" + (this.state.boost.items![i].cost || "")} onChange={this.onItemInputChange.bind(this, i)} />
                          </td>
                          <td>
                            {i > 0 && (<a href="#" onClick={(e) => this.removeItem(e, i)}>x</a>)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <a href="#" onClick={this.addItem}>Add item</a>

                  <FormTitle>Amount</FormTitle>
                  <CurrencyInput name="goalAmount" value={"" + (this.state.boost.goalAmount || "")} disabled />

                  <FormTitle>End date</FormTitle>
                  <input type="date" name="dateEnd" value={this.state.dateEndInput} onChange={this.onDateEndInputChange} />

                  <FormTitle>Newsroom Wallet</FormTitle>
                  <TextInput name="newsroomWallet" value={this.props.newsroomWallet} disabled />

                  <Button size={buttonSizes.MEDIUM} type="submit" disabled={this.state.loading || !!this.state.boostId}>Save Boost</Button>
                  <div>
                    {this.state.loading && "loading..."}
                    {this.state.error && (<Error>{this.state.error}</Error>)}
                    {this.state.boostId && ("Boost created, ID: " + this.state.boostId)}
                  </div>
                </BoostWrapper>
              </form>
            );
          }}
        </Mutation>
      </>
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
