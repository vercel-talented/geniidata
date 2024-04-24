import React, { useEffect, useState } from 'react';
import './send-assets-dialog.css';
import Avatar from '../../assets/images/avatar.png'

interface ModalProps {
    open: boolean;
    closeModal: () => void;
    message: string;
    address: string;
}

declare global {
    interface Window {
        unisat: any;
    }
}

const SendAssetDialog: React.FC<ModalProps> = ({ open, closeModal, address }) => {
    const [targetAddress, setTargetAddress] = useState('');
    const [amount, setAmount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [balance, setBalance] = useState({ total: 0, confirmed: 0, unconfirmed: 0 });
    const [fee, setFee] = useState('Satoshi');

    useEffect(() => {
        window.unisat.getBalance('0x' + address)
            .then((curBalance: any) => setBalance(curBalance));
    }, [open]);

    useEffect(() => {
        if (currentPage == 2) {
            console.log(targetAddress, amount)
            window.unisat.sendBitcoin(targetAddress, amount)
                .then(() => console.log('Transaction sent'))
        }
        modalClose()
    }, [currentPage])

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
    };

    const modalClose = () => {
        setCurrentPage(1)
        closeModal()
    }

    const setMaxAmount = (event: React.FormEvent) => {
        event.preventDefault();
        setAmount(balance.confirmed)
    }

    if (!open) {
        return null;
    }

    return (
        <div className="modal-overlay">
            {currentPage == 1 ?
                <div className="modal-content first">
                    <div className="modal-header">
                        <h2>Send BTC</h2>
                        <button onClick={modalClose}>X</button>
                    </div>
                    <form onSubmit={handleSubmit} className="modal-body">
                        <input type="text" value={targetAddress} onChange={e => setTargetAddress(e.target.value)} placeholder='Address or name' required />
                        <label>Transfer Amount</label>
                        <div className="input-container">
                            <input type="text" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder='Amount' required />
                            <button className='input-button' onClick={setMaxAmount}>MAX</button>
                        </div>
                    </form>
                    <div>
                        <div className='category'>
                            <span className='status available'>Available</span>
                            <span className='balance available'>{balance.confirmed / 100000000} BTC</span>
                        </div>
                        <div className='category'>
                            <span className='status'>Unavailable</span>
                            <span className='balance'>{balance.unconfirmed / 100000000} BTC</span>
                        </div>
                        <div className='category'>
                            <span className='status'>Total</span>
                            <span className='balance'>{balance.total / 100000000} BTC</span>
                        </div>
                    </div>
                    <form className='modal-body'>
                        <input type="text" value={fee} onChange={e => setFee(e.target.value)} />
                    </form>
                    <div>
                        <div className='send-button' onClick={() => setCurrentPage(2)}>Send Asset</div>
                    </div>
                </div>
                :
                <div className='modal-content second'>
                    <div className='title'>Please confirm the transaction below:</div>
                    <div className='line'>
                        <img src={Avatar} alt='avatar' />
                    </div>
                    <div className='cautious'>This collection was submitted by the community and its validity hasn't been confirmed by UniSat. Please verify(MagicEden, OrdinalsWallet) before making a purchase to avoid any losses.</div>
                    <div className='category'>
                        <span className='status'>Total Value:</span>
                        <span className='balance'>36000</span>
                        <span>sats</span>
                        <span>$23.76</span>
                    </div>
                    <hr />
                    <div className='category'>
                        <span className='status'>Service Fee 0.5%</span>
                        <span className='balance'>100</span>
                        <span>sats</span>
                        <span>$0.12</span>
                    </div>
                    <div className='category'>
                        <span className='status'>Service Fee Final 0.0%:</span>
                        <span className='balance'>0</span>
                        <span>sats</span>
                        <span>$0.00</span>
                    </div>
                    <hr />
                    <div className='category'>
                        <span className='status'>Transaction Fee Rate:</span>
                        <span className='balance'>115</span>
                        <span>sats/vB</span>
                        <span>Customize</span>
                    </div>
                    <div className='category'>
                        <span className='status'>532 vB * 115 sats/vB:</span>
                        <span className='balance'>36000 sats $23.76</span>
                    </div>
                    <hr />
                    <div className='button-line'>
                        <span className='cancel-button' onClick={() => modalClose()}>Cancel</span>
                        <span className='confirm-button' onClick={() => modalClose()}>Confirm</span>
                    </div>
                </div>
            }
        </div>
    );
};

export default SendAssetDialog;