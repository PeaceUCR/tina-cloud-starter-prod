import * as React from "react";
import { Section } from "../layout/section";
import { useTheme } from "../layout";
import type { TinaTemplate } from "tinacms";
import { PageBlocksFeatureProducts } from "../../tina/__generated__/types";
import FeaturedProductsComponent from "../FeaturedProducts/FeaturedProductsComponent";


export const FeatureProducts = ({ data }: { data: PageBlocksFeatureProducts }) => {
  return (
    <Section color={data.color}>
      <FeaturedProductsComponent config={data}/>
    </Section>
  );
};

export const featureProductsBlockSchema: TinaTemplate = {
  name: "featureProducts",
  label: "FeatureProducts",
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
    }
  ],
};
