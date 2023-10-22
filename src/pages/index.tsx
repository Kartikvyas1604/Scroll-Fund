import Head from "next/head";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";
import FeatureCard from "@/components/card";
import {
  BsFillFileEarmarkLockFill,
  BsFillCheckCircleFill,
} from "react-icons/bs";
import { MdSecurity } from "react-icons/md";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <>
      <Head>
        <title>Scroll Fund</title>
        <meta name="description" content="Scroll Fund" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/Scroll.ico" />
      </Head>

        <Container maxW={"3xl"} >
          <Stack
            as={Box}
            textAlign={"center"}
            spacing={{ base: 8, md: 4 }}
            py={{ base: 12, md: 16 }}
          >
            <Heading
              fontWeight={600}
              fontSize={{ base: "xl", sm: "3xl", md: "5xl" }}
              lineHeight={"110%"}
              color={"gray.700"}
            >
              Create your{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-tr, #FF684B , #ED5032)"
                bgClip="text"
                fontWeight="extrabold"
              >
                on-chain
              </Text>{" "}
              profile <br /> over{" "}
              <Text
                as={"span"}
                bgGradient="linear(to-bl, #FF684B , #ED5032)"
                bgClip="text"
                fontWeight="extrabold"
              >
                Scroll Network
              </Text>
            </Heading>
            <Text color={"gray.900"} fontSize="xl">
              Built for creators like you! Launch creative profile on-chain by listing your SM links & Proof of work in an unique way. Get <b>Scroll</b> right into your wallet from
              your audience. <br />
              Proudly made on Scroll Network!
            </Text>
            <Stack
              direction={"column"}
              spacing={3}
              align={"center"}
              alignSelf={"center"}
              position={"relative"}
            >
              <Button
                colorScheme={"white"}
                color={"white"}
                className={
                  "bg-gradient-to-r from-[#FF684B] to-[#ED5032] hover:bg-gradient-to-b from-[#ED5032] to-[#FF684B]"
                }
                rounded={"full"}
                px={6}
                onClick={() => {
                  router.push("/createprofile");
                }}
              >
                Create Profile
              </Button>
              <Box>
                <Icon
                  as={Arrow}
                  color={useColorModeValue("gray.800", "gray.700")}
                  w={71}
                  position={"absolute"}
                  right={-71}
                  top={"10px"}
                />
                <Text
                  fontSize={"lg"}
                  fontFamily={"Caveat"}
                  position={"absolute"}
                  right={"-125px"}
                  top={"-15px"}
                  transform={"rotate(10deg)"}
                  color={"black"}
                >
                  Go get it, bro!
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Container>
        <div className="max-w-7xl pt-5 pb-8 mx-auto">
          <div className="flex flex-col text-center w-full mb-5 md:mb-10">
            <h1 className="text-4xl mb-10 font-bold title-font mb-4 text-[#FF684B] drop-shadow">
              Features
            </h1>
          </div>
          <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
            <FeatureCard
              icon={<BsFillFileEarmarkLockFill size={25} />}
              title="Why Scroll?"
              desc="Scroll seamlessly extends Ethereum's capabilities through zero knowledge tech and EVM compatibility. The L2 network built by Ethereum devs for Ethereum devs."
            />
            <FeatureCard
              icon={<MdSecurity size={25} />}
              title="Security"
              desc="Everything on-chain! Prevent any forgery and errors while holding asset. Hermes help to drive this feature smootly leveraging multiple signatures."
            />
            <FeatureCard
              icon={<BsFillCheckCircleFill size={25} />}
              title="Ease-to-use"
              desc="It is designed to on-board creators regardless any background and even campaigns to drive the donation camp."
            />
          </dl>
        </div>
    </>
  )
}


const Arrow = createIcon(
  {
  displayName: "Arrow",
  viewBox: "0 0 72 24",
  path: (
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M0.600904 7.08166C0.764293 6.8879 1.01492 6.79004 1.26654 6.82177C2.83216 7.01918 5.20326 7.24581 7.54543 7.23964C9.92491 7.23338 12.1351 6.98464 13.4704 6.32142C13.84 6.13785 14.2885 6.28805 14.4722 6.65692C14.6559 7.02578 14.5052 7.47362 14.1356 7.6572C12.4625 8.48822 9.94063 8.72541 7.54852 8.7317C5.67514 8.73663 3.79547 8.5985 2.29921 8.44247C2.80955 9.59638 3.50943 10.6396 4.24665 11.7384C4.39435 11.9585 4.54354 12.1809 4.69301 12.4068C5.79543 14.0733 6.88128 15.8995 7.1179 18.2636C7.15893 18.6735 6.85928 19.0393 6.4486 19.0805C6.03792 19.1217 5.67174 18.8227 5.6307 18.4128C5.43271 16.4346 4.52957 14.868 3.4457 13.2296C3.3058 13.0181 3.16221 12.8046 3.01684 12.5885C2.05899 11.1646 1.02372 9.62564 0.457909 7.78069C0.383671 7.53862 0.437515 7.27541 0.600904 7.08166ZM5.52039 10.2248C5.77662 9.90161 6.24663 9.84687 6.57018 10.1025C16.4834 17.9344 29.9158 22.4064 42.0781 21.4773C54.1988 20.5514 65.0339 14.2748 69.9746 0.584299C70.1145 0.196597 70.5427 -0.0046455 70.931 0.134813C71.3193 0.274276 71.5206 0.70162 71.3807 1.08932C66.2105 15.4159 54.8056 22.0014 42.1913 22.965C29.6185 23.9254 15.8207 19.3142 5.64226 11.2727C5.31871 11.0171 5.26415 10.5479 5.52039 10.2248Z"
      fill="currentColor"
    />
  ),
  }
  );
