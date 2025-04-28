import React from "react";
import { Box } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

interface MiniUserCardsProps {
  username: string;
  description: string;
  link: string;
}

export const MiniUserCards: React.FC<MiniUserCardsProps> = ({
  username,
  description,
  link,
}) => {
  return (
    <>
      <Box
        sx={{ boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.1)" }}
        className="flex justify-between items-center gap-4 border border-gray-200 rounded-sm w-full p-3"
      >
        <div>
          <p className="font-bold">@{username}</p>
          <p className="text-sm text-gray-600">Sent on:{description}</p>
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer">
          <OpenInNew sx={{ padding: 0, height: 20 }} />
        </a>
      </Box>
    </>
  );
};
