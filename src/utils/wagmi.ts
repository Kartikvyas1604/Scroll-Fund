import { createClient } from "wagmi";
import { scrollSepolia } from '@wagmi/core/chains'
import { getDefaultClient } from "connectkit";

export const client = createClient(
  getDefaultClient({
    autoConnect: true,
    appName: "Scroll-Fund",
    chains: [scrollSepolia],
  })
);