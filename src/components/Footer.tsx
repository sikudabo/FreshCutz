import React from 'react';
import styled from '@emotion/styled';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link, useNavigate } from 'react-router-dom';

const FooterContainer = styled.div`
    background-color: rgb(0, 0, 0);
    color: rgb(255, 255, 255);
    width: 100%;
    margin-top: 30px;
    text-align: center;
    clear: both;
    margin-left: 0;
    margin-right: 0;
    margin-bottom: 0;
    padding: 0;

    .link {
        text-decoration: none;
        color: rgb(255, 255, 255);
        font-weight: 700;
        font-size: 20px;
        margin-top: 10px;
    }

    .flex-container {
        display: flex;
        flex-direction: column;
    }
`;

const StyledButton = styled(Button)`
    color: rgb(255, 255, 255);
    background-color: #a88a61;
    font-weight: 700;
    height: 50px;
    width: 200px;
    margin: 0 auto;
    margin-top: 20px;
    font-size: 20px;

    :hover {
        background-color: #a88a61;
        color: rgb(255, 255, 255);
    }
`;
export default function Footer() {
    const navigate = useNavigate();

    return (
        <FooterContainer>
            <Grid container>
                <Grid style={{ marginBottom: '20px' }} item xs={12}>
                    <Typography variant='h4'>
                        Site Links
                    </Typography>
                </Grid>
                <Grid className='flex-container' item xs={12} spacing={3}>
                    <Link className='link' to='/'>
                        Home
                    </Link>
                    <Link className='link' to='about'>
                        About
                    </Link>
                    <Link className='link' to='contact'>
                        Contact
                    </Link>
                    <Link className='link' to='reviews'>
                        Reviews
                    </Link>
                    <StyledButton onClick={() => navigate('schedule')} variant='contained'>
                        Schedule
                    </StyledButton>
                    <Typography variant='h6' sx={{ fontSize: '20px', marginTop: '20px' }}>
                        Hours: Mon-Friday 8am - 10pm
                    </Typography>
                </Grid>
            </Grid>
        </FooterContainer>
    );
}