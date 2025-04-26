import React, { useEffect, useState, useRef } from "react";
import { CustomCard } from "./Card";
import { Box } from "@mui/material";
import { OpenInNew } from "@mui/icons-material";

interface NonFollowersProps {
  file?: File | File[];
}


interface UnfollowedEntry {
  href: string;
  value: string;
}

export const NonFollowers: React.FC<NonFollowersProps> = ({ file }) => {
  const [notFollowingBack, setNotFollowingBack] = useState<UnfollowedEntry[]>([]);
  const hasProcessed = useRef(false);
  console.log("Matching:", file)

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
      title="Not Following You Back"
      description="These are the people you're following but who aren't following you back 🥲"
      content={
        <div className="flex flex-wrap gap-2">
          <>  {console.log(notFollowingBack)}</>
          {notFollowingBack.map((entry, index) => (
            <Box
              key={index}
              sx={{ boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.1)" }}
              className="flex justify-between items-center gap-4 border border-gray-200 rounded-sm w-fit p-3"
            >
              <div>
                <p className="font-bold">@{entry.value}</p>
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
