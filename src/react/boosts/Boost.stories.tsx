import * as React from "react";
import { storiesOf } from "@storybook/react";
import { BoostCard } from "./BoostCard";

const boost = {
  id: "87d0fe80-505f-4c1c-8a09-db7e20cb1045",
  title: "Help The Colorado Sun stage a panel discussion about the impact of the opioid crisis on Colorado",
  why: "The opioid crisis is breaking hearts in Colorado — and that’s forcing doctors to make tough choices. The Colorado Sun is creating a panel discussion with doctors, residents, and families to dive deeper and learn more about the impact of the opioid crisis. With your help, we can bring new resources and help victims by having people discuss their experieences and plan on better ways to help this issue.",
  what: "We’ll be setting up a free panel discussion for the community. We’ll invite families, people, and anyone who would like to join in this panel discussion. The event will be open to all on a first come basis with invites being sent out. This panel will be a 1 to 2 hour discussion in our local theater.",
  about: "The Colorado Sun is a journalist-owned, ad-free news outlet based in Denver but which strives to cover all of Colorado so that our state — our community — can better understand itself.",
  items: [{ item: "Venue deposit", cost: 100 }, { item: "Flyers and materials", cost: 100 }, { item: "Stage equipment", cost: 25 }],
};

const onClickFunc = () => {
  console.log("clicked!");
};

storiesOf("Boosts", module)
  .add("Card List View", () => {
    return (
      <BoostCard
        open={false}
        boostId={boost.id}
        title={boost.title}
        goalAmount={325}
        paymentsTotal={25}
        why={boost.why}
        what={boost.what}
        about={boost.about}
        items={boost.items}
        handlePayments={onClickFunc}
      />
    );
  })
  .add("Card Full View", () => {
    return (
      <BoostCard
        open={true}
        boostId={boost.id}
        title={boost.title}
        goalAmount={325}
        paymentsTotal={25}
        why={boost.why}
        what={boost.what}
        about={boost.about}
        items={boost.items}
        handlePayments={onClickFunc}
      />
    );
  });
