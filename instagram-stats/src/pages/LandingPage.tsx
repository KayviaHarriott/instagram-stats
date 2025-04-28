import { useEffect, useState } from "react";
import { CustomDropzone } from "../components/CustomDropzone";
import { Box, Button, CircularProgress } from "@mui/material";
import { DataComparisonOptions } from "../pages/DataComparisonOptions";
import { PendingFollowRequests } from "../components/PendingFollowRequests";
import { HideStoryFrom } from "../components/HiddenStory";
import { RestrictedProfiles } from "../components/RestrictedProfiles";
import { NonFollowers } from "../components/NonFollowers";
import { NavBar } from "../components/NavBar";
import { HowToUse } from "../pages/HowTo";
import { CustomAccordion } from "../components/CustomAccordion";
import { Replay } from "@mui/icons-material";

export const LandingPage = () => {
  const [files, setFiles] = useState<File[]>([]); //to track uploaded files
  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>({}); //to track selected checkboxes
  const [loadingState, setLoadingState] = useState(false); //to track loaded state
  const [steps, setSteps] = useState(0); //to track steps
  const [matchingFiles, setMatchingFiles] = useState<Record<string, File[]>>(
    {}
  );
  const [fileUploaded, setFileUploaded] = useState(false); //to track if file is uploaded

  useEffect(() => {
    document.title = "IG Analyzer | Home";
    console.log("___Page Loaded___");
  }, []);

  //Extract selected labels based on checked items
  const selectedLabels = Object.entries(checkedItems)
    .filter(([, isChecked]) => isChecked)
    .map(([label]) => label)
    .sort((a, b) =>
      a === "Followers/Following" ? 1 : b === "Followers/Following" ? -1 : 0
    );

  // console.log("Test Data: ", import.meta.env.VITE_ANALYTICS_ID);
  //Data Comparisons to check file types
  const dataComparisonOptions = [
    {
      label: "Followers/Following",
      description:
        "Compare your followers list with your following list to see who doesn't follow you back",
    },
    {
      label: "Hide Story From",
      description: "See which accounts you've chosen to hide your stories from",
    },
    {
      label: "Pending Follow Requests",
      description: "View accounts that haven't accepted your follow requests",
    },
    {
      label: "Restricted Profiles",
      description: "See which accounts you've restricted on Instagram",
    },
  ];

  //Handle file selection from the dropzone
  const handleFiles = (files: File[]) => {
    setFiles(files);
    setFileUploaded(true);
  };

  // Handle changes in the checkboxes
  const handleCheckboxChange = (label: string, isChecked: boolean) => {
    setCheckedItems((prev) => ({
      ...prev,
      [label]: isChecked,
    }));
  };

  // Handle form submission
  const handleSubmission = (files: File | File[]): void => {
    const fileArray = Array.isArray(files) ? files : [files];

    const labelToFileMap: Record<string, string[]> = {
      "Followers/Following": ["followers_1.json", "following.json"],
      "Hide Story From": ["hide_story_from.json"],
      "Pending Follow Requests": ["pending_follow_requests.json"],
      "Restricted Profiles": ["restricted_profiles.json"],
    };

    const matched: Record<string, File[]> = {};

    selectedLabels.forEach((label) => {
      const filePatterns = labelToFileMap[label] || [];
      matched[label] = fileArray.filter((file) =>
        filePatterns.some((pattern) =>
          file.name.toLowerCase().includes(pattern.toLowerCase())
        )
      );
    });

    setMatchingFiles(matched);
    setLoadingState(true); // Set loading state to true
    setSteps(1); // Move to the next step

    // your matching logic here...
    setLoadingState(true);

    setTimeout(() => {
      setLoadingState(false);
    }, 2500);
    setLoadingState(false);

    setSteps(1); // Move to the next step AFTER the 5-second delay
  };

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

          {/* Content */}
          <div className="flex flex-col gap-4 px-2">
            {/* How To  */}
            <HowToUse />

            {/* Section 1: Upload data*/}
            <div className="flex flex-col gap-1">
              <CustomDropzone onFilesSelected={handleFiles} />
              <div className="w-full flex justify-end">
                <Button
                  sx={{ textTransform: "none" }}
                  className="flex justify-center items-center gap-1"
                  onClick={() => {
                    setSteps(0); // Reset the step to 0
                    setFiles([]); // Clear the files
                    setFileUploaded(false); // Optionally reset fileUploaded if necessary
                  }}
                >
                  <Replay />
                  Reupload
                </Button>
              </div>
            </div>

            {/* Section 2: Data Comparison Options */}
            {steps == 0 && !loadingState ? (
              <div>
                <DataComparisonOptions
                  options={dataComparisonOptions}
                  onCheckboxChange={handleCheckboxChange}
                  onSubmit={() => handleSubmission(files)}
                  isLoading={loadingState}
                  hasSelectedOptions={selectedLabels.length > 0}
                  fileUploaded={fileUploaded}
                />
              </div>
            ) : null}

            {/* Section 3: Results */}
            {steps == 1 && !loadingState ? (
              <div>
                <h2 className="font-bold text-lg pb-2">Results</h2>
                <div className="flex flex-col gap-2">
                  <CustomAccordion
                    items={selectedLabels
                      .map((label, index) => {
                        const accordionItems = [];

                        if (label === "Hide Story From") {
                          accordionItems.push({
                            label: "Story Hidden From",
                            content: (
                              <HideStoryFrom file={matchingFiles[label]} />
                            ),
                          });
                        }

                        if (label === "Pending Follow Requests") {
                          accordionItems.push({
                            label: "Pending Follow Requests",
                            content: (
                              <PendingFollowRequests
                                file={matchingFiles[label]}
                              />
                            ),
                          });
                        }

                        if (label === "Restricted Profiles") {
                          accordionItems.push({
                            label: "Restricted Profiles",
                            content: (
                              <RestrictedProfiles file={matchingFiles[label]} />
                            ),
                          });
                        }

                        if (label === "Followers/Following") {
                          accordionItems.push({
                            label: "NonFollowers",
                            content: (
                              <NonFollowers file={matchingFiles[label]} />
                            ),
                          });
                        }

                        return accordionItems.length > 0
                          ? accordionItems.map((item, itemIndex) => ({
                              ...item,
                              key: `${index}-${itemIndex}`, // Use both label and itemIndex for the key
                            }))
                          : null;
                      })
                      .filter((item) => item !== null) // Filter out any null values
                      .flat()} // Use flat() to flatten the array
                  />
                </div>
              </div>
            ) : null}
          </div>

          {loadingState && (
            <Box className="h-[50vh] rounded-2xl w-full bg-gray-100 flex items-center justify-center">
              <CircularProgress />
            </Box>
          )}
        </div>
      </div>
    </>
  );
};
