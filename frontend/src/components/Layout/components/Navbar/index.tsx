import React from "react"
import { Container, Nav, Link, Line, AccountDetail, LoginBtn } from "./styles"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { navData } from "./data";
import { useAuth } from "@/hooks/UseAuth";
import useLanguage from "@/hooks/UseLanguage";
import LogoutIcon from '@mui/icons-material/Logout';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import LoginIcon from '@mui/icons-material/Login';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

const NavBar = () => {
    const userCtx = useAuth()
    const { language } = useLanguage()
    const navigate = useNavigate();

    const [open, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <Container>
            {
                userCtx?.authenticated ? (
                    <AccountDetail>
                        <ListItemButton onClick={handleClick}>
                            <ListItemIcon>
                                <AccountCircleIcon sx={{ fontSize: 50 }} />
                            </ListItemIcon>
                            <ListItemText primary={userCtx?.user?.username || "-"} />
                            {open ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={open} timeout="auto" unmountOnExit>
                            <List component="div" disablePadding>
                                <ListItemButton sx={{ pl: 4 }} onClick={() => alert("Under development...")}>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Settings" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }} onClick={userCtx?.logout}>
                                    <ListItemIcon>
                                        <LogoutIcon />
                                    </ListItemIcon>
                                    <ListItemText primary="Logo-ut" />
                                </ListItemButton>
                            </List>
                        </Collapse>

                    </AccountDetail>
                )
                    :
                    <LoginBtn onClick={() => navigate("/authentication")} variant="contained" startIcon={<LoginIcon />}>
                        Login
                    </LoginBtn>
            }
            <Line />
            <Nav>
                {navData[language as keyof typeof navData].map(n => (
                    <Link className={({ isActive }) => isActive ? 'active' : ""} key={n.label} to={n.path || "/"} >{n.label}</Link>
                ))}
            </Nav>
        </Container>
    )
}

export default NavBar