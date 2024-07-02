import { useEffect, useRef, useState } from "react";
// import { usePathname } from "next/navigation";
import gsap from "gsap";
// import ActiveSideMenuAccordionProvider from "@/app/contexts/activeSideMenuAccordionContext";
// import { sideMenuOpenIcon, AboutIcon, ArticlesIcons, CategoriesIcon, ClubRegistrationIcons, ClubsListIcon, ContactLinksIcon, ContactUsIcon, ContactUsListIcon, CourtsIcon, NOCRegistrationIcons, NewsIcon, NewsletterListIcon, PlayersIcon, PlayersListIcon, SponsorsIcon, TeamsListIcon, TermsAndCondIcon, TournamentIcon, TournamentRequestsIcon, TournamentsIcon, UsersIcon, homeIcon, logo_flag_only, logo_label_only, settingsIcon, websiteIcon, CreateTournamentsIcon, ListTournamentsIcon, CalenderTournamentsIcon, Terms_Conditions } from "@/app/utils/variables";
// import useGsapContext from "../../utils/UseGsapContext";
// import SingleNavLinks from "./SingleNavLinks";



type NavLinks = {
  header: string;
  baseRoute?: string;
  headerIcon: JSX.Element;
  nestedLinks: NavLink;
};

type NavLink = {
  label: string;
  link: string;
  icon?: JSX.Element;
};

const SideMenu = () => {
//   const pathname = usePathname();

  const [expanded, setExpanded] = useState<boolean>(true);
  const [keepExpanded, setKeepExpanded] = useState<boolean>(true);
  const [hover, setHover] = useState<boolean>(false);

  const el = useRef<HTMLDivElement>(null);    
  const tl = useRef<gsap.core.Timeline>(gsap.timeline());
  const tl2 = useRef<gsap.core.Timeline>(gsap.timeline());

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

  const [reAnimate, setReAnimate] = useState<boolean>(false);

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
    <div></div>
  );

};

export default SideMenu;