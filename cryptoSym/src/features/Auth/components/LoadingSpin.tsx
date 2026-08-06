import styles from "./LoadingSpin.module.css";
import { Spin } from "antd";
import { type SpinnerProps } from "../types";
function LoadingSpin({t}:SpinnerProps) {
    return (
      <div className={styles.spinContainer}>
        <Spin className={styles.spin}  size="large" tip={t("common.loading")} />
      </div>
    )
}

export default LoadingSpin;