/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children of the main grid
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Find the two main columns: left (content), right (image)
  const columns = [];

  // Left column: nested grid with heading, paragraph, buttons
  const leftCol = mainGrid.querySelector('.container');
  if (leftCol) {
    // Gather heading, paragraph, and button group
    const heading = leftCol.querySelector('h2');
    const paragraph = leftCol.querySelector('.rich-text, .w-richtext');
    const buttonGroup = leftCol.querySelector('.button-group');
    // Compose left column cell
    const leftCellContent = [];
    if (heading) leftCellContent.push(heading);
    if (paragraph) leftCellContent.push(paragraph);
    if (buttonGroup) leftCellContent.push(buttonGroup);
    columns.push(leftCellContent);
  }

  // Right column: image
  const image = mainGrid.querySelector('img');
  if (image) {
    columns.push([image]);
  }

  // Table header row
  const headerRow = ['Columns (columns5)'];
  // Table content row (columns)
  const contentRow = columns;

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace original element
  element.replaceWith(table);
}
