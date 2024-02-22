import * as React from 'react';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { LayoutImage } from './LayoutImage';
import { NodeInfo } from '../NodeInfo';

type ImageModalProps ={
    node: NodeInfo;
}

const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%', 
    transform: 'translate(-50%, -50%)', 
  };

export const ImageModal: React.FC<ImageModalProps> = ({node}) => {
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  return (
      <Modal
        open={true}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        
        style={modalStyle}
      >
        <Box sx={{ width:  '100%', bgcolor: 'background.paper', border: '2px solid #000', boxShadow:  24, p:  4 }}>
            <LayoutImage node={node} width={800} isThumbnail={false}/>
        </Box>
      </Modal>
  );
}
