'use client'
import { useState } from 'react';
import { Box, Button, Typography, Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Order Placed', 'Shipped', 'Out for Delivery', 'Delivered'];

export default function OrderTrackingPage() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Track Your Order
      </Typography>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <Box sx={{ mt: 2 }}>
        <Typography variant="body1" align="center">
          {`Your order is currently at the "${steps[activeStep]}" stage.`}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
          >
            Next Step
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
