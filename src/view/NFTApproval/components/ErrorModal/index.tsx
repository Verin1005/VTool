import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";

interface propsInterface {
  errorVisible: boolean;
  handleErrorClose: () => void;
  type: number;
  error: string;
}
export default function ErrorModal(props: propsInterface) {
  const { errorVisible, handleErrorClose, type, error } = props;

  const Err1 = () => {
    return <div className="text-[#F94D9D] text-2xl text-center font-bold mt-10">Provided address is invalid .</div>;
  };
  const Err2 = () => {
    return <div className="text-[#F94D9D] text-2xl text-center font-bold mt-1 reak-all break-words p-5">{error}</div>;
  };
  return (
    <div>
      <Dialog open={errorVisible} onClose={handleErrorClose} aria-labelledby="responsive-dialog-title">
        <div className={`${type === 1 ? "w-[500px] h-[180px]" : "w-[500px] h-[360px]"}`}>
          <DialogTitle id="responsive-dialog-title">
            <div className="text-2xl font-bold text-[#505A6D]">Error</div>
          </DialogTitle>

          {type === 1 && (
            <div>
              <Err1></Err1>
            </div>
          )}
          {type === 2 && (
            <div>
              <Err2></Err2>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
}
