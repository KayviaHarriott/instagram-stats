import React, { useEffect, useState, useRef } from "react";
import { CustomCard } from "./Card";
import { Box } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

interface PendingFollowRequestsProps {
  file?: File | File[];
}

interface InstagramFollowRequestRaw {
  title: string;
  media_list_data: unknown[];
  string_list_data: {
    href: string;
    value: string;
    timestamp: number;
  }[];
}

interface FollowRequest {
  href: string;
  value: string;
  timestamp: number;
}

export const PendingFollowRequests: React.FC<PendingFollowRequestsProps> = ({
  file,
}) => {
  const [requests, setRequests] = useState<FollowRequest[]>([]);
  const hasProcessed = useRef(false); // Prevent double processing

  useEffect(() => {
    if (!file || hasProcessed.current) return;

    hasProcessed.current = true;

    const files = Array.isArray(file) ? file : [file];

    files.forEach((f) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          const data: InstagramFollowRequestRaw[] =
            json.relationships_follow_requests_sent;

          const parsedRequests: FollowRequest[] = data.map((item) => {
            const entry = item.string_list_data[0];
            return {
              href: entry.href,
              value: entry.value,
              timestamp: entry.timestamp,
            };
          });

          setRequests(parsedRequests);
        } catch (err) {
          console.error("Error parsing JSON:", err);
        }
      };

      reader.readAsText(f);
    });
  }, [file]);

  return (
    <>
      <CustomCard
        title="Pending Follow Requests"
        description=""
        content={
          <div className="flex flex-wrap gap-2">
            {requests.map((req, index) => (
              <div key={index}>
                <div>
                  <Box
                    sx={{ boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.1)" }}
                    className="flex justify-between items-center gap-4 border border-gray-200 rounded-sm w-fit p-3"
                  >
                    <div>
                      <p className="font-bold">@{req.value}</p>
                      <p className="text-sm text-gray-600">
                        Sent on:{" "}
                        {new Date(req.timestamp * 1000).toLocaleString()}
                      </p>
                    </div>
                    <a
                      href={req.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <OpenInNew sx={{ padding: 0, height: 20 }} />
                    </a>
                  </Box>
                </div>
              </div>
            ))}
          </div>
        }
      />
    </>
  );
};
