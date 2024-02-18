import * as React from 'react';
import './LayoutImage.css';
import { NodeInfo } from '../NodeInfo';

export interface LayoutImageProps {
    node: NodeInfo;
    width: number;
}

export const LayoutImage: React.FC<LayoutImageProps> = (props: LayoutImageProps) => {

    const { node, width} = props;

    const src = React.useMemo(() => { return node.props?.thumbnail || '' }, [node])

    // const path = React.useMemo(() => {

    //     //const ext = width <= 300 ? '_i' : width <= 600  || !isNodeLeaf(node)  ? '_m' : '';

    //     if (src) {
    //         const paths = src.split(".");
    //         const placeholder = paths[0] + paths[1];
    //         return placeholder;
    //     } else {
    //         return '';
    //     }
    // }, [src, width]);

    return (
            <div
                className='layout-image'
                style={{
                    backgroundImage: `url(${src})`,
                    width: width,
                    height: width
                }}
            />
    )
}