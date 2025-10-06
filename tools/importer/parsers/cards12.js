/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards12) block
  const headerRow = ['Cards (cards12)'];
  const rows = [headerRow];

  // Find all direct child anchor elements (each is a card)
  const cardLinks = element.querySelectorAll('a.utility-link-content-block');

  cardLinks.forEach((card) => {
    // --- Image cell ---
    // Find the image inside the card
    const imgContainer = card.querySelector('.utility-aspect-2x3');
    const img = imgContainer ? imgContainer.querySelector('img') : null;
    // Defensive: If no image, skip this card
    if (!img) return;

    // --- Text cell ---
    // Tag and date row
    const metaRow = card.querySelector('.flex-horizontal');
    let tag = null, date = null;
    if (metaRow) {
      const tagDiv = metaRow.querySelector('.tag');
      const dateDiv = metaRow.querySelector('.paragraph-sm');
      tag = tagDiv ? tagDiv.cloneNode(true) : null;
      date = dateDiv ? dateDiv.cloneNode(true) : null;
    }
    // Title
    const title = card.querySelector('h3');
    // Compose text cell: tag, date, title
    const textCellContent = [];
    // Tag and date in a horizontal row
    if (tag || date) {
      const metaWrap = document.createElement('div');
      metaWrap.style.display = 'flex';
      metaWrap.style.gap = '0.5em';
      if (tag) metaWrap.appendChild(tag);
      if (date) metaWrap.appendChild(date);
      textCellContent.push(metaWrap);
    }
    // Title
    if (title) textCellContent.push(title);
    // Optionally, wrap all text cell content in a div
    const textCellDiv = document.createElement('div');
    textCellContent.forEach((el) => textCellDiv.appendChild(el));

    // Add card row: [image, text]
    rows.push([img, textCellDiv]);
  });

  // Create table block
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
