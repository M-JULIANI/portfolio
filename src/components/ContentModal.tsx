import { X } from "lucide-react";
import React from "react";
import { NodeInfo } from "../NodeInfo";
import { useHomeState } from "../contexts/windowContext";

type ContentModalProps = {
  selectedNode: NodeInfo;
  setSelectedNode: React.Dispatch<React.SetStateAction<NodeInfo | null>>;
};

export const ContentModal: React.FC<ContentModalProps> = ({ selectedNode, setSelectedNode }) => {
  const { windowState } = useHomeState();
  const nodeType = selectedNode.type;

  if (!selectedNode) return null;

  return (
    <dialog
      open={selectedNode !== null}
      className="fixed inset-0 w-screen h-screen p-0 bg-transparent backdrop:bg-black backdrop:bg-opacity-50"
      onClose={() => setSelectedNode(null)}
    >
      <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50">
        <div className="flex items-center justify-center h-full p-4 mt-10">
          <div className="relative max-w-[75vw] max-h-[75vh]">
            <button
              onClick={() => setSelectedNode(null)}
              className="absolute top-0 right-0 bg-white rounded-full p-2 m-1 hover:bg-gray-200 z-50"
              aria-label="Close dialog"
            >
              <X />
            </button>
            {nodeType === "image" && (
              <img
                className="max-w-full max-h-[75vh] w-auto h-auto object-contain"
                src={selectedNode?.props?.src || ""}
                alt=""
              />
            )}
            {nodeType === "embed" && (
              <iframe
                className="w-full h-full aspect-video"
                src={selectedNode?.props?.src || ""}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              />
            )}
            {nodeType === "video" && (
              <video
                className="max-w-full max-h-[75vh] w-auto h-auto"
                src={selectedNode?.props?.src || ""}
                autoPlay={true}
                loop={true}
                muted={true}
              />
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};
