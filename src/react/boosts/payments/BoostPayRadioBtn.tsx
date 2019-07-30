import * as React from "react";
import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, SecondaryButton, ButtonProps } from "@joincivil/components";

const RadioBtnCircle = styled.div`
  background-color: ${colors.basic.WHITE};
  border: 1px solid ${colors.basic.WHITE};
  border-radius: 50%;
  box-shadow: 0 0 0 1px ${colors.accent.CIVIL_GRAY_2};
  height: 16px;
  left: 0;
  position: absolute;
  top: 16px;
  width: 16px;
`;

const BoostPayRadioWrapper = styled.div`
  input {
    display: none;
  }

  input:checked + button {
    background-color: ${colors.basic.WHITE};
    border: none;
    color: ${colors.accent.CIVIL_BLUE};

    ${RadioBtnCircle} {
      background-color: ${colors.accent.CIVIL_BLUE};
      border: 1px solid ${colors.basic.WHITE};
      box-shadow: 0 0 0 1px ${colors.accent.CIVIL_BLUE};
    }
  }
`;

const BoostRadioButton: StyledComponentClass<ButtonProps, "button"> = styled(SecondaryButton)`
  border: none;
  color: ${colors.accent.CIVIL_GRAY_0};
  cursor: pointer;
  display: block;
  font-family: ${fonts.SANS_SERIF};
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 26px;
  padding: 10px 10px 10px 35px !important;
  position: relative;
  text-align: left;
  text-transform: none;
  transition: color 0.2s ease;

  &:hover {
    border: none;
    background-color: transparent;
    color: ${colors.accent.CIVIL_BLUE};
  }

  &:disabled {
    color: ${colors.accent.CIVIL_GRAY_2};
    cursor: auto;
  }
`;
export interface BoostPayRadioBtnProps {
  onChange?: any;
  value: any;
  name?: string;
  disabled?: boolean;
  defaultChecked?: boolean;
}

export const BoostPayRadioBtn: React.FunctionComponent<BoostPayRadioBtnProps> = props => {
  let input: any;
  const { onChange, children, value, name, disabled, defaultChecked } = props;
  const clickHandler = () => {
    console.log("clicked");
    input.checked = true;
    if (onChange) {
      console.log("onChange");
      onChange(name, input.value);
    }
  };

  return (
    <BoostPayRadioWrapper>
      <input
        type="radio"
        value={value}
        onChange={onChange}
        defaultChecked={defaultChecked}
        name={name}
        ref={ref => (input = ref)}
      />
      <BoostRadioButton onClick={clickHandler} disabled={disabled || false}>
        <RadioBtnCircle />
        {children}
      </BoostRadioButton>
    </BoostPayRadioWrapper>
  );
};
