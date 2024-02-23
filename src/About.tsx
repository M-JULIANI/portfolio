import { Box, Button, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { PortraitImage } from "./components/PortraitImage";
import { debounce, WindowState } from "./Home";
import { Layout } from "./Layout";
import { NodeInfo } from "./NodeInfo";
import { LinkedIn, Twitter, Instagram, GitHub } from '@mui/icons-material';
import { ButtonStyle } from "./styles";

export const About: React.FC<{ node: NodeInfo | null }> = ({ node }) => {

    const theme = useTheme();
    const oneCol = useMediaQuery(theme.breakpoints.between(200, 488));
    const twoCols = useMediaQuery(theme.breakpoints.between(488, 705));
    const [windowState, setWindowState] = useState<WindowState>({
        width: window.innerWidth,
        height: window.innerHeight,
        mouseX: 0,
        mouseY: 0,
    });

    useEffect(() => {
        const handleResize = debounce(() => {
            setWindowState(w => {
                return { ...w, width: window.innerWidth, height: window.innerHeight };
            });
        });
        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [])

    if (node == null) return null;
    const about = node?.children?.find(x => x.type === 'image') || {} as NodeInfo;
    const width = oneCol || twoCols ? windowState.width * 0.8 : windowState.width * 0.3;

    const buttonSize = '30px';
    const items = [
        {
            icon: <LinkedIn sx={{ width: buttonSize, height: buttonSize }} />,
            src: 'https://www.linkedin.com/in/marco-juliani-6a09a953'
        },
        {
            icon: <Twitter sx={{ width: buttonSize, height: buttonSize }} />,
            src: 'https://twitter.com/_m_juliani'
        },
        {
            icon: <GitHub sx={{ width: buttonSize, height: buttonSize }} />,
            src: 'https://github.com/M-JULIANI'
        },
        {
            icon: <Instagram sx={{ width: buttonSize, height: buttonSize }} />,
            src: 'https://www.instagram.com/_mjuliani/?hl=en'
        },
    ]
    return (
        <Layout node={node}>
            <Grid container={true} columns={oneCol || twoCols ? 1 : 2} sx={{ width: '100%', height: '100%', paddingBottom: '48px', paddingTop: '24px' }}>
                <Grid item xs={1} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box sx={{
                        borderRadius: '17px',
                        overflow: 'hidden',
                        transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
                        boxShadow: '-2px -1.5px  10px  0px #00000040',
                    }}>
                        <PortraitImage node={about} width={width} height={width} />
                    </Box>
                </Grid>
                <Grid item xs={1} sx={{ display: 'flex', justifyItems: 'center', justifyContent: 'center', alignItems: 'center', alignContent: 'center' }}>
                    <Box sx={{ display: 'grid', justifyContent: 'center', alignItems: 'center' }}>
                        <Typography variant="body1" sx={{ width: '80%', padding: '48px', fontFamily: 'Roboto' }}>{about.props.content || ''}</Typography>
                        <Typography variant="body1" sx={{ width: '80%', padding: '48px', fontFamily: 'Roboto' }}>{about.props.content || ''}</Typography>
                        <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                            {items.map(x => {
                                return <Button sx={{ ...ButtonStyle }} onClick={() => handleOpen(x.src)}>
                                    {x.icon}
                                </Button>
                            })}
                        </Box>
                    </Box>

                </Grid>
            </Grid>
        </Layout>
    );
}

const handleOpen = (src: string) => {
    window.open(src, '_blank');
}
