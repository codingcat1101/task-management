import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { useTheme } from '../hooks/useTheme';
import { MdDarkMode, MdLightMode, MdFilter } from "react-icons/md";
import { Button, Row, Stack } from 'react-bootstrap';
import { getTimeOfDay } from '../utils/util';

const Header = () => {
    const themeSwitcherVariant = {
        light: "outline-primary",
        dark: "outline-light"
    };
    const { theme, setTheme } = useTheme();
    return (
        <Navbar bg={theme} variant={theme} expand="lg" style={{'borderBottom' : '1px solid #e1e1e1'}}>
            <Container >
                <Navbar.Brand href="#home">Good {getTimeOfDay()}, Vishal</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-end">
                    {
                        theme === 'light' ?
                            <MdDarkMode style={{ 'color': theme === 'light' ? 'black' : 'white' }} size={30} variant={theme !== undefined && themeSwitcherVariant[theme]} onClick={() => setTheme(theme)} />
                            :
                            <MdLightMode style={{ 'color': theme === 'light' ? 'black' : 'white' }} size={30} variant={theme !== undefined && themeSwitcherVariant[theme]} onClick={() => setTheme(theme)} />
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;