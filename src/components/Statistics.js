import React, { useState, useEffect } from "react";
import _ from "lodash";
import {
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

function Statistics() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://customerrest.herokuapp.com/api/trainings")
      .then((response) => response.json())
      .then((data) => handleData(data.content))
      .then((stat) => setData(stat))
      .catch((err) => console.error(err));
  }, []);

  const handleData = (data) => {
    let statistics = _(data)
      .groupBy("activity")
      .map((objs, key) => ({
        activity: key,
        duration: _.sumBy(objs, "duration"),
      }))
      .value();
    return statistics;
  };

  return (
    <div>
      <div
        style={{
          width: "90%",
          height: 600,
          marginTop: "1",
          marginLeft: "5%",
        }}
      >
        <ResponsiveContainer width="90%" height={550}>
          <BarChart
            data={data}
            margin={{ top: 50, right: 30, left: 20, bottom: 0 }}
          >
            <CartesianGrid stroke="#40E06D" strokeDasharray="5 5" />
            <XAxis dataKey="activity" stroke="black" />
            <YAxis name="Duration (min)" stroke="black" />
            <Tooltip wrapperStyle={{ backgroundColor: "#9B82C1" }} />
            <Legend
              width={100}
              wrapperStyle={{
                top: 50,
                right: -100,
                backgroundColor: "#D1CFE0",
                border: "1px solid #d5d5d5",
                borderRadius: "20px",
                lineHeight: "40px",
              }}
            />
            <Bar
              name="Activity Statistics (min)"
              dataKey="duration"
              fill="#5A519F"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default Statistics;
