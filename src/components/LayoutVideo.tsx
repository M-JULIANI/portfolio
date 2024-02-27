import * as React from 'react';
import './LayoutImage.css';
import { NodeInfo } from '../NodeInfo';

export interface LayoutVideoProps {
    node: NodeInfo;
    width: number;
}

export const LayoutVideo: React.FC<LayoutVideoProps> = (props: LayoutVideoProps) => {
    const { node, width } = props;

    const src = React.useMemo(() => { return node.props?.src || '' }, [node])

    return (
            <video src={src} autoPlay={true} loop={true} muted={true} width={'auto'} height={width}>
            </video>
    )
}