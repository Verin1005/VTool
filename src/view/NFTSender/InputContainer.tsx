import React, { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { isAddress, isAddressSimple } from "utils/isAddress";
import { checkNumber } from "utils/number";

interface inputinterface {
  inputValue: string;
  handleInputChange: (e: any) => void;
  inputList: Array<string>;
  onExampleClick: () => void;
}
export default function InputContainer(props: inputinterface) {
  const { inputValue, handleInputChange, inputList, onExampleClick } = props;
  const { t } = useTranslation("nft-sender");
  const errAddressList = useMemo(() => {
    const err = [];
    inputList.forEach((item, index) => {
      try {
        const address = item.split(",")[0];
        const amount = item.split(",")[1];

        if (item == "") {
          return;
        }
        if ((isAddressSimple(address) === false && address !== "") || !checkNumber(amount)) {
          err.push({ address: item, index });
        }
      } catch (e) {
        err.push({ address: item, index });
      }
    });
    return err.length ? (
      <div className="border border-solid rounded-md border-red-500 text-red-500 mt-4 px-4 py-2">
        {err.map((item) => {
          return (
            <div key={item.index}>
              <div>
                第{item.index + 1}行 {item.address} 不是一个有效的钱包地址或者tokenID有问题
              </div>
            </div>
          );
        })}
      </div>
    ) : null;
  }, [inputList]);

  return (
    <div>
      <div className="w-3/5 h-[20px] font-bold text-xl text-[#001A6B]">
        {t("label2")} <span className="text-gray-400 text-[12px]">(ERC721: address, tokenId)</span>
      </div>
      <div className="w-full flex  mt-4">
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
          value={inputValue}
          variant="standard"
          className="w-full bg-[#F9F9F9]"
          placeholder={t("placeholder1")}
          InputProps={{
            disableUnderline: true,
          }}
        ></TextField>
      </div>
      <div className="flex justify-end underline decoration-1 text-xl mt-2 text-gray-400 ">
        <div onClick={onExampleClick} className=" w-20 hover:cursor-pointer">
          查看例子
        </div>
      </div>
      <div>{errAddressList}</div>
    </div>
  );
}
