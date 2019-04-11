import { WindowMessageHandler } from "./services/MessageHandler";
import { KeyManager } from "./services/keys/KeyManager";
import { LockboxService } from "./services/civil-node/LockboxService";
import { CivilPersistence } from "./services/civil-node/CivilPersistence";
import { CivilWebsocket } from "./services/communication/CivilWebsocket";

const PARENT = ["https://example-site.dev", "https://test1.local:3001/"];
const CIVIL_WEBSOCKET_URL = "ws://localhost:8080/ws";
const CIVIL_REST_URL = "http://localhost:8080";

console.log("initializing", document.referrer, document.location.href);
const handler = new WindowMessageHandler(document.referrer);
handler.initialize(async () => {
  const persistence = new CivilPersistence(CIVIL_REST_URL);
  const lockbox = new LockboxService(persistence);
  const websockets = new CivilWebsocket(CIVIL_WEBSOCKET_URL);
  const keyManager = await KeyManager.initialize(lockbox, websockets);
  return {
    keyManager
  };
});

if (window.addEventListener) {
  window.addEventListener("message", handleMessage);
} else {
  (window as any).attachEvent("onmessage", handleMessage);
}

function handleMessage(message: any) {
  if (message.origin + "/" === document.referrer) {
    handler.receive(message.data);
  }
}
