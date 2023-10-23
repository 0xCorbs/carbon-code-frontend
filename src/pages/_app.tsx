import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { Web3Provider } from "../configuration/Web3";
import { ChakraProvider } from "../configuration/Chakra";
import { useIsMounted } from "../hooks/UseIsMounted";
import React from "react";
import { Head } from "../components/layout/Head";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  const isMounted = useIsMounted();
  //the root component
  return (
    <ChakraProvider>
      <Head />
      <Web3Provider>
        {isMounted && (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        )}
      </Web3Provider>
    </ChakraProvider>
  );
}
