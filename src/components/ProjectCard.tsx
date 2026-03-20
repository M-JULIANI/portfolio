import React from "react";
import { NodeInfo } from "../NodeInfo";
import { LayoutImage } from "./LayoutImage";
import { Pill } from "./Pill";

interface ProjectCardProps {
  node: NodeInfo;
  navigate: (path: string) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ node, navigate }) => {
  const { id } = node;
  const { name, tags, thumbnail } = node.props;

  return (
    <div
      data-testid="project-card"
      onClick={() => navigate(`/${id}`)}
      className="w-full h-[280px] bg-card rounded-[17px] cursor-pointer overflow-hidden shadow-[-2px_-1.5px_10px_0px_rgba(0,0,0,0.25)] hover:shadow-[-4px_-3px_20px_0px_rgba(0,0,0,0.25)] transition-shadow duration-300 flex flex-col"
    >
      <div className="flex-1 overflow-hidden">
        {thumbnail && thumbnail !== "" ? <LayoutImage node={node} width={350} isThumbnail={true} /> : null}
      </div>
      <div className="bg-card p-4 grid gap-2">
        <div className="text-black font-space-mono text-xs overflow-hidden text-ellipsis" data-testid="project-name">
          {name}
        </div>
        <div className="flex flex-wrap gap-2">
          {tags?.map((x) => (
            <Pill key={x} tag={x} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
