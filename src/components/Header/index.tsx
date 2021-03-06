import React, { useEffect } from "react";
import Image from "next/image";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { shortStr } from "utils/fomatData";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { injected } from "config/constants/wallets";
import useEagerConnect from "hooks/useEagerConnect";
export default function Header() {
  const { account, chainId, active, activate, deactivate } = useActiveWeb3React();

  const router = useRouter();

  const { t, i18n } = useTranslation("header");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const RouterList = [
    {
      name: "NFTApproval",
      router: "/NFTApproval",
      img: "/image/header/nft-approval.svg",
      lang: "nft-approval",
    },
    {
      name: "NFTSender",
      router: "/NFTSender",
      img: "/image/header/nft-sender.svg",
      lang: "nft-sender",
    },
  ];

  return (
    <div className="h-[70px] w-full shadow-md">
      <div className="w-9/12 h-full m-auto flex ">
        <div className="w-2/3 h-full flex">
          <div className="w-1/6 h-full  flex items-center justify-around">
            <Image src="/image/header/logo.png" alt="logo" width={45} height={45} className="rounded-full"></Image>
            <div className="font-bold text-3xl text-[#161B4A]">VTool</div>
          </div>
          <div className="w-5/6 h-full flex items-center text-xl text-[#626261] ml-5 hover:text-[#383832]">
            <div className="flex items-center hover:cursor-pointer" onClick={handleClick}>
              <div>{t("tools")}</div>
              <Image src="/image/header/more.svg" alt="logo" width={24} height={24} className="rounded-full"></Image>
            </div>
          </div>
        </div>
        <div className="w-1/3 h-full flex items-center justify-end">
          {account && (
            <div className="w-1/3 h-1/2 rounded-full flex items-center justify-center font-bold text-lg bg-[#EEF0F3]">
              {account ? shortStr(account) : ""}
            </div>
          )}
          {!account && (
            <div
              onClick={() => {
                activate(injected, undefined, true).catch((error) => {
                  console.log(error);
                });
              }}
              className="
              w-1/3 h-1/2 bg-[#EEF0F3] rounded-full flex items-center justify-center text-xl font-bold hover:cursor-pointer hover:bg-[#EEF5F1]"
            >
              Connect
            </div>
          )}

          <div className="w-1/6 h-full text-[#161B4A] text-xl font-bold flex items-center justify-center hover:cursor-pointer">
            <Link href={router.asPath} locale={router.locale === "en" ? "zh" : "en"}>
              <div>{t("lang")}</div>
            </Link>
            {/* <div onClick={() => i18n.changeLanguage(i18n.language == "en" ? "zh" : "en")}>
              <div>{t("lang")}</div>
            </div> */}
          </div>
        </div>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          className="w-full"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Typography sx={{ p: 2 }} className="w-[1000px] h-[500px] flex">
            <div className="w-1/5">
              <div className="w-full font-bold text-xl">NFT</div>

              {RouterList.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="text-xl flex items-center hover:cursor-pointer text-gray-500 hover:text-gray-700 mt-5"
                    onClick={() => {
                      Router.push(item.router);
                      setAnchorEl(null);
                    }}
                  >
                    <Image src={item.img} alt="nft-approval" width={20} height={20} className="rounded-full"></Image>
                    <div className="ml-2">{t(item.lang)}</div>
                  </div>
                );
              })}
            </div>
            <div className="w-1/5">
              <div className="w-full font-bold text-xl">Token</div>
            </div>

            <div className="w-1/5">
              <div className="w-full font-bold text-xl"> {t("advanced")}</div>
            </div>
            <div className="w-1/5">
              <div className="w-full font-bold text-xl">GameFi</div>
            </div>
            <div className="w-1/5">
              <div className="w-full font-bold text-xl">Defi</div>
            </div>
          </Typography>
        </Popover>
      </div>
    </div>
  );
}
