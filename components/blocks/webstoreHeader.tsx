import * as React from "react";
import { Section } from "../layout/section";
import type { Template } from "tinacms";
import { PageBlocksWebstoreHeader } from "../../tina/__generated__/types";
import StoreNavigation from "../StoreNavigation/StoreNavigation";


export const WebstoreHeader = ({ data }: { data: PageBlocksWebstoreHeader }) => {
  return (
    <Section>
      <StoreNavigation config={data}/>
    </Section>
  );
};

export const webstoreHeaderBlockSchema: Template = {
  name: "webstoreHeader",
  label: "WebstoreHeader",
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
      label: "Topbar",
      name: "topbar",
    },
    {
      type: "string",
      label: "TopbarLink",
      name: "topbarLink",
    },
    {
      type: "object",
      label: "Logo",
      name: "logo",
      fields: [
        {
          name: "src",
          label: "Image Source",
          type: "image",
        },
        {
          name: "alt",
          label: "Alt Text",
          type: "string",
        },
      ],
    },

  ],
};
