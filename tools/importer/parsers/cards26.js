/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns, multiple rows, first row is header
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];

  // Find all direct child divs that are likely cards (contain an image)
  const cardDivs = Array.from(element.children).filter(div =>
    div.querySelector('img')
  );

  cardDivs.forEach(card => {
    // Find the image (mandatory)
    const img = card.querySelector('img');
    // Defensive: skip if no image
    if (!img) return;

    // Find text content: look for heading and paragraph inside the card
    let textContent = null;
    const relDiv = card.querySelector('.utility-position-relative');
    if (relDiv) {
      // Look for a container with padding (holds text)
      const padDiv = relDiv.querySelector('.utility-padding-all-2rem');
      if (padDiv) {
        // Collect heading and paragraph if present
        const heading = padDiv.querySelector('h3');
        const para = padDiv.querySelector('p');
        const textEls = [];
        if (heading) textEls.push(heading);
        if (para) textEls.push(para);
        if (textEls.length) {
          // Wrap in a div for structure
          const textDiv = document.createElement('div');
          textDiv.append(...textEls);
          textContent = textDiv;
        }
      }
    }
    // If no heading/para, leave cell empty
    rows.push([
      img,
      textContent || ''
    ]);
  });

  // Create the block table and replace
  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
