"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faDragon,
  faGamepad,
  faFilm,
  faMicrochip,
  faFutbol,
  faMusic,
  faCoins,
  faBrain,
  faSatellite,
  faNewspaper,
  faCloudSun,
  faHeart,
  faSearch,
  faBars,
  faXmark,
  faSun,
  faMoon,
  faHouse,
  faLayerGroup,
  faCodeBranch,
  faBuilding,
  faBlog,
  faCircleInfo,
  faEnvelope,
  faCircleQuestion,
  faHeadset,
  faShieldHalved,
  faFileContract,
  faCookieBite,
  faTriangleExclamation,
  faSitemap,
  faChevronRight,
  faChevronLeft,
  faArrowUpRightFromSquare,
  faCopy,
  faCheck,
  faStar,
  faCodeCompare,
  faLock,
  faLockOpen,
  faGlobe,
  faTag,
  faShareNodes,
  faRocket,
  faUsers,
  faKey,
  faServer,
  faBolt,
  faMagnifyingGlass,
  faAnglesRight,
  faFire,
} from "@fortawesome/free-solid-svg-icons";
import { faGithub, faTwitter, faDiscord, faTelegram, faFacebook, faInstagram, faYoutube, faLinkedin, faReddit } from "@fortawesome/free-brands-svg-icons";

export const iconMap: Record<string, IconDefinition> = {
  faDragon,
  faGamepad,
  faFilm,
  faMicrochip,
  faFutbol,
  faMusic,
  faCoins,
  faBrain,
  faSatellite,
  faNewspaper,
  faCloudSun,
  faHeart,
  faSearch,
  faBars,
  faXmark,
  faSun,
  faMoon,
  faHouse,
  faLayerGroup,
  faCodeBranch,
  faBuilding,
  faBlog,
  faCircleInfo,
  faEnvelope,
  faCircleQuestion,
  faHeadset,
  faShieldHalved,
  faFileContract,
  faCookieBite,
  faTriangleExclamation,
  faSitemap,
  faChevronRight,
  faChevronLeft,
  faArrowUpRightFromSquare,
  faCopy,
  faCheck,
  faStar,
  faCodeCompare,
  faLock,
  faLockOpen,
  faGlobe,
  faTag,
  faShareNodes,
  faRocket,
  faUsers,
  faKey,
  faServer,
  faBolt,
  faMagnifyingGlass,
  faAnglesRight,
  faFire,
  faGithub,
  faTwitter,
  faDiscord,
  faTelegram,
  faFacebook,
  faInstagram,
  faYoutube,
  faLinkedin,
  faReddit,
};

export type IconName = keyof typeof iconMap;

export function Icon({
  name,
  className,
  size,
}: {
  name: IconName | string;
  className?: string;
  size?: number;
}) {
  const icon = iconMap[name] ?? faCircleInfo;
  return (
    <FontAwesomeIcon
      icon={icon}
      className={className}
      style={size ? { width: size, height: size } : undefined}
    />
  );
}
