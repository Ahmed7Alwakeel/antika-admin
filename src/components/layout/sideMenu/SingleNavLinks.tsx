
import { useRef } from "react";
import { ITogglerNavLink } from "../../../types/Interfaces";
import { Link, useLocation } from "react-router-dom";

const SingleNavLinks = ({ links }:any) => {
  const pathname = useLocation();
  const el = useRef();
  const isActive = links?.nestedLinks?.link === pathname;
  // const isActive = pathname?.includes(links?.nestedLinks?.link);

  return ( 
      <li className={`toggler`}>
        <Link to={links?.nestedLinks?.link}>
          <div className={`toggler_header ${(isActive) && "active"}`} >
            {links?.headerIcon}
            <span className="label">{links?.header}</span>
          </div> 
        </Link>
      </li> 
  );
}

export default SingleNavLinks;