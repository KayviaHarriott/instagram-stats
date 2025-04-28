import React, { useEffect, useState, useRef } from "react";
import { CustomCard } from "./Card";
import { CardGroup } from "./CardGroup";

interface NonFollowersProps {
  file?: File | File[];
}

interface UnfollowedEntry {
  href: string;
  value: string;
}

export const NonFollowers: React.FC<NonFollowersProps> = ({ file }) => {
  const [notFollowingBack, setNotFollowingBack] = useState<UnfollowedEntry[]>(
    []
  );
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (!file || hasProcessed.current) return;

    hasProcessed.current = true;
    const filesArray = Array.isArray(file) ? file : [file];

    const followers: Set<string> = new Set();
    let following: UnfollowedEntry[] = [];

    let filesRead = 0;

    filesArray.forEach((f) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const json = JSON.parse(event.target?.result as string);

          if (f.name.toLowerCase().includes("following")) {
            const data = json.relationships_following;
            if (Array.isArray(data)) {
              following = data.map((item) => {
                const entry = item.string_list_data[0];
                return {
                  href: entry.href,
                  value: entry.value,
                  timestamp: entry.timestamp
                };
              });
            }
          }

          if (f.name.toLowerCase().includes("followers")) {
            if (Array.isArray(json)) {
              json.forEach((item) => {
                const entry = item.string_list_data[0];
                followers.add(entry.value);
              });
            }
          }

          filesRead++;
          if (filesRead === filesArray.length) {
            const notFollowingBackList = following.filter(
              (person) => !followers.has(person.value)
            );
            setNotFollowingBack(notFollowingBackList);
          }
        } catch (err) {
          console.error("Error parsing JSON:", err);
        }
      };
      reader.readAsText(f);
    });
  }, [file]);
  return (
    <CustomCard
      content={
        <div>
          <CustomCard content={<CardGroup dateDescription="Followed on" children={notFollowingBack} />} />
        </div>
      }
    />
  );
};
