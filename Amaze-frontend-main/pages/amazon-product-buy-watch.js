import { useCallback } from "react";
import "antd/dist/antd.min.css";
import { Button } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
// import BottomBar2 from "../components/bottom-bar2";

import BottomBar from "../components/bottom-bar";
import styles from "./amazon-product-buy-watch.module.css";

const AmazonProductBuyWatch = () => {
  const router = useRouter();

  const onIconChevronleftClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const onAddToCartClick = useCallback(() => {
    router.push("/amazon-payment");
  }, [router]);

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
          <button className={styles.buyNow} onClick={onAddToCartClick}>
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
    </div>
  );
};

export default AmazonProductBuyWatch;
