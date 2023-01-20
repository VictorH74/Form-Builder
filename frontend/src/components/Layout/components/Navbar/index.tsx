import React from "react"
import { Container, Nav, Link, Line, AccountMenu, AccountDetail } from "./styles"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { navData } from "./data";

const user = {
    username: "VictorH75",
}

const NavBar = () => {
    return (
        <Container>
            <AccountDetail>
                <AccountCircleIcon sx={{ fontSize: 50 }} />
                <AccountMenu onClick={() => alert("Account menu clicked!!")}>
                    <span>{user.username}</span>
                    <ExpandMoreIcon />
                </AccountMenu>
            </AccountDetail>

            <Line />
            <Nav>
                {navData.map(n => (
                    <Link className={({ isActive }) => isActive ? 'active' : ""} key={n.label} to={n.path || "/"} >{n.label}</Link>
                ))}
            </Nav>
        </Container>
    )
}

export default NavBar