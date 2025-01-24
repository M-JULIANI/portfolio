import React from "react";
import { NodeInfo } from "../NodeInfo";
import { LayoutImage } from "./LayoutImage";
import { LayoutIFrame } from "./LayoutIFrame";
import { LayoutVideo } from "./LayoutVideo";

const ProjectItem: React.FC<{
  node: NodeInfo;
  navigate: (path: string) => void;
  setSelectedNode: React.Dispatch<React.SetStateAction<NodeInfo | null>>;
}> = ({ node, setSelectedNode }) => {
  const { type } = node;
  const { src } = node.props;

  return (
    <div
      onClick={() => setSelectedNode(node)}
      className="w-full max-w-[400px] bg-white rounded-[17px] cursor-pointer overflow-hidden transition-all duration-300 ease-in-out shadow-md hover:shadow-lg"
    >
      <div className="w-full h-full">
        {src && src !== "" && type === "image" && <LayoutImage node={node} width={400} isThumbnail={false} />}
        {type === "embed" && <LayoutIFrame node={node} width={400} />}
        {type === "video" && <LayoutVideo node={node} width={400} />}
      </div>
    </div>
  );
};

export default ProjectItem;
