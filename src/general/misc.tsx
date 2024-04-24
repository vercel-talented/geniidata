import { WalletID } from "../components/connect-dialog/connectWallets";
import {
  SignWalletParams,
  signBitgetWallet,
  signLeatherWallet,
  signOkxWallet,
  signUnisatWallet,
  signWizzWallet,
  signXverseWallet,
} from "../components/connect-dialog/signWallets";

type SignAddressFn = (
  id: WalletID,
  address: string,
  publicKey: string
) => Promise<{
  type: "success" | "error";
  signature: string;
  message?: string;
}>;

export const signAddress: SignAddressFn = async (id, address, publicKey) => {
  let fn: SignWalletParams = async () => ({
    type: "error",
    signature: "",
  });

  switch (id) {
    case "unisat":
      fn = signUnisatWallet;
      break;
    case "xverse":
      fn = signXverseWallet;
      break;
    case "okx":
      fn = signOkxWallet;
      break;
    case "leather":
      fn = signLeatherWallet;
      break;
    case "bitget":
      fn = signBitgetWallet;
      break;
    case "wizz":
      fn = signWizzWallet;
      break;
  }

  return await fn(address, publicKey);
};
