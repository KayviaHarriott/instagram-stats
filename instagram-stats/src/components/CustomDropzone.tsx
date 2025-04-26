import { Button } from "@mui/material";
import React, { useRef, useEffect, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
}

export const CustomDropzone: React.FC<DropZoneProps> = ({
  onFilesSelected,
}) => {
  const [uploaded, setUploaded] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onFilesSelected(acceptedFiles);
      setUploaded(true); // Show confirmation
    },
    [onFilesSelected]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
    noClick: true, // We'll handle the click manually
  });

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.setAttribute("webkitdirectory", "");
      inputRef.current.setAttribute("directory", "");
    }
  }, []);

  const openFileDialog = () => {
    inputRef.current?.click();
  };

  return (
    <div
      {...getRootProps()}
      className="border border-dashed border-gray-300 p-4 rounded-md flex flex-col items-center gap-2"
      // style={{
      //   border: "2px dashed #aaa",
      //   padding: "2rem",
      //   textAlign: "center",
      //   borderRadius: "12px",
      // }}
    >
      <input {...getInputProps()} ref={inputRef} />
      {/* Icon */}
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M8 10C8 7.79086 9.79086 6 12 6C14.2091 6 16 7.79086 16 10V11H17C18.933 11 20.5 12.567 20.5 14.5C20.5 16.433 18.933 18 17 18H16C15.4477 18 15 18.4477 15 19C15 19.5523 15.4477 20 16 20H17C20.0376 20 22.5 17.5376 22.5 14.5C22.5 11.7793 20.5245 9.51997 17.9296 9.07824C17.4862 6.20213 15.0003 4 12 4C8.99974 4 6.51381 6.20213 6.07036 9.07824C3.47551 9.51997 1.5 11.7793 1.5 14.5C1.5 17.5376 3.96243 20 7 20H8C8.55228 20 9 19.5523 9 19C9 18.4477 8.55228 18 8 18H7C5.067 18 3.5 16.433 3.5 14.5C3.5 12.567 5.067 11 7 11H8V10ZM15.7071 13.2929L12.7071 10.2929C12.3166 9.90237 11.6834 9.90237 11.2929 10.2929L8.29289 13.2929C7.90237 13.6834 7.90237 14.3166 8.29289 14.7071C8.68342 15.0976 9.31658 15.0976 9.70711 14.7071L11 13.4142V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13.4142L14.2929 14.7071C14.6834 15.0976 15.3166 15.0976 15.7071 14.7071C16.0976 14.3166 16.0976 13.6834 15.7071 13.2929Z"
          fill="#000000"
        />
      </svg>

      <p className="font-bold">
        {isDragActive
          ? "Ready to drop? 💾"
          : "Drag and drop your Instagram data folder here"}
      </p>

      <p className="text-sm text-gray-500">or</p>
      <Button
        onClick={openFileDialog}
        variant="contained"
        sx={{
          boxShadow: "none",
          cursor: "pointer",
          backgroundColor: "black",
          textTransform: "none",
        }}
      >
        Select Folder
      </Button>
      <p className="text-gray-500 text-sm">
        Upload the extracted folder from Instagram's data export (e.g.,
        instagram-username/)
      </p>
      {uploaded && (
        <p className="text-green-600 font-medium pt-1">
          ✅ Folder uploaded successfully!
        </p>
      )}
    </div>
  );
};
