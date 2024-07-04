import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { sideMenuOpenIcon, AboutIcon, ArticlesIcons, CategoriesIcon, ClubRegistrationIcons, ClubsListIcon, ContactLinksIcon, ContactUsIcon, ContactUsListIcon, CourtsIcon, NOCRegistrationIcons, NewsIcon, NewsletterListIcon, PlayersIcon, PlayersListIcon, SponsorsIcon, TeamsListIcon, TermsAndCondIcon, TournamentIcon, TournamentRequestsIcon, TournamentsIcon, UsersIcon, homeIcon, logo_flag_only, logo_label_only, settingsIcon, websiteIcon, CreateTournamentsIcon, ListTournamentsIcon, CalenderTournamentsIcon, Terms_Conditions } from "../../../config/variables";
import ActiveSideMenuAccordionContextProvider from "../../../store/context/activeSideMenuAccordionContext";
import TogglerNavLink from "./TogglerNavLink";
import { useLocation } from "react-router-dom";


type NavLink = {
  label: string;
  link: string;
  icon?: JSX.Element;
};

const MobileMenu = ({openMenu,setMenu}:any) => {
  const {pathname} = useLocation();
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
        ".mobile-menu .nav_links .toggler .collapsed_items.expanded_items",
        { height: 0 },
        {
          height: "auto",
          ease: "power3.inOut",
          duration: 0.35,
        }
      )
      .fromTo(
        ".mobile-menu .nav_links .toggler .collapsed_items.expanded_items",
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

  const websiteLinks = {
    header: "Website",
    baseRoute: "/website",
    headerIcon: [websiteIcon],
    nestedLinks: [
      {
        label: "Home", link: "/website/home", icon: [homeIcon],
      },
      {
        label: "Tournaments", link: "/website/tournaments", icon: [TournamentsIcon]
      },
      {
        label: "Players", link: "/website/players", icon: [PlayersIcon]
      },
      { label: "About us", link: "/website/about-us", icon: [AboutIcon] },
      { label: "Contact us", link: "/website/contact-us", icon: [ContactUsIcon] },
      {
        label: "Courts", link: "/website/courts", icon: [CourtsIcon]
      },
      {
        label: "News", link: "/website/news", icon: [NewsIcon]
      },
      {
        label: "Tournament Registration", link: "/website/tournament-section", icon: [TournamentIcon]
      },
      {
        label: "Club Registration", link: "/website/club-registration", icon: [ClubRegistrationIcons]
      },
      {
        label: "NOC Registration", link: "/website/noc-registration", icon: [NOCRegistrationIcons]
      },
      {
        label: "Articles",
        // baseRoute: "/tournaments",
        link: "/articles",
        icon: [ArticlesIcons],
      }
    ]
  }

  return (
    <div className={`mobile-menu ${openMenu? "open":"close"}`}>
       <div className="logo_expand_container">
        <div className="logo_container">
          <div className="flag_label">
            {logo_flag_only}
          </div>
          <div className="pa_label label">
            {logo_label_only}
          </div>
        </div>
        <div className={`expand_btn label ${keepExpanded && "keep_expanded"}`}
          onClick={() => {
            setMenu(false)
          }}
        >
          {sideMenuOpenIcon}
        </div>

      </div>
      <ul className="nav_links">
        <ActiveSideMenuAccordionContextProvider>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/><TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
          <TogglerNavLink links={websiteLinks} reAnimate={reAnimate} customClass={"mobile-menu"}/>
        </ActiveSideMenuAccordionContextProvider>
      </ul>
    </div>
  );

};

export default MobileMenu;