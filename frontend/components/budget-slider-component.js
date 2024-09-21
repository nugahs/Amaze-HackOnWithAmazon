import { useMemo } from "react";
import PropTypes from "prop-types";
import styles from "./budget-slider-component.module.css";

const BudgetSliderComponent = ({
  className = "",
  prop,
  annualBudget7000,
  ellipse2,
  propHeight,
  propLeft,
  propBackgroundColor,
}) => {
  const frameDivStyle = useMemo(() => {
    return {
      height: propHeight,
    };
  }, [propHeight]);

  const annualBudget7000Style = useMemo(() => {
    return {
      left: propLeft,
    };
  }, [propLeft]);

  const ellipseDivStyle = useMemo(() => {
    return {
      backgroundColor: propBackgroundColor,
    };
  }, [propBackgroundColor]);

  return (
    <div
      className={[styles.rectangleParent, className].join(" ")}
      style={frameDivStyle}
    >
      <div className={styles.frameChild} />
      <b className={styles.b}>{prop}</b>
      <img className={styles.image1Icon} alt="" src="/image-1@2x.png" />
      <div className={styles.frameItem} />
      <div className={styles.annualBudget7000} style={annualBudget7000Style}>
        {annualBudget7000}
      </div>
      <div className={styles.removeBudget}>Remove budget</div>
      <div className={styles.editBudget}>Edit budget</div>
      <img className={styles.frameInner} alt="" src={ellipse2} />
      <div className={styles.ellipseDiv} style={ellipseDivStyle} />
    </div>
  );
};

BudgetSliderComponent.propTypes = {
  className: PropTypes.string,
  prop: PropTypes.string,
  annualBudget7000: PropTypes.string,
  ellipse2: PropTypes.string,

  /** Style props */
  propHeight: PropTypes.any,
  propLeft: PropTypes.any,
  propBackgroundColor: PropTypes.any,
};

export default BudgetSliderComponent;
