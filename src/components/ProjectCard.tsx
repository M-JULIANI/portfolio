import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { NodeInfo } from '../NodeInfo';
import { LayoutImage } from './LayoutImage';
import Chip from '@mui/material-next/Chip';
import { WindowState } from '../Home';


// Assuming NodeInfo is correctly defined to include name, tags, thumbnail, and src
const ProjectCard: React.FC<{ node: NodeInfo, windowState: WindowState, navigate: (path: string) => void }> = ({ node, windowState, navigate }) => {
  // Destructure the properties directly from the node object
  const { name, tags, thumbnail, src, content } = node.props;
  const [mouseOver, setMouseOver] = useState(false);
  const [distance, setDistance] = useState(0);

  console.log({ name, tags, thumbnail, src })
  useEffect(() => {
    console.log({ mouseOver })
  }, [mouseOver])
  console.log({ mouseOver })

  const {mouseX, mouseY} = windowState;

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(()=>{
    const gridElement = gridRef.current;
    if (gridElement) {
      const rect = gridElement.getBoundingClientRect();
      const distanceX = Math.abs(mouseX - rect.left);
      const distanceY = Math.abs(mouseY - rect.top);
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const overallDiagonal = Math.sqrt(windowState.width * windowState.width + windowState.height * windowState.height);
      const scaledDistance =  225 *  (1+(distance / overallDiagonal));
      console.log({scaledDistance})
      setDistance(scaledDistance);
    }
  }, [mouseX, mouseY])


  return (
    <Grid ref={gridRef} item={true} xs={1} key={node.id} data-testid="project-card" width={windowState.width}
    sx={{display: 'flex', alignConte: 'center', justifyContent: 'center', alignItems: 'center'}}>
      <Box
        onMouseOver={() => setMouseOver(true)}
        onMouseOut={() => setMouseOver(false)}
        // onHover={() => {}}
        onClick={() => navigate(`portfolio/${name}`)}
        sx={{
          height:  distance,
          minHeight: 300,
          minWidth: 208,
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
            position: 'relative', // Make sure the position is relative
            overflow: 'hidden', // Add overflow hidden to contain the absolute positioned text
          }}
        >
          <>
            {thumbnail && thumbnail !== '' ? (
              <LayoutImage node={node} width={distance * 1.25} />
            ) : (
              <img
                src={'NADA'}
                alt={'NADA'}
                style={{ width: '100%', height: '110px', objectFit: 'cover' }}
              />
            )}
            {mouseOver ?
              <Box
                sx={{
                  position: 'absolute', // Position the text box absolutely
                  bottom: 0, // Position it at the bottom
                  width: '100%', // Make it span the full width
                  p: '16px',
                  background: 'rgba(255,  255,  255,  1.0)', // Add a background to make the text readable
                }}
              >
                <Grid sx={{
                  display: 'grid',
                }}>
                  <Typography
                    color={'black'}
                    sx={{
                      fontFamily: 'Space Mono',
                      fontSize: 10,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      wordBreak: 'break-word',
                      WebkitLineClamp: '1',
                    }}
                    data-testid={'project-name'}
                  >
                    {name}
                  </Typography>
                  <Box sx={{ display: 'flex', paddingTop: '8px'}}>
                    {tags?.map(x => {
                      return <Chip label={x} size='small' variant='elevated'
                        sx={{
                          backgroundColor: 'white',
                          marginRight: '10px',
                          maxWidth: '80px',
                          fontSize: '10px',
                        }} />
                    })
                    }
                  </Box>
                </Grid>

              </Box>
              : null}
          </>
        </Box>

      </Box>
    </Grid>
  );
};

export default ProjectCard;
