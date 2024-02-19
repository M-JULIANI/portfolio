import { Box, Button, Drawer, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { LayoutImage } from "./components/LayoutImage";
import { NodeInfo } from "./NodeInfo";
import { ButtonStyle, DrawerElementsStyle } from "./styles";
import { BasicMenu } from "./Menu";

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

export const Layout: React.FC<{ node: NodeInfo | null, children: JSX.Element }> = ({ node, children }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const oneCol = useMediaQuery(theme.breakpoints.between(200, 488));
    const drawerHeight = 100;
    const menuItems = initMenuItems(navigate);
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
                        overflow: 'hidden',
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

                    {oneCol
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

            </Drawer>
            {<Box sx={{ top: `${drawerHeight}px`, position: 'relative', alignItems: 'center', justifyItems:'center'}}>
                {children}
            </Box>}
        </>
    );
}