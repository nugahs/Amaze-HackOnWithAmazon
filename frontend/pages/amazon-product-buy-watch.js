import { useCallback, useState } from "react";
import "antd/dist/antd.min.css";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import BottomBar from "../components/bottom-bar";
import styles from "./amazon-product-buy-watch.module.css";
import { useSelectedUser } from "../hooks/userselectes";

const AmazonProductBuyWatch = () => {
  const router = useRouter();
  const [selectedUser] = useSelectedUser();
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [preferences, setPreferences] = useState({
    fast: false,
    reliable: false,
    most: false,
    easy: false,
    discount: false,
  });

  const onIconChevronleftClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const onAddToCartClick = useCallback(() => {
    router.push("/amazon-payment");
  }, [router]);

  const showPopup = () => {
    setIsPopupVisible(true);
  };

  const hidePopup = () => {
    setIsPopupVisible(false);
  };

  const handlePreferenceChange = (preference) => {
    setPreferences((prev) => ({ ...prev, [preference]: !prev[preference] }));
  };

  const handlePreferenceSubmit = async () => {
    if (!selectedUser) {
      console.error("No user selected");
      return;
    }

    const selectedPreferences = Object.keys(preferences).filter(
      (key) => preferences[key]
    );

    try {
      const response = await fetch("http://localhost:11000/tags", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: selectedUser,
          tags: selectedPreferences,
        }),
      });
      const data = await response.json();
      console.log(data);
      hidePopup();
      router.push("/amazon-payment");
    } catch (error) {
      console.error("Error submitting preferences:", error);
    }
  };

  if (!selectedUser) {
    return <div>Please select a user first</div>;
  }


  return (
    <div className={styles.amazonProductBuyWatch}>
      <div className={styles.topBar}>
        <div className={styles.topBarUi}>
          <div className={styles.topBarUi1}>
            <div className={styles.colorBackgroundHeader}>
              <div className={styles.topBar1}>
                <div className={styles.topBar2} />
              </div>
              <div className={styles.topBar3} />
            </div>
            <div className={styles.searchBarAndBackButton}>
              <div className={styles.searchBar} />
              <Button
                className={styles.iconChevronleft}
                type="text"
                icon={<LeftOutlined />}
                onClick={onIconChevronleftClick}
              />
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
      <div className={styles.productImage}>
        <div className={styles.image}>
          <div className={styles.comapplepasteboard1Wrapper}>
            <img
              className={styles.comapplepasteboard1Icon}
              alt=""
              src="/-comapplepasteboard-1@2x.png"
            />
          </div>
        </div>
        <img
          className={styles.imageScrollbarIcon}
          alt=""
          src="/image-scrollbar@2x.png"
        />
      </div>
      <div className={styles.productDescription}>
        <img className={styles.slice11} alt="" src="/slice-1-1@2x.png" />
        <div className={styles.visitTheTimex}>{`Visit the TIMEX Store `}</div>
        <div className={styles.timexWeekenderAnalog}>
          TIMEX Weekender Analog Beige Dial Unisex Watch
        </div>
        <div className={styles.div1}>
          <span>{`-55% `}</span>
          <span className={styles.span}>
            <span className={styles.span1}>{`₹ `}</span>
            <span>7,477</span>
          </span>
        </div>
        <div className={styles.mrp16700}>M.R.P.: ₹̶1̶6̶,̶7̶0̶0</div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.addToCartAndBuyNow}>
          <button className={styles.addToCart}>
            <div className={styles.addToCart1} onClick={onAddToCartClick} />
            <div className={styles.addToCart2}>Add to Cart</div>
          </button>
          <button className={styles.buyNow} onClick={showPopup}>
            <div className={styles.buyNow1} />
            <div className={styles.buyNow2}>Buy Now</div>
          </button>
        </div>
      </div>
      <BottomBar />
      <div className={styles.wishlistAndShare}>
        <img className={styles.heartIcon} alt="" src="/heart@2x.png" />
        <img
          className={styles.shareRoundedIcon}
          alt=""
          src="/share-rounded@2x.png"
        />
      </div>
      {isPopupVisible && (
        <div className={styles.popup}>
          <div className={styles.popupContent}>
            <h2>Select Your Preferences</h2>
            {Object.keys(preferences).map((pref) => (
              <div key={pref} className={styles.preferenceItem}>
                <input
                  type="checkbox"
                  id={pref}
                  checked={preferences[pref]}
                  onChange={() => handlePreferenceChange(pref)}
                />
                <label htmlFor={pref}>
                  {pref.charAt(0).toUpperCase() + pref.slice(1)}
                </label>
              </div>
            ))}
            <div className={styles.popupButtons}>
              <button onClick={hidePopup}>Cancel</button>
              <button onClick={handlePreferenceSubmit}>Submit</button>
            </div>
          </div>
        </div>
      )}


    </div>
  );
};

export default AmazonProductBuyWatch;
