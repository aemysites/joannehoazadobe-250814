/* global WebImporter */
export default function parse(element, { document }) {
  // Always start with the block name header
  const headerRow = ['Columns (columns31)'];

  // Defensive: Find the grid layout (the actual columns container)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);

  // There are three columns visually:
  // 1. Name (Taylor Brooks)
  // 2. Tags (Casual Vibes, Sporty Looks, Party Ready)
  // 3. Main content (Heading + Rich text)

  // Column 1: Name
  const col1 = columns[0]; // reference, not clone

  // Column 2: Tags (vertical stack)
  const col2 = columns[1]; // reference, not clone

  // Column 3: Heading + Rich text
  // Ensure both heading and rich text are included in the same cell
  const col3 = document.createElement('div');
  if (columns[2]) col3.appendChild(columns[2]); // h2
  if (columns[3]) col3.appendChild(columns[3]); // rich text paragraphs

  // Build the table row with three columns
  const contentRow = [col1, col2, col3];

  // Compose the table
  const cells = [headerRow, contentRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new table block
  element.replaceWith(table);
}
