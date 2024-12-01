import React from "react";
import { Line } from "react-chartjs-2";

const GraphComponent = ({ data, options }) => {
  return (
    <div style={{ width: "100%", height: "400px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default GraphComponent;
