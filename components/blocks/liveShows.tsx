import * as React from "react";
import { Section } from "../util/section";
import { useTheme } from "../layout";
import type { TinaTemplate } from "tinacms";
import { PageBlocksLiveShows } from "../../tina/__generated__/types";
import ShopLiveHomeComponent from "../ShopLiveHome/ShopLiveHomeComponent";


export const LiveShows = ({ data }: { data: PageBlocksLiveShows }) => {
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
      <ShopLiveHomeComponent config={data}/>
    </Section>
  );
};

export const liveShowsBlockSchema: TinaTemplate = {
  name: "liveShows",
  label: "LiveShows",
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
