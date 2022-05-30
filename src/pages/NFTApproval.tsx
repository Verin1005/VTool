import React from "react";
import NFTApprovalView from "view/NFTApproval/index";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

export default function NFTApproval() {
  return (
    <div className="w-1/2 h-[500px] m-auto mt-20 shadow-[0_0_10px_0_rgba(0,0,0,0.25)]">
      <NFTApprovalView></NFTApprovalView>
    </div>
  );
}

export const getStaticProps = async ({ locale }: any) => ({
  props: {
    ...(await serverSideTranslations(locale, ["header", "nft-approval"])),
  },
});
