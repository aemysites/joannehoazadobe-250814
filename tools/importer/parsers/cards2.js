/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Extract text content from a card block
  function extractCardContent(card) {
    // Find image (mandatory)
    const img = card.querySelector('img');
    // Find heading (h2, h3, h4)
    const heading = card.querySelector('h2, h3, h4');
    // Find description (first <p>)
    const desc = card.querySelector('p');
    // Find CTA (button or .button)
    let cta = card.querySelector('.button, button, a.button');
    // If CTA is a div, convert to a button element for semantic clarity
    if (cta && cta.tagName === 'DIV') {
      const btn = document.createElement('button');
      btn.textContent = cta.textContent;
      cta = btn;
    }
    // Compose text cell
    const textCell = document.createElement('div');
    if (heading) textCell.appendChild(heading);
    if (desc) textCell.appendChild(desc);
    if (cta) textCell.appendChild(cta);
    return [img, textCell];
  }

  // Find the main grid containing cards
  const mainGrid = element.querySelector('.grid-layout');
  if (!mainGrid) return;

  // Prepare header row
  const headerRow = ['Cards (cards2)'];
  const rows = [headerRow];

  // Get all immediate card containers (anchor tags)
  // The first child is a large card, followed by a nested grid of smaller cards
  const children = Array.from(mainGrid.children);

  // First card (feature card)
  const firstCard = children[0];
  if (firstCard && firstCard.matches('a')) {
    rows.push(extractCardContent(firstCard));
  }

  // Nested grid for remaining cards
  const nestedGrid = children.find(
    (el) => el.classList.contains('grid-layout') && el !== firstCard
  );
  if (nestedGrid) {
    // Each card is an anchor tag
    const nestedCards = Array.from(nestedGrid.querySelectorAll('a'));
    nestedCards.forEach((card) => {
      rows.push(extractCardContent(card));
    });
  }

  // Replace the original element with the block table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
