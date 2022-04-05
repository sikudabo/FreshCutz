import React from 'react';
import styled from '@emotion/styled';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@mui/material';

type CarouselHaircutStylesCardProps = {
    cutStyle: string;
    description: string;
    img: any;
    price: number;
};

const StyledButton = styled(Button)`
    background-color: #a88a61;

    :hover {
        background-color: #a88a61;
    }
`;

export default function CarouselHaircutStyleCard({
    cutStyle,
    description,
    img,
    price,
}: CarouselHaircutStylesCardProps) {
    return (
        <Card sx={{ maxWidth: 345, margin: '0 auto', marginTop: '20px' }}>
            <Typography gutterBottom variant="h5" component="div">
                {cutStyle}
            </Typography>
            <CardMedia
                component="img"
                alt={`Haircut: ${cutStyle}`}
                height="500"
                image={img}
            />
            <CardContent>
                <Typography style={{ textAlign: 'left' }} variant="body1" component="p">
                    {description}
                </Typography>
                <Typography color='error' variant='body1'>
                   Price: {`$${price.toFixed(2)}`}
                </Typography>
            </CardContent>
            <CardActions>
                <StyledButton size='large' variant='contained'>
                    Schedule
                </StyledButton>
            </CardActions>
        </Card>
    );
}