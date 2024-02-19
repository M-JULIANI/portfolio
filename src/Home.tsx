import { Box, Button, Drawer, Grid, Link, Menu, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react"; // Ensure React is imported, especially if you're using JSX
import ProjectCard from "./components/ProjectCard";
import { NodeInfo } from "./NodeInfo";
import { useNavigate } from 'react-router-dom';
import { LayoutImage } from "./components/LayoutImage";
import { BasicMenu } from "./Menu";

function debounce(func: any) {
    var timer: any;
    return function (event: any) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 500, event);
    };
}

export const openCV = () => window.open('./assets/Marco-Juliani-CV-Jan2024.pdf', 'mywindow');

export const openPlanBee = () => window.open('https://www.food4rhino.com/en/app/planbee', '_blank');
export const openGithub = () => window.open('https://github.com/M-JULIANI', '_blank');

export type MenuItemInfo = {
    label: string;
    action: () => void;
}

const initMenuItems = (navigate: (path: string) => void, handleClose?: () => void): MenuItemInfo[] => [
    {
        label: 'About',
        action: () => {
            navigate('/portfolio/about');
        },
    },
    {
        label: 'CV',
        action: () => {
            openCV();
            handleClose ? handleClose() : null;
        },
    },
    {
        label: 'Github',
        action: () => {
            openGithub();
            handleClose ? handleClose() : null;
        },
    },
    {
        label: 'Planbee',
        action: () => {
            openPlanBee();
            handleClose ? handleClose() : null;
        },
    },
];
export type WindowState = {
    width: number;
    height: number;
    mouseX: number,
    mouseY: number;
}

export const DrawerElementsStyle = {
    fontFamily: 'Space Mono',
    fontSize: 14
}

export const ButtonStyle = {
    color: 'black',
    '&:hover': {
        color: 'white',
        backgroundColor: '#d4d4d4'
    },
    '&:focus': {
        outline: 'none'
    }
}
export const Home: React.FC<{ node: NodeInfo | null }> = ({ node }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const oneCol = useMediaQuery(theme.breakpoints.between(200, 488));
    const twoCols = useMediaQuery(theme.breakpoints.between(488, 705));
    const threeCols = useMediaQuery(theme.breakpoints.between(705, 850));
    const drawerHeight = 100;
    const [windowState, setWindowState] = useState<WindowState>({
        width: window.innerWidth,
        height: window.innerHeight,
        mouseX: 0,
        mouseY: 0,
    });

    const menuItems = initMenuItems(navigate);

    console.log({ menuItems })
    const handleResize = debounce(() => {
        setWindowState(w => {
            return { ...w, width: window.innerWidth, height: window.innerHeight };
        });
    });
    window.addEventListener("resize", handleResize);

    useEffect(() => {
        const handleMouseMove = (event: any) => {
            setWindowState(s => {
                return { ...s, mouseX: event.clientX, mouseY: event.clientY }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const calculatedColumns = React.useMemo(() => {
        if (threeCols) return 3;
        else if (twoCols) return 2;
        else if (oneCol) return 1;
        return 4;
    }, [threeCols, twoCols, oneCol]);

    if (node == null) return null;
    return (
        <>
            <Drawer
                sx={{
                    position: 'relative',
                    width: '100%',
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        height: `${drawerHeight}px`,
                    },
                }}
                variant="permanent"
                anchor="top"
            >
                <Grid display={'flex'}
                    sx={{
                        height: '100%',
                        justifyContent: 'space-evenly',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}>
                    <LayoutImage node={node} width={100} />

                    {calculatedColumns === 1
                        ?
                        <BasicMenu menuItems={menuItems} />
                        :
                        <>
                            {menuItems.map(m => {
                                return <Button sx={{ ...ButtonStyle }} onClick={m.action}>
                                    <Typography sx={{ ...DrawerElementsStyle }}>{m.label}</Typography>
                                </Button>
                            })}
                        </>
                    }
                </Grid>

                {/* <Stack direction={'row'}>
            <LayoutImage node={node} width={150}/>
            <Link>CV</Link>
            <Link>About</Link>
            <Link>PlanBee</Link>
        </Stack> */}

            </Drawer>
            <Box sx={{ py: '16px', top: `${drawerHeight}px`, position: 'relative' }}>
                <Grid container={true} columns={calculatedColumns} sx={{ py: '8px' }} spacing={'24px'}>
                    {node.children.map((child) => <ProjectCard
                        key={child.id}
                        node={child}
                        windowState={windowState}
                        navigate={navigate} />)}
                </Grid>
            </Box>
        </>
    );
}
