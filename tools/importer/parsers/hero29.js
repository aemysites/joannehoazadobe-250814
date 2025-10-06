/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header row (block name)
  const headerRow = ['Hero (hero29)'];

  // 2. Background image row
  let imageCell = '';
  // Find the first image in the hero block
  const img = element.querySelector('img');
  if (img) {
    imageCell = img;
  }

  // 3. Content row: Heading, subheading, CTA
  let contentCell = '';
  // Find the main heading (h1)
  const heading = element.querySelector('h1');
  // Find subheading (h2/h3), if present
  const subheading = element.querySelector('h2, h3');
  // Find CTA (anchor/button), if present
  let cta = '';
  const buttonGroup = element.querySelector('.button-group');
  if (buttonGroup) {
    // Look for anchor or button inside button group
    const btn = buttonGroup.querySelector('a, button');
    if (btn) {
      cta = btn;
    }
  }

  // Compose content cell
  const contentParts = [];
  if (heading) contentParts.push(heading);
  if (subheading) contentParts.push(subheading);
  if (cta) contentParts.push(cta);
  if (contentParts.length) {
    contentCell = contentParts;
  }

  // Table rows
  const rows = [
    headerRow,
    [imageCell],
    [contentCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
