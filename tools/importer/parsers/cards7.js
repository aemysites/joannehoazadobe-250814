/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards7) block: 2 columns, multiple rows. Each row: [image, text content]
  // 1. Header row
  const headerRow = ['Cards (cards7)'];

  // 2. Find card elements (each card is a direct child of the grid container)
  const cardDivs = Array.from(element.children);

  // 3. Build rows for each card (image only, no text content in source html)
  const rows = cardDivs.map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    const imageCell = img || document.createTextNode('');
    // No text content in source, so text cell is empty
    const textCell = document.createTextNode('');
    return [imageCell, textCell];
  });

  // 4. Compose table data
  const tableData = [headerRow, ...rows];

  // 5. Create table block
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // 6. Replace the original element with the block
  element.replaceWith(block);
}
