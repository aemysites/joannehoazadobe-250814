/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: get direct children divs
  const container = element.querySelector('.container');
  const grid = container ? container.querySelector('.grid-layout') : null;
  const children = grid ? Array.from(grid.children) : [];

  // --- Extract Media (row 2) ---
  let mediaCell = [];
  const videoDiv = children.find((el) => el.classList.contains('utility-position-relative'));
  if (videoDiv) {
    const embedDiv = videoDiv.querySelector('.w-embed-youtubevideo');
    if (embedDiv) {
      // Add the placeholder image if present
      const img = embedDiv.querySelector('img[src]');
      if (img) {
        mediaCell.push(img.cloneNode(true));
      }
      // Convert iframe to link if present
      const iframe = embedDiv.querySelector('iframe[src]');
      if (iframe) {
        const link = document.createElement('a');
        link.href = iframe.src;
        link.textContent = iframe.src;
        mediaCell.push(link);
      }
    }
  }
  if (!mediaCell.length) mediaCell = [''];

  // --- Extract Content (row 3) ---
  // Only use the visible headline, not the screen-reader-only one
  let heading = '';
  const headingDiv = children.find((el) => el.classList.contains('h1-heading'));
  if (headingDiv) {
    const h1 = document.createElement('h1');
    h1.textContent = headingDiv.textContent.trim();
    heading = h1;
  }

  // Subheading
  let subheading = '';
  const subheadingDiv = children.find((el) => el.querySelector('p.subheading'));
  if (subheadingDiv) {
    const p = subheadingDiv.querySelector('p.subheading');
    if (p) {
      subheading = p.cloneNode(true);
    }
  }

  // CTA buttons
  let ctaGroup = '';
  const buttonDiv = children.find((el) => el.classList.contains('button-group'));
  if (buttonDiv) {
    ctaGroup = buttonDiv.cloneNode(true);
  }

  // Compose content cell (row 3)
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (subheading) contentCell.push(subheading);
  if (ctaGroup) contentCell.push(ctaGroup);
  if (!contentCell.length) contentCell.push('');

  // --- Table Construction ---
  const headerRow = ['Hero (hero25)'];
  const mediaRow = [mediaCell];
  const contentRow = [contentCell];

  const cells = [headerRow, mediaRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the block
  element.replaceWith(block);
}
