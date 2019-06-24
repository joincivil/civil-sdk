import * as React from "react";
import styled from "styled-components";
import { colors } from "@joincivil/components";

export interface BoostProgressWidthProps {
  paymentsTotal: number;
  goalAmount: number;
}

export interface BoostProgressProps {
  open: boolean;
  paymentsTotal: number;
  goalAmount: number;
  timeRemaining: string;
}

const BoostProgressWrapper = styled.div`
  margin-bottom: 20px;
  width: 100%;
`;

const BoostProgressBar = styled.div`
  background-color: ${colors.accent.CIVIL_GRAY_4};
  border-radius: 5px;
  height: 10px;
  margin: 8px 0;
  overflow: hidden;
  width: 100%;
`;

const BoostProgressPercent = styled.div`
  background-color: ${colors.accent.CIVIL_TEAL};
  height: 10px;
  width: ${(props: BoostProgressWidthProps) => ((props.paymentsTotal / props.goalAmount) * 100).toString()}%;
`;

const BoostProgressFlex = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`;

const AlignRight = styled.div`
  text-align: right;
`;

const TextSecondary = styled.span`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-size: 14px;
  font-weight: 600;
  line-height: 1;
`;

const TextPrimary = styled.span`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-size: 18px;
  font-weight: 500;
  line-height: 1;
`;

export const BoostProgress: React.FunctionComponent<BoostProgressProps> = props => {
  const percentRaised = Math.round((props.paymentsTotal / props.goalAmount) * 100);

  return (
    <BoostProgressWrapper>
      <BoostProgressFlex>
        <TextPrimary>{"$" + props.paymentsTotal} raised</TextPrimary>
        <AlignRight>
          <TextPrimary>
            <b>${props.goalAmount}</b> goal
          </TextPrimary>
        </AlignRight>
      </BoostProgressFlex>
      <BoostProgressBar>
        <BoostProgressPercent paymentsTotal={props.paymentsTotal} goalAmount={props.goalAmount} />
      </BoostProgressBar>
      <BoostProgressFlex>
        <TextSecondary>{percentRaised}%</TextSecondary>
        <AlignRight>
          <TextSecondary>{props.timeRemaining}</TextSecondary>
        </AlignRight>
      </BoostProgressFlex>
    </BoostProgressWrapper>
  );
};
