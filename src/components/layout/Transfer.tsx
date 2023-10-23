import React from "react";
import styles from "../../styles/Transfer.module.scss";
import { CarbonCreditsTransfer } from "./CarbonCreditsTransfer";
import { CctBalance } from "./CctBalance";
import { MaticTransfer } from "./MaticTransfer";
export function Transfer() {
  return (
    <>
      <CctBalance />
      <div className={styles.transferContainer}>
        <CarbonCreditsTransfer />
        <MaticTransfer />
      </div>
    </>
  );
}
