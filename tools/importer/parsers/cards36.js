/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards36) block: header row is single cell, each card row is two cells (image, text)
  const headerRow = ['Cards (cards36)'];

  // Select all immediate child divs (each card container)
  const cardDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each card, extract the image (mandatory) and an empty cell for text
  const rows = cardDivs.map(cardDiv => {
    const img = cardDiv.querySelector('img');
    // Always two columns per row: image, text (empty)
    return img ? [img, ''] : null;
  }).filter(Boolean);

  // Build table data: header + card rows
  const tableData = [headerRow, ...rows];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableData, document);

  // Replace the original element with the block table
  element.replaceWith(block);
}
