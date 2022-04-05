import React from 'react';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import Carousel from 'react-material-ui-carousel';
import { NavigateNext as NavigateNextIcon, NavigateBefore as NavigateBeforeIcon } from '@mui/icons-material';
import { ReviewRatingCard } from '../components';
import ReviewFadeImage from '../media-images/review-fade.jpeg';
import ReviewMohawkImage from '../media-images/review-mohawk.jpeg';
import ReviewShaveImage from '../media-images/review-shave.jpeg';

const StyledContainer = styled(Grid)`
    margin-top: 20px;

    .top-container {
        margin-bottom: 50px;
    }

    .header-text {
        font-size: 30px;
        font-weight: 700;
        text-align: center;
    }

    .subheader-text {
        font-size: 20px;
        font-weight: 500;
        text-align: center;
        margin-top: 10px;
        color: #a88a61;
    }

    .carousel-container {
        text-align: center;
        width: 100%;
    }

`;

const reviewObjects = [
    {
        rating: 5.0,
        reviewerFirstName: 'Jack',
        reviewerLastName: 'Johnson',
        reviewDate: 'January 18, 2022',
        mediaImage: ReviewFadeImage,
        review: 'Billy Harris at FreshCutz is the best! He got me looking clean and ready to go!',
    },
    {
        rating: 4.5,
        reviewerFirstName: 'Chris',
        reviewerLastName: 'Smith',
        reviewDate: 'February 24, 2022',
        mediaImage: ReviewMohawkImage,
        review: 'I have been looking for a Mohawk for a long time and Billy hooked me up. Will definitely be back for more!',
    },
    {
        rating: 4.7,
        reviewerFirstName: 'Tyreek',
        reviewerLastName: 'Carroll',
        reviewDate: 'March 26, 2022',
        mediaImage: ReviewShaveImage,
        review: 'I was looking like a caveman before I saw Billy and scheduled an appointment at FreshCutz. Best shaves in Ft. Wayne.',
    },
];

export default function ReviewsPage() {
    return (
        <StyledContainer container spacing={2}>
            <Grid className='top-container' item xs={12}>
                <p className='header-text'>
                    Reviews
                </p>
                <p className='subheader-text'>
                    See what people are saying about us!
                </p>
            </Grid>
            <Grid className='carousel-container'>
                <Carousel 
                    interval={10000}
                    NextIcon={<NavigateNextIcon />}
                    PrevIcon={<NavigateBeforeIcon />}
                    navButtonsAlwaysVisible
                    stopAutoPlayOnHover
                >
                    {reviewObjects.map((obj, index) => (
                        <ReviewRatingCard 
                            key={index}
                            review={obj.review}
                            reviewerFirstName={obj.reviewerFirstName}
                            reviewerLastName={obj.reviewerLastName}
                            rating={obj.rating}
                            mediaImage={obj.mediaImage}
                            reviewDate={obj.reviewDate}
                        />
                    ))}
                </Carousel>
            </Grid>
        </StyledContainer>
    );
}