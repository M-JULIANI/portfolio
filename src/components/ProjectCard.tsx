import { Button } from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { NodeInfo } from "../NodeInfo";
import { LayoutImage } from "./LayoutImage";
import { useHomeState } from "../contexts/windowContext";
import { ButtonStyle, CardColor, DarkGrayCard } from "../styles";

interface ProjectCardProps {
  node: NodeInfo;
  navigate: (path: string) => void;
  singleColumn: boolean;
}
const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  const { windowState } = useHomeState();
  const { node, singleColumn, navigate } = props;
  const { id } = node;
  const { name, tags, thumbnail } = node.props;
  const [mouseOver, setMouseOver] = useState(false);

  const { mouseX, mouseY } = windowState;

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mouseOver && singleColumn) {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [mouseOver, singleColumn]);

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

  const clickSingleColumn = () => {
    console.log("single column");
    setMouseOver(true);
  };

  return (
    <div
      ref={gridRef}
      data-testid="project-card"
      style={{
        width: singleColumn ? windowState.width - 100 : "100%",
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        onMouseOver={() => (singleColumn ? null : setMouseOver(true))}
        onMouseOut={() => (singleColumn ? (mouseOver ? setMouseOver(false) : null) : setMouseOver(false))}
        onClick={() => (singleColumn ? clickSingleColumn() : navigate(`/${id}`))}
        style={{
          height: singleColumn ? 400 : distance,
          maxHeight: 400,
          minHeight: 100,
          width: "100%",
          background: CardColor,
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
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <>
            {thumbnail && thumbnail !== "" ? <LayoutImage node={node} width={350} isThumbnail={true} /> : null}
            {mouseOver && singleColumn ? (
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  width: "100%",
                  background: DarkGrayCard,
                  display: "flex",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Button
                    sx={{
                      ...ButtonStyle,
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => navigate(`/${id}`)}
                  >
                    <span className="text-white font-['Space_Mono'] text-base" data-testid="project-name">
                      Open
                    </span>
                  </Button>
                </div>
              </div>
            ) : null}
            {mouseOver ? (
              <div
                style={{
                  position: "absolute",

                  bottom: 0,
                  width: "100%",
                  p: "16px",
                  backgroundColor: singleColumn ? DarkGrayCard : CardColor,
                }}
              >
                <div className="grid">
                  <div
                    className={`${
                      singleColumn ? "text-white" : "text-black"
                    } font-space-mono text-xs overflow-hidden text-ellipsis break-words line-clamp-1`}
                    data-testid={"project-name"}
                  >
                    {name}
                  </div>
                  <div style={{ display: "flex", paddingTop: "8px" }}>
                    {tags?.map((x) => {
                      return (
                        <span
                          key={x}
                          className="inline-flex items-center px-2.5 py-0.5 mr-2.5 rounded-full text-xs font-['Space_Mono'] text-[#747474] bg-white max-w-[200px] truncate"
                        >
                          {x}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : null}
          </>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
