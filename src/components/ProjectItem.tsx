import { Box, Grid } from '@mui/material';
import React, {useMemo, useRef, useState } from 'react';
import { NodeInfo } from '../NodeInfo';
import { LayoutImage } from './LayoutImage';
import { WindowState } from '../Home';
import {ImageModal} from './ImageModal';
import { LayoutIFrame } from './LayoutIFrame';
import { LayoutVideo } from './LayoutVideo';

const DEFAULT_WIDTH = 600;
const ProjectItem: React.FC<{ node: NodeInfo, windowState: WindowState, navigate: (path: string) => void }> = ({ node, windowState }) => {
  
const {type} = node;
  const {src} = node.props;
  const [modalOn, setModalOn] = useState(false);
  const { mouseX, mouseY } = windowState;
  const gridRef = useRef<HTMLDivElement | null>(null);

  const distance = useMemo(() => {
    const gridElement = gridRef.current;
    if (gridElement) {
      const rect = gridElement.getBoundingClientRect();
      const halfWidth = rect.width * 0.5;
      const halfHeight = rect.height * 0.5;
      const distanceX = Math.abs(mouseX - rect.left - halfWidth);
      const distanceY = Math.abs(mouseY - rect.top - halfHeight);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const overallDiagonal = Math.sqrt(windowState.width * windowState.width + windowState.height * windowState.height);
      const scaledDistance = 50 * (( overallDiagonal / distance));
      return scaledDistance;
    }
    return 200;
  }, [mouseX, mouseY, gridRef])


  return (
    <Grid ref={gridRef} item={true} xs={1} key={node.id} data-testid="project-item" width={windowState.width - 100}
      sx={{ display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        onMouseLeave={()=>setModalOn(false)}
        onClick={() => setModalOn(true)}
        sx={{
          width: modalOn ? '500px': distance,
          background: 'white',
          borderRadius: '17px',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          overflow: 'hidden',
          boxShadow: '-2px -1.5px  10px  0px #00000040',
          '&:hover': {
            boxShadow: '-4px -3px 20px 0px #00000040'
          },
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            display: 'grid',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',

          }}
        >
            {src && src !== '' && type === 'image' ? (
              <LayoutImage node={node} width={DEFAULT_WIDTH} isThumbnail={false}/>
            ) : null}
            {type && type === 'embed' ? (
              <LayoutIFrame node={node} width={DEFAULT_WIDTH}/>
            ) : null}
                     {type && type === 'video' ? (
              <LayoutVideo node={node} width={DEFAULT_WIDTH}/>
            ) : null}
        </Box>
      </Box>
    </Grid>
  );
};

export default ProjectItem;
