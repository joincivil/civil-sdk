import * as React from "react";
import { BoostCompeletedWrapper } from "./BoostStyledComponents";

export interface BoostCompletedProps {
  goalReached: boolean;
}

export const BoostCompleted: React.FunctionComponent<BoostCompletedProps> = props => {
  return (
    <BoostCompeletedWrapper>
      {props.goalReached ? (
        <>
          <h3>Congratulations!</h3>
          <p>Your Boost reached its goal. Here are some next steps for you to take:</p>
          <p>
            <a href="#TODO">Learn how to withdraw money from your newsroom wallet and exchange ETH for fiat</a>
          </p>
        </>
      ) : (
        <>
          <h3>Your Boost has ended.</h3>
          <p>
            Your Boost did not reach its raised goal within the time frame. You are still able to access the proceeds
            from your contributors. Here are some next steps for you to take:
          </p>
          <p>
            <a href="#TODO">Learn how to withdraw money from your newsroom wallet and exchange ETH for fiat</a>
          </p>
          <p>
            <a href="#TODO">Re-Launch your Boost</a>
          </p>
        </>
      )}
    </BoostCompeletedWrapper>
  );
};
