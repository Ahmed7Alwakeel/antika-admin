
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


const Breadcrumbs = () => {
    const breadcrumbsData = useSelector((store: any) => store.breadCrumbsData.breadCrumbsData);

    return (
        <div className="breadcrumbs">
            <div className="links">
                {breadcrumbsData?.links?.map((link: { label: string, path: string }, index: number) => (
                    <div className={`link ${!link?.path && "dimmed"}`} key={index}>
                        {link?.path ?
                            <>
                                <Link to={link?.path} className="name">{link?.label}</Link>
                                <svg className="chevron" width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.128282 8.91192C0.0478822 8.85162 0.00768253 8.77122 0.00768252 8.67072C0.00768252 8.61042 0.0277824 8.53002 0.0880819 8.46972L3.72616 4.51005L0.0880816 0.530279C-0.0325175 0.40968 -0.0325176 0.208681 0.108181 0.0880823C0.228781 -0.0325165 0.429779 -0.0325165 0.550378 0.108182L4.40955 4.28895C4.53015 4.40955 4.53015 4.59045 4.40955 4.71105L0.550379 8.89182C0.449879 9.03252 0.248881 9.03252 0.128282 8.91192Z" fill="currentColor" />
                                </svg>
                            </>
                            :
                            <>
                                <span className="name">{link?.label}</span>
                                <svg className="chevron" width="5" height="9" viewBox="0 0 5 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.128282 8.91192C0.0478822 8.85162 0.00768253 8.77122 0.00768252 8.67072C0.00768252 8.61042 0.0277824 8.53002 0.0880819 8.46972L3.72616 4.51005L0.0880816 0.530279C-0.0325175 0.40968 -0.0325176 0.208681 0.108181 0.0880823C0.228781 -0.0325165 0.429779 -0.0325165 0.550378 0.108182L4.40955 4.28895C4.53015 4.40955 4.53015 4.59045 4.40955 4.71105L0.550379 8.89182C0.449879 9.03252 0.248881 9.03252 0.128282 8.91192Z" fill="currentColor" />
                                </svg>
                            </>
                        }
                    </div>
                ))}
            </div>
            <h4 className="page_title">{breadcrumbsData?.page_title}</h4>
        </div>
    );
}

export default Breadcrumbs;