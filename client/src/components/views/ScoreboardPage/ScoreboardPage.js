import React from "react";
import { FaCode } from "react-icons/fa";

function ScoreboardPage() {
  return (
    <>
      <div className="app">
        <FaCode style={{ fontSize: "4rem" }} />
        <br />
        <span style={{ fontSize: "2rem" }}>Scoreboard</span>
      </div>
      <div style={{ float: "right" }}>
        Thanks For Using This Boiler Plate by John Ahn
      </div>
    </>
  );
}

export default ScoreboardPage;
