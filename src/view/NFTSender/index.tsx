import React, { useState, useMemo, useEffect } from "react";

import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { isAddress } from "utils/isAddress";
import { useERC721Contract } from "hooks/useContract";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import CircularProgress from "@mui/material/CircularProgress";
import InputContainer from "./InputContainer";
import useDebounce from "hooks/useDebounce";
import Tooltip from "@mui/material/Tooltip";
import Image from "next/image";
export default function NFTSender() {
  const { t } = useTranslation(["nft-sender", "common"]);

  const { account, chainId, active, activate, deactivate } = useActiveWeb3React();
  const [tokenList, setTokenList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectValue, setSelectValue] = useState<any>();
  const [inputValue, setInputValue] = useState("");
  const inputValueTarget = useDebounce(inputValue, 2);
  const [inputList, setInputList] = useState([""]);
  const address = useMemo(() => {
    return isAddress(searchValue) ? searchValue : "";
  }, [searchValue]);

  const ERC721Instance = useERC721Contract(address);
  useEffect(() => {
    const getErc721Info = async () => {
      try {
        const index = tokenList.findIndex((item) => item.address === isAddress(searchValue));
        if (index !== -1) {
          return;
        }
        setLoading(true);
        const symbol = await ERC721Instance.symbol();
        const name = await ERC721Instance.name();
        const token = { symbol, name, address, chainId };
        setSelectValue(token);

        setTokenList([...tokenList, token]);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    getErc721Info();
  }, [ERC721Instance, address, chainId, searchValue, tokenList]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value === "") {
      setInputList([]);
      return;
    }
    setInputList(e.target.value.split("\n"));
  };

  const onExampleClick = () => {
    setInputValue("0x731c3A53D26487Ea8c9768863CC98BEeaC666666,1\n0x141f2a14a0F8bc8f0E81aCb4b50874f70E8b1234,2");
    setInputList(["0x731c3A53D26487Ea8c9768863CC98BEeaC666666,1", "0x141f2a14a0F8bc8f0E81aCb4b50874f70E8b1234,2"]);
  };

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
          <Autocomplete
            id="asynchronous-demo"
            disableClearable
            options={tokenList}
            getOptionLabel={(option) => option.symbol + "  " + option.address}
            onInputChange={(event, newInputValue) => {
              setSearchValue(newInputValue);
            }}
            onChange={(event, newValue) => {
              setSelectValue(newValue);
            }}
            renderOption={(props, option) => (
              <li key={option.address} {...props}>
                {option.symbol} {option.address}
              </li>
            )}
            renderInput={(params) => (
              <TextField
                {...params}
                InputProps={{
                  ...params.InputProps,
                  endAdornment: (
                    <React.Fragment>{loading ? <CircularProgress color="inherit" size={20} /> : null}</React.Fragment>
                  ),
                }}
                label={t("label1")}
              />
            )}
          />
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
          <div className="bg-gray-200  h-16 flex items-center  pl-5">{selectValue ? selectValue.symbol : ""}</div>
        </div>
      </div>
      <InputContainer
        inputValue={inputValueTarget}
        handleInputChange={handleInputChange}
        inputList={inputList}
        onExampleClick={onExampleClick}
      ></InputContainer>
      <div className="flex items-center">
        <div className="text-[#0e2975] text-[16px] font-bold">{t("MaximumNumber")}</div>
        <Tooltip placement="top-start" title={`${t("tooltip")}`}>
          <div className="flex items-center">
            <Image src="/image/nft-sender/tooltip.svg" alt="Tooltip" width={15} height={15} />
          </div>
        </Tooltip>
        <p>：</p>
        <div>
          <TextField id="outlined-basic" defaultValue={200} className="w-[70px]" size="small" />
        </div>
      </div>
      <div className="w-[150px] h-[40px] bg-[#0050ce] flex items-center justify-center text-white font-bold text-[14px] rounded-xl mt-[10px] hover:cursor-pointer">
        {t("nextStep", { ns: "common" })}
      </div>
    </div>
  );
}
