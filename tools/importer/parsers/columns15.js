/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns15)'];

  // Defensive: Find the grid container (the columns)
  const grid = element.querySelector('.grid-layout');
  // If grid not found, fallback to all direct children
  const columns = grid ? Array.from(grid.children) : Array.from(element.children);

  // Each column will be a cell in the second row
  const cells = columns.map((col) => {
    // If column contains only one child, use that child directly
    if (col.children.length === 1) {
      return col.children[0];
    }
    // Otherwise, return the column itself (preserves structure)
    return col;
  });

  // Compose the table rows
  const tableRows = [headerRow, cells];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableRows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
