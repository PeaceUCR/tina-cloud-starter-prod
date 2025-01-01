import * as React from "react";
import { Container } from "../util/container";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { TinaTemplate } from "tinacms";
import { PageBlocksWebstoreTestComponent } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import StoreNavigation from "../StoreNavigation/StoreNavigation";
import AppBannerComponent from "../AppBanner/AppBannerComponent";
import FeaturedProductsComponent from "../FeaturedProducts/FeaturedProductsComponent";
import ShopLiveHomeComponent from "../ShopLiveHome/ShopLiveHomeComponent";
import ShopByCollectionComponent from "../ShopByCollection/ShopByCollectionComponent";
import FooterComponent from "../Footer/FooterComponent";


export const WebstoreTestComponent = ({ data }: { data: PageBlocksWebstoreTestComponent }) => {
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
      {/*<FooterComponent/>*/}
    </Section>
  );
};

export const webstoreTestComponentBlockSchema: TinaTemplate = {
  name: "webstoreTestComponent",
  label: "WebstoreTestComponent",
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
      label: "Tagline",
      name: "tagline",
    },
    {
      type: "string",
      label: "Headline",
      name: "headline",
    },
    {
      type: "object",
      label: "Image",
      name: "image",
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
