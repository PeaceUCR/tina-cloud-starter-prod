import { tinaField } from "tinacms/dist/react";
import { Page, PageBlocks } from "../../tina/__generated__/types";
import { Hero } from "./hero";
import { Content } from "./content";
import { Features } from "./features";
import { WebstoreHeader } from "./webstoreHeader";
import { WebstoreFooter } from "./webstoreFooter";
import { AppBanner } from "./appBanner";
import { FeatureProducts } from "./featureProducts";
import { LiveShows } from "./liveShows";
import { ShopByCollection } from "./shopByCollection";

export const Blocks = (props: Omit<Page, "id" | "_sys" | "_values">) => {
  return (
    <>
      {props.blocks
        ? props.blocks.map(function (block, i) {
            return (
              <div key={i} data-tina-field={tinaField(block)}>
                <Block {...block} />
              </div>
            );
          })
        : null}
    </>
  );
};

const Block = (block: PageBlocks) => {
  switch (block.__typename) {
    case "PageBlocksHero":
      return <Hero data={block} />;
    case "PageBlocksContent":
      return <Content data={block} />;
    case "PageBlocksFeatures":
      return <Features data={block} />;
    case "PageBlocksWebstoreHeader":
      return <WebstoreHeader data={block} />;
    case "PageBlocksFeatureProducts":
      return <FeatureProducts data={block} />;
    case "PageBlocksLiveShows":
      return <LiveShows data={block} />;
    case "PageBlocksShopByCollection":
      return <ShopByCollection data={block} />;
    case "PageBlocksAppBanner":
      return <AppBanner data={block} />;
    case "PageBlocksWebstoreFooter":
      return <WebstoreFooter data={block} />;
    default:
      return null;
  }
};
