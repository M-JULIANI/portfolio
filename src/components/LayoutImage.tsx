import * as React from 'react';
import './LayoutImage.css';
import { NodeInfo } from '../NodeInfo';
import ImageModal from './ImageModal';

export interface LayoutImageProps {
    node: NodeInfo;
    width: number;
    isThumbnail: boolean;
}

export const LayoutImage: React.FC<LayoutImageProps> = (props: LayoutImageProps) => {

    const [openModal, setModalOpen] = React.useState(false);
    const { node, width, isThumbnail} = props;

    const src = React.useMemo(() => { return isThumbnail ? node.props?.thumbnail || '' : node.props?.src || '' }, [node, isThumbnail])

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