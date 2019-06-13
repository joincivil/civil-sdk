import * as React from "react";
import { BoostModalContents, BoostModalCloseBtn } from "./BoostStyledComponents";
import { colors, FullScreenModal, CloseXIcon } from "@joincivil/components";

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
          <BoostModalCloseBtn onClick={props.handleClose}>
            <CloseXIcon color={colors.accent.CIVIL_GRAY_2} />
          </BoostModalCloseBtn>
          {props.children}
        </BoostModalContents>
      </FullScreenModal>
    </>
  );
};
