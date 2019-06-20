import * as React from "react";
import styled from "styled-components";
import { mediaQueries, defaultNewsroomImgUrl } from "@joincivil/components";
import * as IPFS from "ipfs-http-client";
import { promisify } from "@joincivil/utils";

const ipfs = new IPFS({
  host: "ipfs.infura.io",
  port: 5001,
  protocol: "https",
});

const ipfsAsync = {
  get: promisify<[{ path: string; content: Buffer }]>(ipfs.get),
  add: promisify<[{ path: string; hash: string; size: number }]>(ipfs.add),
  pin: promisify<[{ hash: string }]>(ipfs.pin.add),
};

const BoostImgDiv = styled.div`
  left: 30px;
  position: absolute;
  top: 30px;

  img {
    height: 64px;
    min-width: 64px;
    min-height: 64px;
    object-fit: contain;
    width: 64px;

    ${mediaQueries.MOBILE} {
      display: none;
    }
  }
`;

export interface BoostImgProps {
  charterUri: string;
}

export interface BoostImgState {
  fetchInProgress: boolean;
  charter?: any;
}

export class BoostImg extends React.Component<BoostImgProps, BoostImgState> {
  constructor(props: BoostImgProps) {
    super(props);
    this.state = {
      fetchInProgress: false,
    };
  }
  public async componentDidMount(): Promise<void> {
    const uri = this.props.charterUri.replace("ipfs://", "/ipfs/");
    const content = await ipfsAsync.get(uri);
    const ipfsFile = content.reduce((acc, file) => acc + file.content.toString("utf8"), "");
    const charter = JSON.parse(ipfsFile.toString());
    this.setState({ charter });
  }

  public render(): JSX.Element {
    if (this.state.charter) {
      return (
        <BoostImgDiv>
          <img
            src={this.state.charter.logoUrl || ((defaultNewsroomImgUrl as any) as string)}
            onError={e => {
              (e.target as any).src = defaultNewsroomImgUrl;
            }}
          />
        </BoostImgDiv>
      );
    } else {
      return <></>;
    }
  }
}
