import * as React from "react";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import type { TinaTemplate } from "tinacms";
import { PageBlocksWebstoreFooter } from "../../tina/__generated__/types";
import FooterComponent from "../Footer/FooterComponent";


export const WebstoreFooter = ({ data }: { data: PageBlocksWebstoreFooter }) => {
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
      <FooterComponent config={data}/>
    </Section>
  );
};

export const webstoreFooterBlockSchema: TinaTemplate = {
  name: "webstoreFooter",
  label: "WebstoreFooter",
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
      label: "List 1 Label",
      name: "list1Label",
    },
    {
      type: "string",
      label: "List 2 Label",
      name: "list2Label",
    },
    {
      type: "string",
      label: "List 3 Label",
      name: "list3Label",
    },
    {
      type: "string",
      label: "Connect Label",
      name: "connectLabel",
    },
    {
      type: "string",
      label: "Connect Description",
      name: "connectDescription",
    },
    {
      type: "string",
      label: "Connect Action",
      name: "connectAction",
    },
    {
      type: "string",
      label: "Copyright",
      name: "copyright",
    },
    {
      type: "object",
      list: true,
      label: "List 1",
      name: "list1",
      fields: [
        {
          name: "label",
          label: "Label",
          type: "string",
        },
        {
          name: "link",
          label: "Link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      list: true,
      label: "List 2",
      name: "list2",
      fields: [
        {
          name: "label",
          label: "Label",
          type: "string",
        },
        {
          name: "link",
          label: "Link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      list: true,
      label: "List 3",
      name: "list3",
      fields: [
        {
          name: "label",
          label: "Label",
          type: "string",
        },
        {
          name: "link",
          label: "Link",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      list: true,
      label: "Social Icons",
      name: "socialIcons",
      fields: [
        {
          name: "src",
          label: "Image",
          type: "image",
        },
        {
          name: "link",
          label: "Link",
          type: "string",
        },
      ],
    },
  ],
};
