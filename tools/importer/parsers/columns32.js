/* global WebImporter */
export default function parse(element, { document }) {
  // Always use the block name for the header row
  const headerRow = ['Columns (columns32)'];

  // Defensive: Find the grid layout container (the columns)
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get the direct children of the grid (these are the columns)
  const columns = Array.from(grid.children);
  if (columns.length < 2) return; // Expecting at least two columns

  // Left column: text content
  const leftCol = columns[0];
  // Right column: image
  const rightCol = columns[1];

  // Build left column content
  // We'll collect all main blocks from leftCol in order
  const leftContent = [];

  // Breadcrumbs (flex-horizontal)
  const breadcrumbs = leftCol.querySelector('.flex-horizontal');
  if (breadcrumbs) leftContent.push(breadcrumbs);

  // Heading
  const heading = leftCol.querySelector('h2');
  if (heading) leftContent.push(heading);

  // Author/date/read time (utility-margin-bottom-1rem)
  const meta = leftCol.querySelector('.utility-margin-bottom-1rem');
  if (meta) leftContent.push(meta);

  // Social icons (ul)
  const social = leftCol.querySelector('ul');
  if (social) leftContent.push(social);

  // Right column: image
  // Find the image element inside rightCol
  const imageWrapper = rightCol;
  let image = imageWrapper.querySelector('img');
  if (!image) {
    // fallback: maybe image is direct child
    image = imageWrapper.querySelector('img');
  }

  // Compose the table rows
  const contentRow = [
    leftContent,
    image ? image : ''
  ];

  // Create the table
  const cells = [
    headerRow,
    contentRow
  ];

  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element
  element.replaceWith(table);
}
