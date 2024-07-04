import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography, Paper, IconButton, Dialog, DialogContent } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const ImageUploader: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [openImage, setOpenImage] = useState<boolean>(false);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const newImage = URL.createObjectURL(file);
    setImage(newImage);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    noClick: !!image, // Disables the click-to-upload behavior if an image is already uploaded
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
        sx={{
          position: 'relative',
          p: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '200px',
          border: '2px dashed #1976d2',
          backgroundColor: isDragActive ? '#e3f2fd' : '#fafafa',
          transition: 'background-color 0.3s',
          cursor: 'pointer',
          overflow: 'hidden'
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        {
          image ? (
            <>
              <img
                src={image}
                alt="preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '100%',
                  objectFit: 'contain',
                  cursor: 'pointer'
                }}
                onClick={handleOpenImage}
              />
              <IconButton
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 1)',
                  }
                }}
                onClick={handleDelete}
              >
                <DeleteIcon />
              </IconButton>
            </>
          ) : (
            <Typography variant="h6">
              {isDragActive ? 'Drop the file here...' : 'Drag \'n\' drop a file here, or click to select a file'}
            </Typography>
          )
        }
      </Paper>
      <Dialog open={openImage} onClose={handleCloseImage}>
        <DialogContent>
          <img src={image!} alt="large view" style={{ width: '100%' }} />
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default ImageUploader;
