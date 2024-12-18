import { Box, Button, Grid, Typography } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NodeInfo } from "../NodeInfo";
import { LayoutImage } from "./LayoutImage";
import { useHomeState } from "../contexts/windowContext";
import { LayoutIFrame } from "./LayoutIFrame";
import { LayoutVideo } from "./LayoutVideo";
import { ButtonStyle, DarkGrayCard } from "../styles";

const DEFAULT_WIDTH = 600;
const ProjectItem: React.FC<{
  node: NodeInfo;
  navigate: (path: string) => void;
  singleColumn: Boolean;
  setSelectedNode: React.Dispatch<React.SetStateAction<NodeInfo | null>>;
}> = ({ node, singleColumn, setSelectedNode }) => {
  const { windowState } = useHomeState();
  const { type } = node;
  const { src } = node.props;
  const [mouseHover, setMouseHover] = useState(false);
  const { mouseX, mouseY } = windowState;
  const gridRef = useRef<HTMLDivElement | null>(null);

  const distance = useMemo(() => {
    const gridElement = gridRef.current;
    if (gridElement) {
      const rect = gridElement.getBoundingClientRect();
      const halfWidth = rect.width * 0.5;
      const halfHeight = rect.height * 0.5;
      const distanceX = Math.abs(mouseX - rect.left - halfWidth);
      const distanceY = Math.abs(mouseY - rect.top - halfHeight);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const overallDiagonal = Math.sqrt(
        windowState.width * windowState.width + windowState.height * windowState.height,
      );
      const scaledDistance = 50 * (overallDiagonal / distance);
      return scaledDistance;
    }
    return 200;
  }, [mouseX, mouseY, gridRef]);

  useEffect(() => {
    if (mouseHover && singleColumn) {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [mouseHover, singleColumn]);

  return (
    <Grid
      ref={gridRef}
      item={true}
      xs={1}
      key={node.id}
      data-testid="project-item"
      width={windowState.width - 100}
      sx={{ display: "flex", alignContent: "center", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        onMouseLeave={() => {
          // setModalOn(false);
          setMouseHover(false);
        }}
        onClick={() => (singleColumn ? setMouseHover(true) : setSelectedNode(node))}
        sx={{
          width: singleColumn ? `${Math.max(distance * 1.5, 175)}px` : distance,
          background: "white",
          borderRadius: "17px",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(.25,.8,.25,1)",
          overflow: "hidden",
          boxShadow: "-2px -1.5px  10px  0px #00000040",
          "&:hover": {
            boxShadow: "-4px -3px 20px 0px #00000040",
          },
        }}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {src && src !== "" && type === "image" ? (
            <LayoutImage node={node} width={singleColumn ? 400 : DEFAULT_WIDTH} isThumbnail={false} />
          ) : null}
          {type && type === "embed" ? <LayoutIFrame node={node} width={singleColumn ? 400 : DEFAULT_WIDTH} /> : null}
          {type && type === "video" ? <LayoutVideo node={node} width={singleColumn ? 400 : DEFAULT_WIDTH} /> : null}
          {mouseHover && singleColumn ? (
            <Box
              sx={{
                position: "absolute",
                top: 0,
                width: "100%",
                background: DarkGrayCard,
                display: "grid",
              }}
            >
              <Button
                sx={{ ...ButtonStyle, height: "100%", display: "grid", justifyContent: "center" }}
                onClick={() => setSelectedNode(node)}
              >
                <Typography
                  color={"white"}
                  sx={{
                    fontFamily: "Space Mono",
                    fontSize: 16,
                  }}
                  data-testid={"project-name"}
                >
                  Open
                </Typography>
              </Button>
            </Box>
          ) : null}
        </Box>
      </Box>
    </Grid>
  );
};

export default ProjectItem;
