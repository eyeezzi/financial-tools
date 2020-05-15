import React, { useEffect, useState } from "react";
import { Line } from "@nivo/line";

const lineChartProperties = {
  width: 900,
  height: 400,
  margin: { top: 20, right: 20, bottom: 60, left: 80 },
  data: [],
  animate: true,
  enableSlices: "x"
};

function fetchDailyYield(year) {
  console.log("fetching yield...");

  const url = `./us_treasury_yield_${year}.json`;

  const cacheKey = `daily_treasury_yield_${year}`;
  const cachedData = localStorage.getItem(cacheKey);
  if (cachedData == null) {
    return fetch(url)
      .then(res => res.json())
      .then(json => {
        let data = {
          five: [],
          ten: [],
          thirty: []
        };
        for (var i = 0; i < json.Days.length; i++) {
          const day = new Date(json.Days[i]["Date"]);

          data.five.push({
            x: day,
            y: json.Days[i]["FiveYr"]
          });
          data.ten.push({
            x: day,
            y: json.Days[i]["TenYr"]
          });
          data.thirty.push({
            x: day,
            y: json.Days[i]["ThirtyYr"]
          });
        }
        return Promise.resolve(data);
      })
      .catch(err => {
        console.error(`Failed to fetch treasury yield rates: ${err}`);
      });
  }
}

export default function USTreasuryYieldCurve(props) {
  const [dailyYieldsData, setDailyYieldsData] = useState({
    five: [],
    ten: [],
    thirty: []
  });

  useEffect(() => {
    let isMounted = true;
    fetchDailyYield(2020).then(data => {
      if (isMounted) {
        setDailyYieldsData(data);
      }
    });
    return () => (isMounted = false);
  }, []);

  return (
    <div>
      <h1>US Treasury Yield Curve</h1>
      <button onClick={() => fetchDailyYield(2013)}>This Year</button>
      <button onClick={() => fetchDailyYield(2013)}>5 Year</button>
      <button onClick={() => fetchDailyYield(2013)}>10 Year</button>
      <button onClick={() => fetchDailyYield(2013)}>Max</button>
      <div>
        <Line
          {...lineChartProperties}
          curve="monotoneX"
          colors={["red", "blue", "green"]}
          enablePoints={false}
          // IDs must be different otherwise, infinite loop
          data={[
            {
              id: "5 Year Bond",
              data: dailyYieldsData.five
            },
            {
              id: "10 Year Bond",
              data: dailyYieldsData.ten
            },
            {
              id: "30 Year Bond",
              data: dailyYieldsData.thirty
            }
          ]}
          xScale={{
            type: "time",
            precision: "day"
          }}
          axisLeft={{
            legend: "yield",
            legendOffset: 12
          }}
          axisBottom={{
            legend: "date",
            legendOffset: -12,
            format: "%b %d",
            tickValues: "every month"
          }}
          // legends={[
          //   {
          //     anchor: "bottom-right",
          //     direction: "column",
          //     itemDirection: "left-to-right",
          //     translateX: 200,
          //     translateY: 300
          //   }
          // ]}
        />
      </div>
    </div>
  );
}
