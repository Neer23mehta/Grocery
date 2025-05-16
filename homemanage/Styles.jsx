export const Style = {
    width: "100%",
    height: "80%",
  
    // Label color when focused
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  
    // Input text color when focused
    "& .MuiOutlinedInput-root": {
      "& input": {
        color: "black",
      },
      borderRadius:"10px",
      "& fieldset": {
        borderColor: "gray", // default border
      },
      "&:hover fieldset": {
        borderColor: "black", // border on hover
      },
      "&.Mui-focused fieldset": {
        borderColor: "black", // border when focused
      },
    },
  };
  