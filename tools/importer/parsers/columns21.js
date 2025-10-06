/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout inside the footer
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children (columns) of the grid
  const columns = Array.from(grid.children);

  // Build the header row
  const headerRow = ['Columns (columns21)'];

  // Build the columns row (second row)
  // Each column is a cell, containing all its content
  const contentRow = columns.map((col) => col);

  // Compose the table
  const cells = [headerRow, contentRow];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
