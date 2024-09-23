import { useEffect, useState } from 'react';
import styles from './PaymentMethods.module.css';

const PaymentMethods = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch('http://localhost:11000/method', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                features: ["sukesssss1254a@gmail.com", 2000, "luxury"]
            })
        })
            .then(response => response.json())
            .then(data => setData(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const renderCards = (methods) => {
        return Object.keys(methods).map((method) => {
            const cashbackCount = methods[method].cashback.length;
            return (
                <div className={styles.card} key={method}>
                    <h3>{method}</h3>
                    <p>Savings: {methods[method].savings}</p>
                    {cashbackCount > 0 && (
                        <p>{cashbackCount} cashback offer(s) available</p>
                    )}
                    <div className={styles.tags}>
                        {Object.keys(methods[method].tags).map((tag) => (
                            methods[method].tags[tag] === 1 && <span key={tag} className={styles.tag}>{tag}</span>
                        ))}
                    </div>
                </div>
            );
        });
    };

    if (!data) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <h2>Recommended</h2>
            <div className={styles.section}>
                {renderCards(data.recommended)}
            </div>
            <h2>UPI</h2>
            <div className={styles.section}>
                {renderCards(data.others)}
            </div>
        </div>
    );
};

export default PaymentMethods;



//   return (
//     <div className={styles.amazonPayment}>
//       <div className={styles.topBar}>
//         <div className={styles.topBarUi}>
//           <div className={styles.topBarUi1}>
//             <div className={styles.colorBackgroundHeader}>
//               <div className={styles.topBar1}>
//                 <div className={styles.topBar2} />
//               </div>
//               <div className={styles.topBar3}>
//                 <button
//                   className={styles.backButton}
//                   onClick={onBackButtonClick}
//                 >
//                   <img
//                     className={styles.layer2Icon}
//                     alt=""
//                     src="/layer-2.svg"
//                   />
//                 </button>
//               </div>
//             </div>
//             <div className={styles.cancel}>cancel</div>
//           </div>
//         </div>
//         <div className={styles.selectAPayment}>Select a payment method</div>
//         <div className={styles.navbar}>
//           <div className={styles.statusbarIphone13}>
//             <img className={styles.notchIcon} alt="" src="/notch.svg" />
//             <div className={styles.leftSide}>
//               <div className={styles.statusbarTime}>
//                 <div className={styles.div}>9:41</div>
//               </div>
//             </div>
//             <div className={styles.rightSide}>
//               <img className={styles.batteryIcon} alt="" src="/battery.svg" />
//               <img className={styles.wifiIcon} alt="" src="/wifi.svg" />
//               <img
//                 className={styles.iconMobileSignal}
//                 alt=""
//                 src="/icon--mobile-signal.svg"
//               />
//             </div>
//           </div>
//         </div>
//       </div>

//       <button className={styles.buttons}>
//         <div className={styles.addToCartAndBuyNow}>
//           <div className={styles.addToCart} onClick={onAddToCartClick}>
//             <button className={styles.addToCart1} />
//             <div className={styles.continue}>continue</div>
//           </div>
//         </div>
//       </button>

//       <PaymentMethods />

//       <div className={styles.amazonPaymentChild} />
//       <div className={styles.addGiftCard}>Add Gift card or Promo Code</div>
//     </div>
//   );
// };
