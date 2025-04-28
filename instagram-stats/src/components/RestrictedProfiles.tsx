import React, { useEffect, useState, useRef } from "react";
import { CustomCard } from "./Card";
import { CardGroup } from "./CardGroup";

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

export const RestrictedProfiles: React.FC<RestrictedProfilesProps> = ({
  file,
}) => {
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
          const data: InstagramRestrictedRaw[] =
            json.relationships_restricted_users;

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
      description="Profiles you've restricted on your account:"
      content={<CardGroup children={entries} dateDescription="Requested on" />}
    />
  );
};
