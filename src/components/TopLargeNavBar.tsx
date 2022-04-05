import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    AppBar,
    Button,
    Drawer,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Typography,
    Toolbar,
} from '@mui/material';
import { Menu as MenuIcon, Home as HomeIcon, Info as InfoIcon, ContactMail as ContactMailIcon, Reviews as ReviewsIcon } from '@mui/icons-material';

const StyledContainer = styled.div`
    padding: 0;
    margin-top: 0;
    margin-left: 0;
    margin-bottom: 100px;
    background-color: rgb(0, 0, 0);
    width: 100%;

    .app-bar {
        background-color: rgb(0, 0, 0);
        width: 100%;
    }

    .icon-button {
        color: rgb(255, 255, 255);
        margin-right: 20px;
        cursor: pointer;
    }

    .links {
        margin-left: 10px;
        color: rgb(255, 255, 255);
        font-weight: 500;
        font-size: 20px;

        text-decoration: none;

        :hover {
            color: rgb(255, 255, 255);
        }
    }

    .drawer-icon {
        margin-right: 2px;
    }

    .drawer-link {
        margin-left: -20px;
    }

    .logo {
        font-size: 30px;
        font-weight: 700;
        color: rgb(255, 255, 255);
        margin-right: 30px;
        cursor: pointer;

        :hover {
            color: rgb(255, 255, 255);
        }
    }

    .btn {
        margin-left: auto;
        color: rgb(255, 255, 255);
        background-color: #a88a61;
        font-weight: 700;

        :hover {
            background-color: #a88a61;
            color: rgb(255, 255, 255);
        }
    }

    .drawer {
        width: 2000px;
        font-weight: 700;
    }

    .drawer-list {
        width: 900px;
    }
`;

export default function TopLargeNavBar() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        setDrawerOpen(false);
    }, [state]);

    function toggleDrawer() {
        setDrawerOpen(!drawerOpen);
    }

    function handleNavigation(newPath: string) {
        navigate(newPath);
        setDrawerOpen(false);
    }

    return (
        <StyledContainer>
            <AppBar className='app-bar' position='fixed' sx={{ display: { xs: 'none', sm: 'none', md: 'none', lg: 'inline', xl: 'inline' }}}>
                <Toolbar>
                    <Typography 
                        className='logo'
                        variant='body1'
                        onClick={() => navigate('/')}
                    >
                        FreshCutz
                    </Typography>
                    <Link className='links' to='/'>
                        Home
                    </Link>
                    <Link className='links' to='/about'>
                        About
                    </Link>
                    <Link className='links' to='/contact'>
                        Contact
                    </Link>
                    <Link className='links' to='/reviews'>
                        Reviews
                    </Link>
                    <Button className='btn' disableRipple onClick={() => navigate('schedule')} variant='contained'>
                        Schedule
                    </Button>
                </Toolbar>
            </AppBar>
            <AppBar className='app-bar' position='fixed' sx={{ display: { xs: 'inline', sm: 'inline', md: 'inline', lg: 'none', xl: 'none' }}}>
                <Toolbar>
                    <IconButton className='icon-button' onClick={toggleDrawer} size='large'>
                        <MenuIcon fontSize='inherit' />
                    </IconButton>
                    <Typography
                        className='logo'
                        variant='body1'
                    >
                        FreshCutz
                    </Typography>
                    <Button className='btn' onClick={() => navigate('schedule')} variant='contained'>
                        Schedule
                    </Button>
                </Toolbar>
            </AppBar>
            <Drawer 
                className='drawer'
                open={drawerOpen}
                onClose={toggleDrawer} 
                sx={{ display: { xs: 'inline', sm: 'inline', md: 'inline', lg: 'none', xl: 'none' }}}
            >
                <List className='drawer-list' style={{ width: '250px' }}>
                    <ListItem>
                        <ListItemButton onClick={() => handleNavigation('/')}>
                            <ListItemIcon className='drawer-icon'>
                                <HomeIcon />
                            </ListItemIcon>
                            <ListItemText className='drawer-link' primary='Home' />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton onClick={() => handleNavigation('about')}>
                            <ListItemIcon className='drawer-icon'>
                                <InfoIcon />
                            </ListItemIcon>
                            <ListItemText className='drawer-link' primary='About' />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton onClick={() => handleNavigation('contact')}>
                            <ListItemIcon className='drawer-icon'>
                                <ContactMailIcon />
                            </ListItemIcon>
                            <ListItemText className='drawer-link' primary='Contact' />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                    <ListItem>
                        <ListItemButton onClick={() => handleNavigation('reviews')}>
                            <ListItemIcon className='drawer-icon'>
                                <ReviewsIcon />
                            </ListItemIcon>
                            <ListItemText className='drawer-link' primary='Reviews' />
                        </ListItemButton>
                    </ListItem>
                    <Divider />
                </List>
            </Drawer>
        </StyledContainer>
    );
}