import { WalletDetails } from "../../App";
import HeaderBGImg from "../../assets/images/header-bg.png";
import PointsBG from "../../assets/images/points-bg.png";
import "./header.css";

interface HeaderProps {
  wallet: WalletDetails;
  openWalletCallback: () => void;
  openAssetCallback: () => void;
}

export default function Header({ wallet, openWalletCallback, openAssetCallback }: HeaderProps) {
  return (
    <section className="parent">
      <div className="container">
        {wallet.address.length > 0 ? (
          <div className="container-2">
            <div className="connected-wallet">
              <h1>Rewards</h1>
              <div className="display">
                <div className="header">
                  <span className="display-title">Points</span>
                </div>
                <div className="points-card">
                  <span className="points-value">0</span>
                  <div className="points-tip">
                    <span>Points&nbsp;</span>
                    <i className="iconfont gn-icon-click icon-info-circle1"></i>
                  </div>
                </div>
                <img className="points-bg" src={PointsBG} />
              </div>
            </div>
            <div className="new-button">
              <button className="gn-button gn-button--primary gn-button--medium connect-btn" onClick={openAssetCallback}>Test Account</button>
            </div>
          </div>
        ) : (
          <PageHeader openWalletCallback={openWalletCallback} />
        )}
      </div>
    </section>
  );
}

export function PageHeader({
  openWalletCallback,
}: {
  openWalletCallback: () => void;
}) {
  return (
    <div className="container-2">
      <div className="poster">
        <img src={HeaderBGImg} />
      </div>
      <div className="content">
        <h1 className="gn-h1">
          Connect your web3 wallet to view your rewards!
        </h1>
        <button
          className="gn-button gn-button--primary gn-button--medium connect-btn"
          onClick={openWalletCallback}
        >
          <i className="iconfont icon-wallet"></i>
          &nbsp;Connect Wallet
        </button>
      </div>
    </div>
  );
}
