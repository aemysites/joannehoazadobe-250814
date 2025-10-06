/* global WebImporter */
export default function parse(element, { document }) {
  // Row 1: Block name
  const headerRow = ['Hero (hero13)'];

  // --- Row 2: Background Image ---
  let backgroundImg = '';
  const gridChildren = Array.from(element.querySelectorAll(':scope > div'));
  if (gridChildren[0]) {
    const bgImg = gridChildren[0].querySelector('img');
    if (bgImg) backgroundImg = bgImg.cloneNode(true);
  }
  const row2 = [backgroundImg];

  // --- Row 3: Content (card overlay) ---
  let cardCell = [];
  if (gridChildren[1]) {
    // Card overlay
    const card = gridChildren[1].querySelector('.card');
    if (card) {
      // Card grid layout
      const cardGrid = card.querySelector('.grid-layout');
      if (cardGrid) {
        // Secondary image (concert crowd)
        const cardImg = cardGrid.querySelector('img[alt*="concert crowd"]');
        if (cardImg) cardCell.push(cardImg.cloneNode(true));

        // Find the column with the headline and content
        const textCol = Array.from(cardGrid.children).find(
          (c) => c.querySelector('h2')
        );
        if (textCol) {
          // Headline
          const headline = textCol.querySelector('h2');
          if (headline) cardCell.push(headline.cloneNode(true));

          // List items (icon + text)
          const verticalFlex = textCol.querySelector('.flex-vertical');
          if (verticalFlex) {
            Array.from(verticalFlex.children).forEach(child => {
              if (child.classList && child.classList.contains('flex-horizontal')) {
                // icon + paragraph
                const icon = child.querySelector('.icon-small');
                const para = child.querySelector('p');
                const div = document.createElement('div');
                if (icon) div.appendChild(icon.cloneNode(true));
                if (para) div.appendChild(para.cloneNode(true));
                cardCell.push(div);
              } else if (child.classList && child.classList.contains('divider')) {
                cardCell.push(document.createElement('hr'));
              }
            });
          }

          // CTA Button
          const buttonGroup = textCol.querySelector('.button-group');
          if (buttonGroup) {
            const button = buttonGroup.querySelector('a');
            if (button) cardCell.push(button.cloneNode(true));
          }
        }
      }
    }
  }
  // If cardCell is still empty, fallback: extract all text content from card overlay
  if (cardCell.length === 0 && gridChildren[1]) {
    const fallbackText = gridChildren[1].textContent.trim();
    if (fallbackText) cardCell.push(fallbackText);
  }
  const row3 = [cardCell.length ? cardCell : ''];

  // Compose table
  const cells = [headerRow, row2, row3];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
