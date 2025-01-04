import type { Collection } from "tinacms";
import { heroBlockSchema } from "../../components/blocks/hero";
import { contentBlockSchema } from "../../components/blocks/content";
import { webstoreHeaderBlockSchema } from "../../components/blocks/webstoreHeader";
import { featureBlockSchema } from "../../components/blocks/features";
import { appBannerBlockSchema } from "../../components/blocks/appBanner";
import { featureProductsBlockSchema } from "../../components/blocks/featureProducts";
import { liveShowsBlockSchema } from "../../components/blocks/liveShows";
import { shopByCollectionBlockSchema } from "../../components/blocks/shopByCollection";
import { webstoreFooterBlockSchema } from "../../components/blocks/webstoreFooter";

const Page: Collection = {
  label: "Pages",
  name: "page",
  path: "content/pages",
  ui: {
    router: ({ document }) => {
      if (document._sys.filename === "home") {
        return `/`;
      }
      if (document._sys.filename === "about") {
        return `/about`;
      }
      return undefined;
    },
  },
  fields: [
    {
      type: "string",
      label: "Title",
      name: "title",
      description:
        "The title of the page. This is used to display the title in the CMS",
      isTitle: true,
      required: true,
    },
    {
      type: "object",
      list: true,
      name: "blocks",
      label: "Sections",
      ui: {
        visualSelector: true,
      },
      templates: [
        heroBlockSchema,
        //@ts-ignore
        featureBlockSchema,
        contentBlockSchema,
        webstoreHeaderBlockSchema,
        appBannerBlockSchema,
        featureProductsBlockSchema,
        liveShowsBlockSchema,
        shopByCollectionBlockSchema,
        webstoreFooterBlockSchema
      ],
    },
  ],
};

export default Page;
