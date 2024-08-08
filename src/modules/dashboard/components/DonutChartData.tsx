import { Doughnut } from "react-chartjs-2";
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
const DonutChartData = ({ handleData, summary, title, desc, shownData,keys }: any) => {

    const data = {
        labels: "",
        datasets: handleData(shownData || null),
    };

    const options = {
        cutout: '70%', // Adjust the size of the hole in the center
    };

    return (
        <div className="single-donut-chart">
            <div className="chart-header">
                <h4 style={{marginBottom:"1rem"}}>{title}</h4>
                <span>{desc}</span>
            </div>
            <div className="chart-content-wrapper">
                <div className="donut-chart">
                    <Doughnut data={data as any} options={options} />
                </div>
                <div className="data-summary-container">
                    {summary?.map((item: any, index: any) => (
                        <div className="data-summary" key={index}>
                            <div className="header">
                                <div className="color" style={{ background: item?.backgroundColor }}></div>
                                <p>{item?.label}</p>
                            </div>
                            <div className="number">
                                <p>{item[keys[0]]?.toLocaleString()} % ( {item[keys[1]]} )</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div >
    );
}

export default DonutChartData;