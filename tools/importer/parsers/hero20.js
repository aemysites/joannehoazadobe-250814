/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row
  const headerRow = ['Hero (hero20)'];

  // 2. Find the background image grid (collage)
  // The grid is inside: .ix-hero-scale-3x-to-1x > .grid-layout
  let backgroundImages = [];
  const grid = element.querySelector('.ix-hero-scale-3x-to-1x .grid-layout');
  if (grid) {
    // Get all immediate child divs with images
    const imageDivs = Array.from(grid.children).filter(div => div.querySelector('img'));
    backgroundImages = imageDivs.map(div => div.querySelector('img')).filter(Boolean);
  }
  // Defensive fallback: if not found, search for all images in the element
  if (backgroundImages.length === 0) {
    backgroundImages = Array.from(element.querySelectorAll('img'));
  }

  // Wrap all images in a div for the background cell
  const bgDiv = document.createElement('div');
  backgroundImages.forEach(img => bgDiv.appendChild(img));

  // 3. Find hero text content and CTA
  // The hero content is inside: .ix-hero-scale-3x-to-1x-content .container
  const heroContent = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  let title, subheading, ctaGroup;
  if (heroContent) {
    title = heroContent.querySelector('h1');
    subheading = heroContent.querySelector('p');
    ctaGroup = heroContent.querySelector('.button-group');
  }

  // Defensive fallback for missing elements
  // If not found, search for first h1 and p in the element
  if (!title) title = element.querySelector('h1');
  if (!subheading) subheading = element.querySelector('p');
  if (!ctaGroup) ctaGroup = element.querySelector('.button-group');

  // 4. Compose the content cell (row 3)
  const contentCell = [];
  if (title) contentCell.push(title);
  if (subheading) contentCell.push(subheading);
  if (ctaGroup) contentCell.push(ctaGroup);

  // 5. Build table rows
  const rows = [
    headerRow,
    [bgDiv],
    [contentCell]
  ];

  // 6. Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
