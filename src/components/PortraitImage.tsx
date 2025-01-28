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
      role="img"
      aria-label="Portrait photograph of Marco Juliani"
      className="portrait-image w-full h-full max-w-[500px] max-h-[300px] rounded-xl bg-cover"
      style={{
        backgroundImage: `url(${src})`,
      }}
      tabIndex={0}
    />
  );
};
