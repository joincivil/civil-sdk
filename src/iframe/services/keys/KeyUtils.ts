import Cookies from "js-cookie";
import { Key } from "./Key";

export const DEVICE_KEYNAME = "device";
export const DEVICE_ID_COOKIE_NAME = `key|${DEVICE_KEYNAME}`;

// export async function saveKeyToCookie(key: Key, keyName: string) {
//   const json = await key.toJson();

//   Cookies.set(`key|${keyName}`, json);
// }

// export async function loadKeyFromCookie(keyName: string): Promise<Key | null> {
//   const json = Cookies.get(`key|${keyName}`);
//   if (json) {
//     return Key.fromJson(json);
//   }
//   return null;
// }

export async function getOrCreateDeviceKey(): Promise<Key> {
  let json = Cookies.get(`key|device`);
  if (json) {
    return Key.fromJson(json);
  }

  const deviceKey = await Key.generate();
  json = await deviceKey.toJson();
  Cookies.set(`key|device`, json);
  return deviceKey;
}

export function deleteDeviceCookie() {
  Cookies.remove(`key|device`);
}
