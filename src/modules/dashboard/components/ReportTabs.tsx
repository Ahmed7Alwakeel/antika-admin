const ReportTabs = ({ title, tabs, setSelectedTab, selectedTab }:any) => {
    return (
        <div className="report-tabs-wrapper">
            <h4>{title}</h4>
            <ul className="tabs-container">
                {tabs.map((item:any, index:any) => (
                    <li key={index} className={`${selectedTab == index && 'active'}`}
                        onClick={() => setSelectedTab(index)}
                    >{item}</li>
                ))}
            </ul>
        </div>
    );
}

export default ReportTabs;