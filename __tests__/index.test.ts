import { unified } from "unified";
import parse from "rehype-parse";
import stringify from "rehype-stringify";
import rehypeElementProperties, { Setting } from "../src";

describe(rehypeElementProperties, () => {
  test("replaces the property values", () => {
    // setup
    const html =
      '<img src="test1.png"><img src="test2.jpg" alt="Test"><p class="test">Test</p>';
    const setting: Setting = {
      img: [
        {
          name: "src",
          replacer: (value) => {
            if (typeof value !== "string") {
              return value;
            }

            return value.replace(/\.png$/, ".webp");
          },
        },
        {
          name: "alt",
          replacer: (value, properties) => {
            return value || properties?.src;
          },
        },
      ],
      p: [
        {
          name: "className",
          replacer: () => undefined,
        },
      ],
    };

    // exercise
    const actual = process(html, setting);

    // verify
    const expected =
      '<img src="test1.webp" alt="test1.webp">' +
      '<img src="test2.jpg" alt="Test">' +
      "<p>Test</p>";

    expect(actual).toBe(expected);
  });
});

// Helper methods

function process(html: string, setting: Setting): string {
  const processor = unified()
    .use(parse, { fragment: true })
    .use(rehypeElementProperties, setting)
    .use(stringify);

  const vFile = processor.processSync(html);

  return vFile.toString();
}
