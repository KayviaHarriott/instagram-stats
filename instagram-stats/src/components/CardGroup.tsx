import React, { useState } from "react";
import { MiniUserCards } from "./MiniUserCards";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface CardGroupProps {
  children: { value: string; timestamp?: number; href: string }[];
  dateDescription?: string;
}

export const CardGroup: React.FC<CardGroupProps> = ({ children, dateDescription }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15; 

  // Split the items into chunks of 3 per row
  const chunks = (children ?? []).reduce<{ value: string; timestamp?: number; href: string }[][]>(
    (chunks, req, index) => {
      const chunkIndex = Math.floor(index / 3);
      if (!chunks[chunkIndex]) {
        chunks[chunkIndex] = [];
      }
      chunks[chunkIndex].push(req);
      return chunks;
    },
    []
  );

  // Calculate how many pages of data you have
  const totalPages = Math.ceil(chunks.length / (itemsPerPage / 3));

  // Get the items for the current page
  const startIndex = (currentPage - 1) * (itemsPerPage / 3); 
  const currentChunks = chunks.slice(startIndex, startIndex + (itemsPerPage / 3));

  // Handle page change
  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <div>
      <div className="flex flex-wrap gap-1">
        {currentChunks.map((chunk, chunkIndex) => (
          <div className="flex flex-wrap md:flex-nowrap gap-2 w-full" key={chunkIndex}>
            {chunk.map((req, index) => (
              <div className="w-full md:w-1/3" key={index}>
                <MiniUserCards
                  username={`${req.value}`}
                  dateDescription={dateDescription ? dateDescription : null}
                  date={
                    req.timestamp
                      ? `${new Date(req.timestamp * 1000).toLocaleString()}`
                      : null
                  }
                  link={req.href}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Show pagination only if there are more than 1 page */}
      <div className="w-full flex justify-center">
        {totalPages > 1 && (
          <Stack spacing={2} mt={2}>
            <Pagination
              count={totalPages} // Total number of pages
              page={currentPage} // Current page number
              onChange={handlePageChange} // Handle page change
              shape="rounded"
              variant="outlined"
            />
          </Stack>
        )}
      </div>
    </div>
  );
};
