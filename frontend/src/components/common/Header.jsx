import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import { useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../reducks/users/operations';
import { getUser } from '../../reducks/users/selectors';
import CustomDialog from './ConfirmationDialog';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Header = ({ toggleDrawer, open }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const selector = useSelector(state => state);
    const [title, setTitle] = useState();
    const user = getUser(selector);

    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        if (location.pathname.includes('applications')) {
            setTitle('Home');
        } else if (location.pathname.includes('interviews')) {
            setTitle('Interviews');
        } else if (location.pathname.includes('students')) {
            setTitle('Students');
        } else if (location.pathname.includes('admins')) {
            setTitle('Admins');
        } else {
            setTitle('Report');
        }
    }, [location]);

    return (
        <AppBar position="absolute" open={open} sx={{
            width: '100%'
        }}>
            <CustomDialog
                text="Are you sure to logout?"
                isOpen={openDialog}
                onClose={() => setOpenDialog(false)}
                onConfirm={() => dispatch(signOut())}
            />
            <Toolbar>
                <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
                    {title}
                </Typography>
                <Typography component="h3" variant="h6" color="inherit" noWrap>
                    {user.user_name}
                </Typography>
                <Divider />
                <Typography
                    component="h3"
                    variant="h6"
                    color="inherit"
                    noWrap
                    sx={{ ml: 3, cursor: 'pointer' }}
                    onClick={() => setOpenDialog(true)}
                >
                    Logout
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
