import React from 'react';

const SplineScene = () => {
  return (
    <div className="w-full h-full relative">
      <iframe 
        src='https://my.spline.design/cubicresponsive-022b10b6d613b6600717e6376e536cb5/' 
        frameBorder='0' 
        width='100%' 
        height='100%'
        className="absolute inset-0"
        title="3D Scene"
      />
    </div>
  );
};

export default SplineScene;
