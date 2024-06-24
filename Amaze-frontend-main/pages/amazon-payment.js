import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styles from "./amazon-payment.module.css";
import { useSelectedUser } from "../hooks/userselectes";

const sortPaymentMethods = (methods) => {
  return Object.keys(methods).sort((a, b) => {
    const methodA = methods[a];
    const methodB = methods[b];

    const cashbackA = methodA.cashback.length;
    const cashbackB = methodB.cashback.length;

    if (cashbackA !== cashbackB) {
      return cashbackB - cashbackA;
    }

    const tagsA = Object.keys(methodA.tags).filter((tag) => methodA.tags[tag] === 1).length;
    const tagsB = Object.keys(methodB.tags).filter((tag) => methodB.tags[tag] === 1).length;

    return tagsB - tagsA;
  });
};

const dummyData = {
  "data": {
    "others": {
      "UPI": {
        "cashback": [
          {
            "desc": "10% of discount on 200 above transaction max limit 100",
            "disc": 10,
            "maxDisc": 100,
            "minPurchase": 200
          },
          {
            "desc": "20% of discount on 2000 above transaction max limit 10000",
            "disc": 20,
            "maxDisc": 10000,
            "minPurchase": 20000
          }
        ],
        "savings": 100,
        "tags": {
          "discount": 0,
          "easy": 0,
          "fast": 0,
          "most": 1,
          "reliable": 0
        }
      },
      "WALLET": {
        "cashback": [],
        "savings": 0,
        "tags": {
          "discount": 0,
          "easy": 0,
          "fast": 0,
          "most": 0,
          "reliable": 1
        }
      }
    },
    "recommended": {
      "CARD": {
        "cashback": [
          {
            "desc": "20% of discount on 2000 above transaction max limit 1000",
            "disc": 20,
            "maxDisc": 1000,
            "minPurchase": 2000
          },
          {
            "desc": "30% of discount on 5000 above transaction max limit 2000",
            "disc": 30,
            "maxDisc": 2000,
            "minPurchase": 5000
          }
        ],
        "savings": 1800.0,
        "tags": {
          "discount": 1,
          "easy": 0,
          "fast": 0,
          "most": 1,
          "reliable": 1
        }
      },
      "net banking": {
        "cashback": [],
        "savings": 0,
        "tags": {
          "discount": 0,
          "easy": 1,
          "fast": 1,
          "most": 0,
          "reliable": 0
        }
      }
    }
  }
};

const AmazonPayment = () => {
  const router = useRouter();
  const [selectedUser] = useSelectedUser();
  const [paymentMethods, setPaymentMethods] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupData, setPopupData] = useState(null);
  const [confirmationPopupVisible, setConfirmationPopupVisible] = useState(false);
  const [itemName, setItemName] = useState("Luxury Watch");
  const [purchaseAmount, setPurchaseAmount] = useState(7577);
  const [purchaseType, setPurchaseType] = useState("electronics");
  const [successPopupVisible, setSuccessPopupVisible] = useState(false);
  const [savedSavings, setSavedSavings] = useState(0);

  useEffect(() => {
    if (!selectedUser) return;

    axios
      .post("http://localhost:11000/method", {
        features: [selectedUser, 2000, "luxury"],
      })
      .then((response) => {
        console.log(response.data);
        setPaymentMethods(response.data.data);

        // Store the savings of the recommended method
        const recommendedMethod = Object.values(response.data.data.recommended)[0];
        setSavedSavings(recommendedMethod.savings);
      })
      .catch((error) => {
        console.error("Error fetching payment methods:", error);
        setPaymentMethods(dummyData.data);

        // Store the savings from dummy data
        const recommendedMethod = Object.values(dummyData.data.recommended)[0];
        setSavedSavings(recommendedMethod.savings);
      });
  }, [selectedUser]);



  const onShowDiscountClick = useCallback(() => {
    if (selectedMethod) {
      const method = paymentMethods.recommended[selectedMethod] || paymentMethods.others[selectedMethod];
      setPopupData(method);
      setPopupVisible(true);
    }
  }, [selectedMethod, paymentMethods]);

  const onBackButtonClick = useCallback(() => {
    router.push("/amazon-product-buy-watch");
  }, [router]);

  const handleButtonClick = (method) => {
    setSelectedMethod(method);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const onContinueClick = useCallback(() => {
    if (selectedMethod) {
      setConfirmationPopupVisible(true);
    } else {
      alert("Please select a payment method.");
    }
  }, [selectedMethod]);

  const handleConfirmPurchase = useCallback(() => {
    if (!selectedUser) return;

    const apiUrl = "http://localhost:11000/payment";
    const requestData = {
      email: selectedUser,
      purchaseAmount: purchaseAmount,
      purchaseType: purchaseType,
      paymentCompletionTime: 2,
      success: 1,
      method: selectedMethod,
      name: "watch",
      savings: `${savedSavings}`
    };

    axios.post(apiUrl, requestData)
      .then(response => {
        console.log("Request Data:", requestData)
        console.log("Purchase response:", response.data);
        if (response.data.status === "success") {
          setConfirmationPopupVisible(false);
          setSuccessPopupVisible(true);
        } else {
          alert("Payment failed. Please try again.");
        }
      })
      .catch(error => {
        console.error("Error confirming purchase:", error);
        alert("An error occurred. Please try again.");
      });
  }, [selectedUser, selectedMethod, purchaseAmount, purchaseType, savedSavings]);


  if (!selectedUser) {
    return <div>Please select a user first</div>;
  }

  if (!paymentMethods) return <div>Loading...</div>;

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

      <section className={styles.moreWaysToPay} style={{ height: "100px", overflow: "hidden" }}>
        <div className={styles.mpay}>
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
                <div className={styles.tags}>
                  {Object.keys(method.tags).map((tag) =>
                    method.tags[tag] === 1 ? (
                      <span key={tag} className={`${styles.tag} ${styles[tag]}`}>
                        {tag}
                      </span>
                    ) : null
                  )}
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
                  <div className={styles.tags}>
                    {Object.keys(method.tags).map((tag) =>
                      method.tags[tag] === 1 ? (
                        <span key={tag} className={`${styles.tag} ${styles[tag]}`}>
                          {tag}
                        </span>
                      ) : null
                    )}
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

      {popupVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.popupContent}>
            <button className={styles.closeButton} onClick={handleClosePopup}>
              &times;
            </button>
            <h2 className={styles.popupTitle}>Discount and Savings Information</h2>
            <div className={styles.popupBody}>
              <h3 className={styles.popupSubtitle}>Cashback Offers:</h3>
              <ul className={styles.popupList}>
                {popupData.cashback.map((offer, index) => (
                  <li key={index} className={styles.popupListItem}>
                    <span className={styles.offerDesc}>{offer.desc}:</span>
                    <span className={styles.offerDetails}>
                      {offer.disc}% off, Max Discount: ₹{offer.maxDisc}, Minimum Purchase: ₹{offer.minPurchase}
                    </span>
                  </li>
                ))}
              </ul>
              <h3 className={styles.popupSubtitle}>Savings:</h3>
              <p className={styles.popupSavings}>₹{popupData.savings}</p>
            </div>
          </div>
        </div>
      )}

      {confirmationPopupVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.amazonPopupContent}>
            <div className={styles.amazonPopupHeader}>
              <h2>Review your order</h2>
              <button className={styles.amazonCloseButton} onClick={() => setConfirmationPopupVisible(false)}>
                &times;
              </button>
            </div>
            <div className={styles.amazonPopupBody}>
              <div className={styles.orderDetails}>
                <h3>Order Summary</h3>
                <p><strong>Item:</strong> {itemName}</p>
                <p><strong>Amount:</strong> ₹{purchaseAmount.toLocaleString('en-IN')}</p>
                <p><strong>Payment Method:</strong> {selectedMethod}</p>
              </div>
              <div className={styles.amazonPopupButtons}>
                <button className={styles.amazonConfirmButton} onClick={handleConfirmPurchase}>
                  Place your order
                </button>
                <button className={styles.amazonCancelButton} onClick={() => setConfirmationPopupVisible(false)}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className={styles.amazonPaymentChild} />
      <div className={styles.addGiftCard}>Add Gift card or Promo Code</div>

      <button className={styles.showDiscountButton} onClick={onShowDiscountClick}>
        Show Discount
      </button>

      <button className={styles.buttons}>
        <div className={styles.addToCartAndBuyNow}>
          <div className={styles.addToCart} onClick={onContinueClick}>
            <button className={styles.addToCart1} />
            <div className={styles.continue}>continue</div>
          </div>
        </div>
      </button>

      {successPopupVisible && (
        <div className={styles.popupOverlay}>
          <div className={styles.amazonPopupContent}>
            <div className={styles.amazonPopupHeader}>
              <h2>Order Placed Successfully</h2>
              <button className={styles.amazonCloseButton} onClick={() => setSuccessPopupVisible(false)}>
                &times;
              </button>
            </div>
            <div className={styles.amazonPopupBody}>
              <div className={styles.successMessage}>
                <img src="/pngegg.png" alt="Success" className={styles.successIcon} />
                <h3>Thank you, your order has been placed.</h3>
                <p>Your payment was successful and your order is being processed.</p>
              </div>
              <div className={styles.orderSummary}>
                <h4>Order Summary</h4>
                <p><strong>Item:</strong> {itemName}</p>
                <p><strong>Amount:</strong> ₹{purchaseAmount.toLocaleString('en-IN')}</p>
                <p><strong>Payment Method:</strong> {selectedMethod}</p>
              </div>
              <div className={styles.amazonPopupButtons}>
                <button className={styles.amazonConfirmButton} onClick={() => setSuccessPopupVisible(false)}>
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AmazonPayment;
