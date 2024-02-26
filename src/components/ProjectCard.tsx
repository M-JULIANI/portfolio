import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { NodeInfo } from '../NodeInfo';
import { LayoutImage } from './LayoutImage';
import Chip from '@mui/material-next/Chip';
import { WindowState } from '../Home';
import { ButtonStyle, CardColor, DarkGrayCard } from '../styles';

interface ProjectCardProps {
  node: NodeInfo;
  windowState: WindowState;
  navigate: (path: string) => void;
  singleColumn: Boolean;
}
const ProjectCard: React.FC<ProjectCardProps> = (props) => {
  //const ProjectCard: React.FC<{ node: NodeInfo, windowState: WindowState, navigate: (path: string) => void, singleColumn: Boolean }> = ({ node, windowState, navigate, singleColumn }) => {
  const { node, windowState, singleColumn, navigate } = props;
  const { id } = node;
  const { name, tags, thumbnail } = node.props;
  const [mouseOver, setMouseOver] = useState(false);

  const { mouseX, mouseY } = windowState;

  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (mouseOver && singleColumn) {
      gridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [mouseOver, singleColumn])


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
      const scaledDistance = 50 * ((overallDiagonal / distance));
      return scaledDistance;
    }
    return 200;
  }, [mouseX, mouseY, gridRef])



  const clickSingleColumn = () => {
    console.log('single column')
    setMouseOver(true);
  };

  return (
    <Grid ref={gridRef} item={true} xs={1} key={node.id} data-testid="project-card" width={windowState.width - 100}
      sx={{
        display: 'flex', alignContent: 'center', justifyContent: 'center', alignItems: 'center'
      }}>
      <Box
        onMouseOver={() => singleColumn ? null : setMouseOver(true)}
        onMouseOut={() => singleColumn ? mouseOver ? setMouseOver(false) : null : setMouseOver(false)}
        onClick={() => singleColumn ? clickSingleColumn() : navigate(`/${id}`)}
        sx={{
          height: singleColumn? 400 : distance,
          maxHeight: 400,
          minHeight: 100,
          width: '100%',
          background: CardColor,
          borderRadius: '17px',
          cursor: 'pointer',
          transition: 'all 0.3s cubic-bezier(.25,.8,.25,1)',
          overflow: 'hidden',
          boxShadow: '-2px -1.5px  10px  0px #00000040',
          '&:hover': {
            boxShadow: '-4px -3px 20px 0px #00000040'
          }
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
          <>
            {thumbnail && thumbnail !== '' ? (
              <LayoutImage node={node} width={350} isThumbnail={true} />
            ) : null}
            {mouseOver && singleColumn ?
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  width: '100%',
                  background: DarkGrayCard,
                  display: 'flex'
                }}
              >
                <Box sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%'
                }}>
                  <Button sx={{ ...ButtonStyle, width: '100%', height: '100%', display: 'grid', justifyContent: 'center', alignItems: 'center' }} onClick={() => navigate(`/portfolio/${id}`)}>
                    <Typography
                      color={'white'}
                      sx={{
                        fontFamily: 'Space Mono',
                        fontSize: 16,
                      }}
                      data-testid={'project-name'}
                    >
                      Open
                    </Typography>
                  </Button>
                </Box>
              </Box>
              : null}
            {mouseOver ?
              <Box
                sx={{
                  position: 'absolute',

                  bottom: 0,
                  width: '100%',
                  p: '16px',
                  backgroundColor: singleColumn ? DarkGrayCard : CardColor,
                }}
              >
                <Grid sx={{
                  display: 'grid',
                }}>
                  <Typography
                    color={singleColumn ? 'white' : 'black'}
                    sx={{
                      fontFamily: 'Space Mono',
                      fontSize: 12,
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
                  <Box sx={{ display: 'flex', paddingTop: '8px' }}>
                    {tags?.map(x => {
                      return <Chip label={x} size='small' variant='elevated'
                        sx={{
                          fontFamily: 'Space Mono',
                          color: '#747474',
                          backgroundColor: 'white',
                          marginRight: '10px',
                          maxWidth: '80px',
                          fontSize: '12px',
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
