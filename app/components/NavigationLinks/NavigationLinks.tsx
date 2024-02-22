import React from "react";
import Link from "next/link";
import { siteLinks } from "../../utils/enums";

type NavigationLinksProps = {
  linkType?: siteLinks;
};

const siteLinksArray = [
  siteLinks.Home,
  siteLinks.Circles,
  siteLinks.Modes,
  siteLinks.Quiz,
];

const linkNames: Record<siteLinks, siteLinks[]> = {} as Record<
  siteLinks,
  siteLinks[]
>;

siteLinksArray.forEach(function populateLinkName(link): void {
  linkNames[link] = siteLinksArray.filter((otherLink) => otherLink !== link);
});

const hoverColors: string[] = [
  "hover:text-primary",
  "hover:text-secondary",
  "hover:text-accent",
];

const NavigationLinks: React.FC<NavigationLinksProps> = ({ linkType }) => {
  const linksToRender = linkType
    ? linkNames[linkType]
    : linkNames[siteLinks.Home];

  const renderLink = (
    linkName: siteLinks,
    index: number
  ): React.JSX.Element => {
    const isHomePage: boolean = linkName === siteLinks.Home;
    const linkPath: string = isHomePage ? "/" : `/${linkName.toLowerCase()}`;
    const linkClassName: string = `link ${hoverColors[index]}`;

    return (
      <li className="mr-4" key={linkName}>
        <Link href={linkPath} className={linkClassName}>
          {linkName}
        </Link>
      </li>
    );
  };

  return (
    <ul className="flex">
      {linksToRender.map((linkName, index) => renderLink(linkName, index))}
    </ul>
  );
};

export default NavigationLinks;
