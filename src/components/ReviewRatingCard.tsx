import React from 'react';
import styled from '@emotion/styled';
import {
    Avatar,
    Card,
    CardActions,
    CardHeader,
    CardMedia,
    CardContent,
    IconButton,
    Rating,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const StyledCard = styled(Card)`
    margin: 0 auto;
    max-width: 450px;

    .card-media-img {
        height: 350px;
    }

    .avatar {
        height: 120px;
        width: 120px;
    }

    .review {
        font-size: 20px;
        font-weight: 700;
        color: #a88a61;
        text-align: left;
    }
`;

type ReviewRatingCardProps = {
    rating: number;
    reviewerFirstName: string;
    reviewerLastName: string;
    reviewDate: string;
    mediaImage: any;
    review: string;
};

export default function ReviewRatingCard({
    rating,
    reviewerFirstName,
    reviewerLastName,
    reviewDate,
    mediaImage,
    review,
}: ReviewRatingCardProps) {
    return (
        <StyledCard>
            <CardHeader
                avatar={
                    <Avatar className='avatar' src={mediaImage} variant='circular' aria-label='Reviewer Avatar' />
                }
                action={
                    <IconButton aria-label='More Options Icon'>
                        <MoreVertIcon />
                    </IconButton>
                }
                title={`${reviewerFirstName} ${reviewerLastName}`}
                subheader={reviewDate}
            />
            <CardMedia 
                component='img'
                className='card-media-img'
                image={mediaImage}
                alt='Reviewer Haircut'
            />
            <CardContent>
                <p className='review'>
                    {review}
                </p>
            </CardContent>
            <CardActions>
                <Rating precision={0.5} name={`${reviewerFirstName}-rating`} readOnly value={rating} />
            </CardActions>
        </StyledCard>
    );
}