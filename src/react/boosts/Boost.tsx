import * as React from "react";
import styled from "styled-components";
import { colors, fonts, mediaQueries, Button, buttonSizes } from "@joincivil/components";
import { Query } from "react-apollo";
import { boostQuery } from "./queries";
import { BoostProgress } from "./BoostProgress"

const BoostWrapper = styled.div`
  border: ${(props: BoostStyleProps) => (props.open ? "none" : "1px solid " + colors.accent.CIVIL_GRAY_4)};
  font-family: ${fonts.SANS_SERIF};
  margin: 0 auto 30px;
  padding: 30px 30px 30px 110px;
  position: relative;

  button {
    margin: 0 0 30px;
  }

  ${mediaQueries.MOBILE} {
    padding: 20px;
  }
`;

const BoostImg = styled.div`
  left: 30px;
  position: absolute;
  top: 30px;
  width: 65px;

  img {
    width: 100%;

    ${mediaQueries.MOBILE} {
      display: none;
    }
  }
`;

const BoostTitle = styled.h2`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-size: 20px;
  line-height: 27px;
  font-weight: bold;
  margin: 0 0 8px;

  a {
    color: ${colors.accent.CIVIL_GRAY_0};
    transition: color 200ms ease;

    &:hover {
      color: ${colors.accent.CIVIL_BLUE};
    }
  }
`;

const BoostNewsroomInfo = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 30px;

  a {
    margin-right: 20px;
  }
`;

const BoostNewsroom = styled.div`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-size: 18px;
  line-height: 26px;
  font-weight: 200;
  margin-right: 20px;
`;

const BoostDescription = styled.div`
  color: ${colors.accent.CIVIL_GRAY_0};
  margin-bottom: 30px;

  h3 {
    font-size: 14px;
    font-weight: bold;
    margin: 0 0 10px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 15px
  }
`;

const BoostDescriptionTable = styled.div`
  border: 1px solid ${colors.accent.CIVIL_GRAY_4};
  margin-bottom: 30px;
  padding: 20px;

  h3 {
    font-size: 14px;
    font-weight: bold;
    margin: 0 0 10px;
  }
`;

const Table = styled.table`
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  th {
    font-size: 10px;
    letter-spacing: 1px;
    padding: 8px 15px 8px 0;
    text-align: left;
    text-transform: uppercase;
  }

  td {
    padding: 8px 15px 8px 0;
  }
`;

const FlexColumn = styled.div`
  display: flex;
  justify-content: space-between;
`;

const BoostProgressCol = styled.div`
  width: ${(props: BoostStyleProps) => (props.open ? "calc(100% - 200px)" : "100%")};
`;

export interface BoostStyleProps {
  open: boolean;
}

export interface BoostProps {
  boostId: string;
  open: boolean;
}

// TODO(sruddy) get newsroom data from address
const boost = {
  image: "https://cdn.mos.cms.futurecdn.net/ewcvC8bNBec6oMG9zufgVg.jpg",
  newsroom: "Block Club Chicago",
  newsroomUrl: "https://blockclubchicago.org/",
  newsroomRegistryUrl: "https://registry.civil.co/listing/0x23daa7fba48cd68a2b86a77a1e707a6aae41c4ea",
  raisedAmount: 10,
  daysLeft: 15,
};

export const Boost: React.FunctionComponent<BoostProps> = props => {
  // TODO(sruddy) temporary id from test mutation/query https://graphqlbin.com/v2/lRZ3TP
  // const id = "87d0fe80-505f-4c1c-8a09-db7e20cb1045";
  const id = props.boostId;

  return (
    <Query query={boostQuery} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Loading...";
        } else if (error) {
          return "Error: " + JSON.stringify(error);
        }

        return (
          <BoostWrapper open={props.open}>
            <BoostImg>
              <img src={boost.image} />
            </BoostImg>
            <BoostTitle>
              {props.open ? <>{data.postsGet.title}</> : <a href={"/boosts/" + id}>{data.postsGet.title}</a>}
            </BoostTitle>
            <BoostNewsroomInfo>
              <BoostNewsroom>{boost.newsroom}</BoostNewsroom>
              {props.open && (
                <>
                  <a href={boost.newsroomUrl} target="_blank">
                    Vist Newsroom
                  </a>
                  <a href={boost.newsroomRegistryUrl} target="_blank">
                    Visit Civil Registry
                  </a>
                </>
              )}
            </BoostNewsroomInfo>
            <FlexColumn>
              <BoostProgressCol open={props.open}>
                <BoostProgress open={props.open} goalAmount={data.postsGet.goalAmount} raisedAmount={boost.raisedAmount} daysLeft={boost.daysLeft} />
              </BoostProgressCol>
              {props.open && (<Button size={buttonSizes.MEDIUM}>Support</Button>)}
            </FlexColumn>
            {props.open && (
              <>
                <BoostDescription>
                  <p>{data.postsGet.why}</p>
                </BoostDescription>
                <BoostDescription>
                  <h3>What the outcome will be</h3>
                  <p>{data.postsGet.what}</p>
                </BoostDescription>
                <BoostDescription>
                  <h3>About the newsroom</h3>
                  <p>{data.postsGet.about}</p>
                </BoostDescription>
                <BoostDescriptionTable>
                  <h3>Where your support goes</h3>
                  <Table>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.postsGet.items.map((item: any, i: number) => (
                        <tr key={i}>
                          <td>{item.item}</td>
                          <td>{"$" + item.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </BoostDescriptionTable>
                <BoostDescription>
                  <h3>Questions about Boosts?</h3>
                  {/* TODO(sruddy) add FAQ URL */}
                  <p><a href="">Learn more in our FAQ</a></p>
                </BoostDescription>
              </>
            )}
          </BoostWrapper>
        );
      }}
    </Query>
  );
};
