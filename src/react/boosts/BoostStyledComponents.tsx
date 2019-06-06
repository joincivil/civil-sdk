import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, mediaQueries, Button, CloseBtn } from "@joincivil/components";

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
