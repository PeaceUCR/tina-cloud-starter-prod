import * as React from "react";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import type { TinaTemplate } from "tinacms";
import { PageBlocksAppBanner } from "../../tina/__generated__/types";
import AppBannerComponent from "../AppBanner/AppBannerComponent";


export const AppBanner = ({ data }: { data: PageBlocksAppBanner }) => {
  const theme = useTheme();
  const headlineColorClasses = {
    blue: "from-blue-400 to-blue-600",
    teal: "from-teal-400 to-teal-600",
    green: "from-green-400 to-green-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
    purple: "from-purple-400 to-purple-600",
    orange: "from-orange-300 to-orange-600",
    yellow: "from-yellow-400 to-yellow-600",
  };

  return (
    <Section color={data.color}>
      <AppBannerComponent config={data}/>
    </Section>
  );
};

export const appBannerBlockSchema: TinaTemplate = {
  name: "appBanner",
  label: "AppBanner",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
      tagline: "Here's some text above the other text",
      headline: "This Big Text is Totally Awesome",
      text: "Phasellus scelerisque, libero eu finibus rutrum, risus risus accumsan libero, nec molestie urna dui a leo.",
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      name: "background",
      label: "Background",
      type: "image",
    },
    {
      type: "string",
      label: "GooglePlayLink",
      name: "googlePlayLink",
    },
    {
      type: "string",
      label: "AppStoreLink",
      name: "appStoreLink",
    },
  ],
};
