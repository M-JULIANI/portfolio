import React, { useEffect, useMemo, useRef, useState } from "react";
import { NodeInfo } from "../NodeInfo";
import { LayoutImage } from "./LayoutImage";
import { useHomeState } from "../contexts/windowContext";
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

  const [focusedElement, setFocusedElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const handleFocusChange = () => {
      setFocusedElement(document.activeElement as HTMLElement);
    };

    document.addEventListener("focusin", handleFocusChange);
    document.addEventListener("focusout", handleFocusChange);

    return () => {
      document.removeEventListener("focusin", handleFocusChange);
      document.removeEventListener("focusout", handleFocusChange);
    };
  }, []);

  useEffect(() => {
    if (mouseOver && singleColumn) {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [mouseOver, singleColumn]);

  const distance = useMemo(() => {
    const gridElement = gridRef.current;
    if (!gridElement) return 400;

    const rect = gridElement.getBoundingClientRect();
    const halfWidth = rect.width * 0.5;
    const halfHeight = rect.height * 0.5;

    const elementCenterX = rect.left + halfWidth;
    const elementCenterY = rect.top + halfHeight;

    let referenceX = mouseX;
    let referenceY = mouseY;

    if (focusedElement) {
      const focusedRect = focusedElement.getBoundingClientRect();
      referenceX = focusedRect.left + focusedRect.width * 0.5;
      referenceY = focusedRect.top + focusedRect.height * 0.5;
    }

    const distanceX = Math.abs(referenceX - elementCenterX);
    const distanceY = Math.abs(referenceY - elementCenterY);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const overallDiagonal = Math.sqrt(windowState.width * windowState.width + windowState.height * windowState.height);
    const scaledDistance = 50 * (overallDiagonal / distance);
    return scaledDistance;
  }, [mouseX, mouseY, windowState.width, windowState.height, focusedElement]);

  const clickSingleColumn = () => {
    setMouseOver(true);
    gridRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div
      ref={gridRef}
      data-testid="project-card"
      className={`
        flex
        items-center
        justify-center
        ${singleColumn ? `w-[${windowState.width - 100}px]` : "w-full"}
      `}
      onMouseMove={() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
          setFocusedElement(null);
        }
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
        }}
        className={`
            w-full 
            bg-card
            rounded-[17px]
            cursor-pointer
            transition-all
            duration-300
            ease-[cubic-bezier(.25,.8,.25,1)]
            overflow-hidden
            shadow-[-2px_-1.5px_10px_0px_rgba(0,0,0,0.25)]
            hover:shadow-[-4px_-3px_20px_0px_rgba(0,0,0,0.25)]
          `}
      >
        <div className="w-full h-full grid place-items-center justify-center relative overflow-hidden">
          <>
            {thumbnail && thumbnail !== "" ? <LayoutImage node={node} width={350} isThumbnail={true} /> : null}
            {mouseOver && singleColumn ? (
              <div className="absolute top-0 w-full bg-dark-gray-card flex">
                <div className="flex items-center justify-center w-full h-full">
                  <button
                    className="w-full h-10 grid place-items-center text-black hover:text-white hover:bg-[#d4d4d4] focus:outline-none disabled:opacity-75 disabled:cursor-not-allowed disabled:bg-[#e0e0e0]"
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
              <div className={`absolute bottom-0 w-full ${singleColumn ? "bg-dark-gray-card" : "bg-card"}`}>
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
