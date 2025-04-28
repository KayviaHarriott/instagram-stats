import React, { useEffect, useState, useRef } from "react";
import { CustomCard } from "./Card";
import { CardGroup } from "./CardGroup";

interface HideStoryFromProps {
  file?: File | File[];
}

interface InstagramHideStoryRaw {
  title: string;
  media_list_data: unknown[];
  string_list_data: {
    href: string;
    value: string;
    timestamp: number;
  }[];
}

interface HideStoryEntry {
  href: string;
  value: string;
  timestamp: number;
}

export const HideStoryFrom: React.FC<HideStoryFromProps> = ({ file }) => {
  const [entries, setEntries] = useState<HideStoryEntry[]>([]);
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
          const data: InstagramHideStoryRaw[] =
            json.relationships_hide_stories_from;

          const parsedEntries: HideStoryEntry[] = data.map((item) => {
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
      content={<CardGroup children={entries} dateDescription="Hidden on" />}
    />
  );
};
