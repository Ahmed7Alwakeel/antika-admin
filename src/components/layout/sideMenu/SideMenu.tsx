import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { sideMenuOpenIcon, CourtsIcon, NOCRegistrationIcons, NewsIcon, NewsletterListIcon, PlayersIcon, PlayersListIcon, SponsorsIcon, TeamsListIcon, TermsAndCondIcon, TournamentIcon, TournamentRequestsIcon, TournamentsIcon, UsersIcon, homeIcon, logo_flag_only, logo_label_only, logo } from "../../../config/variables";
import ActiveSideMenuAccordionContextProvider from "../../../store/context/activeSideMenuAccordionContext";
import TogglerNavLink from "./TogglerNavLink";
import { useLocation } from "react-router-dom";
import { productLinks, categoryLinks, usersLinks, branchesLinks } from "../../../config/menuLinks";
import SingleNavLinks from "./SingleNavLinks";

const SideMenu = () => {
  const { pathname } = useLocation();
  const [expanded, setExpanded] = useState<boolean>(true);
  const [keepExpanded, setKeepExpanded] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);
  const el = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline>(gsap.timeline());
  const tl2 = useRef<gsap.core.Timeline>(gsap.timeline());
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

  useEffect(() => {
    tl2.current = gsap.timeline({ paused: true });
    tl2.current
      .fromTo(
        ".sidemenu_wrapper .nav_links .toggler .collapsed_items.expanded_items",
        { height: 0 },
        {
          height: "auto",
          ease: "power3.inOut",
          duration: 0.35,
        }
      )
      .fromTo(
        ".sidemenu_wrapper .nav_links .toggler .collapsed_items.expanded_items",
        { autoAlpha: 0 },
        {
          autoAlpha: 1,
          ease: "power3.inOut",
          duration: 0.3,
        },
        0.15
      );
    reAnimate ? tl2.current?.play() : tl2.current?.reverse();
  }, [reAnimate]);

  return (
    <div className={`sidemenu_wrapper ${expanded && "expanded"} ${(pathname == "/auth/login" || pathname == "/auth/forgot-password") && "hide_sidebar"}`} ref={el}
>
      <div className="logo_expand_container">
        <div className="logo_container">
          <div className="flag_label">
            <div className="flag_label">
              {logo}
            </div>
          </div>
        </div>

      </div>
      <ul className="nav_links">
        <ActiveSideMenuAccordionContextProvider>
          <TogglerNavLink key={"branchesLinks"} links={branchesLinks} />
          <TogglerNavLink key={"categoryLinks"} links={categoryLinks} />
          {/* <TogglerNavLink key={"productLinks"} links={productLinks} /> */}
          <SingleNavLinks links={usersLinks}/>
        </ActiveSideMenuAccordionContextProvider>
      </ul>
    </div>
  );

};

export default SideMenu;