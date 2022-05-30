import React, { useEffect } from "react";
import Image from "next/image";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { connectors } from "config/constants/connectors";
import { shortStr } from "utils/fomatData";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { useRouter } from "next/router";
import Router from "next/router";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
export default function Header() {
  const { account, chainId, active, activate, deactivate } = useActiveWeb3React();

  const router = useRouter();

  const { t } = useTranslation("header");

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    activate(connectors["injected"]);
  }, []);
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
        <div className="w-1/3 h-full flex items-center">
          {account && (
            <div className="w-1/3 h-1/2 rounded-full flex items-center justify-center font-bold text-lg bg-[#EEF0F3]">
              {account ? shortStr(account) : ""}
            </div>
          )}
          {!account && (
            <div
              onClick={() => {
                activate(connectors["injected"]);
              }}
              className="
              w-1/3 h-1/2 bg-[#EEF0F3] rounded-full flex items-center justify-center text-xl font-bold hover:cursor-pointer hover:bg-[#EEF5F1]"
            >
              Connect
            </div>
          )}

          <div className="w-1/6 h-full text-[#161B4A] text-xl font-bold flex items-center justify-center hover:cursor-pointer">
            <Link href="/" locale={router.locale === "en" ? "ch" : "en"}>
              <div>{t("lang")}</div>
            </Link>
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
              <div
                className="text-xs flex items-center hover:cursor-pointer text-gray-500 hover:text-gray-700 mt-2"
                onClick={() => {
                  // Router.push("/NFTApproval");
                }}
              >
                <Image
                  src="/image/header/nft-approval.svg"
                  alt="nft-approval"
                  width={16}
                  height={16}
                  className="rounded-full"
                ></Image>
                <div className="ml-2">{t("nft-approval")}</div>
              </div>
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
