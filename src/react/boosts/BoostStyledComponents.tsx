import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, mediaQueries, Button, ButtonProps, InvertedButton } from "@joincivil/components";

export interface BoostStyleProps {
  open?: boolean;
}

export const BoostWrapper = styled.div`
  border: ${(props: BoostStyleProps) => (props.open ? "none" : "1px solid " + colors.accent.CIVIL_GRAY_4)};
  font-family: ${fonts.SANS_SERIF};
  margin: 0 auto 30px;
  padding: 30px 30px 30px 110px;
  position: relative;

  ${mediaQueries.MOBILE} {
    border-color: transparent;
    border-bottom: ${(props: BoostStyleProps) => (props.open ? "none" : "1px solid " + colors.accent.CIVIL_GRAY_4)};
    border-top: ${(props: BoostStyleProps) => (props.open ? "none" : "1px solid " + colors.accent.CIVIL_GRAY_3)};
    padding: 20px 10px;
  }
`;

export const BoostWrapperFullWidthHr = styled.hr`
  background-color: ${colors.accent.CIVIL_GRAY_4};
  border: none;
  height: 1px;
  margin: 28px 0 28px -110px;
  width: calc(100% + 140px);

  ${mediaQueries.MOBILE} {
    margin-left: -20px;
    width: calc(100% + 40px);
  }
`;

export const BoostButton: StyledComponentClass<ButtonProps, "button"> = styled(Button)`
  cursor: pointer;
  font-size: 14px;
  font-weight: bold;
  letter-spacing: 0;
  line-height: 19px;
  padding: 10px 40px;
  text-transform: none;

  ${mediaQueries.MOBILE} {
    margin-bottom: 20px;
    width: 100%;
  }
`;

export const BoostTextButton: StyledComponentClass<ButtonProps, "button"> = styled(InvertedButton)`
  border: none;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 19px;
  padding: 0;
  text-transform: none;

  &:hover {
    background-color: transparent;
    color: ${colors.accent.CIVIL_BLUE};
    text-decoration: underline;
  }
`;

export const BoostTitle = styled.h2`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-size: 20px;
  font-family: ${fonts.SANS_SERIF};
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

  ${mediaQueries.MOBILE} {
    display: block;
  }

  a {
    color: ${colors.accent.CIVIL_BLUE};
    font-size: 14px;
    line-height: 20px;
    margin-right: 20px;
    text-decoration: none;

    &:hover {
      color: ${colors.accent.CIVIL_BLUE};
      text-decoration: underline;
    }

    ${mediaQueries.MOBILE} {
      display: block;
    }
  }
`;

export const BoostNewsroom = styled.div`
  color: ${colors.accent.CIVIL_GRAY_0};
  font-family: ${fonts.SANS_SERIF};
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
    line-height: 19px;
    margin: 0 0 10px;

    ${mediaQueries.MOBILE} {
      color: ${colors.primary.BLACK};
      font-size: 16px;
      line-height: 22px;
    }
  }

  p {
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 15px;

    ${mediaQueries.MOBILE} {
      font-size: 16px;
      line-height: 22px;
    }
  }
`;

export const BoostDescriptionWhy = styled.div`
  color: ${colors.accent.CIVIL_GRAY_0};
  margin-bottom: 30px;

  p {
    font-size: 16px;
    line-height: 22px;
    margin: 0 0 15px;
  }
`;

export const BoostDescriptionTable = styled.div`
  border: 1px solid ${colors.accent.CIVIL_GRAY_4};
  margin-bottom: 30px;
  padding: 20px;

  ${mediaQueries.MOBILE} {
    border: none;
    padding: 0;
  }

  h3 {
    font-size: 14px;
    font-weight: bold;
    margin: 0 0 10px;

    ${mediaQueries.MOBILE} {
      font-size: 16px;
      line-height: 22px;
    }
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;

    th {
      font-size: 12px;
      letter-spacing: 1px;
      padding: 8px 15px 8px 0;
      text-align: left;
      text-transform: uppercase;

      ${mediaQueries.MOBILE} {
        color: ${colors.accent.CIVIL_GRAY_2};
        padding: 8px;
      }
    }

    td {
      padding: 8px 15px 8px 0;

      ${mediaQueries.MOBILE} {
        color: ${colors.accent.CIVIL_GRAY_2};
        padding: 8px;
      }
    }

    ${mediaQueries.MOBILE} {
      tbody {
        tr:nth-child(odd) {
          background-color: ${colors.accent.CIVIL_GRAY_4};
        }
      }
    }
  }
`;

export const BoostProgressCol = styled.div`
  width: ${(props: BoostStyleProps) => (props.open ? "calc(100% - 200px)" : "100%")};

  ${mediaQueries.MOBILE} {
    width: 100%;
  }
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

  ${mediaQueries.MOBILE} {
    padding: 15px;
  }
}`;

export const BoostPayCardDetails = styled.div`
  margin-top: 5px;
  padding-left: 35px;

  ${mediaQueries.MOBILE} {
    margin-top: 15px;
    padding-left: 0;
  }

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
}`;

export const LearnMore = styled.div`
  border: 1px solid ${colors.accent.CIVIL_GRAY_4};
  border-radius: 5px;
  padding: 15px;

  a {
    cursor: pointer;
    margin-left: 30px;
  }
}`;

export const BoostFormTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 22px;
`;

export const BoostPayFormTitle = styled.div`
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
`;

export const BoostFlexStart = styled.div`
  align-items: flex-start;
  display: flex;
  justify-content: space-between;

  ${mediaQueries.MOBILE} {
    display: block;
  }
`;

export const BoostFlexCenter = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;

  button {
    margin: 0 15px;
  }

  ${mediaQueries.MOBILE} {
    display: block;

    button {
      margin: 0;
    }
  }
}`;

export const BoostFlexEnd = styled.div`
  align-items: flex-end;
  display: flex;
  justify-content: space-between;

  ${mediaQueries.MOBILE} {
    display: block;
  }
}`;

export const BoostModalContents = styled.div`
  padding: 10px 30px 20px 30px;
  position: relative;
  width: 500px;
}`;

export const BoostModalCloseBtn: StyledComponentClass<ButtonProps, "button"> = styled(InvertedButton)`
  border: none;
  padding: 0;
  height: 40px;
  position: absolute;
  right: 5px;
  top: 5px;
  width: 40px;

  svg path {
    transition: fill 0.2s ease;
  }

  &:focus,
  &:hover {
    background-color: transparent;

    svg path {
      fill: ${colors.accent.CIVIL_BLUE};
    }
  }
`;

export const BoostSmallPrint = styled.div`
  font-size: 12px;
`;

export const BoostEthConfirm = styled.span`
  display: block;
  font-size: 13px;
`;

export const BoostNotice = styled.div`
  font-size: 14px;
  line-height: 22px;
  margin-bottom: 25px;

  ${mediaQueries.MOBILE} {
    font-size: 12px;
    line-height: 18px;
  }
`;
