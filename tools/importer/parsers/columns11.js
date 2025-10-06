/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get immediate children divs
  const topGrids = element.querySelectorAll(':scope > div > .grid-layout');
  // Defensive: fallback if structure changes
  let leftCol, rightCol;
  if (topGrids.length) {
    // First grid: headline/eyebrow (left), description/meta/button (right)
    const mainGrid = topGrids[0];
    const mainCols = mainGrid.querySelectorAll(':scope > div');
    leftCol = mainCols[0];
    rightCol = mainCols[1];
  }

  // Second grid: images
  let imagesRow;
  const bottomGrid = element.querySelector('.mobile-portrait-1-column.grid-layout');
  if (bottomGrid) {
    imagesRow = Array.from(bottomGrid.querySelectorAll(':scope > div'));
  }

  // --- Compose left column (headline/eyebrow) ---
  let leftColContent = [];
  if (leftCol) {
    // Eyebrow
    const eyebrow = leftCol.querySelector('.eyebrow');
    if (eyebrow) leftColContent.push(eyebrow);
    // Headline
    const headline = leftCol.querySelector('h1');
    if (headline) leftColContent.push(headline);
  }

  // --- Compose right column (description/meta/button) ---
  let rightColContent = [];
  if (rightCol) {
    // Paragraph
    const para = rightCol.querySelector('.rich-text p');
    if (para) rightColContent.push(para);
    // Author block
    const avatarBlock = rightCol.querySelector('.flex-horizontal.y-center');
    if (avatarBlock) rightColContent.push(avatarBlock);
    // Button
    const button = rightCol.querySelector('a.button');
    if (button) rightColContent.push(button);
  }

  // --- Compose images row ---
  let imageCells = [];
  if (imagesRow && imagesRow.length) {
    imagesRow.forEach(div => {
      const img = div.querySelector('img');
      if (img) imageCells.push(img);
    });
  }

  // Table structure:
  // [Header]
  // [LeftCol, RightCol]
  // [Image1, Image2]
  const headerRow = ['Columns (columns11)'];
  const contentRow = [leftColContent, rightColContent];
  const imagesRowArr = imageCells.length === 2 ? [imageCells[0], imageCells[1]] : imageCells;

  const cells = [
    headerRow,
    contentRow,
    imagesRowArr
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
