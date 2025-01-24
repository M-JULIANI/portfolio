import React from "react";
import ProjectCard from "./components/ProjectCard";
import { NodeInfo } from "./NodeInfo";
import { useNavigate } from "react-router-dom";
import { Layout } from "./Layout";

export const Home: React.FC<{ node: NodeInfo | null }> = ({ node }) => {
  const navigate = useNavigate();
  const projects = node?.children.filter((x) => x.type === "project");

  if (node == null) return null;
  return (
    <Layout node={node} offsetFactor={0.5}>
      <div className="grid p-4 h-[calc(100vh-100px)] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects && projects.map((child) => <ProjectCard key={child.id} node={child} navigate={navigate} />)}
      </div>
    </Layout>
  );
};
