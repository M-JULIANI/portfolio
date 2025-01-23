import * as React from "react";
import "./PortraitImage.css";
import { NodeInfo } from "../NodeInfo";

export interface PortraitImageProps {
  node: NodeInfo;
}

export const PortraitImage: React.FC<PortraitImageProps> = (props: PortraitImageProps) => {
  const { node } = props;
  const src = React.useMemo(() => {
    return node.props?.src || "";
  }, [node]);

  return (
    <div
      className="portrait-image"
      style={{
        backgroundImage: `url(${src})`,
        borderRadius: "12px",
        width: "100%",
        height: "100%",
        maxWidth: "500px",
        maxHeight: "300px",
      }}
    />
  );
};
