import * as React from 'react';
import './PortraitImage.css';
import { NodeInfo } from '../NodeInfo';
import { height } from '@mui/system';

export interface PortraitImageProps {
    node: NodeInfo;
    width: number;
    height: number;
}

export const PortraitImage: React.FC<PortraitImageProps> = (props: PortraitImageProps) => {

    const { node, width, height} = props;
    const src = React.useMemo(() => { return node.props?.src || '' }, [node])

    return (
            <div
                className='portrait-image'
                style={{
                    backgroundImage: `url(${src})`,
                    width: width,
                    height: height
                }}
            />
    )
}