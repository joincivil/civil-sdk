import { DMZ } from "./dmz/DMZ";
import { Lockbox } from "./lockbox/Lockbox";
import { Registry } from "./registry/Registry";
import { Telemetry } from "./telemetry/Telemetry";
const SDK_ORIGIN = "https://localhost.civil.dev:3000";

console.log("hello from civil sdk!");

const dmz = new DMZ(SDK_ORIGIN);

export class Civil {
  public lockbox: Lockbox;
  public registry: Registry;
  public telemetry: Telemetry;
  constructor() {
    this.lockbox = new Lockbox(dmz);
    this.registry = new Registry(dmz);
    this.telemetry = new Telemetry();
  }

  public onLoad(f: () => void) {
    dmz.addOnloadHandler(f);
  }
}

window.onload = () => {
  dmz.initialize();
};
(window as any).Civil = Civil;
