import Head from "next/head";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {Avatar, Button, Heading, Icon, Link, Text, useToast, VStack,} from "@chakra-ui/react";
import Header from "@/components/title";
import {MdEmail} from "react-icons/md";
import {FaGithub, FaLinkedin, FaTwitter} from "react-icons/fa";
import {IconType} from "react-icons";
import {useAccount, useContractRead} from "wagmi";
import abi from "../contract/abi.json";
import {CONTRACT_ADDRESS} from "@/utils/contract";

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
        icon: IconType,
        buttonbg: string,
        textclr: string
    ) => {
        return (


            <Link
                href={url}
                isExternal
                _hover={{
                    textDecoration: "none",
                }}
            >
                <Button
                    width={"full"}
                    minW={'127px'}
                    flex={1}
                    fontSize={"md"}
                    fontWeight={600}
                    rounded={"lg"}
                    backgroundColor={buttonbg}
                    border='1px'
                    borderColor={'#FF684B'}
                    _hover={{
                        background: "black",
                        color: "white"
                    }}
                >
                    <Icon as={icon} size={"md"} color={textclr}/>
                    <Text
                        fontSize={"md"}
                        textAlign={"center"}
                        color={textclr}
                        px={3}
                    >
                        {text}
                    </Text>
                </Button>
            </Link>

        );
    }
;

const ViewProfile = ({parsedData}: { parsedData: UserAccount }) => {
    const router = useRouter();
    const {address} = useAccount();
    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");

    const toast = useToast();
    const {data, isError, isLoading} = useContractRead({
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
                <meta name="description" content="5ire Fund"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/Scroll.ico"/>
            </Head>
            <main className="px-4 md:px-0 my-8 mx-auto max-w-[1080px]">
                <div className="max-w-7xl pt-5 pb-5 flex flex-col justify-center items-center mx-auto">
                    <Header heading="User Profile"/>

                    <div className="pt-5 pb-5 flex justify-center items-center gap-x-4">
                        <VStack mt={8} direction={"row"} width={'500px'} align='center' spacing={4}>
                            <div className={'w-full flex justify-between items-center'}>
                                <Avatar
                                    border={"2px"}
                                    size={"2xl"}
                                    src={icon}
                                    mb={4}
                                    pos={"relative"}

                                />
                                <VStack align={'normal'} spacing={2}>
                                    <Heading fontSize={"28px"} fontFamily={"body"} color={"#FF684B"}>
                                        @{userName}
                                    </Heading>
                                    <Text fontWeight={600} color={"black"} fontSize={'16px'} mb={4}>
                                        {name}
                                    </Text>
                                </VStack>
                                {socialLinkComponent(`mailto:${email}`, "Email", MdEmail, "#FF684B", ' white')}
                            </div>
                            <Text
                                align={"start"}
                                color={"black"}
                                fontWeight="normal"
                                p={'16px 32px '}
                                minH={'initial'}
                                maxH={'89px'}
                                width={'full'}
                                borderRadius={'md'}
                                border='1px'
                                borderColor={'#E2E8F0'}
                            >
                                {bio}
                            </Text>
                            {/* {Show social media links of user} */}
                        </VStack>

                        <VStack mt={8} width={'500px'} direction={"row"} align={'stretch'} justify={'center'}
                                spacing={4}>
                            {socialLinkComponent(linkedinUrl, "LinkedIn", FaLinkedin, "transparent", ' #FF684B')}
                            {socialLinkComponent(twitterUrl, "Twitter", FaTwitter, "transparent", ' #FF684B')}
                            {socialLinkComponent(githubUrl, "Github", FaGithub, "transparent", ' #FF684B')}
                        </VStack>
                    </div>
                </div>
            </main>
        </>
    )
        ;
};

export default ViewProfile;