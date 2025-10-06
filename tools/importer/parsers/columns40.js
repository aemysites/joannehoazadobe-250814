/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns40)'];

  // Get all immediate child divs (each is a column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract its main content (image)
  const columnCells = columns.map(col => {
    // Try to find the first image inside each column
    const img = col.querySelector('img');
    // If found, use the image element directly
    if (img) return img;
    // If no image, fallback to the column itself
    return col;
  });

  // Build the table rows: header row, then one row with all columns
  const rows = [headerRow, columnCells];

  // Create the block table
  const blockTable = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
