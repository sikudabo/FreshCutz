import React, { useState } from 'react';
import styled from '@emotion/styled';
import axios from 'axios';
import MuiPhoneNumber from 'material-ui-phone-number';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DateTimePicker from '@mui/lab/DateTimePicker';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { TextField, Switch, Typography, FormControlLabel, FormGroup } from '@mui/material';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import "date-fns";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const cardOptions = {
    iconStyle: 'solid',
    style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: '500',
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {
        color: '#fce883',
      },
      '::placeholder': {
        color: '#87BBFD',
      },
    },
    invalid: {
      iconColor: '#FFC7EE',
      color: '#FFC7EE',
    },
  },
}

const StyledContainer = styled.div`
    .top-header {
        text-align: center;
        margin-bottom: 30px;

        .top-banner-text {
            font-weight: 700;
            font-size: 50px;
        }

        .top-banner-prompt {
            font-weight: 500;
            color: #a88a61;
        }
    }
`;

const StyledPaymentContainer = styled.div`
    .FormGroup {
        margin: 0 15px 20px;
        padding: 0;
        border-style: none;
        background-color: #7795f8;
        will-change: opacity, transform;
        box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #829fff;
        border-radius: 4px;
    }

    .FormRow {
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        margin-left: 15px;
        border-top: 1px solid #819efc;
    }

    .StripeElement--webkit-autofill {
        background: transparent !important;
    }

    .StripeElement {
        width: 100%;
        padding: 11px 15px 11px 0;
    }

    button {
        display: block;
        font-size: 16px;
        width: calc(100% - 30px);
        height: 40px;
        margin: 40px 15px 0;
        background-color: #f6a4eb;
        box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ffb9f6;
        border-radius: 4px;
        color: #fff;
        font-weight: 600;
        cursor: pointer;
        transition: all 100ms ease-in-out;
        will-change: transform, background-color, box-shadow;
        border: none;
    }

    button:active {
        background-color: #d782d9;
        box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #e298d8;
        transform: scale(0.99);
    }

    .App {
        margin-left: 25%;
        margin-top: 5%;
        margin-right: 25%;
    }

    h1,
    h3 {
        text-align: center;
    }
`;

const StyledTopControls = styled.div`
    margin-top: 50px;
    margin-bottom: 50px;

    .text-field {
        margin-top: 50px;
    }

    .select-component {
        margin-top: 50px;
    }
`;

export default function ScheduleAppointment() {
    const [success, setSuccess] = useState(false);
    const [currentDate, setCurrentDate] = useState(Date.now);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isCreditPayment, setIsCreditPayment] = useState(true);
    const [currentStyle, setCurrentStyle] = useState('Razor Line');
    const stripe = useStripe();
    const elements = useElements();

    function handleDateChange(e) {
        const selectedDate = new Date(e);
        console.log(selectedDate.getHours());
        setCurrentDate(selectedDate);
    }

    function handlePaymentTypeChange(e) {
        setIsCreditPayment(!isCreditPayment);
        console.log('Updated value is:', !isCreditPayment);
    }

    function handleFirstnameChange(e) {
        setFirstName(e.target.value);
    }

    function handleLastnameChange(e) {
        setLastName(e.target.value);
    }

    function handlePhoneNumberChange(e) {
        setPhoneNumber(e);
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: elements.getElement(CardElement),
        });

        if (!lastName) {
            alert('You must enter a last name to schedule your appointment');
            return;
        } else if (!firstName) {
            alert('You must enter a first name to schedule an appointment');
            return;
        } else if (!phoneNumber) {
            alert('You must enter your phone number to schedule an appointment');
            return;
        } else if (!currentDate) {
            alert('You must select a date and time to schedule an appointment');
            return;
        }

        if (!error) {
            try {
                const { id } = paymentMethod;
                const response = await axios({
                    method: 'POST',
                    url: 'https://fresh-cutz.herokuapp.com/api/stripe/pay',
                    data: { currentStyle, currentDate, firstName, lastName, phoneNumber, isCreditPayment, id },
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                if (response.data === 'success') {
                    alert('Successfully booked appointment');
                    console.log('Successful payment');
                    setSuccess(true);
                }
            } catch(e) {
                console.log('There was an error creating this payment method:', e);
                alert('There was an error booking that appointment');
            }
        } else {
            console.log('There was an error processing that payment:', error.message);
            alert('There was an error processing that payment.');
        }
    }

    return (
        <StyledContainer>
            <div className='top-header'>
                <Typography variant='h4' className='top-header-text'>
                    Schedule An Appointment
                </Typography>
                <br />
                <p className='top-banner-prompt'>
                    Book an appointment today to start 
                    looking fresh and clean today!
                </p>
            </div>
            <StyledTopControls>
                <TextField  
                    placeholder='First Name'
                    fullWidth 
                    label='First Name'
                    value={firstName}
                    onChange={handleFirstnameChange}
                />
                <TextField 
                    className='text-field'
                    placeholder='Last Name'
                    fullWidth
                    label='Last Name' 
                    value={lastName}
                    onChange={handleLastnameChange}
                />
                <MuiPhoneNumber 
                    className='text-field'
                    fullWidth
                    defaultCountry='us'
                    helperText='Enter Your Phone Number'
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Time"
                        value={currentDate}
                        onChange={handleDateChange}
                        minDate={new Date().getTime()}
                        renderInput={(params) => <TextField className='text-field' fullWidth {...params} />}
                    />
                </LocalizationProvider>
                <FormControl className='select-component' fullWidth>
                    <InputLabel id="demo-simple-select-label">Haircut Style</InputLabel>
                        <Select
                        labelId="demo-simple-select-label"
                        value={currentStyle}
                        label="Haircut Style"
                        onChange={(e) => setCurrentStyle(e.target.value)}
                        >
                        <MenuItem value={'Razor Line'}>Razor Line ($12.00)</MenuItem>
                        <MenuItem value={'Mohawk'}>Mohawk ($25.00)</MenuItem>
                        <MenuItem value={'Low Cut Taper'}>Low Cut Taper ($15.00)</MenuItem>
                        <MenuItem value={'Bald Fade'}>Bald Fade ($15.00)</MenuItem>
                        <MenuItem value={'Clean Shave'}>Clean Shave ($12.00)</MenuItem>
                    </Select>
            </FormControl>
            <FormGroup className='text-field'>
                <FormControlLabel control={<Switch checked={isCreditPayment} name='paymentType' onClick={handlePaymentTypeChange} />} label="Pay With Credit Card" />
            </FormGroup>
            </StyledTopControls>
            {isCreditPayment && (
                <StyledPaymentContainer>
                    {!success ? (
                        <form onSubmit={handleSubmit}>
                            <fieldset className='FormGroup'>
                                <div className='FormRow'>
                                    <CardElement options={cardOptions} />
                                </div>
                            </fieldset>
                            <button>Schedule</button>
                        </form>
                    ): (
                        <div>
                            Appointment successfully scheduled
                        </div>
                    )}
                </StyledPaymentContainer>
            )}
            {!isCreditPayment &&
                <StyledPaymentContainer>
                    <button>Schedule</button>
                </StyledPaymentContainer>
            }
        </StyledContainer>
    );
}