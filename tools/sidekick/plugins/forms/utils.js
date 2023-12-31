/*
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable consistent-return, no-param-reassign */

import {
    createCopy,
    createTag, readBlockConfig, toCamelCase,
  } from '../../utils/dom.js';
  
  export function getLibraryMetadata(block) {
    const libraryMetadata = block.querySelector('.library-metadata');
    const metadata = {};
    if (libraryMetadata) {
      const meta = readBlockConfig(libraryMetadata);
      Object.keys(meta).forEach((key) => {
        if (key === 'style') return;
  
        metadata[toCamelCase(key)] = meta[key];
      });
      libraryMetadata.remove();
  
      return metadata;
    }
  }
  
  /**
   * Get the default library metadata for a document.
   * @param {*} document
   * @returns
   */
  export function getDefaultLibraryMetadata(document) {
    const defaultLibraryMetadataElement = document.querySelector(':scope > div > .library-metadata:only-child');
    if (defaultLibraryMetadataElement) {
      return getLibraryMetadata(defaultLibraryMetadataElement.parentElement);
    }
  
    return {};
  }
  
  export function getBlockName(block, includeVariants = true) {
    if (!block) return;
  
    const classes = block.className.split(' ');
    const name = classes.shift();
    if (!includeVariants) {
      return name;
    }
  
    // Remove the "sidekick-library" class or any empty classes
    const filteredClasses = classes.filter(blockClass => blockClass !== 'sidekick-library' && blockClass !== '');
    return filteredClasses.length > 0 ? `${name} (${filteredClasses.join(', ')})` : name;
  }
  
  export function getTable(block, name, path) {
    const url = new URL(path);
  
    block.querySelectorAll('span.icon').forEach((icon) => {
      const classNames = icon.className.split(' ');
  
      // Loop through each class
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < classNames.length; i++) {
        const className = classNames[i];
  
        // Check if the class starts with "icon-"
        if (className.startsWith('icon-')) {
          // Remove the "icon-" prefix
          const iconName = className.replace('icon-', '');
          // eslint-disable-next-line no-param-reassign
          icon.parentElement.textContent = `:${iconName}:`;
          break;
        }
      }
    });
    const rows = [...block.children];
    const maxCols = rows.reduce(
      (cols, row) => (row.children.length > cols ? row.children.length : cols),
      0,
    );
  
    const table = document.createElement('table');
    table.setAttribute('border', '1');
    table.setAttribute('style', 'width:100%;');
  
    const backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--sk-table-bg-color') || '#ff8012';
  
    const foregroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--sk-table-fg-color') || '#ffffff';
  
    const headerRow = document.createElement('tr');
    headerRow.append(createTag('td', { colspan: maxCols, style: `background-color: ${backgroundColor}; color: ${foregroundColor};` }, name));
    table.append(headerRow);
    rows.forEach((row) => {
      const columns = [...row.children];
      const tr = document.createElement('tr');
      columns.forEach((col) => {
        const columnWidthPercentage = (1 / columns.length) * 100;
        const td = document.createElement('td');
        if (row.children.length < maxCols) {
          td.setAttribute('colspan', maxCols);
        } else {
          td.setAttribute('style', `width: ${columnWidthPercentage}%`);
        }
  
        col.querySelectorAll('img').forEach((img) => {
          if (!img.src.includes('data:')) {
            const srcSplit = img.src.split('/');
            const mediaPath = srcSplit.pop();
            img.src = `${url.origin}/${mediaPath}`;
          }
  
          const maxWidth = Math.min(295, (columnWidthPercentage / 100) * 540);
          const originalWidth = img.width;
          const originalHeight = img.height;
  
          // Calculate the aspect ratio
          const aspectRatio = originalWidth / originalHeight;
  
          // Calculate the new width and height based on the maximum width
          let newWidth = maxWidth;
          let newHeight = newWidth / aspectRatio;
  
          // Check if the new height exceeds the maximum height
          if (newHeight > maxWidth) {
            newHeight = maxWidth;
            newWidth = newHeight * aspectRatio;
          }
  
          img.width = newWidth;
          img.height = newHeight;
        });
  
        td.innerHTML = col.innerHTML;
  
        tr.append(td);
      });
      table.append(tr);
    });
    return `${table.outerHTML}<br/>`;
  }
  
  export async function fetchBlock(path) {
    if (!window.blocks) {
      window.blocks = {};
    }
    if (!window.blocks[path]) {
      const resp = await fetch(`${path}.plain.html`);
      if (!resp.ok) return;
  
      const html = await resp.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      window.blocks[path] = doc;
    }
  
    return window.blocks[path];
  }
  
  export function parseDescription(description) {
    if (!description) return;
  
    return Array.isArray(description)
      ? description.map(item => `<p>${item}</p>`).join(' ')
      : description;
  }
  
  export function copyBlock(block, sectionMetadata) {
    const tables = [block];
  
    if (sectionMetadata) tables.push(sectionMetadata);
  
    try {
      const blob = new Blob(tables, { type: 'text/html' });
      createCopy(blob);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Unable to copy block', error);
    }
  }
  



  /*  FROM TAG PLUGIN
  *
 * Copyright 2023 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-param-reassign */

/**
 * Creates an HTML tag
 * @param {String} tag The tag to create
 * @param {Object} attributes The attributes to add to the tag
 * @param {Element} html An html element to set as it's content
 * @returns The new element
 */
/**
 * Create an element with the given id and classes.
 * @param {string} tagName the tag
 * @param {string[]|string} classes the class or classes to add
 * @param {object} props any other attributes to add to the element
 * @returns the element
 */
export function createElement(tagName, classes, props) {
  const elem = document.createElement(tagName);
  if (classes) {
    const classesArr = (typeof classes === 'string') ? [classes] : classes;
    elem.classList.add(...classesArr);
  }
  if (props) {
    Object.keys(props).forEach((propName) => {
      elem.setAttribute(propName, props[propName]);
    });
  }

  return elem;
}

/**
 * Copies to the clipboard
 * @param {Blob} blob The data
 */
export function createCopy(blob) {
  const data = [new ClipboardItem({ [blob.type]: blob })];
  navigator.clipboard.write(data);
}
