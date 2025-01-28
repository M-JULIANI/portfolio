import React, { useEffect } from "react";
import ProjectCard from "./components/ProjectCard";
import { NodeInfo } from "./NodeInfo";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";

export const Home: React.FC<{ node: NodeInfo | null }> = ({ node }) => {
  const navigate = useNavigate();
  const projects = node?.children.filter((x) => x.type === "project");

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const focusedId = document.activeElement?.id;
    if (!focusedId?.startsWith("project-") || !projects) return;

    const currentIndex = projects.findIndex((p) => `project-${p.id}` === focusedId);
    if (currentIndex === -1) return;

    const cols = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;
    let nextIndex: number | null = null;

    switch (e.key) {
      case "ArrowRight":
        nextIndex = currentIndex < projects.length - 1 ? currentIndex + 1 : null;
        break;
      case "ArrowLeft":
        nextIndex = currentIndex > 0 ? currentIndex - 1 : null;
        break;
      case "ArrowDown":
        nextIndex = currentIndex + cols < projects.length ? currentIndex + cols : null;
        break;
      case "ArrowUp":
        nextIndex = currentIndex - cols >= 0 ? currentIndex - cols : null;
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        navigate(`/${projects[currentIndex].id}`);
        return;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      document.getElementById(`project-${projects[nextIndex].id}`)?.focus();
    }
  };

  //init to first
  useEffect(() => {
    if (projects && projects.length > 0) {
      document.getElementById(`project-${projects[0].id}`)?.focus();
    }
  }, [projects]);

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
