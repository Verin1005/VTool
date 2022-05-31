import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import { width } from "@mui/system";

interface propsInterface {
  toAddress: string;
  waitingVisible: boolean;
  handleWaitingClose: () => void;
  nftName: string;
}
export default function WaitingModal(props: propsInterface) {
  const { toAddress, waitingVisible, handleWaitingClose, nftName } = props;

  return (
    <div>
      <Dialog open={waitingVisible} onClose={handleWaitingClose} aria-labelledby="responsive-dialog-title">
        <div className="w-[500px] h-[360px]">
          <DialogTitle id="responsive-dialog-title">
            <div className="text-2xl font-bold text-[#505A6D]">Waiting for confirmation</div>
            <div className="flex justify-center mt-16">
              <CircularProgress style={{ width: "100px", height: "100px", color: "#0E1243" }} disableShrink />
            </div>
            <div className="mt-16 text-center text-[#0E1243] font-bold ">Set Approval For ALL{nftName} to</div>
            <div className=" text-center text-[#0E1243] font-bold ">{toAddress}</div>
            <div className=" mt-5 text-center text-gray-400  ">Confirm this Transaction in your wallet</div>
          </DialogTitle>
        </div>
      </Dialog>
    </div>
  );
}
