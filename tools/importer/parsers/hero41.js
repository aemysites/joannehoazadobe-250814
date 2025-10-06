/* global WebImporter */
export default function parse(element, { document }) {
  // Table header row must match block name exactly
  const headerRow = ['Hero (hero41)'];

  // --- Extract background image ---
  // Find the image element (background)
  const bgImg = element.querySelector('img');
  // Reference the actual image element, not its src or alt
  const imageRow = [bgImg ? bgImg : ''];

  // --- Extract hero text content ---
  // Find the main heading (h1)
  const heading = element.querySelector('h1');

  // Find the subheading paragraph
  const subheading = element.querySelector('p');

  // Find the CTA button (anchor)
  const cta = element.querySelector('a');

  // Compose the content cell, preserving semantic order
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (cta) contentCell.push(cta);

  // If all are missing, ensure cell is not empty
  const contentRow = [contentCell.length ? contentCell : ''];

  // Create the block table
  const cells = [
    headerRow,
    imageRow,
    contentRow,
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
