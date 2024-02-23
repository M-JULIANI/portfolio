import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LayoutImage } from './LayoutImage';
import { NodeInfo } from '../NodeInfo';
import { WindowState } from '../Home';
import { Popover } from '@mui/material';

type ImageModalProps ={
    node: NodeInfo;
    windowState: WindowState
}

const modalStyle = {
    position: 'relative',
    top: '50%',
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
    justifySelf: 'center',
    alignSelf: 'center'
  };

export const ImageModal: React.FC<ImageModalProps> = ({node, windowState}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const width = (windowState?.width || 200) * 0.43;
  console.log({width})

  return (
      <Popover
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        anchorOrigin={{horizontal: 'left', vertical: 'top'}}
        // onRequestClose={this.handleRequestClose}
        sx={{modalStyle}}
      >
        <Box sx={{ width:  '100%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow:  24, p:  4 }}>
            <LayoutImage node={node} width={width} isThumbnail={false}/>
        </Box>
      </Popover>
  );
}
