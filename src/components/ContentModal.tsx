import { Box, Dialog, IconButton } from "@mui/material";
import React from "react";
import { NodeInfo } from "../NodeInfo";
import CloseIcon from "@mui/icons-material/Close";
import { useHomeState } from "../contexts/windowContext";

type ContentModalProps = {
  selectedNode: NodeInfo;
  setSelectedNode: React.Dispatch<React.SetStateAction<NodeInfo | null>>;
};

export const ContentModal: React.FC<ContentModalProps> = ({ selectedNode, setSelectedNode }) => {
  const { windowState } = useHomeState();
  const nodeType = selectedNode.type;
  return (
    <Dialog
      sx={{
        width: "100%",
        height: "auto",
        maxWidth: "100vw",
        display: "grid",
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0  0  4  4'%3E%3Cpath d='M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2' style='stroke:gray; stroke-width:1'/%3E%3C/svg%3E")`,
        backgroundSize: "8px 8px",
        backgroundRepeat: "repeat",
      }}
      open={selectedNode != null}
      onClose={() => setSelectedNode(null)}
      aria-labelledby="dialog-title"
    >
      <CustomDialogTitle onClose={() => setSelectedNode(null)} />
      {nodeType === "image" && <img width={"100%"} height={"auto"} src={selectedNode?.props?.src || ""} />}
      {nodeType === "embed" && (
        <iframe
          width={windowState.width * 0.75}
          height={"auto"}
          src={selectedNode?.props?.src || ""}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        />
      )}
      {nodeType === "video" && (
        <video
          src={selectedNode?.props?.src || ""}
          autoPlay={true}
          loop={true}
          muted={true}
          width={"100%"}
          height={"auto"}
        />
      )}
    </Dialog>
  );
};

const CustomDialogTitle = ({ onClose }) => (
  <Box style={{ position: "absolute", top: 0, right: 0 }}>
    {onClose ? (
      <IconButton aria-label="close" onClick={onClose}>
        <CloseIcon />
      </IconButton>
    ) : null}
  </Box>
);
