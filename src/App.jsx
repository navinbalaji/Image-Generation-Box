import React, { useRef, useEffect } from "react";
import { fabric } from "fabric";

const DrawingCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = new fabric.Canvas(canvasRef.current, {
      isDrawingMode: false, // Enable drawing mode
    });

    fabric.Image.fromURL(
      "https://images.unsplash.com/photo-1709730185387-9cac9f8e30e5?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwzfHx8ZW58MHx8fHx8",
      (img) => {
        // Calculate position to center the image
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const imgWidth = 500; // Default image width
        const imgHeight = 500; // Default image height
        const left = centerX - imgWidth / 2;
        const top = centerY - imgHeight / 2;

        // Position image at the center of the canvas
        img.set({
          left: left,
          top: top,
          width: imgWidth,
          height: imgHeight,
        });

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));

        // Create generation box
        const generationBox = new fabric.Rect({
          left: 100, // X-coordinate of top-left corner of the box
          top: 100, // Y-coordinate of top-left corner of the box
          width: 200, // Width of the box
          height: 150, // Height of the box
          fill: "transparent", // Box fill color
          stroke: "red", // Box border color
          strokeWidth: 2, // Border width
          cornerColor: "blue", // Color of the corner handles
          cornerSize: 10, // Size of the corner handles
          transparentCorners: false, // Corner handles are not transparent
          selectable: true, // Box is selectable
          hasControls: true, // Box has control handlers (resizing and rotating)
          lockUniScaling: true, // Locks aspect ratio when resizing
        });

        // Make the generation box resizable and movable
        generationBox.setControlsVisibility({
          mt: true, // top-middle
          mb: true, // bottom-middle
          ml: true, // middle-left
          mr: true, // middle-right
          tl: true, // top-left
          tr: true, // top-right
          bl: true, // bottom-left
          br: true, // bottom-right
          mtr: true, // middle-top
          mml: false, // middle-middle
          mmr: false, // middle-middle
          mmb: false, // middle-middle
          mmt: false, // middle-middle
        });

        canvas.add(generationBox);
      }
    );

    return () => {
      // Cleanup Fabric.js canvas when component unmounts
      canvas.dispose();
    };
  }, []);

  return <canvas ref={canvasRef} width={1000} height={1000} />;
};

export default function App() {
  return (
    <div className="App">
      <h1>Drawing App</h1>
      <DrawingCanvas />
    </div>
  );
}
