import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect, FormEventHandler } from "react";
import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  Link,
  VStack,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Icon,
  useToast,
  Input,
} from "@chakra-ui/react";
import Header from "@/components/title";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons";
import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from "wagmi";
import abi from "../contract/abi.json";
import { CONTRACT_ADDRESS } from "@/utils/contract";
import { utils } from "ethers";

interface UserAccount {
  profileImage: string;
  userName: string;
  name: string;
  bio: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  twitterUrl: string;
  address: "";
}

export const socialLinkComponent = (
  url: string,
  text: string,
  icon: IconType
) => {
  return (
    <HStack spacing={2}>
      <Box minW="xl">
        <Link
          href={url}
          isExternal
          _hover={{
            textDecoration: "none",
          }}
        >
          <Button
            minW={"50%"}
            flex={1}
            fontSize={"md"}
            bg={"#FF684B"}
            fontWeight={600}
            rounded={"full"}
            _focus={{
              bg: "gray.100",
            }}
            _hover={{
              bg: "black",
            }}
          >
            <Icon as={icon} size={"md"} color={"white"} />
            <Text
              fontSize={"md"}
              textAlign={"center"}
              color={"white"}
              px={3}
            >
              {text}
            </Text>
          </Button>
        </Link>
      </Box>
    </HStack>
  );
};

const User = ({ parsedData }: { parsedData: UserAccount }) => {
  const router = useRouter();
  const { username } = router.query;
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [message, setMessage] = useState("");
  const [amount, setAmount] = useState("0");

  const toast = useToast();
  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "getProfile",
    args: [router.query.username],
  });

  const fetchData = async () => {
    try {
      const link = `https://${(data as any).cid}.ipfs.w3s.link/${(data as any).userAddress}.json`;
      const response = await fetch(link);
      const parsedData: UserAccount = await response.json();
      console.log(parsedData);
      setIcon(parsedData.profileImage);
      setName(parsedData.name);
      setBio(parsedData.bio);
      setEmail(parsedData.email);
      setLinkedinUrl(`https://${parsedData.linkedinUrl}`);
      setTwitterUrl(`https://${parsedData.twitterUrl}`);
      setGithubUrl(`https://${parsedData.githubUrl}`);
      return {
        props: {
          parsedData,
        },
      };
    } catch (error) {
      return {
        notFound: true,
      };
    }
  };

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "addMessage",
    args: [username, message, utils.parseEther(amount.toString() || "0")],
    overrides: {
      value: utils.parseEther(amount.toString() || "0"),
    },
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (receipt) => {
      console.log(receipt);
    },
  });

  const { data: msgData, write } = useContractWrite(config);

  const { isLoading: isMsgLoading, isSuccess } = useWaitForTransaction({
    hash: msgData?.hash,
  });
  
  useEffect(() => {
    if (data) {
      console.log(data);
      fetchData();
    }
  }, [data]);

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Message sent successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [isSuccess]);

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="Scroll Fund" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Scroll.ico" />
      </Head>
      <main className="px-4 md:px-0  mx-auto max-w-[1080px]">
        <div className="max-w-7xl pt-5 pb-5 mx-auto">
          <Header heading="User Profile" />
          <Box
            maxW={"sm"}
            w={"full"}
            border="1px"
            bg="#fefefe60"
            m="5px auto"
            boxShadow={"2xl"}
            rounded={"lg"}
            p={6}
            textAlign={"center"}
          >
            <Avatar
              border={"2px"}
              size={"2xl"}
              src={icon}
              mb={4}
              pos={"relative"}
            />
            <Heading fontSize={"2xl"} fontFamily={"body"} color={"#FF684B"}>
              {name}
            </Heading>
            <Text fontWeight={600} color={"black"} mb={4}>
              @{username}
            </Text>
            <Text
              textAlign={"center"}
              color={"gray.700"}
              fontWeight="bold"
              px={3}
            >
              {bio}
            </Text>

            {/* {Show social media links of user} */}

            <VStack mt={8} direction={"row"} spacing={4} color={"black"}>
              {socialLinkComponent(`mailto:${email}`, "Email", MdEmail)}
              {socialLinkComponent(linkedinUrl, "LinkedIn", FaLinkedin)}
              {socialLinkComponent(twitterUrl, "Twitter", FaTwitter)}
              {socialLinkComponent(githubUrl, "Github", FaGithub)}
            </VStack>
            <form>
              <Input
                mt={5}
                borderColor={"gray.600"}
                placeholder={"Write your message"}
                _hover={{ borderColor: "#FF684B" }}
                _focus={{ borderColor: "#FF684B" }}
                color={"black"}
                onChange={(e) => setMessage(e.target.value)}
              ></Input>
              <Stack mt={2} direction={"row"} spacing={2}>
                <NumberInput width={"100%"}>
                  <NumberInputField
                    placeholder="Scroll"
                    flex={2}
                    fontSize={"sm"}
                    rounded={"md"}
                    width={"full"}
                    id="amount"
                    color={"black"}
                    borderColor={"white"}
                    _focus={{ borderColor: "#FF684B" }}
                    _hover={{ borderColor: "#FF684B" }}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  <NumberInputStepper>
                    <NumberIncrementStepper color={"#ED5032"} />
                    <NumberDecrementStepper color={"#ED5032"} />
                  </NumberInputStepper>
                </NumberInput>
                <Button
                  flex={1}
                  fontSize={"sm"}
                  rounded={"md"}
                  bg={"#FF684B"}
                  size={"2xl"}
                  p={2}
                  color={"white"}
                  type="submit"
                  boxShadow={
                    "0px 1px 25px -5px rgb(237,80,50 / 48%), 0 10px 10px -5px rgb(237,80,50 / 43%)"
                  }
                  _hover={{
                    bg: "#ED5032",
                  }}
                  _focus={{
                    bg: "#ED5032",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    write?.();
                  }}
                >
                  Send Scroll
                </Button>
              </Stack>
            </form>
          </Box>
        </div>
      </main>
    </>
  );
};

export default User;