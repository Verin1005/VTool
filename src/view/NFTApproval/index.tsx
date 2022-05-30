import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
export default function NFTApproval() {
  const { t } = useTranslation("nft-approval");
  const [current, setCurrent] = useState(1);
  return (
    <div className="p-10">
      <div className="h-24 w-full  flex items-center justify-center font-bold text-xl">{t("title")}</div>
      <div className="text-sm text-gray-500">{t("nft-contract-address")}</div>
      <div className="mt-2">
        <TextField id="outlined-basic" variant="outlined" className="w-full" />
      </div>
      <div className="text-sm text-gray-500 mt-10">{t("authorization-contract-address")}</div>
      <div className="mt-2">
        <TextField id="outlined-basic" variant="outlined" className="w-full" />
      </div>
      <div className="text-sm text-gray-500 mt-10">{t("operation")}</div>

      <div className="flex justify-between mt-5">
        <div
          className={`${
            current === 1 ? "bg-[#074ED3] text-white" : "bg-gray-200"
          } w-1/3 h-14 flex items-center justify-center hover:cursor-pointer font-bold text-xl`}
          onClick={() => {
            setCurrent(1);
          }}
        >
          {t("btn-approvel")}
        </div>
        <div
          className={`${
            current === 2 ? "bg-[#074ED3] text-white" : "bg-gray-200"
          } w-1/3 h-14 flex items-center justify-center hover:cursor-pointer font-bold text-xl`}
          onClick={() => {
            setCurrent(2);
          }}
        >
          {t("btn-cancelapprovel")}
        </div>
      </div>
      <div className="w-48  h-14 bg-[#0E1243] m-auto mt-20 flex justify-center items-center rounded-xl text-white text-xl hover:cursor-pointer">
        执行
      </div>
    </div>
  );
}
