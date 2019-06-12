import * as React from "react";
import { storiesOf } from "@storybook/react";
import { BoostPayments } from "./BoostPayments";
import { BoostPayForm } from "./BoostPayForm";

storiesOf("Boost Payment Flow", module)
  .add("Boost Payments", () => {
    return (
      <>
        <BoostPayments
          boostId={"87d0fe80-505f-4c1c-8a09-db7e20cb1045"}
          title={"Help The Colorado Sun stage a panel discussion about the impact of the opioid crisis on Colorado"}
          newsroom={"The Colorado Sun"}
          amount={20}
        />
        <BoostPayForm />
      </>
    );
  });
