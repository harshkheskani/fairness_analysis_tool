import React, {useState} from 'react'
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import FlexBetween from './FlexBetween';
import { useDispatch } from 'react-redux';
import { setMode } from '../state';
import { AppBar, Icon, IconButton, Toolbar, useTheme } from '@mui/material';
import { fontSize } from '@mui/system';

const Navbar = () => {
    const theme = useTheme
    const dispatch = useDispatch();
    
    return (
        <AppBar sx = {{ position: "static", background:"none", boxShadow: "none"}}>
            <Toolbar sx = {{ justifyContent: "space-between"}}>
                <FlexBetween>
                    {/* Image */}
                </FlexBetween>
                <FlexBetween gap = "1.5 rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === 'light' ? 
                            (<LightModeOutlinedIcon sx = {{fontSize: "25px"}} />
                        ) : (<DarkModeOutlinedIcon sx = {{fontSize: "25px"}}/>) 
                        }    
                    </IconButton>
                    <IconButton>
                        <PersonOutlinedIcon sx ={{fontSize:"25px"}} />
                    </IconButton>
                </FlexBetween>
            </Toolbar>
        </AppBar>
  )
}

export default Navbar