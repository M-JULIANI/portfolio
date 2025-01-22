import { useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { NodeInfo } from "./NodeInfo";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "./Layout";
import ProjectItem from "./components/ProjectItem";
import { WindowState } from "./contexts/windowContext";
import { ContentModal } from "./components/ContentModal";

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

  const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null);

  const handleResize = debounce(() => {
    setWindowState((w) => {
      return { ...w, width: window.innerWidth, height: window.innerHeight };
    });
  });
  window.addEventListener("resize", handleResize);

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

  const projectNode = node?.children.find((x) => x.id === id);

  const calculatedColumns: number = React.useMemo(() => {
    if (threeCols) return 3;
    else if (twoCols) return 2;
    else if (oneCol) return 1;
    return Math.min(projectNode?.children?.length || 0, 4);
  }, [threeCols, twoCols, oneCol, projectNode]);

  if (projectNode === undefined) return null;

  const paragraphs = (projectNode.props.content || "").split(/(?:\n\n|  )/);
  return (
    <Layout node={node}>
      <div className="flex flex-col items-center justify-center w-full pb-4">
        <h4 className="text-2xl font-roboto p-3 max-w-[600px]">{projectNode.props.name}</h4>
        {projectNode.props?.links?.length && (
          <div className="flex">
            {projectNode.props.links.map((link) => {
              return (
                <button onDoubleClick={() => () => window.open(`${link.value}`, "_blank")} className="link-button">
                  {link.key}
                </button>
              );
            })}
          </div>
        )}
        <div style={{ padding: "48px 12px", fontFamily: "Roboto", justifyContent: "center", justifyItems: "center" }}>
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="paragraph-content">
              {paragraph}
            </div>
          ))}
        </div>
        <div className="flex flex-row items-center justify-center align-center w-full pb-4">
          {projectNode.children?.map((child) => (
            <ProjectItem
              key={child.id}
              node={child}
              navigate={navigate}
              singleColumn={calculatedColumns === 1}
              setSelectedNode={setSelectedNode}
            />
          ))}
        </div>
        {selectedNode && <ContentModal selectedNode={selectedNode} setSelectedNode={setSelectedNode} />}
      </div>
    </Layout>
  );
};
