import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";

export default function InputContainer() {
  const { t } = useTranslation("nft-sender");
  const [value, setValue] = useState("");
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  return (
    <div className="w-full min-h-[400px">
      <div className="w-3/5 h-[20px] font-bold text-xl text-[#001A6B]">{t("label2")}</div>
      <div className="w-full h-[380px]  flex mt-5">
        <div className="w-[50px] h-full bg-[#F9F9F9] text-center">
          <div className="w-full h-[20px] mt-1 flex items-end justify-center text-[#001C6B] font-bold">1</div>
        </div>
        <div className="w-full h-full ">
          <TextField
            id="standard-multiline-basic"
            multiline
            rows={18}
            value={value}
            onChange={handleChange}
            variant="standard"
            className="w-full h-full bg-[#F9F9F9]"
            InputProps={{
              disableUnderline: true,
              style: { lineHeight: "20px" },
            }}
          ></TextField>
        </div>
      </div>
    </div>
  );
}
