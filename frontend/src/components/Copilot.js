import React from 'react';
import AppAppBar from './AppAppBar'; // Import the AppAppBar component

const FullPageIframe = ({ src }) => {
  return (
    <div style={{ width: "100%", height: "100%" }}> {/* Container to hold both AppAppBar and iframe */}
      <AppAppBar /> {/* App bar added at the top */}
      <iframe
        src="http://127.0.0.1:7860/" // Use the src prop for the iframe source
        style={{
          position: "absolute",
          marginTop: '20px', // Adjusted based on the AppAppBar's height
          left: 0,
          width: "100%",
          // Calculate height to prevent overlapping with the AppAppBar, assuming AppAppBar's height is known
          height: "calc(100% - 64px)", // Adjust this value based on the actual height of your AppAppBar
          border: "none",
          marginTop: "64px", // Adjust this value based on the actual height of your AppAppBar
        }}
        title="Terraforged Copilot"
      ></iframe>
    </div>
  );
};

export default FullPageIframe;
