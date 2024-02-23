import React, { useState } from 'react';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import { WindowState } from '../Home';

interface ImagePopoverProps {
    imageSrc: string;
    windowState: WindowState;
}

const ImagePopover: React.FC<ImagePopoverProps> = ({ imageSrc, windowState }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);

    const width = `${windowState?.width || 400}px`;
    
      const handleShowDialog = () => {
        setIsPopoverOpen(!isPopoverOpen);
      };
    
      return (
        <div>
          <img
            src={imageSrc}
            style={{ cursor: 'pointer' }}
            onClick={handleShowDialog}
          />
          <Popover
            isOpen={isPopoverOpen}
            positions={['center']}
            align="center"
            onClickOutside={handleShowDialog}
            content={({ position, childRect, popoverRect }) => (
              <div
                style={{
                  position: 'fixed',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'white',
                  padding: '1rem',
                  borderRadius: '0.5rem',
                  boxShadow: '0  0  10px rgba(0,0,0,0.1)',
                }}
              >
                <img src={imageSrc} style={{ width: width, height: 'auto' }} />
              </div>
            )}
          >
            <div />
          </Popover>
        </div>
      );
    };
    
    export default ImagePopover;
    
        
