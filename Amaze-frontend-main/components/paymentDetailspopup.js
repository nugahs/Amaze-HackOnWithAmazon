import React from 'react';
import styles from './paymentdetailspopup.module.css';

const PaymentDetailsPopup = ({ method, onClose, onSubmit }) => {
    const handleSubmit = () => {
        const paymentDetails = {
            email: "sukesssss1254a@gmail.com",
            purchaseAmount: 7577,
            purchaseType: "watch",
            paymentCompletionTime: 2,
            success: 1,
            method
        };

        onSubmit(paymentDetails);
    };

    return (
        <div className={styles.popupOverlay}>
            <div className={styles.popupContent}>
                <h2>Payment Details</h2>
                <p>Offer Details: ...</p>
                <p>Cashback: ...</p>
                {/* Add other details here */}
                <button onClick={handleSubmit}>Continue</button>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default PaymentDetailsPopup;
