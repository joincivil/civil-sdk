import * as React from "react";
import styled from "styled-components";
import { colors, fonts } from "@joincivil/components";
import { BoostPayOptions } from "./BoostPayOptions";
import { BoostWrapper, BoostTitle, BoostNewsroom, BoostSmallPrint } from "../BoostStyledComponents";

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
  newsroomName: string;
  amount: number;
}

export const BoostPayments: React.FunctionComponent<BoostPaymentsProps> = props => {
  return (
    <BoostWrapper open={true}>
      <BoostHeaderWrap>
        <BoostHeader>Complete your Boost</BoostHeader>
        <BoostDetails>
          <BoostTitle>{props.title}</BoostTitle>
          <BoostNewsroom>{props.newsroomName}</BoostNewsroom>
          <BoostAmount>{"$" + props.amount}</BoostAmount>
          <BoostSmallPrint>
            This Boost will receive all proceeds raised even if it does not reach its goal.
          </BoostSmallPrint>
        </BoostDetails>
      </BoostHeaderWrap>
      <BoostPayOptions />
    </BoostWrapper>
  );
};
