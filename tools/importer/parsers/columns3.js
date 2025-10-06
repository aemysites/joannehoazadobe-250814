/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container (columns)
  const grid = element.querySelector('.w-layout-grid');
  if (!grid) return;

  // Get grid children (image and right column)
  const gridChildren = Array.from(grid.children);
  let leftCol = null;
  let rightCol = null;
  for (const gc of gridChildren) {
    if (gc.tagName === 'IMG') leftCol = gc;
    else rightCol = gc;
  }
  if (!leftCol || !rightCol) return;

  // Right column: extract heading, subheading, buttons
  const heading = rightCol.querySelector('h1');
  const subheading = rightCol.querySelector('p');
  const buttonGroup = rightCol.querySelector('.button-group');

  // Compose right column cell
  const rightColContent = [];
  if (heading) rightColContent.push(heading);
  if (subheading) rightColContent.push(subheading);
  if (buttonGroup) rightColContent.push(buttonGroup);

  // Table rows
  const headerRow = ['Columns (columns3)'];
  const contentRow = [leftCol, rightColContent];

  // Create table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  element.replaceWith(table);
}
