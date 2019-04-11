import { SDKMessage } from "../SDKMessage";

interface Subscribers {
  [key: string]: Array<(data?: any) => void>;
}

export class DMZ {
  private sdkOrigin: string;
  private iframe?: Window;
  private subscribers: Subscribers = { READY: [] };

  public constructor(sdkOrigin: string) {
    this.sdkOrigin = sdkOrigin;
  }

  public initialize() {
    const iframe = document.getElementById("civil-sdk");
    if (!iframe) {
      throw new Error("could not find civil-sdk element ID");
    }
    const contentWindow = (iframe as HTMLIFrameElement).contentWindow;
    this.iframe = contentWindow!;

    if (window.addEventListener) {
      window.addEventListener("message", this.handleMessage.bind(this));
    } else {
      (window as any).attachEvent("onmessage", this.handleMessage.bind(this));
    }

    this.subscribers.READY.map(cb => cb());
  }
  public send(message: SDKMessage): Promise<void> {
    if (!this.iframe) {
      console.log("not ready to send");
    }
    return new Promise((resolve, reject) => {
      this.iframe!.postMessage(message, this.sdkOrigin);
      this.listen("REPLY_" + message.type, response => {
        console.log(message.type + " callback", response);
        resolve(response);
      });
    });
  }

  public addOnloadHandler(f: () => void): void {
    this.subscribers.READY.push(f);
  }

  public listen(event: string, callback: (data?: any) => void): void {
    if (!this.subscribers[event]) {
      this.subscribers[event] = [];
    }

    this.subscribers[event].push(callback);
  }

  private handleMessage(message: any) {
    if (message.origin === this.sdkOrigin) {
      console.log("message from sdk", message.origin, message.data);

      this.subscribers[message.data.type] &&
        this.subscribers[message.data.type].forEach(cb => cb(message.data));
      this.subscribers[message.data.type] = [];
    }
  }
}
