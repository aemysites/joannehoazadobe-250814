/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards35) block: grid of cards with image and text columns
  const headerRow = ['Cards (cards35)'];

  // Find all card containers (each is a div.utility-aspect-1x1 with an img)
  const cardDivs = Array.from(element.querySelectorAll('.utility-aspect-1x1'));

  // Each card row: [image, empty string for text cell]
  const rows = cardDivs.map((cardDiv) => {
    const img = cardDiv.querySelector('img');
    if (img) {
      return [img, ''];
    }
    return null;
  }).filter(Boolean);

  // Compose the table: header + card rows
  const tableCells = [headerRow, ...rows];
  const blockTable = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace the original element with the new block table
  element.replaceWith(blockTable);
}
