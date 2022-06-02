import React, { useState, useMemo, useEffect } from "react";

import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Autocomplete from "@mui/material/Autocomplete";
import { isAddress } from "utils/isAddress";
import { useERC721Contract } from "hooks/useContract";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";

export default function NFTSender() {
  const { t } = useTranslation("nft-sender");
  const { account, chainId, active, activate, deactivate } = useActiveWeb3React();
  const [tokenList, setTokenList] = useState([]);

  const [current, setCurrent] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const address = useMemo(() => {
    return isAddress(searchValue) ? searchValue : "";
  }, [searchValue]);

  const ERC721Instance = useERC721Contract(address);
  useEffect(() => {
    console.log(address);

    const getErc721Info = async () => {
      try {
        // setSelectLoading(true);

        const index = tokenList.findIndex((item) => item.address === isAddress(searchValue));
        if (index !== -1) {
          return;
        }
        const symbol = await ERC721Instance.symbol();
        console.log(11122233, ERC721Instance);

        const name = await ERC721Instance.name();
        const token = { symbol, name, address, chainId };
        console.log(token);

        setTokenList([...tokenList, token]);
        console.log(22222222, tokenList);

        // setSelectLoading(false);
      } catch (error) {
        console.log(error);
        // setSelectLoading(false);
      }
    };
    getErc721Info();
  }, [ERC721Instance, address, chainId, searchValue, tokenList]);
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
              options={tokenList.map((option) => option.symbol)}
              onInputChange={(event, newInputValue) => {
                setSearchValue(newInputValue);
                console.log(searchValue);
              }}
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
