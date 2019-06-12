import * as React from "react";
import { BoostModalContents } from "./BoostStyledComponents";
import { colors, FullScreenModal, CloseBtn, CloseXIcon } from "@joincivil/components";

export interface BoostModalProps {
  open: boolean;
  children: any;
  handleClose(): void;
}

export const BoostModal: React.FunctionComponent<BoostModalProps> = props => {
  return (
    <>
      <FullScreenModal open={props.open}>
        <BoostModalContents>
          <CloseBtn onClick={props.handleClose}>
            <CloseXIcon color={colors.accent.CIVIL_GRAY_2} />
          </CloseBtn>
          {props.children}
        </BoostModalContents>
      </FullScreenModal>
    </>
  );
};
