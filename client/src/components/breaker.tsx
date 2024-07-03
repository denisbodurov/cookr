
import React from "react";

function Breaker() {
  const lineBraker = {
    width: "40%",
    border: "solid",
    borderWidth: 2,
    borderColor: '#E56B6F',
  };
  const nameBraker = {
    padding: 10,
    backgroundColor: '#E56B6F',
    borderRadius: 10

  };
  const breaker = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  };
  return (
    <>
      <div style={breaker}>
        <div style={lineBraker}></div>
        <p style={nameBraker}>CATEGORIES</p>
        <div style={lineBraker}></div>
      </div>
    </>
  );
}

export default Breaker;
