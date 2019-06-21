import * as ethers from "ethers";

const alg: EcKeyGenParams = {
  name: "ECDSA",
  namedCurve: "P-256",
};

export class PersistentKey {
  private wallet: ethers.Wallet;

  static createRandom(): PersistentKey {
    const wallet = ethers.Wallet.createRandom();
    return PersistentKey.restore(wallet.privateKey);
  }
  static restore(privateKey: string) {
    return new PersistentKey(privateKey);
  }

  public constructor(privateKey: string) {
    this.wallet = new ethers.Wallet(privateKey);
  }

  public getEthAddress(): string {
    return this.wallet.address;
  }

  public getPrivateKey(): string {
    return this.wallet.privateKey;
  }
}
