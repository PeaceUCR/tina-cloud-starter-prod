import * as React from "react";
import { Section } from "../layout/section";
import type { TinaTemplate } from "tinacms";
import { PageBlocksAppBanner } from "../../tina/__generated__/types";
import AppBannerComponent from "../AppBanner/AppBannerComponent";


export const AppBanner = ({ data }: { data: PageBlocksAppBanner }) => {

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
