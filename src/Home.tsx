import { Grid, useMediaQuery, useTheme } from "@mui/material";
import React, { MutableRefObject, useEffect, useRef, useState } from "react";
import ProjectCard from "./components/ProjectCard";
import { NodeInfo } from "./NodeInfo";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { WindowState, useHomeState } from "./contexts/windowContext";

export function debounce(func: any) {
  var timer: any;
  return function (event: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 500, event);
  };
}

export const MOVE_BUFFER = 100;
export const Home: React.FC<{ node: NodeInfo | null }> = ({ node }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const oneCol = useMediaQuery(theme.breakpoints.between(200, 488));
  const twoCols = useMediaQuery(theme.breakpoints.between(488, 705));
  const threeCols = useMediaQuery(theme.breakpoints.between(705, 850));
  const { windowState, setWindowState } = useHomeState();
  const projects = node?.children.filter((x) => x.type === "project");
  const calculatedColumns = React.useMemo(() => {
    if (threeCols) return 3;
    else if (twoCols) return 2;
    else if (oneCol) return 1;
    return 4;
  }, [threeCols, twoCols, oneCol]);

  useEffect(() => {
    const handleResize = debounce(() => {
      setWindowState((w) => {
        return { ...w, width: window.innerWidth, height: window.innerHeight };
      });
    });
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      if (Math.abs(event.clientX - windowState.mouseX) < MOVE_BUFFER) return;
      if (Math.abs(event.clientY - windowState.mouseY) < MOVE_BUFFER) return;
      setWindowState((s) => {
        return { ...s, mouseX: event.clientX, mouseY: event.clientY };
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (node == null) return null;

  return (
    <Layout node={node} offsetFactor={0.5}>
      <Grid container={true} style={{ height: `calc(100vh - 100px)` }} columns={calculatedColumns}>
        {projects &&
          projects.map((child, index) => (
            <ProjectCard key={child.id} node={child} navigate={navigate} singleColumn={calculatedColumns === 1} />
          ))}
      </Grid>
    </Layout>
  );
};
