import { useState, useMemo } from "react";
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
// import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh'; - magic wand!
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router";
import { BrowserRouter, Routes, Route } from "react-router";

import './App.css';
import PostView from './postView/PostView';
import About from './about/About';
import { posts } from '../resources/posts.js';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [postIndex, setPostIndex] = useState(posts.length - 1);

  const postsReversed = useMemo(() => [...posts].reverse(), []);

  return (

    <BrowserRouter>
    <Box sx={{ display: 'flex' , width: "100%"}}>

      { /* Navigation drawer */ }
      <Drawer
        class="navDrawer"
        variant="persistent"
        open={drawerOpen}
        sx="flexShrink: 0"
        PaperProps={{
          sx: { maxWidth: "250px" },
        }}
      >
        <Box>
          <div id="drawerButtonSlot">
            <IconButton sx={{ margin: "8px"}} aria-label="Close navigation pane">
              <ChevronLeftIcon onClick={() => setDrawerOpen(false)}/>
            </IconButton>
          </div>

          <nav aria-label="Navigation Pane - Primary Links">
           <List>
            <Link to="/about" className="unstyledLink">
             <ListItem disablePadding>
                 <ListItemButton onClick={() => {
                   // TODO
                   setDrawerOpen(false);
                 }}>
                   <ListItemIcon>
                     <EmojiPeopleIcon />
                   </ListItemIcon>
                   <ListItemText primary="About" />
                 </ListItemButton>
               </ListItem>
             </Link>
           </List>
          </nav>

          <Divider />

          <nav aria-label="Navigation Pane - Posts Log">
            <List>
              {postsReversed.map(({ title, date }, index) => (
                <Link key={index} to="/" className="unstyledLink">
                  <ListItem disablePadding>
                    <ListItemButton onClick={() => {
                      setPostIndex(postsReversed.length - index - 1);
                      setDrawerOpen(false);
                    }}>
                      <ListItemText primary={`${postsReversed.length - index - 1} - ${title}`} />
                    </ListItemButton>
                  </ListItem>
                </Link>
              ))}
            </List>
          </nav>
        </Box>
      </Drawer>

      { /* Header */ }
      <div class="appContainer">
        <div class="headerContainer">
          <IconButton aria-label="Open navigation pane">
            <MenuIcon onClick={() => setDrawerOpen(true)} />
          </IconButton>
          <div class="appHeader">
            <img src="../../header-violet-icon.png" height="32px" width="32px" alt="Small decorative icon of a violet flower"/>
            Thing of the Week
            <img src="../../header-violet-icon.png" height="32px" width="32px" alt="Small decorative icon of a violet flower"/>
          </div>
          <div></div>  { /* Hack to allow justify-content: space-between */ }
        </div>
        <Box sx={{ flexGrow: 1 }} className={drawerOpen ? "mainContent__shifted" : "mainContent__standard"}>

          { /* Main app content */ }
          <Routes>
            <Route index element={
              <PostView
                postIndex={postIndex}
                onPostIndexChanged={(newIndex) => setPostIndex(newIndex)}
                maxPostIndex={postsReversed.length - 1}
              />
            }/>
            <Route path="/about" element={<About />} />
          </Routes>

          <div class="footerContainer">Header icons designed by Freepik <a href="https://www.freepik.com">www.freepik.com</a></div>
        </Box>
      </div>
    </Box>
    </BrowserRouter>
  );
}

export default App;
