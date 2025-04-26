import React, { useEffect, useState, useRef } from "react";
import { CustomCard } from "./Card";
import { Box } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

interface RestrictedProfilesProps {
  file?: File | File[];
}

interface InstagramRestrictedRaw {
  title: string;
  media_list_data: unknown[];
  string_list_data: {
    href: string;
    value: string;
    timestamp: number;
  }[];
}

interface RestrictedEntry {
  href: string;
  value: string;
  timestamp: number;
}

export const RestrictedProfiles: React.FC<RestrictedProfilesProps> = ({ file }) => {
  const [entries, setEntries] = useState<RestrictedEntry[]>([]);
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (!file || hasProcessed.current) return;

    hasProcessed.current = true;

    const files = Array.isArray(file) ? file : [file];

    files.forEach((f) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);
          const data: InstagramRestrictedRaw[] = json.relationships_restricted_users;

          const parsedEntries: RestrictedEntry[] = data.map((item) => {
            const entry = item.string_list_data[0];
            return {
              href: entry.href,
              value: entry.value,
              timestamp: entry.timestamp,
            };
          });

          setEntries(parsedEntries);
        } catch (err) {
          console.error("Error parsing JSON:", err);
        }
      };

      reader.readAsText(f);
    });
  }, [file]);

  return (
    <CustomCard
      title="Restricted Profiles"
      description="Accounts you've restricted on Instagram."
      content={
        <div className="flex flex-wrap gap-2">
          {entries.map((entry, index) => (
            <Box
              key={index}
              sx={{ boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.1)" }}
              className="flex justify-between items-center gap-4 border border-gray-200 rounded-sm w-fit p-3"
            >
              <div>
                <p className="font-bold">@{entry.value}</p>
                <p className="text-sm text-gray-600">
                  Restricted since: {new Date(entry.timestamp * 1000).toLocaleString()}
                </p>
              </div>
              <a
                href={entry.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                <OpenInNew sx={{ padding: 0, height: 20 }} />
              </a>
            </Box>
          ))}
        </div>
      }
    />
  );
};
