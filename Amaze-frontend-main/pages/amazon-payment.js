import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./amazon-payment.module.css";

const sortPaymentMethods = (methods) => {
  return Object.keys(methods).sort((a, b) => {
    const methodA = methods[a];
    const methodB = methods[b];

    const cashbackA = methodA.cashback.length;
    const cashbackB = methodB.cashback.length;

    if (cashbackA !== cashbackB) {
      return cashbackB - cashbackA; // Sort by number of cashback offers
    }

    const tagsA = Object.keys(methodA.tags).filter((tag) => methodA.tags[tag] === 1).length;
    const tagsB = Object.keys(methodB.tags).filter((tag) => methodB.tags[tag] === 1).length;

    return tagsB - tagsA; // Sort by number of tags
  });
};

const AmazonPayment = () => {
  const router = useRouter();
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");

  useEffect(() => {
    axios
      .post("http://localhost:7000/method", {
        features: ["sukesssss1254a@gmail.com", 2000, "luxury"],
      })
      .then((response) => {
        console.log(response.data); // Log the response for debugging
        setPaymentMethods(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching payment methods:", error);
      });
  }, []);

  const onAddToCartClick = useCallback(() => {
    router.push("/amazon-redesign-dialogbox");
  }, [router]);

  const onBackButtonClick = useCallback(() => {
    router.push("/amazon-product-buy-watch");
  }, [router]);

  const handleButtonClick = (method) => {
    setSelectedMethod(method);
  };

  if (!paymentMethods) return <div>Loading...</div>; // Loading indicator

  const { recommended, others } = paymentMethods;

  const sortedRecommended = sortPaymentMethods(recommended);
  const sortedOthers = sortPaymentMethods(others);

  return (
    <div className={styles.amazonPayment}>
      <div className={styles.topBar}>
        <div className={styles.topBarUi}>
          <div className={styles.topBarUi1}>
            <div className={styles.colorBackgroundHeader}>
              <div className={styles.topBar1}>
                <div className={styles.topBar2} />
              </div>
              <div className={styles.topBar3}>
                <button
                  className={styles.backButton}
                  onClick={onBackButtonClick}
                >
                  <img
                    className={styles.layer2Icon}
                    alt=""
                    src="/layer-2.svg"
                  />
                </button>
              </div>
            </div>
            <div className={styles.cancel}>cancel</div>
          </div>
        </div>
        <div className={styles.selectAPayment}>Select a payment method</div>
        <div className={styles.navbar}>
          <div className={styles.statusbarIphone13}>
            <img className={styles.notchIcon} alt="" src="/notch.svg" />
            <div className={styles.leftSide}>
              <div className={styles.statusbarTime}>
                <div className={styles.div}>9:41</div>
              </div>
            </div>
            <div className={styles.rightSide}>
              <img className={styles.batteryIcon} alt="" src="/battery.svg" />
              <img className={styles.wifiIcon} alt="" src="/wifi.svg" />
              <img
                className={styles.iconMobileSignal}
                alt=""
                src="/icon--mobile-signal.svg"
              />
            </div>
          </div>
        </div>
      </div>

      <button className={styles.buttons}>
        <div className={styles.addToCartAndBuyNow}>
          <div className={styles.addToCart} onClick={onAddToCartClick}>
            <button className={styles.addToCart1} />
            <div className={styles.continue}>continue</div>
          </div>
        </div>
      </button>
      <section className={styles.moreWaysToPay}>
        <div className={styles.mpay}>
          <button className={styles.cod}>
            <div className={styles.codChild} />
            <div className={styles.noselectedradio} />
            <div className={styles.last}>
              <img className={styles.lastChild} alt="" src="/rectangle-4.svg" />
              <div className={styles.mostFrequentUsed}>Most frequent used</div>
            </div>
            <div className={styles.cashOnDelivery}>Cash on Delivery</div>
          </button>
          <button className={styles.emi}>
            <div className={styles.codChild} />
            <div className={styles.paymentdetails}>
              <div className={styles.emi1}>EMI</div>
            </div>
            <div className={styles.noselectedradio} />
          </button>
        </div>
        <b className={styles.moreWaysTo}>MORE WAYS TO PAY</b>
      </section>
      <section className={styles.creditDebitCards}>
        <div className={styles.cd}>
          <button className={styles.cd1}>
            <div className={styles.cdChild} />
            <div className={styles.paymentdetails1}>
              <div className={styles.creditOrDebit}>CREDIT OR DEBIT CARD</div>
            </div>
            <div className={styles.noselectedradio2} />
          </button>
        </div>
        <b className={styles.creditDebit}>CREDIT & DEBIT CARDS</b>
      </section>
      <div className={styles.mlRecommendation}>
        <b className={styles.recommendation}>RECOMMENDATION</b>
        {sortedRecommended.map((key) => {
          const method = recommended[key];
          return (
            <button
              key={key}
              className={styles.amazonupi}
              onClick={() => handleButtonClick(key)}
              style={{
                backgroundColor:
                  selectedMethod === key ? "var(--color-khaki)" : "initial",
              }}
            >
              <div className={styles.otherupiChild} />
              <div className={styles.paymentdetails3}>
                <b className={styles.amazonPayUpi}>{key}</b>
                <div className={styles.mvpicici}>{method.detail}</div>
                <div className={styles.last2}>
                  <img
                    className={styles.lastInner}
                    alt=""
                    src="/rectangle-41.svg"
                  />
                  <div className={styles.fast}>fast</div>
                </div>
              </div>
              <div className={styles.noselectedradio3} />
              {selectedMethod === key && (
                <img
                  className={styles.selectedpaymentIcon}
                  alt=""
                  src="/selectedpayment.svg"
                />
              )}
            </button>
          );
        })}
      </div>
      <section className={styles.upiSection} id="UpiSection">
        <b className={styles.upi}>UPI</b>
        <div className={styles.upi}>
          {sortedOthers.map((key) => {
            const method = others[key];
            return (
              <button
                key={key}
                className={styles.visa}
                onClick={() => handleButtonClick(key)}
                style={{
                  backgroundColor:
                    selectedMethod === key ? "var(--color-khaki)" : "initial",
                }}
              >
                <div className={styles.visaChild} />
                <div className={styles.paymentdetails4}>
                  <b className={styles.visa1}>{key}</b>
                  <div className={styles.mvp}>{method.detail}</div>
                  <div className={styles.offerApplied1}>1 offer applied</div>
                  <div className={styles.last3}>
                    <div className={styles.rectangleDiv} />
                    <div className={styles.saved}>₹200* saved</div>
                  </div>
                  <div className={styles.onlineTransactionsDone1}>
                    20,122 online transactions done without any fail
                  </div>
                </div>
                {selectedMethod === key && (
                  <img
                    className={styles.selectedpaymentIcon}
                    alt=""
                    src="/selectedpayment.svg"
                  />
                )}
                <div className={styles.noselectedradio5} />
              </button>
            );
          })}
        </div>
      </section>
      <div className={styles.amazonPaymentChild} />
      <div className={styles.addGiftCard}>Add Gift card or Promo Code</div>
    </div>
  );
};

export default AmazonPayment;
