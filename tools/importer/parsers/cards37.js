/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards37) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards37)'];
  const rows = [headerRow];

  // Find the grid container holding all cards
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Defensive: get all direct children of grid
  const gridChildren = Array.from(grid.children);

  // --- First card: Large feature card (image, tag, heading, description) ---
  const firstCard = gridChildren.find(el => el.tagName === 'A');
  if (firstCard) {
    // Image (first cell)
    const imgWrap = firstCard.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
    const img = imgWrap ? imgWrap.querySelector('img') : null;
    // Text (second cell)
    const tag = firstCard.querySelector('.tag-group .tag');
    const heading = firstCard.querySelector('h3');
    const desc = firstCard.querySelector('p');
    // Compose text cell
    const textCell = document.createElement('div');
    if (tag) textCell.appendChild(tag);
    if (heading) textCell.appendChild(heading);
    if (desc) textCell.appendChild(desc);
    rows.push([
      img || '',
      textCell
    ]);
  }

  // --- Second row: Two smaller cards (each with image, tag, heading, description) ---
  // These are inside a flex-horizontal container (next grid child)
  const secondRowContainer = gridChildren.find(el => el.classList.contains('flex-horizontal'));
  if (secondRowContainer) {
    const cardLinks = Array.from(secondRowContainer.querySelectorAll('a.utility-link-content-block'));
    cardLinks.forEach(card => {
      const imgWrap = card.querySelector('.utility-aspect-1x1, .utility-aspect-3x2');
      const img = imgWrap ? imgWrap.querySelector('img') : null;
      const tag = card.querySelector('.tag-group .tag');
      const heading = card.querySelector('h3');
      const desc = card.querySelector('p');
      const textCell = document.createElement('div');
      if (tag) textCell.appendChild(tag);
      if (heading) textCell.appendChild(heading);
      if (desc) textCell.appendChild(desc);
      rows.push([
        img || '',
        textCell
      ]);
    });
  }

  // --- Third row: Text-only cards with heading and description, separated by dividers ---
  // These are inside the next flex-horizontal container
  const thirdRowContainer = gridChildren.find(el => el.classList.contains('flex-horizontal') && el !== secondRowContainer);
  if (thirdRowContainer) {
    // Each card is an <a> with heading and description
    const textCards = Array.from(thirdRowContainer.querySelectorAll('a.utility-link-content-block'));
    textCards.forEach(card => {
      // No image, so first cell is empty string
      const heading = card.querySelector('h3');
      const desc = card.querySelector('p');
      const textCell = document.createElement('div');
      if (heading) textCell.appendChild(heading);
      if (desc) textCell.appendChild(desc);
      rows.push([
        '',
        textCell
      ]);
    });
  }

  // Create table and replace element
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
