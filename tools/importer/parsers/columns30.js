/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns (columns30)'];

  // Defensive: Get all immediate child divs (each column)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the main image (if present)
  const columnCells = columns.map(col => {
    // Try to find an <img> inside the column
    const img = col.querySelector('img');
    // If found, use the image element; otherwise, use the column itself
    return img ? img : col;
  });

  // Build the table rows: header + columns row
  const rows = [
    headerRow,
    columnCells
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
