import React from "react";
import "./styles.css";
// import CompoundInterestCalculator from "./CompoundInterestCalculator";
import USTreasuryYieldCurve from "./USTreasuryYieldCurve";

export default function App() {
  return (
    <div className="App">
      {/* <CompoundInterestCalculator /> */}
      <USTreasuryYieldCurve />
    </div>
  );
}
