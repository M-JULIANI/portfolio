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

  const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null);
  const projectNode = node?.children.find((x) => x.id === id);

  if (projectNode === undefined) return null;

  const paragraphs = (projectNode.props.content || "").split(/(?:\n\n|  )/);
  return (
    <Layout node={node}>
      <div className="flex flex-col items-center justify-center w-full pb-4">
        <h4 className="text-2xl font-space-mono p-3 max-w-[600px]">{projectNode.props.name}</h4>
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
        <div style={{ padding: "48px 12px", justifyContent: "center", justifyItems: "center" }}>
          {paragraphs.map((paragraph, index) => (
            <div key={index} className="paragraph-content">
              {paragraph}
            </div>
          ))}
        </div>
        <ProjectGrid>
          {projectNode.children?.map((child) => (
            <ProjectItem key={child.id} node={child} navigate={navigate} setSelectedNode={setSelectedNode} />
          ))}
        </ProjectGrid>
        {selectedNode && <ContentModal selectedNode={selectedNode} setSelectedNode={setSelectedNode} />}
      </div>
    </Layout>
  );
};

export const ProjectGrid: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 justify-items-center">
        {children}
      </div>
    </div>
  );
};
