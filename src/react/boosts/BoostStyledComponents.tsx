import styled, { StyledComponentClass } from "styled-components";
import { colors, fonts, mediaQueries, Button, ButtonProps, InvertedButton } from "@joincivil/components";

export interface BoostStyleProps {
  open?: boolean;
  margin?: string;
}

export const MobileStyle = styled.span`
  display: none:

  ${mediaQueries.MOBILE} {
    display: inline;
  }
`;

export const BoostWrapper = styled.div`
  border: ${(props: BoostStyleProps) => (props.open ? "none" : "1px solid " + colors.accent.CIVIL_GRAY_4)};
  font-family: ${fonts.SANS_SERIF};
  margin: 0 auto 45px;
  padding: 30px 30px 30px 110px;
  position: relative;

  ${mediaQueries.MOBILE} {
    border-color: transparent;
    border-bottom: ${(props: BoostStyleProps) => (props.open ? "none" : "1px solid " + colors.accent.CIVIL_GRAY_4)};
    border-top: ${(props: BoostStyleProps) => (props.open ? "none" : "1px solid " + colors.accent.CIVIL_GRAY_3)};
    margin: 0 auto 30px;
    padding: 20px 15px;
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

  ${mediaQueries.MOBILE} {
    font-size: 16px;
    line-height: 22px;
    margin: 0 0 12px;
  }

  a {
    color: ${colors.accent.CIVIL_GRAY_0};
    transition: color 200ms ease;

    &:hover {
      color: ${colors.accent.CIVIL_BLUE};
    }
  }
`;
export const BoostImgDiv = styled.div`
  left: 30px;
  position: absolute;
  top: 30px;

  img {
    height: 64px;
    object-fit: contain;
    width: 64px;
  }

  ${mediaQueries.MOBILE} {
    display: none;
  }
`;

export const BoostImgDivMobile = styled.div`
  display: none;

  img {
    height: ${(props: BoostStyleProps) => (props.open ? "64px" : "32px")};
    margin-right: 10px;
    object-fit: contain;
    width: ${(props: BoostStyleProps) => (props.open ? "64px" : "32px")};
  }

  ${mediaQueries.MOBILE} {
    display: block;
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
      margin-bottom: 5px;
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

  ${mediaQueries.MOBILE} {
    font-size: 14px;
  }
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
      line-height: 28px;
    }
  }

  p {
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 15px;

    ${mediaQueries.MOBILE} {
      font-size: 16px;
      line-height: 28px;
    }
  }
`;

export const BoostDescriptionWhy = styled.div`
  color: ${colors.accent.CIVIL_GRAY_0};
  margin-bottom: 30px;

  p {
    font-size: 18px;
    line-height: 32px;
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
      line-height: 28px;
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
    border-radius: 0;
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

export const BoostPayWallet = styled.p`
  display: block;
  font-size: 14px;
  line-height: 19px;

  ${mediaQueries.MOBILE} {
    display: none;
  }
}`;

export const BoostPayWalletMobile = styled.p`
  display: none;

  ${mediaQueries.MOBILE} {
    display: block;
    font-size: 14px;
    line-height: 21px;
  }
}`;

export const LearnMore = styled.div`
  border: 1px solid ${colors.accent.CIVIL_GRAY_4};
  border-radius: 5px;
  font-size: 14px;
  line-height: 19px;
  padding: 15px;

  a {
    cursor: pointer;
    margin-right: 30px;

    &:last-of-type {
      margin-right: 0;
    }
  }

  ${mediaQueries.MOBILE} {
    // TODO(sruddy) add to yellow to const
    background-color: #FFFDE9;
    font-size: 12px;
    letter-spacing: -0.07px;
    line-height: 18px;
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

export const BoostFlexStartMobile = styled.div`
  ${mediaQueries.MOBILE} {
    align-items: flex-start;
    display: flex;
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
  margin: ${(props: BoostStyleProps) => props.margin || "0"};
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

export const BoostCompeletedWrapper = styled.div`
  border: 1px solid ${colors.accent.CIVIL_GRAY_2};
  font-family: ${fonts.SANS_SERIF};
  font-size: 14px;
  line-height: 20px;
  padding: 20px 25px 12px;
  margin: 30px 50px;

  ${mediaQueries.MOBILE} {
    padding: 10px 15px 2px;
    margin: 15px 10px;
  }

  h3,
  p {
    font-size: 14px;
    line-height: 20px;
    margin: 0 0 10px;

    ${mediaQueries.MOBILE} {
      margin: 0 0 15px;
    }
  }

  a {
    color: ${colors.accent.CIVIL_BLUE};
    text-decoration: none;

    &:hover {
      color: ${colors.accent.CIVIL_BLUE};
      text-decoration: underline;
    }
  }
`;
