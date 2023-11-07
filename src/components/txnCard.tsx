import React from "react";
import {Table, TableContainer, Tbody, Td, Th, Thead, Tr,} from '@chakra-ui/react'

interface txnDetails {
    amount: number;
    message: string;
    senderAddress: string;
    timestamp: number;
}

export default function TxnCard({txn}: { txn: txnDetails[] }) {
    return (
        <>


            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>From</Th>
                            <Th>Message</Th>
                            <Th isNumeric>Amount</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {txn.map((item, index) => (<Tr>
                            <Td>{item.senderAddress}</Td>
                            <Td>  {item.message}</Td>
                            <Td isNumeric>{item.amount} Scroll</Td>
                        </Tr>))}
                    </Tbody>

                </Table>
            </TableContainer>

        </>
    );
}