/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: single cell with block name, as a <td> (not <th>), matching markdown example
  const headerRow = [document.createTextNode('Accordion (accordion17)')];

  // Find all accordion items (each .w-dropdown is an item)
  const accordionItems = Array.from(element.querySelectorAll('.w-dropdown'));

  // Build rows for each accordion item
  const rows = accordionItems.map((item) => {
    // Title: find the toggle element with role="button" (or .w-dropdown-toggle)
    const toggle = item.querySelector('[role="button"], .w-dropdown-toggle');
    // The actual title text is usually in a child div with class .paragraph-lg
    let titleEl = toggle && toggle.querySelector('.paragraph-lg');
    // Fallback: use the toggle itself if no child found
    if (!titleEl && toggle) titleEl = toggle;

    // Content: find the dropdown content area (nav.accordion-content or .w-dropdown-list)
    const contentNav = item.querySelector('nav.accordion-content, .w-dropdown-list');
    // The actual content is usually inside a .w-richtext or similar
    let contentEl = contentNav && contentNav.querySelector('.w-richtext');
    // Fallback: use the contentNav itself if no child found
    if (!contentEl && contentNav) contentEl = contentNav;

    // Defensive: if either title or content missing, use empty div
    const titleCell = titleEl || document.createElement('div');
    const contentCell = contentEl || document.createElement('div');
    return [titleCell, contentCell];
  });

  // Compose the final table data
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Fix header row: force <td> instead of <th> for the header row
  const firstRow = block.querySelector('tr');
  if (firstRow && firstRow.children.length === 1) {
    const th = firstRow.querySelector('th');
    if (th) {
      const td = document.createElement('td');
      td.innerHTML = th.innerHTML;
      th.replaceWith(td);
    }
  }

  // Replace the original element with the block table
  element.replaceWith(block);
}
