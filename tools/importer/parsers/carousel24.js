/* global WebImporter */
export default function parse(element, { document }) {
  // Carousel (carousel24) block parsing
  // Header row
  const headerRow = ['Carousel (carousel24)'];

  // Find the card body (contains text and image)
  const cardBody = element.querySelector('.card-body');
  let imageEl = null;
  let textContent = '';

  if (cardBody) {
    // Get image (mandatory)
    imageEl = cardBody.querySelector('img');
    // Get heading (optional)
    const headingEl = cardBody.querySelector('.h4-heading');
    // Compose text cell
    if (headingEl) {
      // Use <h2> for heading to match markdown example style
      const h2 = document.createElement('h2');
      h2.textContent = headingEl.textContent;
      textContent = h2;
    }
  }

  // Defensive: If image is missing, skip row
  if (!imageEl) return;

  // Compose rows: [image, text]
  const rows = [
    [imageEl, textContent]
  ];

  // Build table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace original element
  element.replaceWith(table);
}
