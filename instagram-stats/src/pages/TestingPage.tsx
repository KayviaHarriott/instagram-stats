import { useEffect } from "react";
import { NavBar } from "../components/NavBar";
import { CustomAccordion } from "../components/CustomAccordion";
import { CardGroup } from "../components/CardGroup";

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
      timestamp: 1672531199, // Jan 1, 2023
      href: "https://example.com/john_doe",
    },
    {
      value: "jane_smith",
      timestamp: 1672617599, // Jan 2, 2023
      href: "https://example.com/jane_smith",
    },
    {
      value: "the_real_alex",
      timestamp: 1672703999, // Jan 3, 2023
      href: "https://example.com/the_real_alex",
    },
    {
      value: "chris_jackson",
      timestamp: 1672790399, // Jan 4, 2023
      href: "https://example.com/chris_jackson",
    },
    {
      value: "samantha_jones",
      timestamp: 1672876799, // Jan 5, 2023
      href: "https://example.com/samantha_jones",
    },
    {
      value: "mike_taylor",
      timestamp: 1672963199, // Jan 6, 2023
      href: "https://example.com/mike_taylor",
    },
    {
      value: "emily_williams",
      timestamp: 1673049599, // Jan 7, 2023
      href: "https://example.com/emily_williams",
    },
    {
      value: "david_martin",
      timestamp: 1673135999, // Jan 8, 2023
      href: "https://example.com/david_martin",
    },
    {
      value: "lucy_brown",
      timestamp: 1673222399, // Jan 9, 2023
      href: "https://example.com/lucy_brown",
    },
    {
      value: "tom_harris",
      timestamp: 1673308799, // Jan 10, 2023
      href: "https://example.com/tom_harris",
    },
    {
      value: "natalie_clark",
      timestamp: 1673395199, // Jan 11, 2023
      href: "https://example.com/natalie_clark",
    },
    {
      value: "joshua_evans",
      timestamp: 1673481599, // Jan 12, 2023
      href: "https://example.com/joshua_evans",
    },
    {
      value: "ashley_lee",
      timestamp: 1673567999, // Jan 13, 2023
      href: "https://example.com/ashley_lee",
    },
    {
      value: "brandon_young",
      timestamp: 1673654399, // Jan 14, 2023
      href: "https://example.com/brandon_young",
    },
    {
      value: "katie_king",
      timestamp: 1673740799, // Jan 15, 2023
      href: "https://example.com/katie_king",
    },
  ];

  return (
    <>
      <div className="flex w-full justify-center pt-2 bg-gray-50">
        <div className="flex flex-col max-w-[850px] w-full pb-4 gap-2">
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
                    <div>
                      <CardGroup children={requests} dateDescription="Requested on"/>
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
