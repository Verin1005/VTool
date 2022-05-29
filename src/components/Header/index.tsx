import React, { useEffect } from "react";
import Image from "next/image";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { connectors } from "config/constants/connectors";
import { shortStr } from "utils/fomatData";
export default function Header() {
  const { account, chainId, active, activate, deactivate } = useActiveWeb3React();
  useEffect(() => {
    activate(connectors["injected"]);
  }, []);
  return (
    <div className="h-[70px] w-full shadow-md">
      <div className="w-9/12 h-full m-auto flex">
        <div className="w-2/3 h-full flex">
          <div className="w-1/6 h-full  flex items-center justify-around">
            <Image src="/image/header/logo.png" alt="logo" width={45} height={45} className="rounded-full"></Image>
            <div className="font-bold text-3xl text-[#161B4A]">VTool</div>
          </div>
          <div className="w-5/6 h-full flex items-center text-xl text-[#626261]">
            <div className="flex items-center hover:cursor-pointer">
              工具和服务
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

          <div className="w-1/6 h-full text-[#161B4A] text-xl font-bold flex items-center justify-center">中文</div>
        </div>
      </div>
    </div>
  );
}
