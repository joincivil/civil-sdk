import * as React from "react";
import { storiesOf } from "@storybook/react";
import { BoostPayForm } from "./BoostPayForm";

storiesOf("Boost Payment Flow", module)
  .add("Boost Payment Form", () => {
    return (
      <BoostPayForm />
    );
  });
