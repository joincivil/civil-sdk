import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, Button, buttonSizes } from "@joincivil/components";

const BoostWrapper = styled.div`
  border: 1px solid ${colors.accent.CIVIL_GRAY_4};
  font-family: ${fonts.SANS_SERIF};
  margin: 0 auto 50px;
  padding: 30px 30px 30px 120px;
  position: relative;

  button {
    margin: 0 0 30px;
  }
`;

const BoostImg = styled.div`
  left: 30px;
  position: absolute;
  top: 30px;
  width: 65px;

  img {
    width: 100%;
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

const BoostProgressWrapper = styled.div`
  margin-bottom: 20px;
  padding-top: 20px;
  position: relative;
`;

const BoostProgressAmount = styled.div`
  color: ${colors.accent.CIVIL_GRAY_2};
  font-size: 14px;
  font-weight: 600;
  left: 0;
  margin-bottom: 20px;
  position: absolute;
  top: 0;
`;

const BoostProgressTime = styled.div`
  color: ${colors.accent.CIVIL_GRAY_2};
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 20px;
  position: absolute;
  right: 0;
  text-align: right;
  top: 0;
`;

const BoostProgressBar = styled.div`
  background-color: ${colors.accent.CIVIL_GRAY_4};
  height: 10px;
  width: 100%;
`;

const BoostProgress = styled.div`
  background-color: ${colors.accent.CIVIL_GRAY_2};
  height: 10px;
  width: 10%;
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

export interface Items {
  item: string;
  cost: string;
}

export interface BoostProps {
  open: boolean;
  image?: string;
  title?: string;
  newsroom?: string;
  why?: string;
  what?: string;
  about?: string;
  itemList: Items[];
}

export const Boost: React.FunctionComponent<BoostProps> = props => {
  return (
    <BoostWrapper>
      <BoostImg>
        <img src={props.image} />
      </BoostImg>
      <BoostTitle>{props.title}</BoostTitle>
      <BoostNewsroomInfo>
        <BoostNewsroom>{props.newsroom}</BoostNewsroom>
        <a href="" target="_blank">
          Website
        </a>
        <a href="" target="_blank">
          Registry
        </a>
      </BoostNewsroomInfo>
      <BoostProgressWrapper>
        <BoostProgressAmount>x of x raised</BoostProgressAmount>
        <BoostProgressTime>x days to go</BoostProgressTime>
        <BoostProgressBar>
          <BoostProgress />
        </BoostProgressBar>
      </BoostProgressWrapper>
      {props.open && (
        <>
          <Button size={buttonSizes.MEDIUM}>Support</Button>
          <BoostDescription>
            <h3>Why we need this</h3>
            <p>{props.why}</p>
          </BoostDescription>
          <BoostDescription>
            <h3>What the outcome will be</h3>
            <p>{props.what}</p>
          </BoostDescription>
          <BoostDescription>
            <h3>About the newsroom</h3>
            <p>{props.about}</p>
          </BoostDescription>
          <BoostDescription>
            <h3>Where your support goes</h3>
            <Table>
              <tr>
                <th>Item</th>
                <th>Cost</th>
              </tr>
              {props.itemList.map((item, i) => (
                <tr>
                  <td>{item.item}</td>
                  <td>{item.cost}</td>
                </tr>
              ))}
            </Table>
          </BoostDescription>
        </>
      )}
    </BoostWrapper>
  );
};
