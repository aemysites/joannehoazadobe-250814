/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name as the header row
  const headerRow = ['Columns (columns33)'];

  // Defensive: Find the grid layout (columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid (should be image and text column)
  const columns = Array.from(grid.children);

  // Left column: image
  const img = columns.find(el => el.tagName === 'IMG');

  // Right column: text content container
  const rightCol = columns.find(el => el !== img);

  // Defensive: If either column missing, abort
  if (!img || !rightCol) return;

  // For the right column, gather all relevant content
  // Eyebrow (small label)
  const eyebrow = rightCol.querySelector('.eyebrow');
  // Tag (pill)
  const tag = rightCol.querySelector('.tag');
  // Main heading
  const heading = rightCol.querySelector('h2');
  // Metadata row (author, role, date)
  const metaRow = rightCol.querySelector('.flex-horizontal.flex-gap-xxs');

  // Compose right column content
  const rightColContent = [];
  if (eyebrow) rightColContent.push(eyebrow);
  if (tag) rightColContent.push(tag);
  if (heading) rightColContent.push(heading);
  if (metaRow) rightColContent.push(metaRow);

  // Table row: image in left cell, stacked text in right cell
  const secondRow = [img, rightColContent];

  // Build the table
  const cells = [headerRow, secondRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
