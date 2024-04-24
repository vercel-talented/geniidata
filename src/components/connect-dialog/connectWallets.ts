// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import UnisatLogo from "../../assets/images/unisat.png";
import XverseLogo from "../../assets/images/xverse.png";
import OkxLogo from "../../assets/images/okx.png";
import LeatherLogo from "../../assets/images/leather.png";
import BitgetLogo from "../../assets/images/bitget.png";
import WizzLogo from "../../assets/images/wizz.png";

import { AddressPurpose, RpcErrorCode, request } from "sats-connect";

export type ConnectWalletCallback = () => Promise<{
  type: string;
  address: string;
  publicKey: string;
  message: string;
}>;

export type WalletID =
  | "unisat"
  | "xverse"
  | "okx"
  | "leather"
  | "bitget"
  | "wizz";

export interface Wallet {
  id: WalletID;
  title: string;
  image: string;
  callback: ConnectWalletCallback;
}

async function connectUnisatWallet() {
  let address = "";
  let publicKey = "";
  try {
    const accounts = await window.unisat.requestAccounts();
    if (typeof accounts[0] === "string") {
      address = accounts[0];
      publicKey = await window.unisat.getPublicKey();
      console.log("Public Key: ", publicKey);
    }
    console.log("UNISAT WALLETS: ", accounts);

    return {
      type: "success",
      address,
      publicKey,
      message: "",
    };
  } catch (error) {
    return {
      type: "error",
      message: "Unisat Wallet Not Found",
      address,
      publicKey,
    };
  }
}

async function connectXverseWallet() {
  let address = "";
  let publicKey = "";

  try {
    const response = await request("getAccounts", {
      purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
      message: "Address for receiving Ordinals",
    });
    // console.log("getAccounts ~ response:", response);

    if (response.status === "success") {
      const ordinalsAddressItem = response.result.find(
        (address) => address.purpose === AddressPurpose.Ordinals
      );
      address = ordinalsAddressItem?.address || "";
      publicKey = ordinalsAddressItem?.publicKey || "";
    } else {
      if (response.error.code === RpcErrorCode.USER_REJECTION) {
        // handle user cancellation error
        return {
          type: "error",
          message: "Authorization Failed",
          address,
          publicKey,
        };
      } else {
        // handle error
        // console.log("An error occured", response.error);
        return {
          type: "error",
          message: "Xverse Wallet Not Found",
          address,
          publicKey,
        };
      }
    }

    return {
      type: "success",
      address,
      publicKey,
      message: "",
    };
  } catch {
    return {
      type: "error",
      message: "Xverse Wallet Not Found",
      address,
      publicKey,
    };
  }
}

async function connectOkxWallet() {
  let address = "";
  let publicKey = "";
  try {
    // if (window && window.okxwallet) {
    const account = await window.okxwallet.bitcoin.connect();
    address = account.address;
    publicKey = account.compressedPublicKey;

    return {
      type: "success",
      address,
      publicKey,
      message: "",
    };
    // }
  } catch (error) {
    console.log("Error Occured: ", error);
    return {
      type: "error",
      message: "OKX Wallet Not Found",
      address,
      publicKey,
    };
  }
}

async function connectLeatherWallet() {
  let address = "";
  let publicKey = "";
  try {
    // if (window && window.LeatherProvider) {
    const account = await window.btc?.request("getAddresses");
    //   const paymentPurpose = n === AddressPurpose.Payment ? "p2wpkh" : "p2tr",
    const specific = account.result.addresses.find(
      (address) => address.type === "p2tr"
    );
    address = specific.address;
    publicKey = specific.publicKey;

    return {
      type: "success",
      address,
      publicKey,
      message: "",
      //   };
    };
  } catch (error) {
    // console.log("Error: ", error);
    return {
      type: "error",
      message: "Leather Wallet Not Found",
      address,
      publicKey,
    };
  }
}

async function connectBitgetWallet() {
  let address = "";
  let publicKey = "";
  try {
    // if (window && window.bitkeep) {
    const account = await window.bitkeep.unisat.requestAccounts();
    address = account[0];
    publicKey = await window.bitkeep.unisat.getPublicKey();

    return {
      type: "success",
      address,
      publicKey,
      message: "",
    };
    // }
  } catch (error) {
    // console.log("Error: ", error);
    return {
      type: "error",
      message: "Bitget Wallet Not Found",
      address,
      publicKey,
    };
  }
}

async function connectWizzWallet() {
  let address = "";
  let publicKey = "";
  try {
    // if (window && window.wizz) {
    const account = await window.wizz.requestAccounts();
    address = account[0];
    publicKey = await window.wizz.getPublicKey();
    // }
    return {
      type: "success",
      address,
      publicKey,
      message: "",
    };
  } catch (error) {
    // console.log("Error: ", error);
    return {
      type: "error",
      message: "Wizz Wallet Not Found",
      address,
      publicKey,
    };
  }
}

// List of wallets to loop through
export const wallets: Wallet[] = [
  {
    id: "unisat",
    title: "Unisat",
    image: UnisatLogo,
    callback: connectUnisatWallet,
  },
  {
    id: "xverse",
    title: "Xverse",
    image: XverseLogo,
    callback: connectXverseWallet,
  },
  {
    id: "okx",
    title: "OKX Wallet",
    image: OkxLogo,
    callback: connectOkxWallet,
  },
  {
    id: "leather",
    title: "Leather Wallet",
    image: LeatherLogo,
    callback: connectLeatherWallet,
  },
  {
    id: "bitget",
    title: "Bitget Wallet",
    image: BitgetLogo,
    callback: connectBitgetWallet,
  },
  {
    id: "wizz",
    title: "Wizz Wallet",
    image: WizzLogo,
    callback: connectWizzWallet,
  },
];

// unisatSignMsg
// okxSignMsg
