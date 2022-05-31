import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import { useERC721Contract } from "hooks/useContract";
import { useActiveWeb3React } from "hooks/useActiveWeb3React";
import { isAddress } from "utils/isAddress";
import useDebounce from "hooks/useDebounce";
import WaitingModal from "./components/WaitingModal/index";
import { calculateGasMargin } from "utils/fomatData";
export default function NFTApproval() {
  const { library, chainId, account } = useActiveWeb3React();

  const { t } = useTranslation("nft-approval");
  const [current, setCurrent] = useState(true);
  const [nftAddress, setNftAddress] = useState("");
  const [contractAddress, setContractAddress] = useState("");
  const [waitingVisible, setWaitingVisible] = useState(false);
  const [nftName, setNftName] = useState("");
  const addr1 = useDebounce(nftAddress, 200);
  const addr2 = useDebounce(contractAddress, 200);

  const ERC721Instance = useERC721Contract(addr1);

  const handleWaitingClose = () => {
    setWaitingVisible(false);
  };
  const handleApproval = async () => {
    // console.log(isAddress(addr1) === addr1);
    const name = await ERC721Instance!.symbol();
    setNftName(name);
    setWaitingVisible(true);
    if (library) {
      const gasPrice = await library.getGasPrice();
      const gasLimit = await ERC721Instance!.estimateGas.setApprovalForAll(addr2, current);
      const res = await ERC721Instance!.setApprovalForAll(addr2, current, {
        gasLimit: calculateGasMargin(gasLimit),
        gasPrice: gasPrice,
      });
      console.log(res);
    }

    try {
    } catch (error) {}
  };
  return (
    <div className="p-10">
      <div className="h-24 w-full  flex items-center justify-center font-bold text-xl">{t("title")}</div>
      <div className="text-sm text-gray-500">{t("nft-contract-address")}</div>
      <div className="mt-2">
        <TextField
          id="outlined-basic"
          variant="outlined"
          className="w-full"
          onChange={(e) => {
            setNftAddress(e.target.value);
          }}
        />
      </div>
      <div className="text-sm text-gray-500 mt-10">{t("authorization-contract-address")}</div>
      <div className="mt-2">
        <TextField
          id="outlined-basic"
          variant="outlined"
          className="w-full"
          onChange={(e) => {
            setContractAddress(e.target.value);
          }}
        />
      </div>
      <div className="text-sm text-gray-500 mt-10">{t("operation")}</div>

      <div className="flex justify-between mt-5">
        <div
          className={`${
            current ? "bg-[#074ED3] text-white" : "bg-gray-200"
          } w-1/3 h-14 flex items-center justify-center hover:cursor-pointer font-bold text-xl`}
          onClick={() => {
            setCurrent(true);
          }}
        >
          {t("btn-approvel")}
        </div>
        <div
          className={`${
            !current ? "bg-[#074ED3] text-white" : "bg-gray-200"
          } w-1/3 h-14 flex items-center justify-center hover:cursor-pointer font-bold text-xl`}
          onClick={() => {
            setCurrent(false);
          }}
        >
          {t("btn-cancelapprovel")}
        </div>
      </div>
      <div
        onClick={() => {
          handleApproval();
        }}
        className="w-48  h-14 bg-[#0E1243] m-auto mt-20 flex justify-center items-center rounded-xl text-white text-xl hover:cursor-pointer"
      >
        执行
      </div>
      <WaitingModal
        toAddress={addr2}
        waitingVisible={waitingVisible}
        handleWaitingClose={handleWaitingClose}
        nftName={nftName}
      ></WaitingModal>
    </div>
  );
}
