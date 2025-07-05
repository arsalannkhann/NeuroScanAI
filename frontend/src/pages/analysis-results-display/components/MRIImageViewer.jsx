import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const MRIImageViewer = ({ imageUrl, imageName, onClose }) => {
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [isFullscreen, setIsFullscreen] = useState(false);
  const imageRef = useRef(null);
  const containerRef = useRef(null);

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetView = () => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart]);

  return (
    <div className={`bg-surface rounded-lg clinical-shadow ${isFullscreen ? 'fixed inset-4 z-1100' : 'h-full'}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center space-x-3">
          <Icon name="Image" size={20} className="text-primary-600" />
          <div>
            <h3 className="font-semibold text-text-primary font-heading">MRI Scan</h3>
            <p className="text-sm text-text-secondary">{imageName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            iconName="Maximize2"
            onClick={toggleFullscreen}
            className="p-2"
          />
          {onClose && (
            <Button
              variant="ghost"
              iconName="X"
              onClick={onClose}
              className="p-2"
            />
          )}
        </div>
      </div>

      {/* Image Container */}
      <div 
        ref={containerRef}
        className="relative flex-1 overflow-hidden bg-secondary-50"
        style={{ height: isFullscreen ? 'calc(100vh - 200px)' : '500px' }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center cursor-move"
          onMouseDown={handleMouseDown}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          <Image
            ref={imageRef}
            src={imageUrl}
            alt="MRI Brain Scan"
            className="max-w-full max-h-full object-contain select-none"
            draggable={false}
          />
        </div>

        {/* Zoom Level Indicator */}
        <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm rounded-md px-3 py-1">
          <span className="text-sm font-medium text-text-primary data-text">
            {Math.round(zoom * 100)}%
          </span>
        </div>

        {/* Image Info Overlay */}
        <div className="absolute bottom-4 left-4 bg-background/90 backdrop-blur-sm rounded-md p-3">
          <div className="space-y-1 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={14} className="text-text-secondary" />
              <span className="text-text-secondary">Scan Date: March 15, 2024</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Settings" size={14} className="text-text-secondary" />
              <span className="text-text-secondary">T1-weighted FLAIR</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Layers" size={14} className="text-text-secondary" />
              <span className="text-text-secondary">Axial slice 45/120</span>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between p-4 border-t border-border bg-secondary-50">
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="ZoomIn"
            onClick={handleZoomIn}
            disabled={zoom >= 3}
            size="sm"
          />
          <Button
            variant="outline"
            iconName="ZoomOut"
            onClick={handleZoomOut}
            disabled={zoom <= 0.5}
            size="sm"
          />
          <Button
            variant="outline"
            iconName="RotateCcw"
            onClick={handleResetView}
            size="sm"
          >
            Reset
          </Button>
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Download"
            size="sm"
          >
            Download
          </Button>
          <Button
            variant="outline"
            iconName="Share2"
            size="sm"
          >
            Share
          </Button>
        </div>
      </div>

      {/* Navigation Instructions */}
      {zoom > 1 && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          <div className="bg-background/90 backdrop-blur-sm rounded-md p-2 text-sm text-text-secondary">
            <Icon name="Move" size={16} className="inline mr-1" />
            Click and drag to pan
          </div>
        </div>
      )}
    </div>
  );
};

export default MRIImageViewer;