/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row as required
  const headerRow = ['Hero (hero38)'];

  // Defensive: Get immediate children of the main block
  const section = element;
  const container = section.querySelector(':scope > .container');
  let grid = container ? container.querySelector(':scope > .grid-layout') : null;
  if (!grid) grid = container || section;
  const gridChildren = Array.from(grid.querySelectorAll(':scope > *'));

  // Find heading, subheading, and CTA
  let heading = null;
  let subheading = null;
  let cta = null;

  for (const child of gridChildren) {
    // Look for heading and subheading inside a div
    if (child.tagName === 'DIV') {
      heading = child.querySelector('h1,h2,h3,h4,h5,h6');
      subheading = child.querySelector('p, .subheading');
    }
    // Look for CTA (button link)
    if (child.tagName === 'A' && child.classList.contains('button')) {
      cta = child;
    }
  }

  // Second row: Background image (none in this case)
  const imageRow = ['']; // No image present

  // Third row: Content (heading, subheading, CTA)
  const content = [];
  if (heading) content.push(heading);
  if (subheading) content.push(subheading);
  if (cta) content.push(cta);
  const contentRow = [content];

  // Compose table rows
  const rows = [headerRow, imageRow, contentRow];

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace original element with block
  element.replaceWith(block);
}
