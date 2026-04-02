import { Routes, Route, Link, useNavigate } from "react-router-dom"
import "./App.css"

import Counter from "./Counter.jsx"
import Blog from "./Blog.jsx"
import Form from "./Form.jsx"
import Quiz from "./Quiz.jsx"
import Shop from "./Shop.jsx"
import GeoQuiz from "./GeoQuiz.jsx"
import Random from "./Random.jsx"
import Todo from "./Todo.jsx"

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { useState,useEffect } from "react"


function App() {

    const [currentPath, setCurrentPath] = useState("/")
    const [open, setOpen] = useState(false);

    const paths = [
        {path: "/", name: "Login", element: <Form />},
        {path: "/count", name: "Counter", element: <Counter />},
        {path: "/blog", name: "Blog", element: <Blog />},
        {path: "/quiz", name: "Quiz", element: <Quiz />},
        {path: "/geoquiz", name: "GeoQuiz", element: <GeoQuiz />},
        {path: "/shop", name: "Shop", element: <Shop />},
        {path: "/random", name: "Random", element: <Random />},
        {path: "/todo", name: "Todo", element: <Todo />},
    ]

    const navigate = useNavigate();

    async function handleLogOut() {
        const url = "http://localhost:3000/user/logout"
        const res = await fetch(url, {
            method: "GET",
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
        })
        if (res.status == 200) {
            console.log("Redirection to login")
            navigate("/")
            
            paths.forEach((path)=>{
                if (path.path == window.location.pathname) {
                    setCurrentPath(path)
                }
            })
        }
    }

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={()=>setOpen(false)}>
        <List>
            <ListItem disablePadding>
                <ListItemButton onClick={handleLogOut}>
                    Logout
                </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
            {paths.map((path, index) => (
                <Link key={index} className="Link" to={path.path} onClick={()=>setCurrentPath(path)}>
                    <ListItem disablePadding>
                        <ListItemButton>
                            {path.name}
                        </ListItemButton>
                    </ListItem>
                </Link>
            ))}
        </List>
        </Box>
    );

    useEffect(()=>{
        paths.forEach((path)=>{
            if (path.path == window.location.pathname) {
                setCurrentPath(path)
            }
        })
    },[])


    return (
        <>
            <Drawer open={open} onClose={()=>setOpen(false)}>
                {DrawerList}
            </Drawer>

            <AppBar position="static">
                <Toolbar sx={{maxWidth: "1280px", margin: "auto", width: "100%", boxSizing: "border-box", display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
                    <div style={{display: "flex", justifyContent: "flex-start"}}>
                        <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={()=>setOpen(open => !open)}>
                            <MenuIcon />
                        </IconButton>
                    </div>
                        <Typography variant="h6" component="div" sx={{ textAlign: "center", flexGrow: 1 }}>
                        {currentPath.name}
                    </Typography>
                    <div style={{display: "flex", justifyContent: "flex-end"}}>
                        <Button color="inherit">Login</Button>
                        <Button color="inherit">Signup</Button>
                    </div>
                </Toolbar>
            </AppBar>
        

            <Routes>
                {paths.map((path, index) => (
                    <Route key={index} path={path.path} element={path.element} />
                ))}
            </Routes> 
        </>
    )

}

export default App