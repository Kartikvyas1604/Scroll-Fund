import Head from "next/head";
import {useRouter} from "next/router";
import React, {useEffect, useState} from "react";
import {
    Avatar,
    Button,
    Heading,
    HStack,
    Icon,
    Input,
    Link,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Stack,
    Text,
    useToast,
    VStack,
} from "@chakra-ui/react";
import Header from "@/components/title";
import {MdEmail, MdSend} from "react-icons/md";
import {FaGithub, FaLinkedin, FaTwitter} from "react-icons/fa";
import {IconType} from "react-icons";
import {useContractRead, useContractWrite, usePrepareContractWrite, useWaitForTransaction,} from "wagmi";
import abi from "../contract/abi.json";
import {CONTRACT_ADDRESS} from "@/utils/contract";
import {utils} from "ethers";

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
    )
        ;
};

const User = ({parsedData}: {
    parsedData: UserAccount
}) => {
    const router = useRouter();
    const {username} = router.query;
    const [icon, setIcon] = useState("");
    const [name, setName] = useState("");
    const [bio, setBio] = useState("");
    const [email, setEmail] = useState("");
    const [linkedinUrl, setLinkedinUrl] = useState("");
    const [twitterUrl, setTwitterUrl] = useState("");
    const [githubUrl, setGithubUrl] = useState("");
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState("0");

    const sendicon: IconType = MdSend;
    const toast = useToast();
    const {data, isError, isLoading} = useContractRead({
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

    const {config} = usePrepareContractWrite({
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

    const {data: msgData, write} = useContractWrite(config);

    const {isLoading: isMsgLoading, isSuccess} = useWaitForTransaction({
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
                <title>{name} | Scroll Fund</title>
                <meta name="description" content="Scroll Fund"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href={icon}/>
            </Head>
            <main className="px-4 md:px-0  mx-auto flex flex-col justify-center items-center">
                <section className="w-auto max-w-fit pt-5 pb-5 mt-5 flex flex-col justify-start items-center ">
                    <Header heading="User Profile"/>

                    <div className={'w-full flex justify-between items-center gap-x-5'}>

                        <Avatar
                            border={"2px"}
                            size={"xl"}
                            src={icon}
                            mb={4}
                            pos={"relative"}
                        />
                        <VStack align={'center'} w={'auto'}>

                            <Heading fontSize={"2xl"} fontFamily={"body"} color={"#FF684B"}>
                                {name}
                            </Heading>
                            <Text fontWeight={600} color={"black"} mb={4}>
                                @{username}
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

                    <HStack mt={8} width={'full'} align={'stretch'} justify={'center'}
                            spacing={2}>
                        {socialLinkComponent(linkedinUrl, "LinkedIn", FaLinkedin, "transparent", ' #FF684B')}
                        {socialLinkComponent(twitterUrl, "Twitter", FaTwitter, "transparent", ' #FF684B')}
                        {socialLinkComponent(githubUrl, "Github", FaGithub, "transparent", ' #FF684B')}
                    </HStack>
                    <form className={'w-full'}>
                        <Input
                            mt={5}
                            borderColor={'black'}
                            placeholder={"Write your message"}
                            _hover={{borderColor: "#FF684B"}}
                            _focus={{borderColor: "#FF684B"}}
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
                                    borderColor={'black'}
                                    _focus={{borderColor: "#FF684B"}}
                                    _hover={{borderColor: "#FF684B"}}
                                    onChange={(e) => setAmount(e.target.value)}
                                />
                                <NumberInputStepper>
                                    <NumberIncrementStepper color={"#ED5032"} borderColor={'#E2E8F0'}/>
                                    <NumberDecrementStepper color={"#ED5032"} borderColor={'#E2E8F0'}/>
                                </NumberInputStepper>
                            </NumberInput>
                            <Button
                                width={"full"}
                                minW={'127px'}
                                flex={1}
                                fontSize={"md"}
                                fontWeight={600}
                                rounded={"lg"}
                                backgroundColor={'#ED5032'}
                                border='1px'
                                borderColor={'#FF684B'}
                                type="submit"
                                color={'white'}

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
                                <Icon as={sendicon} marginRight={3} size={"md"} color={'white'}/>
                                Send
                            </Button>
                        </Stack>
                    </form>
                </section>
            </main>
        </>
    );
};

export default User;