/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block table
  const headerRow = ['Columns (columns39)'];

  // Defensive: get the main grid layout (two columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Left column: text content (heading, subheading, buttons)
  const leftCol = grid.children[0];
  // Right column: images grid
  const rightCol = grid.children[1];

  // Compose left column cell
  const leftContent = [];
  // Heading
  const heading = leftCol.querySelector('h1');
  if (heading) leftContent.push(heading);
  // Subheading/paragraph
  const subheading = leftCol.querySelector('p');
  if (subheading) leftContent.push(subheading);
  // Button group
  const buttonGroup = leftCol.querySelector('.button-group');
  if (buttonGroup) leftContent.push(buttonGroup);

  // Compose right column cell: all images grouped in a div
  const imagesGrid = rightCol.querySelector('.grid-layout');
  let imagesDiv = null;
  if (imagesGrid) {
    imagesDiv = document.createElement('div');
    Array.from(imagesGrid.querySelectorAll('img')).forEach(img => {
      imagesDiv.appendChild(img.cloneNode(true));
    });
  }

  // Table structure: first row is header, second row has two columns (text, images)
  const cells = [
    headerRow,
    [leftContent, imagesDiv]
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the new block table
  element.replaceWith(block);
}
