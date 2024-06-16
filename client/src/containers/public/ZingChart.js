import React, { useEffect, useRef, useState } from "react";
import { apiGetChartHome } from "../../apis";
import { Line } from "react-chartjs-2";
import { Chart } from "chart.js/auto";
import { List, RankList, SongItem } from "../../components";
import { useSelector } from "react-redux";
import _ from "lodash";
import bgChart from "../../assets/bg-chart.jpg";

const ZingChart = () => {
  const [chartData, setChartData] = useState();
  const [data, setData] = useState();
  const [songs, setSongs] = useState();
  const [isShowfull, setIsShowfull] = useState(false);

  //   const { chart, rank } = useSelector((state) => state.app);
  const chartRef = useRef();
  const [tooltip, setTooltip] = useState({
    opacity: 0,
    top: 0,
    left: 0,
  });
  const [tooltipData, setTooltipData] = useState(null);

  const options = {
    responsive: true,
    pointRadius: 0,
    maintainAspectRatio: false,
    scales: {
      y: {
        ticks: { display: false },
        grid: { color: "rgba(0,0,0,0.6)", drawTicks: false },
        // min: chartData?.RTChart?.chart?.minScore,
        // max: chartData?.RTChart?.chart?.maxScore,
        border: { dash: [2, 6] },
      },
      x: {
        ticks: { color: "gray" },
        grid: { color: "rgba(0,0,0, 0.3)", drawTicks: false },
      },
    },
    plugins: {
      legend: false,
      tooltip: {
        enabled: false,
        external: (ctx) => {
          const data = [];
          for (let i = 0; i < 3; i++)
            data.push({
              encodeId: Object.keys(chartData?.RTChart?.chart?.items)[i],
              data: chartData?.RTChart?.chart?.items[
                Object.keys(chartData?.RTChart?.chart?.items)[i]
              ]
                ?.filter((item) => +item.hour % 2 === 0)
                ?.map((item) => item.counter),
            });
          const tooltipModel = ctx.tooltip;
          setTooltipData(
            data.find((i) =>
              i.data.some(
                (n) => n === +tooltipModel.body[0].lines[0].replace(",", "")
              )
            )?.encodeId
          );
          if (tooltipModel.opacity === 0) {
            if (tooltip.opacity !== 0)
              setTooltip((prev) => ({ ...prev, opacity: 0 }));
            return;
          }
          const newTooltipData = {
            opacity: 1,
            left: tooltipModel.caretX,
            top: tooltipModel.caretY,
          };
          if (!_.isEqual(tooltip, newTooltipData)) setTooltip(newTooltipData);
        },
      },
    },
    hover: {
      mode: "dataset",
      intersect: false,
    },
  };

  const fetchChartData = async () => {
    const response = await apiGetChartHome();
    if (response.data.err === 0) {
      setChartData(response.data.data);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  useEffect(() => {
    const labels = chartData?.RTChart?.chart?.times
      ?.filter((item) => +item.hour % 2 === 0)
      ?.map((item) => `${item.hour}:00`);
    const datasets = [];
    if (chartData?.RTChart?.chart?.items) {
      for (let i = 0; i < 3; i++) {
        datasets.push({
          data: chartData?.RTChart?.chart?.items[
            Object.keys(chartData?.RTChart?.chart?.items)[i]
          ]
            ?.filter((item) => +item.hour % 2 === 0)
            ?.map((item) => item.counter),
          borderColor: i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          tension: 0.3,
          borderWidth: 3,
          pointBackgroundColor: "white",
          pointHoverRadius: 5,
          pointBorderColor:
            i === 0 ? "#4a90e2" : i === 1 ? "#50e3c2" : "#e35050",
          pointHoverBorderWidth: 2,
        });
      }
      setData({ labels, datasets });
    }
  }, [chartData]);

  console.log(chartData);
  return (
    <div className="mb-14">
      <div className="flex flex-col h-[350px] relative">
        <img
          src={bgChart}
          alt=""
          className="w-full h-full  object-cover grayscale"
        ></img>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.9)]"></div>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-gradient-to-t from-[#CED9D9] to-transparent"></div>

        <div className="absolute top-0 left-0  flex items-center ">
          <h3 className="font-bold text-[40px] text-main-500 ml-4">
            #zingchart
          </h3>
        </div>
        {data && (
          <div className="absolute top-1/4 left-0 right-0 bottom-0 ">
            <Line ref={chartRef} data={data} options={options} />
            <div
              className="tooltip"
              style={{
                top: tooltip.top,
                left: tooltip.left,
                position: "absolute",
                opacity: tooltip.opacity,
              }}
            >
              <SongItem
                thumbnail={
                  chartData?.RTChart?.items?.find(
                    (i) => i.encodeId === tooltipData
                  )?.thumbnail
                }
                title={
                  chartData?.RTChart?.items?.find(
                    (i) => i.encodeId === tooltipData
                  )?.title
                }
                artists={
                  chartData?.RTChart?.items?.find(
                    (i) => i.encodeId === tooltipData
                  )?.artistsNames
                }
                sid={
                  chartData?.RTChart?.items?.find(
                    (i) => i.encodeId === tooltipData
                  )?.encodeId
                }
                style="bg-white"
              />
            </div>
          </div>
        )}
      </div>
      <div className="mt-5 px-[60px]">
        <RankList data={chartData?.RTChart?.items} number={10}></RankList>
      </div>
      <div className="flex flex-col relative  mt-5 px-4 w-full">
        <img
          src={bgChart}
          alt=""
          className="w-full h-[570px] object-cover grayscale"
        ></img>
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-[rgba(206,217,217,0.9)]"></div>
        <div className="absolute top-0 left-0 gap-6 flex flex-col w-full ">
          <h3 className="font-bold text-[40px] text-main-500 ml-8 mt-3">
            Bảng Xếp Hạng Tuần
          </h3>
          <div className="px-[40px] flex gap-4 w-full">
            {chartData?.weekChart &&
              Object.entries(chartData?.weekChart)?.map((item, index) => (
                <div
                  key={index}
                  className="flex-1 flex flex-col bg-gray-200 rounded-md px-[10px] pt-5"
                >
                  <h3 className="text-[24px] text-main-500 font-bold">
                    {item[0] === "vn"
                      ? "Việt Nam"
                      : item[0] === "us"
                      ? "US-UK"
                      : item[0] === "korea"
                      ? "K-Pop"
                      : ""}
                  </h3>
                  <div className="mt-4 h-fit">
                    <RankList
                      data={item[1]?.items}
                      isHideAlbum={true}
                      number={4}
                      rankListt={true}
                      link={item[1].link}
                    ></RankList>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZingChart;
