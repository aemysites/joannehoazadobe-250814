/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards34) block: 2 columns, multiple rows, each card = 1 row
  // Header row
  const headerRow = ['Cards (cards34)'];
  const rows = [headerRow];

  // Find all card anchors (each card is an <a> block)
  const cardLinks = Array.from(element.querySelectorAll('a.utility-link-content-block'));

  cardLinks.forEach((cardLink) => {
    // Each card's content is inside the anchor
    // Find the image (first img inside card)
    const img = cardLink.querySelector('img');
    // Find the card text container (the div after the image)
    const cardContent = cardLink.querySelector('img + div');

    // Defensive: If no image or content, skip
    if (!img || !cardContent) return;

    // Build the text cell content
    const textParts = [];

    // Tag and read time (in horizontal flex)
    const tagFlex = cardContent.querySelector('.flex-horizontal');
    if (tagFlex) {
      textParts.push(tagFlex);
    }

    // Title (h3)
    const heading = cardContent.querySelector('h3');
    if (heading) {
      textParts.push(heading);
    }

    // Description (p)
    const desc = cardContent.querySelector('p');
    if (desc) {
      textParts.push(desc);
    }

    // CTA ("Read") - last div inside cardContent
    // Find the last direct child div (not the flex or tag)
    const ctaDivs = Array.from(cardContent.querySelectorAll('div'));
    let cta = null;
    if (ctaDivs.length) {
      // The last div is usually the CTA
      cta = ctaDivs[ctaDivs.length - 1];
      // Defensive: Only include if it's not the flex/tag container
      if (cta && cta !== tagFlex && cta.textContent.trim().toLowerCase() === 'read') {
        // Wrap CTA text in a link to the card's href
        const ctaLink = document.createElement('a');
        ctaLink.href = cardLink.href;
        ctaLink.textContent = cta.textContent;
        textParts.push(ctaLink);
      }
    }

    // Add the row: [image, text content]
    rows.push([img, textParts]);
  });

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace the original element
  element.replaceWith(block);
}
