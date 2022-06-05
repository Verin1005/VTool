import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
interface inputinterface {
  inputValue: string;
  handleInputChange: (e: any) => void;
  inputList: Array<string>;
}
export default function InputContainer(props: inputinterface) {
  const { inputValue, handleInputChange, inputList } = props;
  const { t } = useTranslation("nft-sender");

  return (
    <div>
      <div className="w-3/5 h-[20px] font-bold text-xl text-[#001A6B]">{t("label2")}</div>
      <div className="w-full flex  mt-2">
        <div
          className={`${
            inputList.length >= 8 ? "flex flex-col items-center justify-around" : ""
          } px-4 bg-[#F9F9F9] py-[4px]`}
        >
          {inputList.length
            ? inputList.map((item, index) => {
                return <div key={index}>{index + 1}</div>;
              })
            : 1}
        </div>
        <TextField
          id="standard-multiline-basic"
          multiline
          minRows={8}
          onChange={handleInputChange}
          variant="standard"
          className="w-full bg-[#F9F9F9]"
          InputProps={{
            disableUnderline: true,
          }}
        ></TextField>
      </div>
    </div>
  );
}
