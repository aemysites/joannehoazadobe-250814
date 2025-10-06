/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns28)'];

  // Defensive: Find the grid layout inside the section
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the immediate children of the grid (should be 2 columns)
  const cols = Array.from(grid.children);
  if (cols.length < 2) return;

  // Left column: all text and CTA
  const leftCol = cols[0];
  // Right column: image
  const rightCol = cols[1];

  // For left column, gather all its children as a single cell
  const leftCellContent = Array.from(leftCol.children);

  // For right column, use the image element directly
  const rightCellContent = [rightCol];

  // Build the table rows
  const rows = [
    headerRow,
    [leftCellContent, rightCellContent]
  ];

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
