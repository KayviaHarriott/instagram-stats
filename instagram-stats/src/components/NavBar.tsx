import { Instagram } from "@mui/icons-material";
import { Box } from "@mui/material";

export const NavBar = () => {
  return (
    <Box
      sx={{
        boxShadow: "5px 5px 15px 2px rgba(0,0,0,0.05)",
        paddingY: 1,
        paddingX: 2,
        backgroundColor: "white",
      }}
      className="rounded-3xl"
    >
      <div className="flex justify-between">
        <div className="flex gap-1 justify-center items-center">
          <Instagram />
          <h2 className="font-bold text-md">IGAnalyzer</h2>
        </div>
        {/* <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "50px",
                    boxShadow: "none",
                    textTransform: "none",
                    color: "black",
                    border: "none",
                    backgroundColor: "red",
                    padding: "0px",
                    width: "fit-content"
                  }}
                > */}
        <a
          className="flex items-center"
          href="https://buymeacoffee.com/kaythedev"
          target="_blank"
        >
          <img className="h-5 w-5" src="coffee-beans.png" />
          {/* <p className="font-lg font-bold">Support Me!</p> */}
        </a>
        {/* </Button> */}
      </div>
    </Box>
  );
};
