"use client";
import * as React from "react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import type { Template } from "tinacms";
import { PageBlocksHero } from "../../tina/__generated__/types";
import { tinaField } from "tinacms/dist/react";
import Image from "next/image";
import { Section } from "../layout/section";
import { Container } from "../layout/container";
import { Actions } from "./actions";
import MermaidElement from "../mermaid-renderer";

export const Hero = ({ data }: { data: PageBlocksHero }) => {

  return (
    <Section
    >
      <div
        data-tina-field={tinaField(data.image, "src")}
        // style={{
        //   padding: '2px 2px',
        //   background: 'white'
        // }}
      >
        <img
          src={data.image && data.image.src ? data.image.src : "/signIn.jpg"}
          alt="Buy Social"
          className="inset-0 h-700 w-full object-cover"
        />
      </div>
    </Section>
  );
};

export const heroBlockSchema: Template = {
  name: "hero",
  label: "Hero",
  ui: {
    previewSrc: "/blocks/hero.png",
    defaultItem: {
    },
  },
  fields: [
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
