import { ConnectButton } from "@rainbow-me/rainbowkit";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useAccount } from "wagmi";
import { Transfer } from "../components/layout/Transfer";

const Home: NextPage = () => {
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h2 className={styles.title}>Welcome to Carbon Credits</h2>
        {isConnected ? (
          <Transfer />
        ) : (
          <div className={styles.title}>Please connect your wallet</div>
        )}
      </main>
    </div>
  );
};

export default Home;
