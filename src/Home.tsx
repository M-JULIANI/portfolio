import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import { NodeInfo } from "./NodeInfo";
import { useNavigate } from 'react-router-dom';
import { Layout } from "./Layout";


export type WindowState = {
    width: number;
    height: number;
    mouseX: number,
    mouseY: number;
}

function debounce(func: any) {
    var timer: any;
    return function (event: any) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 500, event);
    };
}
export const Home: React.FC<{ node: NodeInfo | null }> = ({ node }) => {
    const navigate = useNavigate();
    const theme = useTheme();
    const oneCol = useMediaQuery(theme.breakpoints.between(200, 488));
    const twoCols = useMediaQuery(theme.breakpoints.between(488, 705));
    const threeCols = useMediaQuery(theme.breakpoints.between(705, 850));
    const [windowState, setWindowState] = useState<WindowState>({
        width: window.innerWidth,
        height: window.innerHeight,
        mouseX: 0,
        mouseY: 0,
    });
    const calculatedColumns = React.useMemo(() => {
        if (threeCols) return 3;
        else if (twoCols) return 2;
        else if (oneCol) return 1;
        return 4;
    }, [threeCols, twoCols, oneCol]);

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

    if (node == null) return null;
    return (
        <Layout node={node}>
                <Grid container={true} columns={calculatedColumns} sx={{ py: '8px' }} spacing={'24px'}>
                    {node.children.map((child) => <ProjectCard
                        key={child.id}
                        node={child}
                        windowState={windowState}
                        navigate={navigate} />)}
                </Grid>
                </Layout>
    );
}
