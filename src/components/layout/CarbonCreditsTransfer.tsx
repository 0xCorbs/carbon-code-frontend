import React, { useEffect, useState } from "react";
import styles from "../../styles/Transfer.module.scss";
import { Center, Button, Box, Text, Image, Input } from "@chakra-ui/react";
import carbonCode from "../../assets/images/carbon-code.jpeg";
import carbinCreditAbi from "../../assets/abis/carbonCredit";
import { useContractWrite, useWaitForTransaction, useAccount } from "wagmi";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
export function CarbonCreditsTransfer() {
  const { address } = useAccount();
  const toast = useToast();
  const [amount, setAmount] = useState("0.1");
  const [receiverAddress, setReceiverAddress] = useState("");

  const {
    data: transferData,
    error: transferError,
    isError: isTransferError,
    write: transferWrite,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CCT_ADDRESS as `0x${string}`,
    abi: carbinCreditAbi.abi,
    functionName: "transfer",
    args: [receiverAddress, BigInt(Number(amount) * 10 ** 18)],
  });
  const {
    data: mintData,
    error: mintError,
    isError: isMintError,
    write: mintWrite,
  } = useContractWrite({
    address: process.env.NEXT_PUBLIC_CCT_ADDRESS as `0x${string}`,
    abi: carbinCreditAbi.abi,
    functionName: "mint",
    args: [receiverAddress, BigInt(Number(amount) * 10 ** 18)],
  });

  const { isLoading: isTransferLoading, isSuccess: isTransferSuccess } =
    useWaitForTransaction({
      hash: transferData?.hash,
    });

  const { isLoading: isMintLoading, isSuccess: isMintSuccess } =
    useWaitForTransaction({
      hash: mintData?.hash,
    });

  const transfer = async () => {
    transferWrite?.();
  };

  const mint = async () => {
    mintWrite?.();
  };

  const handleAmountChange = (amount: React.SetStateAction<string>) => {
    if (!Number(amount)) {
      return;
    }
    setAmount(amount);
  };

  const handleReceiverAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const address = event.target.value;
    setReceiverAddress(address);
  };

  useEffect(() => {
    if (isTransferSuccess) {
      toast({
        title: "Successfully transferred Carbon Credits",
        description: (
          <div>
            View in{" "}
            <a href={`${process.env.NEXT_ETHERSCAN_URL}${transferData?.hash}`}>
              polygon scan
            </a>
            <br />
            <a>Transaction hash: {transferData?.hash}</a>
          </div>
        ),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isTransferSuccess]);

  useEffect(() => {
    if (isMintSuccess) {
      toast({
        title: "Successfully minted Carbon Credits",
        description: (
          <div>
            View in{" "}
            <a href={`${process.env.NEXT_ETHERSCAN_URL}${mintData?.hash}`}>
              polygon scan
            </a>
            <br />
            <a>Transaction hash: {mintData?.hash}</a>
          </div>
        ),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isMintSuccess]);

  useEffect(() => {
    if (isTransferError) {
      toast({
        title: "transferError",
        description: <div>{transferError?.message}</div>,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isTransferError]);

  useEffect(() => {
    if (isMintError) {
      toast({
        title: "mintError",
        description: <div>{mintError?.message}</div>,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isMintError]);

  return (
    <div className={`${styles.options}`}>
      <Text fontSize="2xl">Carbon Credits</Text>
      <Image className={`${styles.tokenImage}`} src={carbonCode.src}></Image>
      <Center>
        <NumberInput
          precision={2}
          step={0.1}
          min={0}
          size="md"
          height={10}
          onChange={handleAmountChange}
          marginBottom={2}
          borderColor="gray.400"
        >
          <NumberInputField placeholder="transfer / mint amount" />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Center>
      <Input
        value={receiverAddress}
        onChange={handleReceiverAddressChange}
        variant="outline"
        placeholder="Receiver address"
        borderColor="gray.400"
      />

      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
        pt={12}
        pb={2}
        mb={1}
      >
        <Button
          colorScheme="blue"
          onClick={() => transfer()}
          disabled={!transferWrite || isTransferLoading}
        >
          Transfer Carbon Credits
        </Button>
      </Box>

      {address === process.env.NEXT_PUBLIC_ADMIN_ADDRESS && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          width="100%"
          mb={2}
        >
          <Button
            colorScheme="blue"
            onClick={() => mint()}
            disabled={!mintWrite || isMintLoading}
          >
            Mint Carbon Credits
          </Button>
        </Box>
      )}
    </div>
  );
}
