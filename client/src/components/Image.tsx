import React, { useEffect, useState } from 'react';

interface ImageDecoderProps {
  image: string;
}

const ImageDecoder: React.FC<ImageDecoderProps> = ({ image }) => {
  const [imageSrc, setImageSrc] = useState<string>('');

  useEffect(() => {
    if (image) {
      
      const base64Data = image.split(';base64,').pop();
      if (base64Data) {
        try {
          const byteCharacters = atob(base64Data);
          const byteNumbers = new Array(byteCharacters.length);
          for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
          }
          const byteArray = new Uint8Array(byteNumbers);
          const blob = new Blob([byteArray], { type: 'image/png' });
          const imageURL = URL.createObjectURL(blob);
          setImageSrc(imageURL);

          // Cleanup function to revoke the created URL
          return () => {
            URL.revokeObjectURL(imageURL);
          };
        } catch (error) {
          console.error('Error decoding base64 image:', error);
        }
      }
    }
  }, [image]);

  return <img src={imageSrc} alt="" loading="lazy" className="mx-auto w-48 h-48 rounded-full object-cover"/>;
};

export default ImageDecoder;