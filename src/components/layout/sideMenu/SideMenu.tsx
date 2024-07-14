import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { sideMenuOpenIcon, AboutIcon, ArticlesIcons, CategoriesIcon, ClubRegistrationIcons, ClubsListIcon, ContactLinksIcon, ContactUsIcon, ContactUsListIcon, CourtsIcon, NOCRegistrationIcons, NewsIcon, NewsletterListIcon, PlayersIcon, PlayersListIcon, SponsorsIcon, TeamsListIcon, TermsAndCondIcon, TournamentIcon, TournamentRequestsIcon, TournamentsIcon, UsersIcon, homeIcon, logo_flag_only, logo_label_only, settingsIcon, websiteIcon, CreateTournamentsIcon, ListTournamentsIcon, CalenderTournamentsIcon, Terms_Conditions, logo } from "../../../config/variables";
import ActiveSideMenuAccordionContextProvider from "../../../store/context/activeSideMenuAccordionContext";
import TogglerNavLink from "./TogglerNavLink";
import { useLocation } from "react-router-dom";
import { categoryLinks, productLinks } from "../../../config/menuLinks";

const SideMenu = () => {
  const {pathname} = useLocation();
  const [expanded, setExpanded] = useState<boolean>(true);
  const [keepExpanded, setKeepExpanded] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const el = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(gsap.timeline());
  
  const [reAnimate, setReAnimate] = useState<boolean>(false);


  useEffect(() => {
    let ctx = gsap.context(() => {
      tl.current = gsap.timeline();
      tl.current
        .fromTo(
          el.current,
          {
            width: "4.5rem",
          },
          {
            width: "auto",
            ease: "power3.inOut",
            duration: 0.5,
          }
        )
        .fromTo(
          ".label",
          {
            autoAlpha: 0,
          },
          {
            autoAlpha: 1,
            ease: "power3.inOut",
            duration: 0.3,
          },
          0.1
        );
    });

    return () => {
      ctx.revert();
    };
  }, []);




  return (
    <div className={`sidemenu_wrapper ${expanded && "expanded"} ${(pathname == "/auth/login" || pathname == "/auth/forgot-password") && "hide_sidebar"}`} ref={el}
      onMouseEnter={() => { if (!keepExpanded) { tl.current.play(); setHover(true); setReAnimate(true) } }}
      onMouseLeave={() => { if (!keepExpanded) { tl.current.reverse(); setHover(false); setReAnimate(false) } }}
    >
      <div className="logo_expand_container">
        <div className="logo_container">
          <div className="flag_label">
            {logo}
          </div>
        </div>
        <div className={`expand_btn label ${keepExpanded && "keep_expanded"}`}
          onClick={() => {
            setExpanded(!expanded);
            setKeepExpanded(!keepExpanded);
          }}
        >
          {sideMenuOpenIcon}
        </div>

      </div>
      <ul className="nav_links">
        <ActiveSideMenuAccordionContextProvider>
          <TogglerNavLink links={categoryLinks} reAnimate={reAnimate} customClass={"sidemenu_wrapper"}/>
          <TogglerNavLink links={productLinks} />
        </ActiveSideMenuAccordionContextProvider>
      </ul>
    </div>
  );

};

export default SideMenu;