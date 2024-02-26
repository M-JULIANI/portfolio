import { Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NodeInfo } from "./NodeInfo";
import { useNavigate, useParams } from 'react-router-dom';
import { Layout } from "./Layout";
import ProjectItem from "./components/ProjectItem";
import { ButtonStyle } from "./styles";
import { WindowState } from "./Home";

function debounce(func: any) {
    var timer: any;
    return function (event: any) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(func, 500, event);
    };
}

export type ProjectParams = {
    id: string;
};

const TEXT_MAX_WIDTH = 600;
const MOVE_BUFFER = 50;
export const ProjectPage: React.FC<{ node: NodeInfo | null }> = ({ node }) => {
    const navigate = useNavigate();
    const { id } = useParams<ProjectParams>();
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


    const handleResize = debounce(() => {
        setWindowState(w => {
            return { ...w, width: window.innerWidth, height: window.innerHeight };
        });
    });
    window.addEventListener("resize", handleResize);

    useEffect(() => {
        const handleMouseMove = (event: any) => {

            if (Math.abs(event.clientX - windowState.mouseX) < MOVE_BUFFER) return;
            if (Math.abs(event.clientY - windowState.mouseY) < MOVE_BUFFER) return;
            setWindowState(s => {
                return { ...s, mouseX: event.clientX, mouseY: event.clientY }
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    const projectNode = node?.children.find(x => x.id === id);

    const calculatedColumns: number = React.useMemo(() => {
        if (threeCols) return 3;
        else if (twoCols) return 2;
        else if (oneCol) return 1;
        return Math.min(projectNode?.children?.length || 0, 4);
    }, [threeCols, twoCols, oneCol, projectNode]);

    if (projectNode === undefined) return null;

    const paragraphs = (projectNode.props.content || '').split(/(?:\n\n|  )/);
    return (
        <Layout node={node}>
            <Grid container={true} sx={{ display: 'grid', justifyItems: 'center', justifyContent: 'center', alignItems: 'center' }}>
                <Typography
                    variant="h4"
                    sx={{
                        maxWidth: TEXT_MAX_WIDTH,
                        fontFamily: 'Roboto', p: '12px'
                    }}>
                    {projectNode.props.name}
                </Typography>
                {projectNode.props?.links?.length &&

                    <Grid sx={{ display: 'flex' }}>
                        {projectNode.props.links.map(link => {
                            return (<Button sx={{
                                ...ButtonStyle,
                                display: 'grid',
                                alignContent: 'center',
                                alignItems: 'center',
                                margin: '8px',
                                borderColor: 'black',
                                border: '2px',
                                borderRadius: '8px',
                                borderStyle: 'solid',
                                '&:hover': {
                                    color: 'white',
                                    backgroundColor: '#d4d4d4',
                                    borderColor: '#d4d4d4',
                                }
                            }}
                                onClick={() => window.open(`${link.value}`, '_blank')}>
                                <Typography
                                    sx={{
                                        maxWidth: TEXT_MAX_WIDTH,
                                        fontSize: '12px',
                                        fontFamily: 'Space Mono',
                                        fontWeight: 'bold'
                                    }}>
                                    {link.key}
                                </Typography>
                            </Button>)
                        })}
                    </Grid>
                }
                <div style={{ padding: '48px 12px', fontFamily: 'Roboto', justifyContent: 'center', justifyItems: 'center'}}>
                    {paragraphs.map((paragraph, index) => (
                        <Typography
                            key={index}
                            variant="body1"
                            sx={{
                                width: '100%',
                                maxWidth: TEXT_MAX_WIDTH,
                                marginBottom: '16px',
                                wordWrap: 'break-word',
                                justifyContent: 'center',
                            }}
                        >
                            {paragraph}
                        </Typography>
                    ))}
                </div>
                <Grid container={true} columns={calculatedColumns} sx={{ display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center', width: '100%' }}>
                    {projectNode.children?.map((child) => <ProjectItem
                        key={child.id}
                        node={child}
                        windowState={windowState}
                        navigate={navigate}
                        singleColumn={calculatedColumns === 1} />)}
                </Grid>
            </Grid>
            {/* </Grid> */}
        </Layout>
    );
}
