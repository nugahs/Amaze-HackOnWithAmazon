import { memo, useCallback } from "react";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import styles from "./bottom-bar1.module.css";

const BottomBar1 = memo(({ className = "" }) => {
  const router = useRouter();

  const onAmazonClick = useCallback(() => {
    router.push("/amazon-product-buy-watch");
  }, [router]);

  const onCustomerClick = useCallback(() => {
    router.push("/");
  }, [router]);

  return (
    <footer className={[styles.bottomBar, className].join(" ")} id="Footer">
      <div className={styles.ui}>
        <div className={styles.uiChild} />
        <div className={styles.homeindicator}>
          <div className={styles.homeIndicator} />
        </div>
      </div>
      <div className={styles.buttons}>
        <div className={styles.menuButtons}>
          <button className={styles.amazon} onClick={onAmazonClick} />
          <button className={styles.customer} onClick={onCustomerClick} />
          <button className={styles.shoppingCart} />
          <img className={styles.menuIcon} alt="" src="/menu@2x.png" />
        </div>
        <div className={styles.selectedBar}>
          <div className={styles.selectedBarChild} />
          <div className={styles.selectedBarItem} />
        </div>
      </div>
    </footer>
  );
});

BottomBar1.propTypes = {
  className: PropTypes.string,
};

export default BottomBar1;
