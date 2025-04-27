export const HowToUse = () => {
  const instructions = [
    {
      icon: "download.png",
      label: "Step 1",
      description: (
        <>
          Download your Instagram data as JSON, click{" "}
          <a
            href="https://help.instagram.com/181231772500920?helpref=faq_content"
            className="text-blue-500 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            here
          </a>
          .
        </>
      ),
    },
    {
      icon: "upload-file.png",
      label: "Step 2",
      description: "Upload the downloaded data here.",
    },
    {
      icon: "selection.png",
      label: "Step 3",
      description: "Select the data you want to analyze.",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center gap-4 pt-3 pb-4 px-2 bg-white rounded-2xl">
        <h2 className="text-lg font-bold text-gray-700">How it Works</h2>
        <div className="flex flex-col md:flex-row md:justify-center gap-6 mt-2">
          {instructions.map((instruction, index) => (
            <div
              key={index}
              className="flex gap-3 md:gap-0 md:flex-col items-center md:justify-center md:w-1/4"
            >
              <img className="w-7 h-7 md:mb-2" src={instruction.icon} />
              <div className="flex flex-col">
                  <h4 className="md:text-center text-md font-bold">{instruction.label}</h4>
                  <p className="md:text-center text-sm text-gray-600">
                    {instruction.description}
                  </p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-gray-400 px-2 py-1 rounded text-sm font-md mt-4">
          <p>And your Instagram data is never stored!</p>
        </div>
      </div>
    </>
  );
};
