import * as React from "react";
import "./LayoutImage.css";
import { NodeInfo } from "../NodeInfo";

export interface LayoutIFrameProps {
  node: NodeInfo;
  width: number;
}

export const LayoutIFrame: React.FC<LayoutIFrameProps> = (props: LayoutIFrameProps) => {
  const { node, width } = props;

  const src = React.useMemo(() => {
    return node.props.src;
  }, [node]);
  console.log({ src });

  return (
    <div
      className="layout-image"
      style={{
        width: width,
        height: width,
        display: "flex",
        alignItems: "center",
        alignContent: "center",
      }}
    >
      <iframe
        width={"100%"}
        height={"100%"}
        src={src}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  );
};
