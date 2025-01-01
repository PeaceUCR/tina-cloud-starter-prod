import * as React from "react";
import { Section } from "../layout/section";
import { useTheme } from "../layout";
import type { TinaTemplate } from "tinacms";
import { PageBlocksShopByCollection } from "../../tina/__generated__/types";
import ShopByCollectionComponent from "../ShopByCollection/ShopByCollectionComponent";


export const ShopByCollection = ({ data }: { data: PageBlocksShopByCollection }) => {

  return (
    <Section color={data.color}>
      <ShopByCollectionComponent config={data}/>
    </Section>
  );
};

export const shopByCollectionBlockSchema: TinaTemplate = {
  name: "shopByCollection",
  label: "ShopByCollection",
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
      type: "object",
      list: true,
      label: "Collections",
      name: "collections",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "string",
        },
        {
          name: "description",
          label: "Description",
          type: "string",
        },
        {
          name: "src",
          label: "Image",
          type: "image",
        },
        {
          name: "actionLink",
          label: "Action Link",
          type: "string",
        },
      ],
    },
  ],
};
