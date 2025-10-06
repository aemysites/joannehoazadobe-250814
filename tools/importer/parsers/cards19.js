/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards19) block parsing
  // Header row as required
  const headerRow = ['Cards (cards19)'];
  const rows = [headerRow];

  // Card selector: each direct child div is a card
  const cardDivs = Array.from(element.children);

  cardDivs.forEach((cardDiv) => {
    // Each card has an icon (SVG in .icon > img) and a paragraph
    // Find the icon image
    const iconWrapper = cardDiv.querySelector('.icon');
    let iconImg = null;
    if (iconWrapper) {
      iconImg = iconWrapper.querySelector('img');
    }
    // Find the text content (the paragraph)
    const textPara = cardDiv.querySelector('p');
    // Defensive: if no icon or text, skip
    if (!iconImg && !textPara) return;
    // First cell: icon image (if present)
    // Second cell: paragraph (if present)
    const row = [iconImg || '', textPara || ''];
    rows.push(row);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
