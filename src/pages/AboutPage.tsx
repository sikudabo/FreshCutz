import React from 'react';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import BeforeCutImage from '../media-images/before-cut.jpeg';
import BillyPersonalCutImage from '../media-images/billy-personal-cut.jpeg'
import BeverlyHarrisImage from '../media-images/beverly-harris.jpeg';

const TopBackgroundImage = styled.div`
    background-image: url(${BeforeCutImage});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    padding: 0;
    text-align: center;
    margin: 0;
    height: 500px;
    margin-bottom: 50px;

    @media (max-width: 500px) {
        height: 200px;
    }

    .background-image-text {
        color: rgb(255, 255, 255);
        font-size: 30px;
        font-weight: 700;

        @media (min-width: 667px) {
            margin-top: 100px;
        }
    }

    .message-text {
        color: rgb(255, 255, 255, 0.8);
        font-size: 20px;
        font-weight: 700;

        @media (min-width: 667px) {
            margin-top: 100px;
        }
    }
`;

const GridContainer = styled(Grid)`
    margin-top: -40px;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    padding: 0;
    width: 100%;

    @media (max-width: 500px) {
        margin-top: -50px;
    }

    .difference-making-container {
        margin-top: 30px;
        width: 100%;
    }

    .making-difference-subhead {
        color: #a88a61;
        font-weight: 500;
        font-size: 20px;
        margin-bottom: 20px;
    }

    .billy-signature {
        font-weight: 700;
        font-size: 24px;

        .sub-text {
            font-weight: 500;
            font-size: 14px;
        }
    }

    .beverly-dedication-text {
        color: #a88a61;
        font-weight: 700;
        font-size: 20px;
    }

    .contact-section {
        margin-top: 10px;
        margin-bottom: 50px;
        text-align: center;
    }
`;


const StyledBillyImage = styled.img`
    height: 500px;
    display: block;
    width: 100%;

    @media (max-width: 800px) {
        width: 100%;
        margin-left: -10px;
    }
`;

export default function AboutPage() {
    return (
        <GridContainer container spacing={2}>
            <TopBackgroundImage>
            <   p className='background-image-text'>
                    About
                </p>
                <p className='message-text'>
                    We spread the love of God and make our clients look awesome.
                </p>
            </TopBackgroundImage>
            <Grid className='contact-section' item xs={12}>
                <Typography variant='h6'>
                    Phone: 219-203-5537
                </Typography>
                <Typography variant='h6'>
                    Hours: 8am - 10pm
                </Typography>
            </Grid>
            <Grid className='difference-maker-container' item xs={12} sm={12} md={12} lg={6} xl={6}>
                <StyledBillyImage alt='Billy Harris Fresh Cut' src={BillyPersonalCutImage} />
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={6} xl={6}>
                <Typography variant='h4'>
                    We are making a difference.
                </Typography>
                <p className='making-difference-subhead'>
                    God is working through us to make an impact in 
                    the Ft. Wayne community with our gift of 
                    cutting hair. We use this gift so that you 
                    can show off the sharp looks God blessed you with.
                    Remember; your body is a temple for him, and we 
                    help you maintain that temple with clean cuts and
                    shaves.
                </p>
                <p className='billy-signature'>
                    - Billy Harris | Founder & Lead Barber
                </p>
            </Grid>
            <br />
            <br />
            <Grid
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
            >
                <Typography variant='h6'>
                    In loving memory of Beverly Harris
                </Typography>
                <p className='beverly-dedication-text'>
                    God gave Beverly a light that shined and brightened 
                    the world. This company is dedicated to her loving 
                    memory and the amazing impact she made on everyone 
                    she met with her love and kindness. Our barbershop 
                    will continue to spread the joy she gave to all of us.
                </p>
            </Grid>
            <Grid 
                item
                xs={12}
                sm={12}
                md={12}
                lg={6}
                xl={6}
            >
                <StyledBillyImage alt='In loving memory of Beverly Harris' src={BeverlyHarrisImage} />
            </Grid>

        </GridContainer>
    );
}