import "./connect-dialog.css";
import { useState } from "react";
import { ConnectWalletCallback, WalletID, wallets } from "./connectWallets";
import { handleSignMessage } from "./signWallets";
import { AlertType } from "../alerts";

interface WalletItemProps {
  loading: boolean;
  image: string;
  title: string;
  handleClick: () => void;
}

function WalletItem({ title, image, loading, handleClick }: WalletItemProps) {
  return (
    <button className="wallet-item" onClick={handleClick}>
      <div className="content">
        <img className="logo" src={image} />
        <span className="title">{title}</span>
      </div>
      <div className="indicators">
        <i
          className="el-icon-loading"
          style={{
            display: loading ? "" : "none",
          }}
        ></i>
        <i
          className="iconfont icon-arrow-right"
          style={{
            display: loading ? "none" : "",
          }}
        ></i>
      </div>
    </button>
  );
}

export type ConnectedWalletParams = (
  wallet: WalletID,
  address: string,
  publicKey: string,
  signature: string,
) => void;

interface ConnectWalletProps {
  open: boolean;
  closeModal: () => void;
  onError: (type: AlertType, message: string) => void;
  onWalletConnect: ConnectedWalletParams;
}

export default function ConnectWallet({
  open,
  closeModal,
  onWalletConnect,
  onError,
}: ConnectWalletProps) {
  const [loadingWallets, setLoadingWallets] = useState<string[]>([]);

  async function handleLoadingWallets(
    id: WalletID,
    title: string,
    callback: ConnectWalletCallback
  ) {
    if (loadingWallets.includes(id)) {
      setLoadingWallets((prev) => prev.filter((walletID) => walletID !== id));
    } else {
      setLoadingWallets((prev) => [...prev, id]);
      const result = await callback();
      if (result.type === "success") {

        const signResponse = await handleSignMessage(
          id,
          result.address,
          result.publicKey
        );
        if (signResponse.type === "success") {
          onWalletConnect(
            id,
            result.address,
            result.publicKey,
            signResponse.signature,
          );
        } else {
          // console.log(signResponse.message);
          if (signResponse.message && signResponse.message?.length) {
            onError("error", signResponse.message);
          }
        }
      } else {
        onError(
          "error",
          `${title.replace("Wallet", "").trim()} Wallet Not Found`
        );
      }
      setLoadingWallets((prev) => prev.filter((walletID) => walletID !== id));
    }
  }

  return (
    <section className={`connect-dialog ${open ? "" : ""}`}>
      <aside className={`wrapper bg ${open ? "opened" : "closed"}`}></aside>
      <aside
        className={`wrapper ${open ? "opened" : "closed"}`}
        style={
          {
            //   display: open ? "" : "none",
          }
        }
      >
        <div className={`dialog ${open ? "opened" : "closed"}`}>
          <section className="header">
            <p className="title">Connect Wallet</p>
          </section>
          <section className="body">
            <div className="wallet-login">
              <p className="instruction">
                Please select the connection method.
              </p>
              <div className="wallet-list">
                {wallets.map((wallet, index) => (
                  <WalletItem
                    key={index}
                    title={wallet.title}
                    image={wallet.image}
                    loading={loadingWallets.includes(wallet.id)}
                    handleClick={() =>
                      handleLoadingWallets(
                        wallet.id,
                        wallet.title,
                        wallet.callback
                      )
                    }
                  />
                ))}
              </div>
            </div>
          </section>
          <section className="footer">
            <button
              className="gn-button gn-button--medium close-btn"
              onClick={closeModal}
            >
              Close
            </button>
          </section>
        </div>
      </aside>
    </section>
  );
}
