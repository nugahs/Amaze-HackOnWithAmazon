import { useCallback } from "react";
import { useRouter } from "next/router";
import BottomBar1 from "../components/bottom-bar";
import styles from "./index.module.css";

const AmazonProduct = () => {
  const router = useRouter();

  const onGroupButtonClick = useCallback(() => {
    router.push("/amazon-budget");
  }, [router]);

  return (
    <div className={styles.amazonProduct}>
      <div className={styles.topBar}>
        <div className={styles.topBarUi}>
          <div className={styles.topBar}>
            <div className={styles.colorBackgroundHeader}>
              <div className={styles.topBar1}>
                <div className={styles.topBar2} />
              </div>
              <div className={styles.topBar3} />
            </div>
            <div className={styles.searchBarAndBackButton}>
              <div className={styles.searchBar} />
              <div className={styles.iconChevronleft}>􀆉</div>
              <img
                className={styles.iconMagnifyingglass}
                alt=""
                src="/icon--magnifyingglass.svg"
              />
              <div className={styles.searchAmazonin}>Search Amazon.in</div>
              <img
                className={styles.actionCamera}
                alt=""
                src="/action--camera.svg"
              />
            </div>
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
      <div className={styles.accoutSettings}>
        <b className={styles.orders}>Orders</b>
        <div className={styles.accoutSettingsChild} />
        <img className={styles.accoutSettingsItem} alt="" />
        <div className={styles.yourOrders}>Your Orders</div>
        <div className={styles.subscribeSave}>{`Subscribe & Save`}</div>
        <img className={styles.vectorIcon} alt="" src="/vector.svg" />
        <img className={styles.vectorIcon1} alt="" src="/vector.svg" />
      </div>
      <section className={styles.order} id="OrderSection" overflow-y="auto">
        <b className={styles.accountSettings}>Account Settings</b>
        <div className={styles.rectangleParent}>
          <div className={styles.groupChild} />
          <div className={styles.loginSecurity}>{`Login & security`}</div>
          <img className={styles.vectorIcon2} alt="" src="/vector1.svg" />
        </div>
        <div className={styles.rectangleGroup}>
          <div className={styles.groupItem} />
          <div className={styles.yourAddresses}>Your Addresses</div>
          <img className={styles.vectorIcon3} alt="" src="/vector2.svg" />
        </div>
        <div className={styles.rectangleContainer}>
          <div className={styles.groupInner} />
          <div className={styles.contentLibrary}>Content Library</div>
          <img className={styles.vectorIcon4} alt="" src="/vector3.svg" />
        </div>
        <div className={styles.groupDiv}>
          <div className={styles.groupChild} />
          <div className={styles.loginSecurity}>Devices</div>
          <img className={styles.vectorIcon2} alt="" src="/vector1.svg" />
        </div>
        <button className={styles.groupButton} onClick={onGroupButtonClick}>
          <div className={styles.groupChild} />
          <b className={styles.budgetPlanner}>Budget planner</b>
          <img className={styles.vectorIcon2} alt="" src="/vector1.svg" />
        </button>
        <div className={styles.rectangleParent1}>
          <div className={styles.groupChild} />
          <div className={styles.defaultPurchaseSetting}>
            Default Purchase setting
          </div>
          <img className={styles.vectorIcon2} alt="" src="/vector1.svg" />
        </div>
        <div className={styles.rectangleParent2}>
          <div className={styles.groupChild} />
          <div className={styles.defaultPurchaseSetting}>
            Manage Prime membership
          </div>
          <img className={styles.vectorIcon2} alt="" src="/vector1.svg" />
        </div>
        <div className={styles.rectangleParent3}>
          <div className={styles.groupChild} />
          <div className={styles.defaultPurchaseSetting}>
            Review your Purchases
          </div>
          <img className={styles.vectorIcon2} alt="" src="/vector1.svg" />
        </div>
        <div className={styles.rectangleParent4}>
          <div className={styles.groupChild} />
          <div className={styles.defaultPurchaseSetting}>Photo ID proofs</div>
          <img className={styles.vectorIcon2} alt="" src="/vector1.svg" />
        </div>
        <div className={styles.rectangleParent5}>
          <div className={styles.groupChild} />
          <div className={styles.defaultPurchaseSetting}>
            Manage seller account
          </div>
          <img className={styles.vectorIcon2} alt="" src="/vector1.svg" />
        </div>
      </section>
      <BottomBar1 />
    </div>
  );
};

export default AmazonProduct;
