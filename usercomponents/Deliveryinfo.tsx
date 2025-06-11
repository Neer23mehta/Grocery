'use client'
import { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Typography, StepConnector } from '@mui/material';
import { CheckCircle, LocalShipping, AssignmentLate, DoneAll } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const steps = [
  'Order Placed',
  'Order Dispatched',
  'Out for Delivery',
  'Delivered',
];

const CustomConnector = styled(StepConnector)(({ theme }) => ({
  [`& .MuiStepConnector-line`]: {
    borderColor: 'black',
    borderTopWidth: 3,
    borderRadius: 1,
    transition: 'border-color 0.3s ease',
  },
  [`&.MuiStepConnector-completed .MuiStepConnector-line`]: {
    borderColor: 'black',
  },
  [`&.MuiStepConnector-active .MuiStepConnector-line`]: {
    borderColor: 'black',
  },
}));

const CustomStepIcon = (props) => {
  const { active, completed, icon } = props;
  const icons = [
    <LocalShipping />,
    <AssignmentLate />,
    <DoneAll />,
    <CheckCircle />,
  ];

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 24,
        height: 24,
        borderRadius: '50%',
        backgroundColor: active || completed ? 'green' : 'gray',
        color: 'white',
        transition: 'background-color 0.3s ease',
      }}
    >
      {icons[icon - 1]}
    </Box>
  );
};

export default function DeliveryStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());

  const handleNext = () => {
    setCompletedSteps((prev) => new Set(prev).add(activeStep));
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleReview = () => {
  };

  const handleReset = () => {
    setActiveStep(0);
    setCompletedSteps(new Set());
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, mx: 'auto', py: 4 }}>
      <Stepper
        activeStep={activeStep}
        alternativeLabel
        connector={<CustomConnector />}
      >
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel StepIconComponent={CustomStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <Box sx={{ mt: 2 }}>
        {activeStep === steps.length ? (
          <Box sx={{ textAlign: 'center' }}>
            <Typography variant="h6">Order Delivered</Typography>
            <Button onClick={handleReview} sx={{ mt: 2 }}>
              Write a Review
            </Button>
            <Button onClick={handleReset} sx={{ mt: 2 }}>
              Reset
            </Button>
          </Box>
        ) : (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
              <Button
                color="inherit"
                disabled={activeStep === 0}
                onClick={handleBack}
              >
                Back
              </Button>
              <Button
                variant="contained"
                onClick={handleNext}
              >
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
