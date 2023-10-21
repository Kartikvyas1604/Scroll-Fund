import { Box, Flex, Stack, StackDivider, Text } from "@chakra-ui/react";
import React from "react";

interface txnDetails {
  amount: number;
  message: string;
  senderAddress: string;
  timestamp: number;
}

export default function TxnCard({ txn }: { txn: txnDetails[] }) {
  return (
    <>
      {txn.map((item, index) => (
        <Stack divider={<StackDivider bgColor={"#FF684B"}/>} key="" spacing="2">
          <Box>
            <Flex alignItems={"center"}>
              <Box>
                <Text fontSize={"md"} color={"black"}><b>From:</b> {item.senderAddress}</Text>
              </Box>
            </Flex>
            <Box justifyContent={"end"} alignContent={"end"} color={"black"}>
              <b>Amount: </b> {item.amount} Scroll
            </Box>
            <Text pt="2" fontSize="md" color={"black"}>
            <b>Message: </b>  {item.message}
            </Text>
          </Box>
          <br></br>
        </Stack>
      ))}
    </>
  );
}