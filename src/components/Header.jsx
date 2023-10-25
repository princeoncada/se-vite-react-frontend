import { Link } from "react-router-dom";
import "../styles/Header.css";
import {
    Button,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled
} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import PreviewIcon from '@mui/icons-material/Preview';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import ContentPasteSearchIcon from '@mui/icons-material/ContentPasteSearch';
import LogoutIcon from '@mui/icons-material/Logout';
import {useState} from "react";

function Header() {
    const [state, setState] = useState(false);
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === "keydown" && (event.key === "Tab" || event.key === "Shift")) {
            return;
        }

        setState(open);
    };

    const CustomList = styled(List)({
        width: 200
    })

    return (
        <header>
            <nav className="nav desktop">
                <div className="nav__links">
                    <Link to="/home">
                        <div className="nav__link">Watchlist</div>
                    </Link>
                    <div>|</div>
                    <Link to="/stock/screen">
                        <div className="nav__link">Screen</div>
                    </Link>
                    <div>|</div>
                    <Link to="/stock/search">
                        <div className="nav__link">Search</div>
                    </Link>
                    <div>|</div>
                    <Link to="/logout">
                        <div className="nav__link">Logout</div>
                    </Link>
                </div>
            </nav>
            <nav className="nav mobile">
                <Button
                    color="primary"
                    onClick={toggleDrawer("left", true)}
                >
                    <MenuIcon />
                </Button>
                <Drawer
                    anchor="left"
                    open={state}
                    onClose={toggleDrawer("left", false)}
                >
                    <CustomList>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton href="/home">
                                <ListItemIcon>
                                    <PreviewIcon />
                                </ListItemIcon>
                                <ListItemText primary="Watchlist" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton href="/stock/screen">
                                <ListItemIcon>
                                    <FullscreenIcon />
                                </ListItemIcon>
                                <ListItemText primary="Screen" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton href="/stock/search">
                                <ListItemIcon>
                                    <ContentPasteSearchIcon />
                                </ListItemIcon>
                                <ListItemText primary="Search" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                        <ListItem disablePadding>
                            <ListItemButton href="/logout">
                                <ListItemIcon>
                                    <LogoutIcon />
                                </ListItemIcon>
                                <ListItemText primary="Logout" />
                            </ListItemButton>
                        </ListItem>
                        <Divider />
                    </CustomList>
                </Drawer>
            </nav>
        </header>
    )
}

export default Header;