import * as React from "react";
import { RadioInput } from "@joincivil/components";
import { BoostPayEth } from "./BoostPayEth";
import { BoostPayCard } from "./BoostPayCard";

export interface BoostPayOptionsProps {
  onChange?: any;
  value?: any;
  name?: string;
}

export const BoostPayOptions: React.FunctionComponent<BoostPayOptionsProps> = props => {
  return (
    <>
      <RadioInput
        name=""
        label=""
        // onChange={}
      >
        <BoostPayEth />
        <BoostPayCard />
      </RadioInput>
    </>
  );
}
