import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    Legend,
    Tooltip,
    Filler,
    ArcElement
} from "chart.js";
ChartJS.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler,
    ArcElement
);
const ChartData = ({ reportData, title, desc, handleData, stepSize, setMixedGraph }: any) => {

    const data = {
        labels: reportData.map((data: any) => data.date),
        datasets: handleData()
    };

    const options = {
        plugins: {
            legend: false,
        },
        responsive: true,
        scales: {
            y: {
                ticks: {
                    font: {
                        size: 12,
                        weight: "bold",
                    },
                    stepSize: stepSize || 20
                },
                min: 0,
            },
            x: {
                ticks: {
                    font: {
                        size: 12,
                        weight: "bold",
                    },
                },
            },
        },
    };
    
    return (
        <div className="charts-wrapper">
            <div className="header">
                <h4>{title}</h4>
                <span>{desc}</span>
            </div>
            <div className="chart">
                <Line data={data} options={options as any} />
            </div>
            {handleData()?.length > 1 &&
                <div className="data-summary-container">
                    {handleData()?.map((item: any, index: any) => (
                        <div className="data-summary" key={index}

                        >
                            <div className="header">
                                <div className="color" style={{ background: item?.borderColor }}></div>
                                <p>{item?.label}</p>
                            </div>
                        </div>
                    ))}
                </div>
            }
        </div>
    );
}

export default ChartData;