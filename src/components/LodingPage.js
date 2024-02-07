import React from "react";
import styled, { keyframes, createGlobalStyle } from "styled-components";

// Define keyframes for animation
const move = keyframes`
  0% { left: 0%; }
  100% { left: 100%; }
`;

// Global styles for the page
const GlobalStyles = createGlobalStyle`
  html, body, #root {
    height: 100%;
    width: 100%;
    margin: 0;
    padding: 0;
    overflow: hidden;
    position: relative; /* Required for z-index to work */
    z-index: 999
    background: #75b08a
  }
`;

// Styled components for the div elements
const AnimatedDiv = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  border-radius: 50%;
  z-index: 9999; /* Set the z-index to the highest value */
`;

const FirstDiv = styled(AnimatedDiv)`
  background-color: #fff;
  animation: ${move} 2s infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);
`;

const SecondDiv = styled(AnimatedDiv)`
  background-color: #d3dbfe;
  animation: ${move} 2s 150ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);
`;

const ThirdDiv = styled(AnimatedDiv)`
  background-color: #97adf0;
  animation: ${move} 2s 300ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);
`;

const FourthDiv = styled(AnimatedDiv)`
  background-color: #000;
  animation: ${move} 2s 450ms infinite cubic-bezier(0.2, 0.64, 0.81, 0.23);
`;

// Main component
const AnimatedDivs = () => {
  return (
    <>
      <GlobalStyles />
      <div
        style={{
          padding: "23%",
          background: "#275f9a47",
          height: "inherit",
          zIndex: 1000,
          position: "absolute",
        }}
      >
        <FirstDiv />
        <SecondDiv />
        <ThirdDiv />
        <FourthDiv />
      </div>
    </>
  );
};

export default AnimatedDivs;
