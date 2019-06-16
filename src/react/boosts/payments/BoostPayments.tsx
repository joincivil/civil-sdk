import * as React from "react";
import styled from "styled-components";
import { colors, fonts } from "@joincivil/components";
import { BoostPayOptions } from "./BoostPayOptions";
import { BoostWrapper, BoostTitle, BoostNewsroom } from "../BoostStyledComponents";
import { PaymentInfoText, PaymentFAQText } from "../BoostTextComponents";

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

const BoostPayFooter = styled.div`
  border-top: 1px solid ${colors.accent.CIVIL_GRAY_3};
  margin: 20px 15px;
  padding: 20px;
`;

const BoostPayFooterSection = styled.div`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-size: 14px;
  line-height: 19px;
  margin: 0 0 40px;

  h3 {
    font-size: 14px;
    line-height: 19px;
    font-weight: 600;
    margin: 0 0 20px;
  }

  p {
    margin: 0 0 20px;
  }

  a {
    display: block;
    margin: 0 0 15px;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export interface BoostPaymentsProps {
  boostId: string;
  title: string;
  newsroom: string;
  amount: number;
}

export const BoostPayments: React.FunctionComponent<BoostPaymentsProps> = props => {
  return (
    <BoostWrapper open={true}>
      <BoostHeaderWrap>
        <BoostHeader>Complete your Boost</BoostHeader>
        <BoostDetails>
          <BoostTitle>{props.title}</BoostTitle>
          <BoostNewsroom>{props.newsroom}</BoostNewsroom>
          <BoostAmount>{"$" + props.amount}</BoostAmount>
        </BoostDetails>
      </BoostHeaderWrap>
      <BoostPayOptions />
      <BoostPayFooter>
        <BoostPayFooterSection>
          <PaymentInfoText />
        </BoostPayFooterSection>
        <BoostPayFooterSection>
          <PaymentFAQText />
        </BoostPayFooterSection>
      </BoostPayFooter>
    </BoostWrapper>
  );
}
