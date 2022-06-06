import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { isAddress } from "utils/isAddress";
interface inputinterface {
  inputValue: string;
  handleInputChange: (e: any) => void;
  inputList: Array<string>;
}
export default function InputContainer(props: inputinterface) {
  const { inputValue, handleInputChange, inputList } = props;
  const { t } = useTranslation("nft-sender");
  const errAddressList = useMemo(() => {
    const err = [];
    inputList.forEach((item, index) => {
      if (isAddress(item) !== item && item !== "") {
        err.push({ address: item, index });
      }
    });
    return err.length ? (
      <div className="border border-solid rounded-md border-red-500 text-red-500 mt-4 px-4 py-2">
        {err.map((item) => {
          return (
            <div key={item.index}>
              <div>
                第{item.index + 1}行 {item.address} 不是一个有效的钱包地址
              </div>
            </div>
          );
        })}
      </div>
    ) : null;
  }, [inputList]);

  return (
    <div>
      <div className="w-3/5 h-[20px] font-bold text-xl text-[#001A6B]">{t("label2")}</div>
      <div className="w-full flex  mt-2">
        <div
          className={`${
            inputList.length >= 8 ? "flex flex-col text-sm justify-between pb-2.5" : ""
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
          placeholder={t("placeholder1")}
          InputProps={{
            disableUnderline: true,
          }}
        ></TextField>
      </div>
      <div>{errAddressList}</div>
    </div>
  );
}
