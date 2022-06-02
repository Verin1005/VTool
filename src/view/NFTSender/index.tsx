import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
export default function NFTSender() {
  const { t } = useTranslation("nft-sender");
  const [current, setCurrent] = useState(1);
  return (
    <div className="p-10">
      <div className="text-2xl font-bold text-[#001A6B]">{t("title")}</div>
      <div className="flex justify-between mt-10">
        <div className="w-3/5 h-[20px] font-bold text-xl text-[#001A6B]">{t("nft-contract-address")}</div>
        <div className="w-1/6 h-[20px] font-bold text-xl text-[#001A6B]">{t("protocol")}</div>
        <div className="w-1/6 h-[20px] font-bold text-xl text-[#001A6B]">{t("symbol")}</div>
      </div>
      <div className="flex justify-between mt-5">
        <div className="w-3/5 h-[60px] font-bold text-xl text-[#001A6B]">
          <Stack spacing={2} sx={{ width: "100%" }}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={top100Films.map((option) => option.title)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={t("label1")}
                  InputProps={{
                    ...params.InputProps,
                    type: "search",
                  }}
                />
              )}
            />
          </Stack>
        </div>
        <div className="w-1/6 h-[60px] font-bold text-xl text-[#001A6B] flex item-center">
          <div
            className={`${
              current === 1 ? "bg-[#074ED3] text-white" : "bg-gray-200"
            } w-1/3 h-16 flex items-center justify-center hover:cursor-pointer font-bold text-xl`}
            onClick={() => {
              setCurrent(1);
            }}
          >
            721
          </div>
          <div
            className={`${
              current === 2 ? "bg-[#074ED3] text-white" : "bg-gray-200"
            } w-1/3 h-16 flex items-center justify-center hover:cursor-pointer font-bold text-xl`}
            onClick={() => {
              setCurrent(2);
            }}
          >
            1155
          </div>
        </div>
        <div className="w-1/6 h-[60px] font-bold text-xl text-[#001A6B]">
          <div className="bg-gray-200 w-3/5 h-16 flex items-center  pl-5">123</div>
        </div>
      </div>
    </div>
  );
}
const top100Films = [];
