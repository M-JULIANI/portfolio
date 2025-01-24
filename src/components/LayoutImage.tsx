import * as React from "react";
import "./LayoutImage.css";
import { NodeInfo } from "../NodeInfo";

export interface LayoutImageProps {
  node: NodeInfo;
  width: number;
  isThumbnail: boolean;
}

export const LayoutImage: React.FC<LayoutImageProps> = (props: LayoutImageProps) => {
  const { node, width, isThumbnail } = props;

  const src = React.useMemo(() => {
    return isThumbnail
      ? node.props?.thumbnail || ""
      : node.props?.preview
      ? node.props?.preview || ""
      : node.props?.src || "";
  }, [node, isThumbnail]);

  return (
    <div
      className="layout-image"
      style={{
        backgroundImage: `url(${src})`,
        width: width,
        height: width,
        backgroundSize: "cover",
        backgroundPosition: "top",
      }}
    />
  );
};
