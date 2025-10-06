/* global WebImporter */
export default function parse(element, { document }) {
  // Always use block name as header
  const headerRow = ['Columns (columns4)'];

  // Defensive: Find the grid layout container (the actual columns)
  const grid = element.querySelector('.grid-layout');
  let leftCol, rightCol;
  if (grid) {
    // Get direct children of grid (should be two columns)
    const cols = Array.from(grid.children);
    // Defensive: fallback if not exactly two columns
    leftCol = cols[0] || document.createElement('div');
    rightCol = cols[1] || document.createElement('div');
  } else {
    // Fallback: treat first and second child of container as columns
    const container = element.querySelector('.container');
    const cols = container ? Array.from(container.children) : [];
    leftCol = cols[0] || document.createElement('div');
    rightCol = cols[1] || document.createElement('div');
  }

  // Compose the table rows
  const rows = [
    headerRow,
    [leftCol, rightCol],
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new table
  element.replaceWith(table);
}
