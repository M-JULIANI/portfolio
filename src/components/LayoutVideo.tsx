import * as React from 'react';
import './LayoutImage.css';
import { NodeInfo } from '../NodeInfo';

export interface LayoutVideoProps {
    node: NodeInfo;
    width: number;
}

export const LayoutVideo: React.FC<LayoutVideoProps> = (props: LayoutVideoProps) => {

    const [openModal, setModalOpen] = React.useState(false);
    const { node, width } = props;

    const src = React.useMemo(() => { return node.props?.src || '' }, [node])

    return (
        // <div className='layout-image'  style={{
        //             width: width,
        //             height: width
        //         }}>
            <video src={src} autoPlay={true} loop={true} muted={true} width={width} height={width}>
                {/* <source src="path/to/your/video.mp4" type="video/mp4"> */}
            </video>
      //  </div>
    )
}