import Head from "next/head";
import { Flex, Stack, Box } from "@chakra-ui/react";
import { Form } from "../components/form";
import Header from "@/components/title";

export default function Profile() {
  return (
    <>
      <Head>
        <title>Profile</title>
        <meta name="description" content="Scroll Fund" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Scroll.ico" />
      </Head>
      <main className="px-4 md:px-0 my-8 mx-auto max-w-[1080px]">
        <Header heading="Create your profile" />
        <Box minHeight="calc(100vh-72px)">
          <Flex p={8} flex={1} align={"center"} justify={"center"}>
            <Form />
          </Flex>
        </Box>
      </main>
    </>
  );
}
