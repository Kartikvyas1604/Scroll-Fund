import "@/styles/globals.css";
import {ChakraProvider} from "@chakra-ui/react";
import type {AppProps} from "next/app";
import Header from "@/components/navbar";
import {WagmiConfig} from "wagmi";
import {client} from "@/utils/wagmi";
import {ConnectKitProvider} from "connectkit";

export default function App({Component, pageProps}: AppProps) {
    return (
        <WagmiConfig client={client}>
            <ConnectKitProvider theme="retro">
                <Header/>
                <section className="min-h-fit max-h-min">
                    <ChakraProvider>
                        <Component {...pageProps} />
                    </ChakraProvider>
                </section>
            </ConnectKitProvider>
        </WagmiConfig>
    );
}
