import React, { useEffect, useMemo, useRef, useState } from "react";
import { NodeInfo } from "../NodeInfo";
import { LayoutImage } from "./LayoutImage";
import { useHomeState } from "../contexts/windowContext";
import { ButtonStyle, CardColor, DarkGrayCard } from "../styles";
import { Pill } from "./Pill";

interface ProjectCardProps {
  node: NodeInfo;
  navigate: (path: string) => void;
}
const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  const { windowState } = useHomeState();
  const { singleColumn } = windowState;
  const { node, navigate } = props;
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
  }, [mouseX, mouseY, windowState.width, windowState.height]);

  const clickSingleColumn = () => {
    console.log("single column");
    setMouseOver(true);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
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
                  <button
                    style={{
                      ...ButtonStyle,
                      width: "100%",
                      height: "100%",
                      display: "grid",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/${id}`);
                    }}
                  >
                    <span className="text-white font-space-mono text-base">Open</span>
                  </button>
                </div>
              </div>
            ) : null}
            {mouseOver ? (
              <div
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                  backgroundColor: singleColumn ? DarkGrayCard : CardColor,
                }}
              >
                <div className="grid gap-2 p-4">
                  <div
                    className={`${
                      singleColumn ? "text-white" : "text-black"
                    } font-space-mono text-xs overflow-hidden text-ellipsis flex`}
                    data-testid={"project-name"}
                  >
                    {name}
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
                    {tags?.map((x) => {
                      return <Pill tag={x} />;
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
