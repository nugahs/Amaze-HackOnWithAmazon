import { useCallback, useEffect, useState } from "react";
import "antd/dist/antd.min.css";
import { Button, Modal, Input } from "antd";
import { LeftOutlined } from "@ant-design/icons";
import { Button as ChakraButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import BottomBar from "../components/bottom-bar";
import styles from "./amazon-budget1.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const BudgetVisualBar = ({ amountSpent, totalLimit }) => {
  const spendPercentage = (amountSpent / totalLimit) * 100;
  let barColor = "green";

  if (spendPercentage >= 100) {
    barColor = "red";
  } else if (spendPercentage >= 75) {
    barColor = "yellow";
  }

  return (
    <div className={styles.budgetVisualBarContainer}>
      <div className={styles.budgetInfo}>
        <div>{`Amount Spent: ₹${amountSpent}`}</div>
        <div>{`Total Limit: ₹${totalLimit}`}</div>
      </div>
      <div className={styles.budgetBar}>
        <div
          className={styles.budgetSpend}
          style={{ width: `${spendPercentage}%`, backgroundColor: barColor }}
        />
      </div>
    </div>
  );
};

const BudgetSliderComponent = ({ amountSpentMonth, totalLimitMonth, amountSpentYear, totalLimitYear }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings} style={{ width: '450px' }}>
      <div>
        <BudgetVisualBar amountSpent={amountSpentMonth} totalLimit={totalLimitMonth} />
        <div className={styles.budgetDetails}>
          <b>{`Monthly Budget`}</b>
        </div>
      </div>
      <div>
        <BudgetVisualBar amountSpent={amountSpentYear} totalLimit={totalLimitYear} />
        <div className={styles.budgetDetails}>
          <b>{`Yearly Budget`}</b>
        </div>
      </div>
    </Slider>
  );
};

const AmazonBudget1 = () => {
  const router = useRouter();
  const [budgetLimits, setBudgetLimits] = useState({});
  const [buttons, setButtons] = useState([]);
  const [spends, setSpends] = useState([]);
  const [filteredSpends, setFilteredSpends] = useState([]);
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newMonthlyLimit, setNewMonthlyLimit] = useState('');
  const [newYearlyLimit, setNewYearlyLimit] = useState('');

  const onIconChevronleftClick = useCallback(() => {
    router.push("/");
  }, [router]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Update budget limits
    fetch("http://localhost:10000/budget/threshold/sukesssss1254a@gmail.com", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        month: newMonthlyLimit,
        year: newYearlyLimit
      })
    })
      .then(response => response.json())
      .then(data => {
        setBudgetLimits(prevState => ({
          ...prevState,
          month: newMonthlyLimit,
          year: newYearlyLimit
        }));
        setIsModalVisible(false);
      })
      .catch(error => console.error("Error updating budget limits:", error));
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    // Fetch budget limits
    fetch("http://localhost:10000/budget/threshold/sukesssss1254a@gmail.com")
      .then(response => response.json())
      .then(data => {
        const { year, month } = data.message;
        setBudgetLimits({ year, month, currentSpendYear: 0, currentSpendMonth: 0 });
      });

    // Fetch yearly purchase history
    fetch("http://localhost:10000/history/year/sukesssss1254a@gmail.com", {
      method: "POST",
      body: JSON.stringify({ year: selectedYear }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        setSpends(data.message);
        const totalSpentYear = data.message.reduce((total, item) => total + item.amount, 0);
        setBudgetLimits(prevState => ({
          ...prevState,
          currentSpendYear: totalSpentYear
        }));
        const tags = [...new Set(data.message.map(spend => spend.tag))];
        setButtons(["All Category", ...tags]);
      })
      .catch(error => console.error("Error fetching yearly purchase history:", error));

    // Fetch monthly purchase history
    fetch("http://localhost:10000/history/month/sukesssss1254a@gmail.com", {
      method: "POST",
      body: JSON.stringify({ month: selectedMonth, year: selectedYear }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        const totalSpentMonth = data.message.reduce((total, item) => total + item.amount, 0);
        setBudgetLimits(prevState => ({
          ...prevState,
          currentSpendMonth: totalSpentMonth
        }));
      })
      .catch(error => console.error("Error fetching monthly purchase history:", error));
  }, [selectedYear, selectedMonth]);

  const handleButtonClick = (tag) => {
    if (tag === "All Category") {
      setFilteredSpends(spends);
    } else {
      setFilteredSpends(spends.filter(spend => spend.tag === tag));
    }
  };

  return (
    <div className={styles.amazonBudgetMonth}>
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
              <Button
                className={styles.iconChevronleft}
                size="large"
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
      <b className={styles.budgetAndHistory}>Budget and History</b>
      {budgetLimits && (
        <BudgetSliderComponent
          amountSpentMonth={budgetLimits.currentSpendMonth}
          totalLimitMonth={budgetLimits.month}
          amountSpentYear={budgetLimits.currentSpendYear}
          totalLimitYear={budgetLimits.year}
        />
      )}
      <Button type="primary" onClick={showModal}>
        Set Budget
      </Button>
      <Modal title="Set Budget Limits" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        <Input
          placeholder="Monthly Limit"
          value={newMonthlyLimit}
          onChange={(e) => setNewMonthlyLimit(e.target.value)}
        />
        <Input
          placeholder="Yearly Limit"
          value={newYearlyLimit}
          onChange={(e) => setNewYearlyLimit(e.target.value)}
        />
      </Modal>
      <div className={styles.rectangleParent}>
        {/* Buttons */}
        {buttons.map((button, index) => (
          <ChakraButton
            key={index}
            className={styles.frameItem}
            colorScheme="grey"
            size="sm"
            variant="outline"
            w="88px"
            onClick={() => handleButtonClick(button)}
          >
            {button}
          </ChakraButton>
        ))}
      </div>
      <section className={styles.rectangleGroup} id="SpendsSection">
        {/* Spends data */}
        {filteredSpends.map((spend, index) => (
          <div key={index} className={styles.parent}>
            <div className={styles.div1}>{`₹${spend.amount}`}</div>
            <div className={styles.groupChild} />
            <div className={styles.whiteBoard26x64}>{spend.name}</div>
          </div>
        ))}
      </section>
      <BottomBar />
    </div>
  );
};

export default AmazonBudget1;
