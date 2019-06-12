import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, mediaQueries } from "@joincivil/components";
import { BoostPayOptions } from "./BoostPayOptions";

const BoostHeaderWrap = styled.div`
  margin: 0 0 0 20px;
`;

const BoostHeader = styled.h2`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-family: ${fonts.SANS_SERIF};
  font-size: 24px;
  line-height: 33px;
  font-weight: bold;
  margin: 0 0 25px;
`;

const BoostDetails = styled.div`
  margin: 0 0 50px;
`;

const BoostTitle = styled.h2`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-family: ${fonts.SANS_SERIF};
  font-size: 18px;
  line-height: 25px;
  font-weight: bold;
  margin: 0 0 5px;
`;

const BoostNewsroom = styled.div`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-family: ${fonts.SANS_SERIF};
  font-size: 16px;
  line-height: 26px;
  font-weight: 200;
`;

const BoostAmount = styled.p`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-family: ${fonts.SANS_SERIF};
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  margin-bottom: 20px;
`;

export interface BoostPaymentsProps {
  boostId: string;
  title: string;
  newsroom: string;
  amount: number;
}

export const BoostPayments: React.FunctionComponent<BoostPaymentsProps> = props => {
  return (
    <>
      <BoostHeaderWrap>
        <BoostHeader>Complete your Boost</BoostHeader>
        <BoostDetails>
          <BoostTitle>{props.title}</BoostTitle>
          <BoostNewsroom>{props.newsroom}</BoostNewsroom>
          <BoostAmount>{"$" + props.amount}</BoostAmount>
        </BoostDetails>
      </BoostHeaderWrap>
      <BoostPayOptions />
    </>
  );
}
