import { ClassNames } from '@emotion/react';
import { AccountBalance, LibraryAddCheck, LocalShipping } from '@mui/icons-material';
import { Step, StepLabel, Stepper } from '@mui/material';
import React from 'react';

const CheckOutSteps = ({ activePage }) => {
    const steps = [
        {
            label: 'Shipping Details',
            icon: < LocalShipping  />
        },
        {
            label: 'Confirm Order',
            icon: < LibraryAddCheck  />
        },
        {
            label: 'Payment',
            icon: < AccountBalance />
        },
    ]
    return (
        <>
            <Stepper alternativeLabel activeStep={activePage}>
                {
                    steps.map((item, index) => {
                        return (
                            <Step key={index}>
                                <StepLabel
                                    icon={item.icon}
                                    style={{color:activePage>=index?"tomato":"rgba(0, 0, 0, 0.649)"}}
                                >
                                    {item.label}
                                </StepLabel>

                            </Step>
                        )
                    })
                }
            </Stepper>
        </>
    );
}

export default CheckOutSteps;
