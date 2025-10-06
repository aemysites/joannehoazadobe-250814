/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid containing the carousel images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Find all immediate children that contain an image
  const imageContainers = Array.from(grid.children);

  // Build the table rows
  const rows = [];
  // Header row as required
  rows.push(['Carousel (carousel16)']);

  // For each image container, extract the image
  imageContainers.forEach((container) => {
    // Find the image inside the nested structure
    const img = container.querySelector('img');
    if (img) {
      // Each slide: image in first cell, empty second cell (required two-column structure)
      rows.push([img, '']);
    }
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
