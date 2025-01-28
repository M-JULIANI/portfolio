import React, { useState } from "react";
import { NodeInfo } from "./NodeInfo";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "./Layout";
import ProjectItem from "./components/ProjectItem";
import { ContentModal } from "./components/ContentModal";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";

export type ProjectParams = {
  id: string;
};

export const ProjectPage: React.FC<{ node: NodeInfo | null }> = ({ node }) => {
  const navigate = useNavigate();
  const { id } = useParams<ProjectParams>();

  const [selectedNode, setSelectedNode] = useState<NodeInfo | null>(null);
  const projectNode = node?.children.find((x) => x.id === id);

  const { handleKeyDown } = useKeyboardNavigation({
    itemPrefix: "project-item-",
    items: projectNode?.children || [],
    onEnter: (currentIndex) => {
      setSelectedNode(projectNode?.children[currentIndex] || null);
    },
    onEscape: () => {
      setSelectedNode(null);
    },
    getColumnCount: () => (window.innerWidth >= 1024 ? 4 : window.innerWidth >= 768 ? 2 : 1),
  });

  if (projectNode === undefined) return null;

  const paragraphs = (projectNode.props.content || "").split(/(?:\n\n|  )/);
  return (
    <Layout node={node} offsetFactor={1.0}>
      <div className="flex flex-col items-center justify-center w-full pb-4">
        <h4 className="text-2xl font-space-mono p-3 max-w-[600px]">{projectNode.props.name}</h4>
        {projectNode.props?.links?.length && (
          <div className="flex">
            {projectNode.props.links.map((link) => {
              return (
                <button key={link.key} onClick={() => window.open(`${link.value}`, "_blank")} className="link-button">
                  {link.key}
                </button>
              );
            })}
          </div>
        )}
        <div className="py-12">
          {paragraphs.map((paragraph, index) => (
            <div
              key={index}
              className="paragraph-content max-w-3xl"
              tabIndex={0}
              role="article"
              aria-label={`Paragraph ${index + 1}`}
            >
              {paragraph}
            </div>
          ))}
        </div>
        <ProjectGrid onKeyDown={handleKeyDown}>
          {projectNode.children?.map((child) => (
            <div
              id={`project-item-${child.id}`}
              key={child.id}
              tabIndex={0}
              role="button"
              aria-label={`Project item ${child.id}`}
              className="w-full h-full flex flex-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 focus-visible:-ring-offset-2 rounded-[17px] focus-visible:ring-offset-white"
            >
              <ProjectItem node={child} navigate={navigate} setSelectedNode={setSelectedNode} />
            </div>
          ))}
        </ProjectGrid>
        {selectedNode && <ContentModal selectedNode={selectedNode} setSelectedNode={setSelectedNode} />}
      </div>
    </Layout>
  );
};

export const ProjectGrid: React.FC<{ children: React.ReactNode; onKeyDown: (e: React.KeyboardEvent) => void }> = ({
  children,
  onKeyDown,
}) => {
  const childrenArray = React.Children.toArray(children);
  const getGridClass = () => {
    const count = Math.min(4, childrenArray.length);
    switch (count) {
      case 1:
        return "grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1";
      case 2:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2";
      case 3:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3";
      case 4:
      default:
        return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4";
    }
  };

  return (
    <div className="w-full p-4">
      <div className={`grid ${getGridClass()} gap-4 justify-items-center`} onKeyDown={onKeyDown}>
        {children}
      </div>
    </div>
  );
};
