import React from 'react';
import styled from '@emotion/styled';
import Carousel from 'react-material-ui-carousel'
import { Grid, Typography } from '@mui/material';
import { NavigateNext as NavigateNextIcon, NavigateBefore as NavigateBeforeIcon } from '@mui/icons-material';
import { CarouselHaircutStyleCard, Footer } from '../components';
import BeardCut from '../media-images/gold-clippers-beard.jpeg';
import KidCut from '../media-images/kid-cut.jpeg';
import MohawkImage from '../media-images/mohawk-cut.jpeg';
import BaldFadeImage from '../media-images/bald-fade.jpeg';
import LowCutImage from '../media-images/low-cut.jpeg';
import RazorLineImage from '../media-images/razor-line.jpeg';
import CleanShaveImage from '../media-images/clean-shave.jpeg';
import '../styles/Home.css';


export const TopBackgroundImage = styled.div`
    background-image: url(${BeardCut});
    background-size: cover;
    background-repeat: no-repeat;
    width: 100%;
    padding: 0;
    text-align: center;
    margin: 0;

    @media (max-width: 500px) {
        height: 200px;
    }

    .background-image-text {
        color: rgb(255, 255, 255);
        font-size: 30px;
        font-weight: 700;
    }

    .message-text {
        color: rgb(255, 255, 255);
        font-size: 20px;
        font-weight: 700;
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

    .kid-cut-block {
        margin-top: 50px;
    }

    .kid-cut-text {
        text-align: center;
    }

    .kid-cut-header-text {
        margin-top: 20px;
        color: #a88a61;

        @media (min-width: 800px) {
            margin-top: 40px;
        }
    }

    .kid-cut-summary {
        text-align: left;
        font-weight: 700;
    }

    .gold-text {
        color: #a88a61;
        font-weight: 700;
    }

    .gold-text-header {
        font-weight: 700;
    }

    .services-container {
        margin-top: 20px;

        @media (min-width: 1000px) {
            text-align: center;
        }
    }
`;

const StyledKidImage = styled.img`
    height: 500px;
    display: block;
    width: 100%;

    @media (max-width: 800px) {
        width: 100%;
        margin-left: -10px;
    }
`;

export default function Home() {
    const haircutCardObjects = [
        {
            cutStyle: 'Razor Line',
            description: 'Always look well-groomed with the standard Razor Line. Every gentleman knows that a standard Razor Line cut keeps them sharp and looking professional.',
            img: RazorLineImage,
            price: 12.00,
        },
        {
            cutStyle: 'Mohawk',
            description: 'A fresh new mohawk is the quickest way to get attention. We use precision razors to make sure you get a clean and cool Mohawk.',
            img: MohawkImage,
            price: 25.00,
        },
        {
            cutStyle: 'Low Cut Taper',
            description: 'Get a clean and close cut that is precise and clean. A low cut taper is helps you blend in while in a professional or relaxed environment.',
            img: LowCutImage,
            price: 15.00,
        },
        {
            cutStyle: 'Bald Fade',
            description: 'The Bald Fade is a timeless cut and style that will allow you to feel good and well-groomed in any environment.',
            img: BaldFadeImage,
            price: 15.00,
        },
        {
            cutStyle: 'Clean Shave',
            description: 'There is nothing to make a man feel better than a clean shave. A clean shave will enable you to look clean, smooth, and younger.',
            img: CleanShaveImage,
            price: 12.00,
        },
    ];

    return (
        <GridContainer container spacing={2}>
            <TopBackgroundImage className='top-image'>
                <p className='background-image-text'>
                    FreshCutz
                </p>
                <p className='message-text'>
                    Love is in the hairs
                </p>
            </TopBackgroundImage>
            <Grid className='kid-cut-block' item xs={12} lg={6} xl={6}>
                <StyledKidImage alt='A kid getting a haircut' src={KidCut} />
            </Grid>
            <Grid className='kid-cut-text' item xs={12} lg={6} xl={6}>
                <Typography 
                    className='kid-cut-header-text'
                    variant='h4'
                >
                    Barber Solutions for your looks
                </Typography>
                <Typography className='kid-cut-summary' variant='subtitle1'>
                    We deliver professional grade cuts and 
                    shaves that will help you genuinely feel
                    like a new person. We spread our love for 
                    God by showing the talents he has blessed us 
                    with by providing professional-grade cuts 
                    within the FT. Wayne community.
                </Typography>
                <br></br>
                <Typography className='kid-cut-summary' variant='subtitle2'>
                    Don't miss out on an opportunity to book an appointment 
                    for yourself, a family member, or a friend. Our affordable
                    cuts will have your entire click looking clean and fresh. Our 
                    website makes it easy to book and pay for an appointment right
                    here with no hassle!
                </Typography>
            </Grid>
            <Grid className='services-container' item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Typography 
                    variant='h4'
                    className='gold-text'
                >
                    What we're offering
                </Typography>
                <Typography 
                    variant='h3'
                    className='gold-text-header'
                >
                    Professional Barber Services
                </Typography>
                <Carousel
                    interval={10000}
                    NextIcon={<NavigateNextIcon />}
                    PrevIcon={<NavigateBeforeIcon />}
                    navButtonsAlwaysVisible
                    stopAutoPlayOnHover
                >
                    {haircutCardObjects.map((card, index) => (
                        <CarouselHaircutStyleCard key={index} cutStyle={card.cutStyle} description={card.description} img={card.img} price={card.price} />
                    ))}
                </Carousel>
            </Grid>
            <Footer />
        </GridContainer>
    );
}