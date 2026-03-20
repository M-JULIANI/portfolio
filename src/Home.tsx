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
    <Layout node={node} offsetFactor={0.0}>
      <div className="grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {projects?.map((child) => (
          <ProjectCard key={child.id} node={child} navigate={navigate} />
        ))}
      </div>
    </Layout>
  );
};
