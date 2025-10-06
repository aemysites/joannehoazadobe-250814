/* global WebImporter */
export default function parse(element, { document }) {
  // Hero (hero6) block parsing
  // Table: 1 column, 3 rows
  // Row 1: block name
  // Row 2: background image (optional)
  // Row 3: heading, subheading, CTA(s)

  // Find the background image
  const imgEl = element.querySelector('img[src]');
  const bgImg = imgEl ? imgEl : '';

  // Extract only the content (heading, subheading, CTA), not the card wrapper
  let contentFrag = document.createDocumentFragment();
  const card = element.querySelector('.card');
  if (card) {
    // Heading
    const heading = card.querySelector('h1');
    if (heading) contentFrag.appendChild(heading.cloneNode(true));
    // Subheading
    const subheading = card.querySelector('p');
    if (subheading) contentFrag.appendChild(subheading.cloneNode(true));
    // Button group
    const btnGroup = card.querySelector('.button-group');
    if (btnGroup) contentFrag.appendChild(btnGroup.cloneNode(true));
  } else {
    // Fallback: try to find heading, subheading, buttons in the whole element
    const heading = element.querySelector('h1');
    if (heading) contentFrag.appendChild(heading.cloneNode(true));
    const subheading = element.querySelector('p');
    if (subheading) contentFrag.appendChild(subheading.cloneNode(true));
    const btnGroup = element.querySelector('.button-group');
    if (btnGroup) contentFrag.appendChild(btnGroup.cloneNode(true));
  }

  // Table rows
  const headerRow = ['Hero (hero6)'];
  const imageRow = [bgImg];
  const contentRow = [contentFrag];

  // Create block table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace original element with block
  element.replaceWith(block);
}
