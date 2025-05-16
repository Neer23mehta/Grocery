import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import { RxCross2 } from "react-icons/rx";
import { TextField } from "@mui/material";
import { Style } from "../homemanage/Styles";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

function Input({ open, handleClose, onSubmit, initialValue = "" }) {
  const [data, setData] = React.useState(initialValue);

  React.useEffect(() => {
    setData(initialValue);
  }, [initialValue]);

  const handleSubmit = () => {
    if (data.trim() !== "") {
      onSubmit(data.trim());
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <span
          onClick={handleClose}
          className="text-2xl cursor-pointer absolute right-2 top-2"
        >
          <RxCross2 />
        </span>
        <h2 className="mb-4 text-xl text-center font-semibold">
          {initialValue ? "Edit Name" : "Add Name"}
        </h2>
        <div className="flex flex-col gap-4">
          <TextField
            id="search"
            name="search"
            label="Name"
            type="text"
            value={data}
            onChange={(e) => setData(e.target.value)}
            variant="outlined"
            sx={Style}
            size="small"
          />
          <div className="flex justify-end gap-2">
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
}

export default Input;