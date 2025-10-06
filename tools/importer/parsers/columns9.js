/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // Identify left column (text) and right column (contact info)
  const textCol = gridChildren.find(child => child.querySelector('h2, h3, p'));
  const contactCol = gridChildren.find(child => child.tagName === 'UL');
  const image = gridChildren.find(child => child.tagName === 'IMG');

  // Defensive fallback: If not found, don't proceed
  if (!textCol || !contactCol || !image) return;

  // Compose left column: all content in textCol
  const leftContent = [];
  const eyebrow = textCol.querySelector('h2');
  if (eyebrow) leftContent.push(eyebrow);
  const heading = textCol.querySelector('h3');
  if (heading) leftContent.push(heading);
  const subheading = textCol.querySelector('p');
  if (subheading) leftContent.push(subheading);

  // Compose right column: all contact methods
  const contactItems = Array.from(contactCol.querySelectorAll('li')).map(li => li);

  // Build the table rows
  const headerRow = ['Columns (columns9)'];
  const contentRow = [leftContent, contactItems]; // two columns

  // Image row: must have same number of columns as contentRow
  // Place image in first cell, second cell empty
  const imgClone = image.cloneNode(true);
  if (image.alt) imgClone.alt = image.alt;
  const imageCell = document.createElement('div');
  imageCell.appendChild(imgClone);
  if (image.alt) {
    const altDiv = document.createElement('div');
    altDiv.textContent = image.alt;
    imageCell.appendChild(altDiv);
  }
  const imageRow = [imageCell, '']; // two columns

  const cells = [
    headerRow,
    contentRow,
    imageRow
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
