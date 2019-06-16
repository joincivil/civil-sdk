import * as React from "react";
import { BoostProgress } from "./BoostProgress"
import {
  BoostButton,
  BoostFlexStart,
  BoostWrapper,
  BoostImg,
  BoostTitle,
  BoostNewsroomInfo,
  BoostNewsroom,
  BoostDescription,
  BoostDescriptionTable,
  BoostProgressCol,
} from "./BoostStyledComponents";

export interface Items {
  item: string;
  cost: number;
}

export interface BoostCardProps {
  open: boolean;
  boostId: string;
  title: string;
  goalAmount: number;
  paymentsTotal: number;
  why: string;
  what: string;
  about: string;
  items: Items[];
  handlePayments(): void;
}

// TODO(sruddy) get newsroom data from address
const boost = {
  image: "https://cdn.mos.cms.futurecdn.net/ewcvC8bNBec6oMG9zufgVg.jpg",
  newsroom: "Block Club Chicago",
  newsroomUrl: "https://blockclubchicago.org/",
  newsroomRegistryUrl: "https://registry.civil.co/listing/0x23daa7fba48cd68a2b86a77a1e707a6aae41c4ea",
  daysLeft: 15,
};

export const BoostCard: React.FunctionComponent<BoostCardProps> = props => {
  return (
    <BoostWrapper open={props.open}>
      <BoostImg>
        <img src={boost.image} />
      </BoostImg>
      <BoostTitle>
        {props.open ? <>{props.title}</> : <a href={"/boosts/" + props.boostId}>{props.title}</a>}
      </BoostTitle>
      <BoostNewsroomInfo>
        <BoostNewsroom>{boost.newsroom}</BoostNewsroom>
        {props.open && (
          <>
            <a href={boost.newsroomUrl} target="_blank">
              Vist Newsroom
            </a>
            <a href={boost.newsroomRegistryUrl} target="_blank">
              Visit Civil Registry
            </a>
          </>
        )}
      </BoostNewsroomInfo>
      <BoostFlexStart>
        <BoostProgressCol open={props.open}>
          <BoostProgress open={props.open} goalAmount={props.goalAmount} paymentsTotal={props.paymentsTotal} daysLeft={boost.daysLeft} />
        </BoostProgressCol>
        {props.open && (<BoostButton onClick={props.handlePayments}>Support</BoostButton>)}
      </BoostFlexStart>
      {props.open && (
        <>
          <BoostDescription>
            <p>{props.why}</p>
          </BoostDescription>
          <BoostDescription>
            <h3>What the outcome will be</h3>
            <p>{props.what}</p>
          </BoostDescription>
          <BoostDescription>
            <h3>About the newsroom</h3>
            <p>{props.about}</p>
          </BoostDescription>
          <BoostDescriptionTable>
            <h3>Where your support goes</h3>
            <table>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Cost</th>
                </tr>
              </thead>
              <tbody>
                {props.items.map((item: any, i: number) => (
                  <tr key={i}>
                    <td>{item.item}</td>
                    <td>{"$" + item.cost}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BoostDescriptionTable>
          <BoostDescription>
            <h3>Questions about Boosts?</h3>
            <p><a href="#TODO">Learn more in our FAQ</a></p>
          </BoostDescription>
        </>
      )}
    </BoostWrapper>
  );
};
