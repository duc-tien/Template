import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useState, useEffect } from "react";
import style from "./Recharts.module.scss";
import classNames from "classnames/bind";
import hubConnection from "@src/services/signalR/hubConnection";
const css = classNames.bind(style);

function Recharts() {
  const [data, setData] = useState([]);

  useEffect(() => {
    hubConnection.start();
    hubConnection.connection.on("TagChanged", (msg) => {
      let obj = JSON.parse(msg);
      if (obj.name === "Inverter_Speed_PV") {
        const d = new Date();
        let day = d.getDate();
        let mth = d.getMonth();
        let year = d.getFullYear();
        let h = d.getHours();
        let m = d.getMinutes();
        let s = d.getSeconds();
        if (s < 10) {
          obj.time = `${h}:${m}:0${s}`;
        } else if (s < 10 && m < 10) {
          obj.time = `${h}:0${m}:0${s}`;
        } else if (s < 10 && m < 10 && h < 10) {
          obj.time = `0${h}:0${m}:0${s}`;
        } else {
          obj.time = `${h}:${m}:${s}`;
        }
        setData((prev) => {
          const listData = [...prev, obj];
          if (listData.length > 60) {
            listData.shift();
          }
          return listData;
        });
      }
    });
  }, [hubConnection.connection]);

  let xAxisInterval = Math.round(data.length / 6);

  return (
    <>
      <div className={css("chart")}>
        <span>Biểu đồ tốc độ động cơ theo thời gian</span>
        <div>
          <LineChart width={800} height={300} data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" interval={xAxisInterval} />
            <YAxis domain={[0, 25]} ticks={[0, 5, 10, 15, 20, 25]} />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#82ca9d"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
          <p> Speed (Hz)</p>
        </div>
      </div>
    </>
  );
}

export default Recharts;
