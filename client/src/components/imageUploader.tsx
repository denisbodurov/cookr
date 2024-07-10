import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Dialog,
  DialogContent,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [openImage, setOpenImage] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];

    const reader = new FileReader();
    reader.onload = () => {
      const base64Image = reader.result?.toString();
      if (base64Image) {
        console.log("Base64 Image:", base64Image);
        setImage(base64Image);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    noClick: !!image,
  });

  const handleDelete = () => {
    setImage(null);
    setOpenImage(false);
  };

  const handleOpenImage = () => {
    setOpenImage(true);
  };

  const handleCloseImage = () => {
    setOpenImage(false);
  };

  return (
    <Box>
      <Paper
        elevation={3}
        className={`relative p-2 m-2 flex flex-col items-center justify-center h-48 border-2 border-dashed border-secondary ${
          isDragActive ? "bg-secondary bg-opacity-40" : "bg-backgroundLight"
        } transition-colors duration-300 cursor-pointer overflow-hidden`}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {image ? (
          <>
            <img
              src={image} 
              alt="preview"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={handleOpenImage}
            />
            <IconButton
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                bgcolor: "rgba(255, 255, 255, 0.8)",
                "&:hover": {
                  bgcolor: "rgba(255, 255, 255, 1)",
                },
              }}
              onClick={handleDelete}
            >
              <DeleteIcon />
            </IconButton>
          </>
        ) : (
          <Typography variant="h6" className="text-center">
            {isDragActive
              ? "Drop the file here..."
              : "Drop a file here, or click to select a file"}
          </Typography>
        )}
      </Paper>

      <Dialog open={openImage} onClose={handleCloseImage}>
        <DialogContent>
          <img src={image!} alt="large view" style={{ width: "100%" }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ImageUploader;
