/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
