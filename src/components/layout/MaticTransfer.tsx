import React, { useEffect, useState } from "react";
import styles from "../../styles/Transfer.module.scss";
import { Center, Button, Box, Text, Image, Input } from "@chakra-ui/react";
import maticLogo from "../../assets/images/matic-logo.jpeg";
import { useWaitForTransaction, useSendTransaction } from "wagmi";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
export function MaticTransfer() {
  const toast = useToast();
  const [amount, setAmount] = useState("0.1");
  const [receiverAddress, setReceiverAddress] = useState("");

  const { data, error, isError, sendTransaction } = useSendTransaction({
    to: receiverAddress,
    value: BigInt(Number(amount) * 10 ** 18),
  });

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });

  const transfer = async () => {
    sendTransaction?.();
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
    if (isSuccess) {
      toast({
        title: "Successfully transferred Matic",
        description: (
          <div>
            View in{" "}
            <a href={`${process.env.NEXT_ETHERSCAN_URL}${data?.hash}`}>
              polygon scan
            </a>
            <br />
            <a>Transaction hash: {data?.hash}</a>
          </div>
        ),
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      toast({
        title: "transferError",
        description: <div>{error?.message}</div>,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isError]);

  return (
    <div className={`${styles.options} ${styles.maticTransfer}`}>
      <Text fontSize="2xl">Matic</Text>
      <Image className={`${styles.tokenImage}`} src={maticLogo.src}></Image>
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
          <NumberInputField placeholder="transfer amount" />
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
        pb={6}
        mb={2}
      >
        <Button
          colorScheme="blue"
          onClick={() => transfer()}
          disabled={!sendTransaction || isLoading}
        >
          Transfer Matic
        </Button>
      </Box>
    </div>
  );
}
