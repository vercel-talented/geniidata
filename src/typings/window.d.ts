import { IWalletProvider as WizzWalletProvider } from "@wizz-btc/provider";

declare global {
  interface Window {
    wizz: WizzWalletProvider;
  }
}

export {};
