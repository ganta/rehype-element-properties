import type { Plugin, Transformer } from "unified";
import type { Element, Properties } from "hast";
import { visit } from "unist-util-visit";

type PickType<T, K extends keyof T> = T[K];
type PropertyValue = PickType<Properties, string>;

export type Setting = {
  [tagName: string]: Array<{
    name: string;
    replacer: (
      value: PropertyValue | undefined,
      properties?: Properties
    ) => PropertyValue;
  }>;
};

const rehypeElementProperties: Plugin<Setting[]> = (setting) => {
  const visitor = (node: Element) => {
    const { tagName } = node;

    if (!(tagName in setting)) {
      return;
    }

    if (node.properties === undefined) {
      node.properties = {};
    }

    const { properties } = node;

    setting[tagName].forEach(({ name, replacer }) => {
      properties[name] = replacer(properties[name], properties);
    });
  };

  const transformer: Transformer = (tree) => {
    visit(tree, "element", visitor);
  };

  return transformer;
};

export default rehypeElementProperties;
