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
    if (!focusedId?.startsWith("project-")) return;

    e.preventDefault();
    const currentIndex = projects?.findIndex((p) => `project-${p.id}` === focusedId) ?? -1;
    if (currentIndex === -1) return;

    const cols = window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 3 : window.innerWidth >= 640 ? 2 : 1;

    switch (e.key) {
      case "ArrowRight":
        if (currentIndex < (projects?.length ?? 0) - 1) {
          document.getElementById(`project-${projects?.[currentIndex + 1].id}`)?.focus();
        }
        break;
      case "ArrowLeft":
        if (currentIndex > 0) {
          document.getElementById(`project-${projects?.[currentIndex - 1].id}`)?.focus();
        }
        break;
      case "ArrowDown":
        if (currentIndex + cols < (projects?.length ?? 0)) {
          document.getElementById(`project-${projects?.[currentIndex + cols].id}`)?.focus();
        }
        break;
      case "ArrowUp":
        if (currentIndex - cols >= 0) {
          document.getElementById(`project-${projects?.[currentIndex - cols].id}`)?.focus();
        }
        break;
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
            >
              <ProjectCard node={child} navigate={navigate} />
            </div>
          ))}
      </div>
    </Layout>
  );
};
