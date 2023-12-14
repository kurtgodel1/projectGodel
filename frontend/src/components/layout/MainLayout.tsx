import React, { ReactNode } from 'react';
import { Box, Container, Drawer, List, ListItem, Button, AppBar, Toolbar, Typography, IconButton, useTheme, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/system';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store'; // Update the path as needed
import { LoginButton, RegisterButton, LogoutButton } from '../auth_components/AuthButtons'; // Update the path as needed
import { Link } from 'react-router-dom';
import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const drawerWidth = 240; // or any other value you prefer

    const [isDrawerOpen, setIsDrawerOpen] = useState(!isMobile);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    const DrawerContainer = styled(Drawer)({
        '& .MuiDrawer-paper': {
            width: drawerWidth,
            backgroundColor: theme.palette.grey[100],
            color: theme.palette.text.primary,
        },
    });

    const AppBarStyled = styled(AppBar)({
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
    });


    const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

    return (
        <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh', bgcolor: 'background.default' }}>
            <AppBarStyled position="fixed">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6">My Application</Typography>
                </Toolbar>
            </AppBarStyled>

            <DrawerContainer 
                variant="persistent" 
                open={isDrawerOpen} 
                onClose={toggleDrawer} 
                sx={{ width: drawerWidth, flexShrink: 0 }}
            >
                <Box sx={{ width: drawerWidth, overflow: 'auto' }}>
                    <IconButton onClick={toggleDrawer}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                    <List>
                        <ListItem>
                            <Button component={Link} to="/">Home</Button>
                        </ListItem>
                        <ListItem>
                            <Button>About</Button>
                        </ListItem>
                        <ListItem>
                            <Button component={Link} to="/power">PowerGraph</Button>
                        </ListItem>
                        <ListItem>
                            <Button component={Link} to="/math">Math</Button>
                        </ListItem>
                        {!isLoggedIn && (
                            <div>
                                <ListItem>
                                    <LoginButton />
                                </ListItem>
                                <ListItem>
                                    <RegisterButton />
                                </ListItem>
                            </div>
                            )}
                        {isLoggedIn && 
                            <ListItem>
                                <LogoutButton />
                            </ListItem>}
                        {/* More items */}
                    </List>
                </Box>
            </DrawerContainer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
                <Container maxWidth="lg">
                    {children}
                </Container>

                <Box component="footer" sx={{ textAlign: 'center', py: 2, mt: 4, borderTop: 1, borderColor: 'divider' }}>
                    <Typography variant="body2">© 2023 My Application</Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default MainLayout;
