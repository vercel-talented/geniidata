/* eslint-disable @typescript-eslint/no-unused-vars */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { request } from "sats-connect";
import { WalletID } from "./connectWallets";
import { signAddress } from "../../general/misc";

type SignWalletReturnObj = Promise<{
  type: "success" | "error";
  signature: string;
  message?: string;
}>;

export type SignWalletParams = (
  address: string,
  publicKey: string
) => SignWalletReturnObj;

const message = "I authorize connecting my wallet to Pivot Solutions";
// Nonce: XRMWYP6KJ2JB5PXZ1KUNZYN4YBQOJ4

export type WalletConnectParams = (
  wallet: WalletID,
  address: string,
  publicKey: string
) => SignWalletReturnObj;

export const handleSignMessage: WalletConnectParams = async (
  id,
  address,
  publicKey
) => {
  const result = await signAddress(id, address, publicKey);
  if (result.type === "success") {
    return {
      type: "success",
      signature: result.signature,
    };
  } else {
    return {
      type: "error",
      signature: "",
      message: result?.message,
    };
  }
};

export const signUnisatWallet: SignWalletParams = async (
  _address,
  _publicKey
) => {
  let signature = "";
  try {
    signature = await window.unisat.signMessage(message);
    return {
      type: "success",
      signature,
    };
  } catch (error) {
    return {
      type: "error",
      signature,
    };
  }
};

export const signXverseWallet: SignWalletParams = async (
  address,
  _publicKey
) => {
  let signature = "";
  try {
    const result = await request("signMessage", {
      address,
      message,
    });
    signature = result?.result.signature;
    return {
      type: "success",
      signature,
    };
  } catch (error) {
    return {
      type: "error",
      signature,
    };
  }
};

export const signOkxWallet: SignWalletParams = async (address, _publicKey) => {
  let signature = "";
  try {
    signature = await window.okxwallet.bitcoin.signMessage(message, {
      from: address,
    });
    return {
      type: "success",
      signature,
    };
  } catch (error) {
    console.log("An error occured", error);
    return {
      type: "error",
      signature,
    };
  }
};

export const signLeatherWallet: SignWalletParams = async (
  address,
  _publicKey
) => {
  let signature = "";
  try {
    const response = await window.btc.request("signMessage", {
      message,
      paymentType: "p2tr",
    });

    if (response.result.address === address) {
      signature = response.result.signature;
    } else {
      throw Error("Sign Error");
    }

    return {
      type: "success",
      signature,
    };
  } catch (error) {
    return {
      type: "error",
      signature,
      message: error?.message,
    };
  }
};

export const signBitgetWallet: SignWalletParams = async (
  _address,
  _publicKey
) => {
  let signature = "";
  try {
    signature = await window.bitkeep.unisat.signMessage(message);
    return {
      type: "success",
      signature,
    };
  } catch (error) {
    return {
      type: "error",
      signature,
    };
  }
};

export const signWizzWallet: SignWalletParams = async (
  _address,
  _publicKey
) => {
  let signature = "";
  try {
    signature = await window.wizz.signMessage(message);
    return {
      type: "success",
      signature,
    };
  } catch (error) {
    return {
      type: "error",
      signature,
    };
  }
};
