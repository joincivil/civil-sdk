import ky from "ky";
import { Persistence } from "./Persistence";
import { EncryptedData } from "../crypto/crypto";

export class CivilPersistence implements Persistence {
  private url: string;
  public constructor(url: string) {
    this.url = url;
  }
  public async store(
    publicKey: string,
    signature: string,
    objectID: string,
    data: EncryptedData
  ): Promise<any> {
    const request = {
      publicKey,
      signature,
      objectID,
      data
    };

    const result = await fetch(`${this.url}/lockbox/store`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(request)
    });
  }
  public async retrieve(
    publicKey: string,
    signature: string,
    objectID: string
  ): Promise<EncryptedData> {
    const result = await ky
      .post(`${this.url}/lockbox/retrieve`, {
        headers: { "Content-Type": "application/json" },
        json: {
          publicKey,
          signature,
          objectID
        }
      })
      .json();

    if (result === null) {
      throw new Error("unexpected response");
    }
    return (result as any) as EncryptedData;
  }
  public async delete(
    publicKey: string,
    signature: string,
    objectID: string
  ): Promise<any> {
    // delete this.database[publicKey][objectID];
  }

  public async selfDestruct(
    publicKey: string,
    signature: string
  ): Promise<any> {
    // delete this.database[publicKey];
  }
}
