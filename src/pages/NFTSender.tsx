import React from "react";
import NFTSenderView from "view/NFTSender/index";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function NFTSender() {
  return (
    <div className="w-7/12 mb-20 m-auto mt-12 shadow-[0_0_10px_0_rgba(0,0,0,0.25)]">
      <NFTSenderView></NFTSenderView>
    </div>
  );
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "nft-sender"])),
  },
});
