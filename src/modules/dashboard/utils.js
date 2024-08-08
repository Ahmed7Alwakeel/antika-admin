
export const chartsLineColors = [
    '#858585',
    "#aac7c9",
    "#211d33",
    "#bfbfbf",
    "#cbcbcb",
    "#D2F0FF",
    "#99E998",
    "#FFD9D9",
    "#FEE6C9",
    "#f8dc94",
    "#d6b258",
]
export const donutsLineColors = [
    "#000",
    "#aac7c9",
    "#bfbfbf",
    '#858585',
    "#cbcbcb",
    "#D2F0FF",
    "#99E998",
    "#FFD9D9",
    "#FEE6C9",
    "#f8dc94",
    "#d6b258",

]

export const getYearlyReport = (data, key) => {
    const result = [];
    const currentYear = new Date().getFullYear();
    
    for (let month = 0; month < 12; month++) {
        const monthName = new Date(currentYear, month, 1).toLocaleString('default', { month: 'short' });
        const collected = data?.filter(item => item.date === month + 1)?.reduce((acc, item) => acc + item[`${key}`], 0);
        
        result.push({ date: monthName,numbers:collected});
        }
    return result;
}

export const handleMixedLineChartData = (mixedData) => {
    const dataSet = []
    const data = [...mixedData]
    data?.map((item, index) => {
        dataSet.push({
            label: item.label,
            data: item.data.map((data) => data.numbers),
            borderColor: chartsLineColors[index],
            borderWidth: 1,
            pointBorderColor: "#000",
            pointBorderWidth: .5,
            tension: .5,
            fill: true,
            isActive: item?.isActive,
            backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 300);
                return gradient;
            },
        },)
    })
    return dataSet
}