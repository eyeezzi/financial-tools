import React, { useState, useEffect } from "react";
import useForm from "./useForm";
import { Line } from "@nivo/line";
import { Pie } from "@nivo/pie";

const lineChartProperties = {
  width: 900,
  height: 400,
  margin: { top: 20, right: 20, bottom: 60, left: 80 },
  data: [],
  animate: true,
  enableSlices: "x"
};

const pieChartProperties = {
  width: 400,
  height: 400,
  margin: { top: 20, right: 40, bottom: 60, left: 80 },
  data: [],
  animate: true,
};

export default function CompoundInterestCalculator(props) {
  const [values, handleChange] = useForm({
    principal: 1000,
    interestRate: 0.10,
    applicationsPerPeriod: 4,
    numberOfPeriods: 5
  });

  const [compoundAmount, setCompoundAmount] = useState(0);
  const [compoundInterestData, setCompoundInterestData] = useState([]);

  const [simpleAmount, setSimpleAmount] = useState(0);
  const [simpleInterestData, setSimpleInterestData] = useState([]);

  const compoundInterest = (p, r, n, t) => {
    return p * Math.pow(1 + r / n, n * t);
  };

  const simpleInterest = (p, r, n, t) => {
    return p * (1 + r * t);
  };

  // calculate simple interest amount
  useEffect(() => {
    const A = simpleInterest(
      values.principal,
      values.interestRate,
      values.applicationsPerPeriod,
      values.numberOfPeriods
    );
    setSimpleAmount(A);
  }, [values]);

  // calculate compount interest amount
  useEffect(() => {
    const A = compoundInterest(
      values.principal,
      values.interestRate,
      values.applicationsPerPeriod,
      values.numberOfPeriods
    );
    setCompoundAmount(A);
  }, [values]);

  // generate compound interest plot
  useEffect(() => {
    let data = [];
    for (var i = 0; i <= values.numberOfPeriods; i++) {
      data.push({
        x: i,
        y: compoundInterest(
          values.principal,
          values.interestRate,
          values.applicationsPerPeriod,
          i
        ).toFixed(2)
      });
    }
    setCompoundInterestData(data);
  }, [values]);

  // generate simple interest plot
  useEffect(() => {
    let data = [];
    for (var i = 0; i <= values.numberOfPeriods; i++) {
      data.push({
        x: i,
        y: simpleInterest(
          values.principal,
          values.interestRate,
          values.applicationsPerPeriod,
          i
        ).toFixed(2)
      });
    }
    setSimpleInterestData(data);
  }, [values]);

  return (
    <div>
      <h1>Compound Interest Calculator</h1>
      <form>
        <label>
          Principal
          <input
            name="principal"
            value={values.principal}
            onChange={handleChange}
          />
        </label>
        <label>
          Annual Interest Rate
          <input
            name="interestRate"
            value={values.interestRate}
            onChange={handleChange}
          />
        </label>
        <label>
          Number of times compounded in year
          <input
            name="applicationsPerPeriod"
            value={values.applicationsPerPeriod}
            onChange={handleChange}
          />
        </label>
        <p>
          That is {(values.interestRate * 100) / values.applicationsPerPeriod}%
          each time
        </p>
        <label>
          Number of Years
          <input
            name="numberOfPeriods"
            value={values.numberOfPeriods}
            onChange={handleChange}
          />
        </label>
        <h2>Amount: {compoundAmount.toFixed(2)}</h2>
        <h3>Gain: {(compoundAmount - values.principal).toFixed(2)}</h3>
      </form>
      <Line
        {...lineChartProperties}
        curve="monotoneX"
        colors={["#00ff00", "#0000ff"]}
        data={[
          {
            id: "Compound Interest",
            data: compoundInterestData
          },
          {
            id: "Simple Interest",
            data: simpleInterestData
          }
        ]}
        xScale={{
          type: "linear",
          min: 0,
          max: "auto"
        }}
        axisLeft={{
          legend: "$",
          legendOffset: 12
        }}
        axisBottom={{
          legend: "years",
          legendOffset: -12
        }}
      />
      <div style={{ border: "1px solid red", display: "flex", justifyContent: 'space-around'}}>
        <Pie
          {...pieChartProperties}
          data={[
            {
              id: "principal",
              label: "Principal",
              value: values.principal,
              color: "rgb(200,200,200)"
            },
            {
              id: "CI",
              label: "Compound Interest",
              value: parseFloat((compoundAmount - values.principal).toFixed(2)),
              color: "rbg(0,255,0)"
            }
          ]}
          innerRadius={0.6}
        />
        <Pie
          {...pieChartProperties}
          data={[
            {
              id: "principal",
              label: "Principal",
              value: values.principal,
              color: "rgb(200,200,200)"
            },
            {
              id: "SI",
              label: "Simple Interest",
              value: parseFloat((simpleAmount - values.principal).toFixed(2)),
              color: "rgb(0,0,255)"
            }
          ]}
          innerRadius={0.6}
        />
      </div>
    </div>
  );
}
