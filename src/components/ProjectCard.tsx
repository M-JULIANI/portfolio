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
  const { windowState, windowRefs } = useHomeState();
  const { singleColumn, isTouchDevice } = windowState;
  const { mousePosition, width: windowWidth, height: windowHeight } = windowRefs;
  const { node, navigate } = props;
  const { id } = node;
  const { name, tags, thumbnail } = node.props;
  const [mouseOver, setMouseOver] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mouseOver && isTouchDevice) {
      gridRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [mouseOver, isTouchDevice]);

  const distance = useMemo(() => {
    const gridElement = gridRef.current;
    if (!gridElement || isFocused) return 400;

    const rect = gridElement.getBoundingClientRect();
    const halfWidth = rect.width * 0.5;
    const halfHeight = rect.height * 0.5;

    const elementCenterX = rect.left + halfWidth;
    const elementCenterY = rect.top + halfHeight;

    let referenceX = mousePosition.x;
    let referenceY = mousePosition.y;

    if (isFocused) {
      referenceX = elementCenterX;
      referenceY = elementCenterY;
    }

    const distanceX = Math.abs(referenceX - elementCenterX);
    const distanceY = Math.abs(referenceY - elementCenterY);
    const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

    const overallDiagonal = Math.sqrt(
      windowWidth.current * windowWidth.current + windowHeight.current * windowHeight.current,
    );
    const scaledDistance = 50 * (overallDiagonal / distance);
    return scaledDistance;
  }, [mousePosition, windowWidth, windowHeight, isFocused]);

  useEffect(() => {
    const checkFocus = () => {
      const parentElement = cardRef.current?.parentElement?.parentElement;
      setIsFocused(parentElement === document.activeElement);
    };

    //initial check
    checkFocus();

    // focus event listeners to document to catch all focus changes
    document.addEventListener("focusin", checkFocus);
    document.addEventListener("focusout", checkFocus);

    return () => {
      document.removeEventListener("focusin", checkFocus);
      document.removeEventListener("focusout", checkFocus);
    };
  }, []);

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
        ${singleColumn ? `w-[${windowWidth.current - 100}px]` : "w-full"}
      `}
      onMouseMove={() => {
        if (document.activeElement instanceof HTMLElement) {
          document.activeElement.blur();
        }
      }}
    >
      <div
        ref={cardRef}
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
        onClick={() => (isTouchDevice ? clickSingleColumn() : navigate(`/${id}`))}
        style={{
          height: singleColumn ? 400 : distance,
          maxHeight: 400,
          minHeight: 200,
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
            {mouseOver && isTouchDevice ? (
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
            {mouseOver || isFocused ? (
              <div className={`absolute bottom-0 w-full ${isTouchDevice ? "bg-dark-gray-card" : "bg-card"}`}>
                <div className="grid gap-2 p-4">
                  <div
                    className={`${
                      isTouchDevice ? "text-white" : "text-black"
                    } font-space-mono text-xs overflow-hidden text-ellipsis flex`}
                    data-testid={"project-name"}
                  >
                    {name}
                  </div>
                  <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
                    {tags?.map((x) => {
                      return <Pill key={x} tag={x} />;
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
