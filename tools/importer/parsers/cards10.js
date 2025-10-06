/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards10) block: 2 columns, first row is block name, subsequent rows are cards
  const headerRow = ['Cards (cards10)'];
  const rows = [headerRow];

  // Find all card elements (anchor tags with class 'card-link')
  const cardSelector = 'a.card-link';
  const cards = element.querySelectorAll(cardSelector);

  cards.forEach((card) => {
    // --- Image cell ---
    // Find the first image inside the card
    const image = card.querySelector('img');
    // Defensive: if no image, fallback to null
    const imageCell = image ? image : '';

    // --- Text cell ---
    // Find the tag (badge)
    const tag = card.querySelector('.tag');
    // Find the heading (h3)
    const heading = card.querySelector('h3, .h4-heading');
    // Find the description (paragraph)
    const description = card.querySelector('p');

    // Compose the text cell content
    const textCellContent = [];
    if (tag) textCellContent.push(tag);
    if (heading) textCellContent.push(heading);
    if (description) textCellContent.push(description);

    // Add the card row: [image, text content]
    rows.push([imageCell, textCellContent]);
  });

  // Create the table block
  const block = WebImporter.DOMUtils.createTable(rows, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
