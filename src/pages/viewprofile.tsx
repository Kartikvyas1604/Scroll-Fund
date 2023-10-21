import Head from "next/head";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import {
  Heading,
  Avatar,
  Box,
  Text,
  Button,
  Link,
  VStack,
  HStack,
  Icon,
  useToast,
} from "@chakra-ui/react";
import Header from "@/components/title";
import { MdEmail } from "react-icons/md";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { IconType } from "react-icons";
import { useAccount } from "wagmi"; 
import {
  useContractRead,
 
} from "wagmi";
import abi from "../contract/abi.json";
import { CONTRACT_ADDRESS } from "@/utils/contract";

interface UserAccount {
  profileImage: string;
  username: string;
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
              bg: "white",
            }}
            _hover={{
              bg: "white",
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

const ViewProfile = ({ parsedData }: { parsedData: UserAccount }) => {
  const router = useRouter();
  const { address } = useAccount();
  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");

  const toast = useToast();
  const { data, isError, isLoading } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "getUserDetailsByAddress",
    args: [address],
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
        setUserName(parsedData.username);
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

 
  
  useEffect(() => {
    if (data) {
      console.log(data);
      fetchData();
    }
  }, [data]);

  return (
    <>
      <Head>
        <title>{name}</title>
        <meta name="description" content="5ire Fund" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Scroll.ico" />
      </Head>
      <main className="px-4 md:px-0 my-8 mx-auto max-w-[1080px]">
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
              @{userName}
            </Text>
            <Text
              textAlign={"center"}
              color={"black"}
              fontWeight="bold"
              px={3}
            >
              {bio}
            </Text>

            {/* {Show social media links of user} */}

            <VStack mt={8} direction={"row"} spacing={4} color={'#FF684B'}>
              {socialLinkComponent(`mailto:${email}`, "Email", MdEmail)}
              {socialLinkComponent(linkedinUrl, "LinkedIn", FaLinkedin)}
              {socialLinkComponent(twitterUrl, "Twitter", FaTwitter)}
              {socialLinkComponent(githubUrl, "Github", FaGithub)}
            </VStack>
          
          </Box>
        </div>
      </main>
    </>
  );
};

export default ViewProfile;