import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import Image from "next/image";
interface propsInterface {
  successVisible: boolean;
  handleSuccessClose: () => void;
}
export default function SuccessModal(props: propsInterface) {
  const { successVisible, handleSuccessClose } = props;

  return (
    <div>
      <Dialog open={successVisible} onClose={handleSuccessClose} aria-labelledby="responsive-dialog-title">
        <div className="w-[500px] h-[300px]">
          <DialogTitle id="responsive-dialog-title">
            <div className="text-2xl font-bold text-[#505A6D]">Success</div>
          </DialogTitle>
          <div className="flex justify-center mt-16">
            <Image
              src="/image/nft-approval/success.svg"
              alt="logo"
              width={100}
              height={100}
              className="rounded-full"
            ></Image>
          </div>
          <div
            onClick={handleSuccessClose}
            className="hover:cursor-pointer w-9/12 h-16 bg-[#0E1243] m-auto mt-10 rounded-full flex items-center justify-center font-bold text-2xl text-white"
          >
            Close
          </div>
        </div>
      </Dialog>
    </div>
  );
}
