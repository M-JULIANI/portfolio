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
  const { name, tags, thumbnail, date } = node.props;

  return (
    <div
      data-testid="project-card"
      onClick={() => navigate(`/${id}`)}
      className="group w-full h-[280px] bg-card rounded-[17px] cursor-pointer overflow-hidden shadow-[-2px_-1.5px_10px_0px_rgba(0,0,0,0.25)] hover:shadow-[-4px_-3px_20px_0px_rgba(0,0,0,0.25)] transition-shadow duration-300 flex flex-col"
    >
      <div className="flex-1 overflow-hidden relative">
        {thumbnail && thumbnail !== "" ? <LayoutImage node={node} width={350} isThumbnail={true} /> : null}
        <div className="absolute bottom-0 left-0 right-0 flex flex-wrap gap-1 p-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200">
          {tags?.map((x) => (
            <Pill key={x} tag={x} />
          ))}
        </div>
      </div>
      <div className="bg-card p-4">
        <div className="text-black font-space-mono text-xs overflow-hidden text-ellipsis" data-testid="project-name">
          {name}
        </div>
        {date && (
          <div className="text-black/40 font-space-mono text-[10px] mt-0.5">
            {date}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
