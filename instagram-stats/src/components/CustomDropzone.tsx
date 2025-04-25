import React, { useRef, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  onFilesSelected: (files: File[]) => void;
}

export const CustomDropzone: React.FC<DropZoneProps> = ({ onFilesSelected }) => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    onFilesSelected(acceptedFiles);
  }, [onFilesSelected]);

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
      style={{
        border: "2px dashed #aaa",
        padding: "2rem",
        textAlign: "center",
        borderRadius: "12px",
      }}
    >
      <input {...getInputProps()} ref={inputRef} />
      <p>
        {isDragActive
          ? "Drop it now, honey 💾"
          : "Drag & drop files or folders here"}
      </p>
      <button
        type="button"
        onClick={openFileDialog}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          borderRadius: "8px",
          border: "none",
          backgroundColor: "#007bff",
          color: "white",
          cursor: "pointer",
        }}
      >
        Click to select folder 📂
      </button>
    </div>
  );
};
