import { Card, CardBody, CardHeader, Heading } from "@chakra-ui/react";
import Head from "next/head";
import Header from "@/components/title";
import React, { useEffect, useState } from "react";
import TxnCard from "@/components/txnCard";
import { ethers } from "ethers";
import { useAccount } from "wagmi";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "../contract/abi.json";
import { CONTRACT_ADDRESS } from "@/utils/contract";

interface txnDetails {
  amount: number;
  message: string;
  senderAddress: string;
  timestamp: number;
}

export default function Dashboard() {
  const { address, isConnected } = useAccount();
  const [txn, setTxn] = useState<txnDetails[]>([]);

  // const getTxn = async () => {
    const { data, isError, isLoading } = useContractRead({
      address: CONTRACT_ADDRESS,
      abi: abi,
      functionName: "getAllMessages",
      args: [address],
    });
  // };
  useEffect(() => {
    if ((data as txnDetails[]) && !isLoading) {
      let txns = [];
      for (let product of data as txnDetails[]) {
        txns.push({
          amount: parseInt(product.amount.toString()) / 1000000000000000000,
          message: product.message,
          senderAddress: product.senderAddress,
          timestamp: product.timestamp,
        });
      }
      console.log("sssss",txns);
      setTxn(txns);
      // console.log(data);
      // setTxn(data as txnDetails[]);

     
    }
  }, [data, isLoading]);
  useEffect(() => {
    if (data) {
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="description" content="5ire Fund" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Scroll.ico" />
      </Head>
      <main className="px-4 md:px-0 my-8 mx-auto max-w-[1080px]">
        <div className="max-w-7xl pt-5 pb-5 mx-auto">
          <Header heading="Transactions" />
          <Card bgColor={"fefefe80"}>
            <CardHeader>
              <Heading size="md" color={"gray.800"}>Your collection</Heading>
            </CardHeader>
            <CardBody>
            {txn.length > 0 && isConnected && <TxnCard txn={txn} />}
            </CardBody>
          </Card>
        </div>
      </main>
    </>
  );
}