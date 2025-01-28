import React from "react";
import ProjectCard from "./components/ProjectCard";
import { NodeInfo } from "./NodeInfo";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";

export const Home: React.FC<{ node: NodeInfo | null }> = ({ node }) => {
  const navigate = useNavigate();
  const projects = node?.children.filter((x) => x.type === "project");

  const { handleKeyDown } = useKeyboardNavigation({
    itemPrefix: "project-",
    items: projects || [],
    onEnter: (currentIndex) => {
      navigate(`/${projects?.[currentIndex].id}`);
    },
    getColumnCount: () =>
      window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1,
  });

  if (node == null) return null;
  return (
    <Layout node={node} offsetFactor={0.5}>
      <div
        className="grid p-4 h-[calc(100vh-100px)] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        onKeyDown={handleKeyDown}
        onMouseMove={() => {
          if (document.activeElement instanceof HTMLElement) {
            document.activeElement.blur();
          }
        }}
      >
        {projects &&
          projects.map((child) => (
            <div
              id={`project-${child.id}`}
              key={child.id}
              tabIndex={0}
              role="button"
              aria-label={`Project ${child.id}`}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:-ring-offset-2 rounded-[17px] focus-visible:ring-offset-white z-20"
            >
              <ProjectCard node={child} navigate={navigate} />
            </div>
          ))}
      </div>
    </Layout>
  );
};
