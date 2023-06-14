import { FC } from "react";
import dayjs from "dayjs";
import DiscordIcon from "@/assets/discord.svg";
import TwitterIcon from "@/assets/twitter.svg";
import BlogIcon from "@/assets/blog.svg";
import TelegramIcon from "@/assets/telegram.svg";
import RedditIcon from "@/assets/reddit.svg";
import YoutubeIcon from "@/assets/youtube.svg";
import ForumIcon from "@/assets/forum.svg";

const year = dayjs().year();

const FOOTER_PLAIN_LINKS = {
  foundation: {
    title: "Foundation",
    links: [
      {
        title: "About Us",
        href: "https://www.nervos.org",
      },
    ],
  },
  developer: {
    title: "Developer",
    links: [
      {
        title: "Docs",
        href: "https://docs.nervos.org",
      },
      {
        title: "Github",
        href: "https://github.com/nervosnetwork",
      },
      {
        title: "Whitepaper",
        href: "https://github.com/nervosnetwork/rfcs/blob/master/rfcs/0002-ckb/0002-ckb.md",
      },
      {
        title: "CKB Explorer",
        href: "https://pudge.explorer.nervos.org/",
      },
      {
        title: "Submit Token Info",
        href: "mailto:ckb-explorer@nervosnet.com?subject=Submit%20Token%20Info&body=Title:%20Submit%20Token%20Information%0a%0d----------%20Submit%20sUDT%20Token%20Information%20----------%0a%0dType%20Script:%0a%0d%20%20%20%20Code%20Hash:%0a%0d%20%20%20%20Hash%20Type:%0a%0d%20%20%20%20Args:%0a%0dInformation:%0a%0d%20%20%20Display%20Name:%0a%0d%20%20%20UAN:%0a%0d%20%20%20Decimal:%208%20(default)%0a%0d%20%20%20Description:%0a%0d%20%20%20Website:%0a%0d%20%20%20Icon%20File:%20attachment%20(40%20x%2040)%0a%0d%20%20%20Other%20Info:%0a%0d%0a%0dRef:%0a%0d1.%20UAN:%20https://github.com/nervosnetwork/rfcs/pull/335%0a%0d----------%20Submit%20NRC%20721%20Factory%20Information%20----------%0a%0dInformation:%0a%0d%20%20%20Deployment%20Tx%20Hash:%20%0a%0d%20%20%20Contract%20Source%20Code:%20%0a%0d%20%20%20Other%20Info:%0a%0d",
      },
    ],
  },
};

const FOOTER_SOCIAL_LINKS = [
  {
    title: "Discord",
    icon: DiscordIcon,
    href: "https://discord.com/invite/FKh8Zzvwqa",
  },
  {
    title: "Twitter",
    icon: TwitterIcon,
    href: "https://twitter.com/nervosnetwork",
  },
  {
    title: "Blog",
    icon: BlogIcon,
    href: "https://medium.com/nervosnetwork",
  },
  {
    title: "Telegram",
    icon: TelegramIcon,
    href: "https://t.me/nervosnetwork",
  },
  {
    title: "Reddit",
    icon: RedditIcon,
    href: "https://www.reddit.com/r/NervosNetwork/",
  },
  {
    title: "Youtube",
    icon: YoutubeIcon,
    href: "https://www.youtube.com/channel/UCONuJGdMzUY0Y6jrPBOzH7A",
  },
  {
    title: "Forum",
    icon: ForumIcon,
    href: "https://talk.nervos.org/",
  },
];

const renderFooterLinks = ({
  title,
  links,
}: (typeof FOOTER_PLAIN_LINKS)["foundation"]) => (
  <div className={`flex flex-col`}>
    <h4 className="font-medium text-[26px] leading-[30px] sm:text-2xl mb-6">
      {title}
    </h4>
    <ul className="w-full">
      {links.map(({ title, href }, index) => (
        <li
          key={index}
          className="flex flex-col text-gray-400 hover:text-purple transition-all  mb-4"
        >
          <a href={href} ref="noopener noreferrer" target="_blank">
            {title}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export const Footer: FC = () => {
  return (
    <footer className="text-white flex flex-col items-center mt-1 h-[680px] sm:h-[354px] w-full bg-black pb-4 px-5 pt-8 sm:px-11 sm:pt-11">
      <div className="flex flex-wrap flex-1 w-full max-w-[1086px]">
        {renderFooterLinks(FOOTER_PLAIN_LINKS.foundation)}

        <div className="flex w-full sm:w-auto sm:flex-1 sm:justify-center">
          {renderFooterLinks(FOOTER_PLAIN_LINKS.developer)}
        </div>

        <div className="grid grid-rows-2 grid-cols-4 sm:grid-rows-3 sm:grid-cols-3 gap-x-10 gap-y-5 h-[148px] sm:w-[188px] sm:h-[214px]">
          {FOOTER_SOCIAL_LINKS.map(({ title, icon: Icon, href }, index) => (
            <a
              key={index}
              href={href}
              ref="noopener noreferrer"
              target="_blank"
              className="flex flex-col text-gray-75 hover:text-purple transition-all h-[58px] w-[36px] items-center"
            >
              <Icon />
              <span className="mt-2 text-xs">{title}</span>
            </a>
          ))}
        </div>
      </div>
      <p className="text-xs self-start leading-5 sm:leading-[14px] sm:self-center text-gray-400 text-center w-[200px] sm:w-fit">
        Copyright © {year} Nervos Foundation. All Rights Reserved.
      </p>
    </footer>
  );
};
