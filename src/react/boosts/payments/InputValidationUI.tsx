import * as React from "react";
import { colors, fonts, mediaQueries, ErrorIcon } from "@joincivil/components";
import styled from "styled-components";

export interface InputValidationStyleProps {
  valid?: boolean;
  width?: string;
}

const InputWrapper = styled.div`
  margin-bottom: 20px;
  position: relative;
  width: ${(props: InputValidationStyleProps) => (props.width ? props.width : "100%")};

  ${mediaQueries.MOBILE} {
    width: 100%;
  }

  input {
    border: ${(props: InputValidationStyleProps) =>
      props.valid ? "1px solid " + colors.accent.CIVIL_GRAY_3 : "1px solid " + colors.accent.CIVIL_RED};
    border-radius: 2px;
    padding: 10px 35px 10px 12px;
    width: 100%;

    &:focus {
      border-color: ${colors.accent.CIVIL_BLUE};
      outline: none;
    }

    ${mediaQueries.MOBILE} {
      width: 100%;
    }
  }

  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background-color: ${colors.basic.WHITE};
    border: ${(props: InputValidationStyleProps) =>
      props.valid ? "1px solid " + colors.accent.CIVIL_GRAY_3 : "1px solid " + colors.accent.CIVIL_RED};
    border-radius: 2px;
    display: block;
    font-family: ${fonts.SANS_SERIF};
    line-height: 16px;
    margin: 0;
    padding: 11px 12px 12px;
    width: 100%;

    &::-ms-expand {
      display: none;
    }

    &:hover {
      cursor: pointer;
    }

    &:focus {
      border-color: ${colors.accent.CIVIL_BLUE};
      outline: none;
    }

    ${mediaQueries.MOBILE} {
      width: 100%;
    }
  }
`;

const InputErrorIcon = styled.div`
  display: ${(props: InputValidationStyleProps) => (props.valid ? "none" : "block")};
  position: absolute;
  right: 5px;
  top: calc(50% - 10px);
`;

export interface BoostModalProps {
  children: any;
  valid: boolean;
  width?: string;
}

export const InputValidationUI: React.FunctionComponent<BoostModalProps> = props => {
  return (
    <>
      <InputWrapper valid={props.valid} width={props.width}>
        {props.children}
        <InputErrorIcon valid={props.valid}>
          <ErrorIcon width={20} height={20} />
        </InputErrorIcon>
      </InputWrapper>
    </>
  );
};
