import React from "react";
import type { Template } from "tinacms";
import { PageBlocksWebstoreHeader } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import StoreNavigation from "../StoreNavigation/StoreNavigation";
import { ColorPickerInput } from "../../tina/fields/color";

export const WebstoreHeader = ({ data }: { data: PageBlocksWebstoreHeader }) => {
  return (
    <Section color={data.color}>
      <StoreNavigation config={data}/>
    </Section>
  );
};

// TODO only this way replacement works
export const webstoreHeaderBlockSchema: Template = {
  name: "webstoreHeader",
  label: "WebstoreHeader",
  ui: {
    previewSrc: "/blocks/testimonial.png",
    defaultItem: {
      logo: {
        src: '/logo.svg',
        alt: 'BIy Social'
      },

      // TODO default value NOT working and image clickable ONLY when it has value!
      topbar: "This Big Text is Totally Awesome",
      color: 'white'
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
    {
      type: "string",
      label: "Color",
      name: "color",
      ui: {
        component: ColorPickerInput,
      },
    },
  ],
};
