export const Style = {
    width: "100%",
    height: "80%",
  
    "& .MuiInputLabel-root.Mui-focused": {
      color: "black",
    },
  
    "& .MuiOutlinedInput-root": {
      "& input": {
        color: "black",
      },
      borderRadius:"10px",
      "& fieldset": {
        borderColor: "gray", 
      },
      "&:hover fieldset": {
        borderColor: "black", 
      },
      "&.Mui-focused fieldset": {
        borderColor: "black", 
      },
    },
  };
  