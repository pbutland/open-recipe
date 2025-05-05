import React, { useState } from 'react';
import { Box, Container, IconButton, Stack } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';
import styled from 'styled-components';
import SwipeableViews from 'react-swipeable-views';

const StyledBox = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
});

const ImageContainer = styled('img')({
  width: '50%', // Resize the image to 50%
  maxWidth: '50%', // Ensure it doesn't exceed a max width
});

const ImageCarousel: React.FC<{ imageUrls: string[] | undefined }> = ({ imageUrls }) => {
  const [activeStep, setActiveStep] = useState(0);

  imageUrls = imageUrls ?? [];
  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % imageUrls.length);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) =>
      prevActiveStep === 0 ? imageUrls.length - 1 : prevActiveStep - 1
    );
  };

  return (
    <Stack justifyContent="center">
      {imageUrls?.length > 0 && (
        <Container maxWidth="sm" style={{ textAlign: 'center', marginTop: '50px' }}>
          <Box position="relative">
            <SwipeableViews index={activeStep} onChangeIndex={setActiveStep}>
              {imageUrls.map((image, index) => (
                <StyledBox key={index}>
                  <ImageContainer src={image} alt={`slide ${index}`} />
                </StyledBox>
              ))}
            </SwipeableViews>
            <IconButton
              onClick={handleBack}
              disabled={activeStep === 0}
              style={{ position: 'absolute', top: '50%', left: '16px', transform: 'translateY(-50%)' }}
            >
              <KeyboardArrowLeft />
            </IconButton>
            <IconButton
              onClick={handleNext}
              disabled={activeStep === imageUrls.length - 1}
              style={{ position: 'absolute', top: '50%', right: '16px', transform: 'translateY(-50%)' }}
            >
              <KeyboardArrowRight />
            </IconButton>
          </Box>
        </Container>
      )}
    </Stack>
  );
};

export default ImageCarousel;
