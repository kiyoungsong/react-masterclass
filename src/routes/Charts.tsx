import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { fetchCoinHistory } from "../api";
import ApexChart from 'react-apexcharts';

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

function Chart() {
  const { coinId } = useParams();
  const { isLoading, data } =
    useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId!));
  console.log(data);
  return (
    <div>
      {isLoading ? "Loading Chart..." : <ApexChart 
      series={[{
        name: 'price',
        data: data?.map(price => price.close) ?? [],
      }]}
      type="line" 
      options={{
        chart: {
          height: 300,
          width: 500,
          toolbar: {
            show: false,
          },
          background: "transparent",
        },
        theme: {
          mode: 'dark'
        },
        stroke: {
          curve: 'smooth',
          width: 4,
        },
        grid: {
          show: false,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            show: false,
          }
        },
        yaxis: {
          show: false,
        }
      }}
      />}
    </div>);
}

export default Chart;