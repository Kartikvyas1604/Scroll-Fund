import React, { useEffect, useState, useRef } from "react";
import {
  Progress,
  Box,
  ButtonGroup,
  Button,
  Heading,
  Flex,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  Stack,
  Center,
  Avatar,
} from "@chakra-ui/react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { Web3Storage } from "web3.storage";
import { useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CONTRACT_ADDRESS } from "@/utils/contract";
import abi from "../contract/abi.json"

export const Form = () => {
  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(50);

  const [icon, setIcon] = useState("");
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [twitterUrl, setTwitterUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const toast = useToast();
  const [loading, setLoading] = useState(true);
  const [cid, setcid] = useState("");
  const router = useRouter();

  const { address } = useAccount();

  const profile = {
    profileImage: icon,
    name: name,
    bio: bio,
    username: userName,
    email: email,
    linkedinUrl: linkedinUrl,
    twitterUrl: twitterUrl,
    githubUrl: githubUrl,
  };

  const { config } = usePrepareContractWrite({
    address: CONTRACT_ADDRESS,
    abi: abi,
    functionName: "createProfile",
    args: [userName, cid, address],
    onError: (error) => {
      console.log(error);
    },
    onSuccess: (receipt) => {
      console.log(receipt);
    },
  });

  const { data, write } = useContractWrite(config);
  console.log(data);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  });
  const uploadData = async () => {
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxZTRjOEMwNTJiMzkzNEQ3Nzc5NWM3QWQ3MkQ0MTFhMGQyMWUxODIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzE2ODYwNTU1NjIsIm5hbWUiOiJNYXRpYy1Qcm9maWxlIn0.zDWjIoqZUCnPXtvWXjm_ZbvPN2ZZHTfcK7JHdM2S7hk",
    });
    client
      .put([new File([JSON.stringify(profile)], `${address}.json`)])
      .then(async (cidvalue) => {
        console.log(cidvalue);
        setcid(cidvalue);
      });
  };

  useEffect(() => {
    if (cid) {
      console.log(cid);
      toast({
        title: "Uploading",
        description: "Profile is being uploaded",
        status: "info",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [cid]);
  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Profile Created",
        description: "Profile has been created successfully",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  });
  useEffect(() => {
    if (router.isReady) {
      setLoading(false);
    }
  }, [router.isReady]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = (e.target as HTMLInputElement).files!;
    const client = new Web3Storage({
      token:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDkxZTRjOEMwNTJiMzkzNEQ3Nzc5NWM3QWQ3MkQ0MTFhMGQyMWUxODIiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2NzE2ODYwNTU1NjIsIm5hbWUiOiJNYXRpYy1Qcm9maWxlIn0.zDWjIoqZUCnPXtvWXjm_ZbvPN2ZZHTfcK7JHdM2S7hk",
    });
    client.put(files).then((cid: any) => {
      console.log(cid);
      setIcon(`https://${cid}.ipfs.w3s.link/${files[0].name}`);
    });
  };

  return (
    <>
      {loading ? (
        <div>Loading... </div>
      ) : (
        <Box
          borderWidth="1px"
          rounded="lg"
          shadow="1px 1px 3px rgba(0,0,0,0.3)"
          maxWidth={"100v"}
          p={6}
          m="5px auto"
          bg="#fefefe60"
        >
          <Progress
            hasStripe
            value={progress}
            mb="5%"
            mx="5%"
            isAnimated
          ></Progress>
          {step === 1 ? (
            <Box>
              <Flex align={"center"} justify={"center"}>
                <Stack
                  spacing={4}
                  w={"md"}
                  maxW={"100%"}
                  rounded={"xl"}
                  boxShadow={"lg"}
                  border={"1px"}
                  p={6}
                  my={12}
                  m={4}
                  bg="#fefefe60"
                >
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl" }}
                    color={"#FF684B"}
                    textAlign={'center'}
                  >
                    Design your value
                  </Heading>
                  <form>
                    <FormControl id="userProfile">
                      <FormLabel color={"#FF684B"}>User Icon</FormLabel>
                      <Stack direction={["column", "row"]} spacing={6}>
                        <Center>
                          <Avatar
                            size="xl"
                            src={icon}
                            border={"1px"}
                            color={"gray.800"}
                          ></Avatar>
                        </Center>
                        <Center w="full">
                          <Input
                            borderColor={"gray.800"}
                            _hover={{ borderColor: "blue.800", border: "2px" }}
                            p={1}
                            _placeholder={{ color: "grey.700" }}
                            color={"grey.700"}
                            colorScheme="blue"
                            variant="outline"
                            w="full"
                            type="file"
                            accept="image/*"
                            name="file"
                            onChange={(
                              e: React.ChangeEvent<HTMLInputElement>
                            ) => handleInputChange(e)}
                          />
                        </Center>
                      </Stack>
                    </FormControl>
                  </form>

                  <FormControl id="username" isRequired>
                    <FormLabel color={"#FF684B"}>Username</FormLabel>
                    <Input
                      _hover={{ borderColor: "blue", border: "2px" }}
                      placeholder="Username"
                      borderColor={"gray.800"}
                      _placeholder={{ color: "grey.700" }}
                      color={"gray.800"}
                      type="text"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                    />
                  </FormControl>

                  <FormControl id="name" isRequired>
                    <FormLabel color={"#FF684B"}>Name</FormLabel>
                    <Input
                      _hover={{ borderColor: "blue", border: "2px" }}
                      placeholder="Name"
                      borderColor={"gray.800"}
                      _placeholder={{ color: "grey.700" }}
                      color={"gray.800"}
                      type="text"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                      value={name}
                    />
                  </FormControl>

                  <FormControl id="email">
                    <FormLabel color={"#FF684B"}>Bio</FormLabel>
                    <Textarea
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setBio(e.target.value)
                      }
                      placeholder="Write your bio"
                      borderColor={"gray.800"}
                      color={"gray.800"}
                      mt={1}
                      rows={3}
                      shadow="sm"
                      value={bio}
                    />
                  </FormControl>
                </Stack>
              </Flex>
            </Box>
          ) : (
            <Box>
              <Flex align={"center"} justify={"center"}>
                <Stack
                  spacing={4}
                  w={"md"}
                  maxW={"100%"}
                  rounded={"xl"}
                  boxShadow={"lg"}
                  border={"1px"}
                  p={6}
                  my={12}
                  m={4}
                  bg="#ffffff91"
                >
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "2xl", sm: "3xl" }}
                    color={"white"}
                  >
                    You&apos;re almost there
                  </Heading>
                  <FormControl id="userEmail" isRequired>
                    <FormLabel color={"#FF684B"}>Email address</FormLabel>
                    <Input
                      _hover={{ borderColor: "blue.800", border: "2px" }}
                      placeholder="your-email@example.com"
                      borderColor={"gray.800"}
                      _placeholder={{ color: "white" }}
                      color={"gray.800"}
                      type="email"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setEmail(e.target.value)
                      }
                      value={email}
                    />
                  </FormControl>

                  <SimpleGrid>
                    <FormControl
                      id="linkedinUrl"
                      as={GridItem}
                      colSpan={[3, 2]}
                    >
                      <FormLabel color={"#FF684B"}>Linkedin URL</FormLabel>
                      <InputGroup borderColor={"gray.800"}>
                        <InputLeftAddon
                          bg="white"
                          color="gray.700"
                          rounded="md"
                        >
                          https://
                        </InputLeftAddon>
                        <Input
                          type="tel"
                          placeholder="linkedin.com/in/username"
                          focusBorderColor="brand.400"
                          color="gray.700"
                          rounded="md"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setLinkedinUrl(e.target.value)
                          }
                          value={linkedinUrl}
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid>
                    <FormControl id="twitterUrl" as={GridItem} colSpan={[3, 2]}>
                      <FormLabel color={"#FF684B"}>Twitter URL</FormLabel>
                      <InputGroup borderColor={"gray.800"}>
                        <InputLeftAddon
                          bg="white"
                          color="gray.700"
                          rounded="md"
                        >
                          https://
                        </InputLeftAddon>
                        <Input
                          type="tel"
                          placeholder="twitter.com/username"
                          focusBorderColor="brand.400"
                          color="gray.700"
                          rounded="md"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setTwitterUrl(e.target.value)
                          }
                          value={twitterUrl}
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>

                  <SimpleGrid>
                    <FormControl id="githubUrl" as={GridItem} colSpan={[3, 2]}>
                      <FormLabel color={"#FF684B"}>GitHub URL</FormLabel>
                      <InputGroup borderColor={"gray.800"}>
                        <InputLeftAddon
                          bg="white"
                          color="gray.700"
                          rounded="md"
                        >
                          https://
                        </InputLeftAddon>
                        <Input
                          type="tel"
                          placeholder="github.com/username"
                          focusBorderColor="brand.400"
                          color="gray.700"
                          rounded="md"
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setGithubUrl(e.target.value)
                          }
                          value={githubUrl}
                        />
                      </InputGroup>
                    </FormControl>
                  </SimpleGrid>

                  <Stack spacing={6} direction={["column", "row"]}></Stack>
                </Stack>
              </Flex>
            </Box>
          )}
          <ButtonGroup mt="5%" w="100%">
            <Flex w="100%" justifyContent="space-between">
              <Flex>
                <Button
                  onClick={() => {
                    setStep(step - 1);
                    setProgress(progress - 50);
                  }}
                  isDisabled={step === 1}
                  variant="solid"
                  w="7rem"
                  mr="5%"
                  color={"white"}
                  bg={"#FF684B"}
                  _hover={{ bg: "#ED5032", color: "white" }}
                >
                  Back
                </Button>
                <Button
                 color={"white"}
                  w="7rem"
                  hidden={step === 2}
                  onClick={() => {
                    setStep(step + 1);
                    if (step === 2) {
                      setProgress(100);
                    } else {
                      setProgress(progress + 50);
                    }
                  }}
                  bg={"#FF684B"}
                  _hover={{ bg: "#ED5032", color: "white" }}
                  variant="solid"
                >
                  Next
                </Button>
              </Flex>
              {step === 2 ? (
                <Button
                  bg={"#FF684B"}
                  color={"white"}
                  _hover={{ bg: "#ED5032", color: "white" }}
                  w="9rem"
                  type="submit"
                  onClick={() => {
                    uploadData();
                  }}
                >
                  Upload
                </Button>
              ) : null}

              <Button
                bg={"#FF684B"}
                color={"white"}
                _hover={{ bg: "#ED5032", color: "white" }}
                w="9rem"
                type="submit"
                onClick={() => {
                  console.log("user name", userName);
                  console.log("user cid", cid);
                  console.log("user address", address);
                  write?.();
                }}
              >
                Create Profile
              </Button>
            </Flex>
          </ButtonGroup>
        </Box>
      )}
    </>
  );
};