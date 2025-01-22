import React from "react";
import ProjectCard from "./components/ProjectCard";
import { NodeInfo } from "./NodeInfo";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { useHomeState } from "./contexts/windowContext";

export const Home: React.FC<{ node: NodeInfo | null }> = ({ node }) => {
  const navigate = useNavigate();
  const { windowState } = useHomeState();

  const oneCol = windowState.width >= 200 && windowState.width < 488;
  const twoCols = windowState.width >= 488 && windowState.width < 705;
  const threeCols = windowState.width >= 705 && windowState.width < 850;

  const projects = node?.children.filter((x) => x.type === "project");
  const calculatedColumns = React.useMemo(() => {
    if (threeCols) return 3;
    else if (twoCols) return 2;
    else if (oneCol) return 1;
    return 4;
  }, [threeCols, twoCols, oneCol]);

  if (node == null) return null;
  return (
    <Layout node={node} offsetFactor={0.5}>
      <div
        className={`grid m-4 h-[calc(100vh-100px)] ${
          calculatedColumns === 1
            ? "grid-cols-1"
            : calculatedColumns === 2
            ? "grid-cols-2"
            : calculatedColumns === 3
            ? "grid-cols-3"
            : "grid-cols-4"
        }`}
      >
        {projects &&
          projects.map((child) => (
            <ProjectCard key={child.id} node={child} navigate={navigate} singleColumn={calculatedColumns === 1} />
          ))}
      </div>
    </Layout>
  );
};
