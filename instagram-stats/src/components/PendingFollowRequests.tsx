import React, { useEffect, useState, useRef } from "react";
import { CustomCard } from "./Card";
import { CardGroup } from "./CardGroup";

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
          <CardGroup children={requests} dateDescription="Requested on" />
        }
      />
    </>
  );
};
