import * as React from "react";
import { storiesOf } from "@storybook/react";

import { Boost } from "./Boost";

const boost = {
  image: "https://placehold.it/100",
  title:
    "Boost Description lorem ipsum dolor sit amet, consectetur adipiscing elit. In euismod condimentum mi quis faucibus.",
  newsroom: "The Colorado Sun",
  why:
    "Suspendisse rutrum elementum odio sit amet sodales. Praesent convallis urna at congue bibendum. Morbi vel auctor ipsum, in fermentum risus.",
  what:
    "Suspendisse rutrum elementum odio sit amet sodales. Praesent convallis urna at congue bibendum. Morbi vel auctor ipsum, in fermentum risus. Suspendisse nisl massa, viverra sed faucibus vel, fermentum quis tellus. Mauris nec egestas diam. Nulla facilisi.",
  about:
    "Praesent vulputate mauris vitae justo feugiat, eu porttitor libero blandit. Vestibulum ut mi quis ligula molestie dignissim. Quisque sodales, ligula in feugiat sollicitudin, leo elit sagittis diam, eu vehicula augue massa vitae sem. Fusce ut blandit eros. Aenean vulputate felis sagittis consequat placerat. Duis at dolor ut lorem lobortis cursus eget sit amet enim.",
  items: [
    { item: "Suspendisse rutrum elementum", cost: "$100" },
    { item: "Praesent vulputate mauris", cost: "$20" },
    { item: "Suspendisse rutrum elementum", cost: "$15" },
  ],
};

storiesOf("Boosts", module).add("Boost", () => (
  <Boost
    open={true}
    image={boost.image}
    title={boost.title}
    newsroom={boost.newsroom}
    why={boost.why}
    what={boost.what}
    about={boost.about}
    itemList={boost.items}
  />
));
