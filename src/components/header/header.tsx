import { Box, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();
  return (
    <Stack bgcolor="#fff" height="75px" p={2} direction="row">
      <Box
        component="img"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Senac_logo.svg/2560px-Senac_logo.svg.png"
        alt="Logo SENAC"
        height="80%"
        sx={{
          cursor: "pointer",
          objectFit: "contain",
          p: 1,
        }}
        onClick={() => navigate("/")}
      />
    </Stack>
  );
};
