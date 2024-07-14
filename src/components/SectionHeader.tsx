import { IFormHeader } from "../types/Interfaces";

const SectionHeader = ({title , customStyle, children}:IFormHeader) => {
    return (
        <div className={`section_header ${customStyle}`}>
            <h4>{title}</h4>
            {children}
        </div>
    );
}

export default SectionHeader;