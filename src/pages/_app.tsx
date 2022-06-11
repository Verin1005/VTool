import "styles/globals.css";
import type { AppProps } from "next/app";
import { Web3Provider } from "@ethersproject/providers";
import { Web3ReactProvider } from "@web3-react/core";
import dynamic from "next/dynamic";
import { appWithTranslation } from "next-i18next";
import Header from "components/Header/index";
import Web3ReactManager from "components/Web3ReactManager/index";
import useEagerConnect from "hooks/useEagerConnect";

export function getLibrary(provider: any): Web3Provider {
  const library = new Web3Provider(provider);
  library.pollingInterval = 15000;
  return library;
}

const Web3ProviderNetwork = dynamic(() => import("../components/Web3ProviderNetwork/index"), { ssr: false });

function MyApp({ Component, pageProps }: AppProps) {
  useEagerConnect();
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Web3ReactManager>
          <Header></Header>
          <Component {...pageProps} />
        </Web3ReactManager>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  );
}

export default appWithTranslation(MyApp);
