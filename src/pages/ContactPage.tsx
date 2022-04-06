import React, { useState } from 'react';
import axios from 'axios';
import styled from '@emotion/styled';
import { Controller, useForm } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import MuiPhoneNumber from 'material-ui-phone-number';
import { CustomAlert } from '../components';
import { useAlertTypeUpdate, useAlertTypeState } from '../contexts/SuccessOrErrorAlertContext';

type FormDataType = {
    firstName: string;
    lastName: string;
    phoneNumber: string;
    msg: string;
}

const StyledContainer = styled(Grid)`
    padding: 0;
    margin-top: 40px;

    .top-container {
        text-align: center;

        .header-text {
            font-weight: 700;
            font-size: 20px;
        }

        .subheader-text {
            font-weight: 500;
            font-size: 14px;

            @media (max-width: 800px) {
                text-align: left;
            }
        }
    }

    .form-field-box {
        margin-bottom: 20px;
    }
`;

type ContactPageDisplayLayerProps = {
    updateAlert: any;
    alertState: any;
};

export default function ContactPage() {
    return <ContactPageDisplayLayer {...useDataLayer()} />;
}

function ContactPageDisplayLayer({ alertState, updateAlert }: ContactPageDisplayLayerProps) {

    const [hasError, setHasError] = useState(false);
    const [hasSuccess, setHasSuccess] = useState(false);
    const [isSendingData, setIsSendingData] = useState(false);

    const errorMessage = 'There was an error sending that information. Please try again and we will reach out to you';
    const successMessage = 'Thank you for reaching out to us! We value your feedback and will respond soon';

    const textFieldValidationRules = {
        required: {
            value: true,
            message: 'This field is required',
        },
    };

    const phoneNumberValidationRules = {
        required: {
            value: true,
            message: 'This field is required',
        },
        validate: (v: any) => v.trim().length === 17,
    };

    function onSubmit({ firstName, lastName, phoneNumber, msg }: FormDataType) {
        setIsSendingData(true);
        return axios({
            method: 'POST',
            url: 'https://fresh-cutz.herokuapp.com/api/contact',
            data: { firstName, lastName, phoneNumber, msg },
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(res => {
            setIsSendingData(false);
            if (res.data !== 'success') {
                updateAlert('error');
                setHasError(true);

                setTimeout(() => {
                    setHasError(false);
                    updateAlert('');
                }, 10000);
            } else {
                setHasSuccess(true);
                updateAlert('success');
                reset();
                setTimeout(() => {
                    setHasSuccess(false);
                    updateAlert('');

                    if (hasSuccess) {
                        return;
                    }
                }, 10000);
            }
        }).catch(() => {
            setIsSendingData(false);
            updateAlert('error');
        });
    }

    const { control, formState: { errors }, handleSubmit, reset } = useForm<FormDataType>({
        defaultValues: {
            firstName: '',
            lastName: '',
            phoneNumber: '',
            msg: '',
        },
    });

    return (
        <StyledContainer>
            {(alertState === 'error' || alertState === 'success') && (
                <CustomAlert msg={hasError ? errorMessage : successMessage} />
            )}
            <Grid className='top-container' item xs={12}>
                <p className='header-text'>
                    Reach Out To Us!
                </p>
                <p className='subheader-text'>
                    We always love hearing your feedback. 
                    Reach out to us and we will be sure to 
                    respond to your message!
                </p>
            </Grid>
            <form>
                <Grid className='form-field-box' item xs={12}>
                    <Controller 
                        name='firstName'
                        control={control}
                        rules={textFieldValidationRules}
                        render={({ field: { onChange, value } }) => (
                            <TextField error={!!errors.firstName} fullWidth color={errors.firstName ? 'error' : 'success'} helperText={errors.firstName ? 'This field is required' : 'Tell us your first name (required)'} onChange={onChange} value={value} label={'First Name'} />
                        )}
                    />
                </Grid>
                <Grid className='form-field-box' item xs={12}>
                    <Controller 
                        name='lastName'
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <TextField  error={!!errors.lastName} fullWidth color={errors.lastName ? 'error' : 'success'} helperText={errors.lastName ? 'This field is required' : 'Tell us your last name (required)'} onChange={onChange} value={value} label={'Last Name'} />
                        )}
                        rules={textFieldValidationRules}
                    />
                </Grid>
                <Grid className='form-field-box' item xs={12}>
                    <Controller 
                        name='phoneNumber'
                        control={control}
                        rules={phoneNumberValidationRules}
                        render={({ field: { onChange, value } }) => (
                            <MuiPhoneNumber error={!!errors.phoneNumber} color={errors.phoneNumber ? 'error' : 'success' } fullWidth defaultCountry={'us'} helperText={errors.phoneNumber ? 'Make sure this number is properly formatted' : 'Tell us your phone number (required)'} onChange={onChange} onlyCountries={['us']} value={value} />
                        )}
                    />
                </Grid>
                <Grid className='form-field-box' item xs={12}>
                    <Controller 
                        name='msg'
                        control={control}
                        rules={textFieldValidationRules}
                        render={({ field: { onChange, value } }) => (
                            <TextField error={!!errors.msg} fullWidth color={errors.msg ? 'error' : 'success'} multiline helperText={errors.msg ? 'You must enter a message' : 'Send us your message.'} value={value} onChange={onChange} placeholder='Type your message here (required)' minRows={5} maxRows={5} />
                        )}
                    />
                </Grid>
                <Button disabled={isSendingData} disableRipple fullWidth color='error' variant='contained' onClick={handleSubmit(onSubmit)}>
                    Send
                </Button>
            </form>
        </StyledContainer>
    );
}

function useDataLayer() {
    const { setAlertType: updateAlert } = useAlertTypeUpdate();
    const { alertType: alertState } = useAlertTypeState();

    return {
        alertState,
        updateAlert,
    };
}