import * as React from "react";
import styled from "styled-components";
import { colors } from "@joincivil/components";
import { BoostFlexStart, BoostFlexEnd } from "./BoostStyledComponents";

export interface BoostProgressWidthProps {
  paymentsTotal: number;
  goalAmount: number;
}

export interface BoostProgressProps {
  open: boolean;
  paymentsTotal: number;
  goalAmount: number;
  daysLeft: string;
}

const BoostProgressWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const BoostProgressBar = styled.div`
  background-color: ${colors.accent.CIVIL_GRAY_4};
  height: 10px;
  margin: 8px 0;
  overflow: hidden;
  width: 100%;
`;

const BoostProgressPercent = styled.div`
  background-color: ${colors.accent.CIVIL_GRAY_2};
  height: 10px;
  width: ${(props: BoostProgressWidthProps) => (props.paymentsTotal / props.goalAmount * 100).toString()}%;
`;

const ProgressFlexLeft = styled.div`
  width: 75%;
`;

const ProgressFlexRight = styled.div`
  margin-bottom: 8px;
`;

const MarginBottom = styled.div`
  margin-bottom: 15px;
`;

const AlignRight = styled.div`
  text-align: right;
`;

const TextSecondary = styled.div`
color: ${colors.accent.CIVIL_GRAY_2};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

const TextPrimary = styled.div`
  color: ${colors.accent.CIVIL_GRAY_2};
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
`;

export const BoostProgress: React.FunctionComponent<BoostProgressProps> = props => {
  const percentRaised = Math.round((props.paymentsTotal / props.goalAmount) * 100);
  const amountToGoal = props.goalAmount - props.paymentsTotal;

  return (
    <BoostProgressWrapper>
      {props.open ?
        <>
          <BoostFlexStart>
            <TextPrimary>{"$" + props.paymentsTotal} raised</TextPrimary>
            <AlignRight><TextPrimary><b>${props.goalAmount}</b> goal</TextPrimary></AlignRight>
          </BoostFlexStart>
          <BoostProgressBar>
            <BoostProgressPercent paymentsTotal={props.paymentsTotal} goalAmount={props.goalAmount} />
          </BoostProgressBar>
          <BoostFlexStart>
            <TextSecondary>{percentRaised}%</TextSecondary>
            <AlignRight><TextSecondary>{props.daysLeft}</TextSecondary></AlignRight>
          </BoostFlexStart>
        </>
        :
        <BoostFlexEnd>
          <ProgressFlexLeft>
            <BoostFlexStart>
              <TextSecondary>{percentRaised}%</TextSecondary>
            </BoostFlexStart>
            <BoostProgressBar>
              <BoostProgressPercent paymentsTotal={props.paymentsTotal} goalAmount={props.goalAmount} />
            </BoostProgressBar>
          </ProgressFlexLeft>
          <ProgressFlexRight>
            <MarginBottom>
              <TextSecondary>{props.daysLeft}</TextSecondary>
            </MarginBottom>
            <MarginBottom>
              <TextPrimary>{"$" + props.paymentsTotal} of <b>{"$" + props.goalAmount}</b></TextPrimary>
            </MarginBottom>
            <TextSecondary>{"$" + amountToGoal} till funded</TextSecondary>
          </ProgressFlexRight>
        </BoostFlexEnd>
      }
    </BoostProgressWrapper>
  );
};
