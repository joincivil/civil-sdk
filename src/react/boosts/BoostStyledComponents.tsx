import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, mediaQueries, Button, CloseBtn } from "@joincivil/components";

export interface BoostStyleProps {
  open: boolean;
}

export const BoostWrapper = styled.div`
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

export const BoostImg = styled.div`
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

export const BoostTitle = styled.h2`
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

export const BoostNewsroomInfo = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 30px;

  a {
    margin-right: 20px;
  }
`;

export const BoostNewsroom = styled.div`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-size: 18px;
  line-height: 26px;
  font-weight: 200;
  margin-right: 20px;
`;

export const BoostDescription = styled.div`
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

export const BoostDescriptionTable = styled.div`
  border: 1px solid ${colors.accent.CIVIL_GRAY_4};
  margin-bottom: 30px;
  padding: 20px;

  h3 {
    font-size: 14px;
    font-weight: bold;
    margin: 0 0 10px;
  }

  table {
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
  }
`;

export const BoostProgressCol = styled.div`
  width: ${(props: BoostStyleProps) => (props.open ? "calc(100% - 200px)" : "100%")};
`;

export const BoostPayOption = styled.div`
  box-sizing: border-box;
  border: 1px solid ${colors.accent.CIVIL_GRAY_3};
  border-radius: 5px;
  font-family: ${fonts.SANS_SERIF};
  font-weight: normal;
  font-size: 14px;
  margin: 0 auto 40px;
  padding: 20px;
  position: relative;
  width: 100%;

  ${Button} {
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    letter-spacing: 0;
    line-height: 19px;
    padding: 10px 40px;
    text-transform: none;
  }

  ${mediaQueries.MOBILE} {
    padding: 15px;
  }
}`

export const BoostPayCardDetails = styled.div`
  margin-top: 5px; 
  padding-left: 35px;

  p {
    margin-top: 0;
  }

  a {
    color: ${colors.accent.CIVIL_BLUE}
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}`

export const LearnMore = styled.div`
  border: 1px solid ${colors.accent.CIVIL_GRAY_4};
  border-radius: 5px;
  padding: 15px;

  a {
    margin-left: 30px;
  }
}`

export const BoostFlex = styled.div`
  display: flex;
  justify-content: space-between;
}`

export const BoostModal = styled.div`
  padding: 10px 30px 20px 30px;
  position: relative;
  width: 500px;

  ${CloseBtn} {
    right: 5px;
    top: 5px;
  }
}`

export const BoostPayFormTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
`

export const FlexColumn = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;
`;
