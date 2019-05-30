import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, mediaQueries, Button, buttonSizes } from "@joincivil/components";
import { Query } from "react-apollo";
import { boostQuery } from "./queries";
import { BoostProgress } from "./BoostProgress"

const BoostWrapper = styled.div`
  border: 1px solid ${colors.accent.CIVIL_GRAY_4};
  font-family: ${fonts.SANS_SERIF};
  margin: 0 auto 50px;
  padding: 30px 30px 30px 120px;
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
  margin: 0 0 15px;
`;

const BoostNewsroomInfo = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 20px;

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
  font-size: 14px;
  line-height: 20px;
  margin-bottom: 40px;

  h3 {
    font-weight: bold;
    margin: 0 0 5px;
  }

  p {
    margin: 0 0 15px
  }
`;

const Table = styled.table`
  border: 1px solid ${colors.accent.CIVIL_GRAY_4};
  border-collapse: collapse;
  border-spacing: 0;
  width: 100%;

  th, td {
    text-align: left;
    padding: 16px;
  }

  tr:nth-child(even) {
    background-color: ${colors.accent.CIVIL_GRAY_4};
  }
`;

export interface BoostProps {
  boostId?: string;
  open: boolean;
  key?: number;
}

// Temporary data till boost endpoints are up
const boost = {
  boostId: "1234",
  image: "https://cdn.mos.cms.futurecdn.net/ewcvC8bNBec6oMG9zufgVg.jpg",
  title:
    "Send us to Mars",
  newsroom: "Block Club Chicago",
  newsroomUrl: "https://blockclubchicago.org/",
  newsroomRegistryUrl: "https://registry.civil.co/listing/0x23daa7fba48cd68a2b86a77a1e707a6aae41c4ea",
  raisedAmount: 150000,
  goalAmount: 1021500,
  daysLeft: 15,
  why:
    "Japan and the U.S. will launch a mission to Mars “very soon,” President Trump said. “It's very exciting. And from a military standpoint, there is nothing more important right now than space,”",
  what:
    "Suspendisse rutrum elementum odio sit amet sodales. Praesent convallis urna at congue bibendum. Morbi vel auctor ipsum, in fermentum risus. Suspendisse nisl massa, viverra sed faucibus vel, fermentum quis tellus. Mauris nec egestas diam. Nulla facilisi.",
  about:
    "Block Club Chicago is a nonprofit news organization dedicated to delivering reliable, nonpartisan and essential coverage of Chicago’s diverse neighborhoods and Mars.",
  items: [
    { item: "Huge Rocket", cost: "$1000000" },
    { item: "Astronaut training", cost: "$20000" },
    { item: "Freeze dried ice cream", cost: "$1500" },
  ],
};

export const Boost: React.FunctionComponent<BoostProps> = props => {
  // TODO(sruddy) temporary id from test mutation/query https://graphqlbin.com/v2/lRZ3TP >> use prop
  const id = "07bcdd89-ff29-46f5-b00a-36949cb02368";

  return (
    <Query query={boostQuery} variables={{ id }}>
      {({ loading, error, data }) => {
        if (loading) {
          return "Loading...";
        } else if (error) {
          return "Error: " + JSON.stringify(error);
        }

        return (
          <BoostWrapper>
            <BoostImg>
              <img src={boost.image} />
            </BoostImg>
            <BoostTitle>{data.postsGet.title}</BoostTitle>
            <BoostNewsroomInfo>
              <BoostNewsroom>{boost.newsroom}</BoostNewsroom>
              <a href={boost.newsroomUrl} target="_blank">
                Website
              </a>
              <a href={boost.newsroomRegistryUrl} target="_blank">
                Registry
              </a>
            </BoostNewsroomInfo>
            <BoostProgress goalAmount={data.postsGet.goalAmount} raisedAmount={boost.raisedAmount} daysLeft={boost.daysLeft} />
            {props.open && (
              <>
                <Button size={buttonSizes.MEDIUM}>Support</Button>
                <BoostDescription>
                  <h3>Why we need this</h3>
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
                <BoostDescription>
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
                          <td>{item.cost}</td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </BoostDescription>
              </>
            )}
          </BoostWrapper>
        );
      }}
    </Query>
  );
};
