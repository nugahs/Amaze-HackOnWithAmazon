import { useCallback } from "react";
import { useRouter } from "next/router";
import styles from "./amazon-redesign-dialogbox.module.css";

const AmazonRedesignDialogbox = () => {
  const router = useRouter();

  const onBackButtonClick = useCallback(() => {
    router.push("/amazon-payment");
  }, [router]);

  return (
    <div className={styles.amazonRedesignDialogbox}>
      <div className={styles.upiSection}>
        <div className={styles.upi}>
          <div className={styles.otherupi}>
            <div className={styles.otherupiChild} />
            <div className={styles.paymentdetails}>
              <b className={styles.otherUpiApps}>Other UPI Apps</b>
              <div className={styles.googlePayPhonepe}>
                Google Pay, PhonePe, Paytm and more
              </div>
            </div>
            <div className={styles.noselectedradio} />
          </div>
          <div className={styles.amazonupi}>
            <div className={styles.otherupiChild} />
            <div className={styles.paymentdetails}>
              <b className={styles.amazonPayUpi}>Amazon Pay UPI</b>
              <div className={styles.mvpicici}>mvp@icici</div>
            </div>
            <div className={styles.noselectedradio} />
          </div>
        </div>
        <img
          className={styles.upiLogoIcon1693161}
          alt=""
          src="/upi-logo-icon-169316-1@2x.png"
        />
      </div>
      <div className={styles.mlRecommendation}>
        <b className={styles.recommendation}>RECOMMENDATION</b>
        <div className={styles.visa}>
          <div className={styles.visaChild} />
          <div className={styles.paymentdetails}>
            <b className={styles.visa1}>Visa</b>
            <div className={styles.mvp}>**9876 | MVP</div>
          </div>
          <img
            className={styles.selectedpaymentIcon}
            alt=""
            src="/selectedpayment.svg"
          />
        </div>
        <div className={styles.amazon}>
          <div className={styles.otherupiChild} />
          <div className={styles.paymentdetails3}>
            <b className={styles.amazonPay}>{`Amazon Pay `}</b>
            <div className={styles.availableBalanceXyz}>
              available balance: ₹xyz
            </div>
            <div className={styles.last}>
              <div className={styles.lastChild} />
              <div className={styles.lastUsed}>Last used</div>
            </div>
          </div>
          <div className={styles.noselectedradio2} />
        </div>
      </div>
      <div className={styles.selectAPayment}>Select a payment method</div>
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
      <section className={styles.rectangleParent} id="OfferDetails">
        <div className={styles.frameChild} />
        <div className={styles.offer2}>
          <div className={styles.offer2Child} />
          <div className={styles.getUpto500}>
            Get upto ₹500 discount on purchase on above 3000 using Amazon Pay
          </div>
          <div className={styles.minOrderValue}>{`Min Order value : `}</div>
          <div className={styles.maxOfferValue}>Max Offer value :</div>
          <div className={styles.youGet}>You get :</div>
          <div className={styles.div1}>₹2000</div>
          <div className={styles.div2}>₹500</div>
          <div className={styles.div3}>₹500</div>
        </div>
        <div className={styles.offer1}>
          <section className={styles.offer2Child} id="DiscountOffer" />
          <div className={styles.getUpto20}>
            Get upto 20% discount on purchase on above ₹5000 using Amazon Pay
          </div>
          <div className={styles.minOrderValue}>{`Min Order value : `}</div>
          <div className={styles.maxOfferValue}>Max Offer value :</div>
          <div className={styles.youGet}>You get :</div>
          <div className={styles.div1}>₹5000</div>
          <div className={styles.div2}>₹2000</div>
          <div className={styles.div3}>₹800</div>
        </div>
        <div className={styles.offersForYou}>Offer Details</div>
      </section>
    </div>
  );
};

export default AmazonRedesignDialogbox;
