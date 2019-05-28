import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import { colors } from "@joincivil/components";

export interface BoostProgressWidthProps {
  raisedAmount: number;
  goalAmount: number;
}

export interface BoostProgressProps {
  raisedAmount: number;
  goalAmount: number;
  daysLeft: number;
}

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

const BoostProgressPercent = styled.div`
  background-color: ${colors.accent.CIVIL_GRAY_2};
  height: 10px;
  width: ${(props: BoostProgressWidthProps) => (props.raisedAmount / props.goalAmount * 100).toString()}%;
`;

export const BoostProgress: React.FunctionComponent<BoostProgressProps> = props => {
  return (
    <BoostProgressWrapper>
      <BoostProgressAmount>{"$" + props.raisedAmount} of {"$" + props.goalAmount} raised</BoostProgressAmount>
      <BoostProgressTime>{props.daysLeft} days to go</BoostProgressTime>
      <BoostProgressBar>
        <BoostProgressPercent raisedAmount={props.raisedAmount} goalAmount={props.goalAmount} />
      </BoostProgressBar>
    </BoostProgressWrapper>
  );
};
