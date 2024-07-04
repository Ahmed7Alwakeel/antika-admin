
import gsap from "gsap";
import { ActiveSideMenuAccordionContext } from "../../../store/context/activeSideMenuAccordionContext";
import { useContext, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
const TogglerNavLink = ({ links, reAnimate }:any) => {
  const el = useRef<HTMLDivElement>(null);    
  const tl = useRef<gsap.core.Timeline>(gsap.timeline());
  const { activeSideMenuAccordion, setActiveSideMenuAccordion } = useContext(ActiveSideMenuAccordionContext);
  
  const handleToggle = () => {
    setActiveSideMenuAccordion(activeSideMenuAccordion == links?.header ? -1 : links?.header);

  };

  useEffect(() => {
    let ctx=gsap.context(() => {
      tl.current = gsap.timeline({ paused: true });
      tl.current.fromTo(
        ".sidemenu_wrapper .nav_links .toggler .collapsed_items",
        { height: 0 },
        {
          height: "auto",
          ease: "power3.out",
          duration: 0.5,
        }
      )
        .fromTo(".sidemenu_wrapper .nav_links .toggler .toggler_header .chevron",
          {
            rotate: 0
          },
          {
            rotate: 90, ease: "power3.inOut", duration: 0.2
          }, 0
        )
        .fromTo(
          ".sidemenu_wrapper .nav_links .toggler .collapsed_items",
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            ease: "power3.inOut",
            duration: 0.3,
          }, 0.15
        )

    });

    return () => {
      ctx.revert();
    };
  }, []);

  // useEffect(() => {
  //   if(links.nestedLinks.some(ele => pathname == ele?.link)){
  //     setActiveSideMenuAccordion(links?.header)
  //   }
  // }, [])


  useEffect(() => {
    activeSideMenuAccordion === links?.header ? tl.current?.play() : tl.current?.reverse();
  }, [activeSideMenuAccordion]);

  // // reinvoke the toggler timeline on sidebar collapse or expansion
  // useEffect(() => {
  //   // (activeSideMenuAccordion === links?.header || activeSideMenuAccordion != -1) && reAnimate ? tl.current?.play() : tl.current?.reverse();
  //   console.log(activeSideMenuAccordion, "activeSideMenuAccordion")
  // }, [reAnimate, activeSideMenuAccordion])
  // const isActive = links?.nestedLinks?.some(item => pathname === item?.link);
  // const isActive = links?.nestedLinks?.some(item => pathname?.includes(item?.link));

  return (
    <div className={`toggler`} ref={el}>
      <div className={`toggler_header  `} onClick={() => {
        handleToggle()
      }} >
        {links?.headerIcon}
        <span className="label">{links?.header}</span>
        <svg className="chevron" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path fill="currentColor" d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z" /></svg>
      </div>
      <ul className={`collapsed_items ${activeSideMenuAccordion === links?.header && "expanded_items"}`}>
        <div className="inner">
          {links?.nestedLinks?.map((item:any, index:number) => (
            <li className={`item`} key={index}>
              {/* <Link to={"/"}>
                {item?.icon &&
                  <div className="icon">{item?.icon}</div>
                }
                <span className="label">{item?.label}</span>
              </Link> */}
            </li>
          ))}
          <Link to={"/"}></Link>
        </div>
      </ul>
    </div>
  );
}

export default TogglerNavLink;