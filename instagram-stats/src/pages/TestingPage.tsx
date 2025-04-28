import { useEffect } from "react";
import { Box } from "@mui/material";
import { NavBar } from "../components/NavBar";
import { CustomAccordion } from "../components/CustomAccordion";
import { OpenInNew } from "@mui/icons-material";

export const TestingPage = () => {
  useEffect(() => {
    document.title = "IG Analyzer | Home";
    console.log("___Page Loaded___");
  }, []);

  // console.log("Test Data: ", import.meta.env.VITE_ANALYTICS_ID);
  //Data Comparisons to check file types
  // const dataComparisonOptions = [
  //   {
  //     label: "Followers/Following",
  //     description:
  //       "Compare your followers list with your following list to see who doesn't follow you back",
  //   },
  //   {
  //     label: "Hide Story From",
  //     description: "See which accounts you've chosen to hide your stories from",
  //   },
  //   {
  //     label: "Pending Follow Requests",
  //     description: "View accounts that haven't accepted your follow requests",
  //   },
  //   {
  //     label: "Restricted Profiles",
  //     description: "See which accounts you've restricted on Instagram",
  //   },
  // ];

  const requests = [
    {
      value: "john_doe",
      timestamp: 1672531199,
      href: "https://example.com/john_doe",
    },
    {
      value: "jane_smith",
      timestamp: 1672617599,
      href: "https://example.com/jane_smith",
    },
    {
      value: "the_real_alex",
      timestamp: 1672703999,
      href: "https://example.com/the_real_alex",
    },
    {
      value: "chris_jackson",
      timestamp: 1672790399,
      href: "https://example.com/chris_jackson",
    },
    {
      value: "samantha_jones",
      timestamp: 1672876799,
      href: "https://example.com/samantha_jones",
    },
    {
      value: "mike_taylor",
      timestamp: 1672963199,
      href: "https://example.com/mike_taylor",
    },
    {
      value: "emily_williams",
      timestamp: 1673049599,
      href: "https://example.com/emily_williams",
    },
    {
      value: "david_martin",
      timestamp: 1673135999,
      href: "https://example.com/david_martin",
    },
    {
      value: "lucy_brown",
      timestamp: 1673222399,
      href: "https://example.com/lucy_brown",
    },
    {
      value: "tom_harris",
      timestamp: 1673308799,
      href: "https://example.com/tom_harris",
    },
    {
      value: "natalie_clark",
      timestamp: 1673395199,
      href: "https://example.com/natalie_clark",
    },
    {
      value: "joshua_evans",
      timestamp: 1673481599,
      href: "https://example.com/joshua_evans",
    },
    {
      value: "ashley_lee",
      timestamp: 1673567999,
      href: "https://example.com/ashley_lee",
    },
    {
      value: "brandon_young",
      timestamp: 1673654399,
      href: "https://example.com/brandon_young",
    },
    {
      value: "katie_king",
      timestamp: 1673740799,
      href: "https://example.com/katie_king",
    },
  ];

  return (
    <>
      <div className="flex w-full justify-center pt-2 bg-gray-50">
        <div className="flex flex-col max-w-[800px] w-full pb-4 gap-2">
          {/* Nav Bar */}
          <div>
            <div className="fixed top-0 max-w-[800px] w-full z-10 mt-2">
              <NavBar />
            </div>
            <div className="max-w-[800px] w-full mt-2 invisible">
              <NavBar />
            </div>
          </div>

          <CustomAccordion
            items={[
              {
                label: "Pending Follow Requests",
                content: (
                 <div>
                    {/* <p className="font-md text-gray-500 pb-1">Users:</p> */}
                    <div className="flex flex-wrap gap-1">
                      {requests
                        .reduce<
                          { value: string; timestamp: number; href: string }[][]
                        >((chunks, req, index) => {
                          const chunkIndex = Math.floor(index / 3);
                          if (!chunks[chunkIndex]) {
                            chunks[chunkIndex] = [];
                          }
                          chunks[chunkIndex].push(req);
                          return chunks;
                        }, [])
                        .map((chunk, chunkIndex) => (
                          <div className="flex gap-2 w-full" key={chunkIndex}>
                            {chunk.map((req, index) => (
                              <Box
                              sx={{ boxShadow: "1px 1px 3px 1px rgba(0,0,0,0.1)" }}
                              className="flex w-1/3 justify-between items-center gap-4 border border-gray-200 rounded-sm p-3"
                              key={index}
                            >
                              <div>
                                <p className="font-bold">@{req.value}</p>
                                <p className="text-xs text-gray-600">
                                  Sent on:{" "}
                                  {/* {new Date(req.timestamp * 1000).toLocaleString()} */}
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
                            ))}
                          </div>
                        ))}
                    </div>
                 </div>
                
                ),
              },
            ]}
          />
        </div>
      </div>
    </>
  );
};
