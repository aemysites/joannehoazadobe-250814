/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns8)'];

  // Find the grid container
  const grid = element.querySelector('.w-layout-grid');
  let leftCol, rightCol;

  if (grid) {
    // Get all direct children of the grid
    const children = Array.from(grid.children);
    // Left column: heading (h2)
    leftCol = children.find((el) => el.tagName === 'H2');
    // Right column: the div containing paragraph and button
    rightCol = children.find((el) => el.tagName === 'DIV');
  }

  // Defensive fallback if structure changes
  if (!leftCol) {
    leftCol = element.querySelector('h2');
  }
  if (!rightCol) {
    rightCol = element.querySelector('div:not(.w-layout-grid)');
  }

  // In rightCol, collect all children (paragraph and button)
  let rightColContent = [];
  if (rightCol) {
    rightColContent = Array.from(rightCol.children);
  }

  // Ensure both columns are present, even if empty
  const leftCell = leftCol || '';
  // If rightCol has children, pass as array; else, pass the div itself (for fallback)
  const rightCell = rightColContent.length > 0 ? rightColContent : (rightCol || '');

  // Build the table rows
  const cells = [
    headerRow,
    [leftCell, rightCell]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
