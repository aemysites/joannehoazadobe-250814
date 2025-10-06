/* global WebImporter */
export default function parse(element, { document }) {
  // Table (no header, tableNoHeader18) block
  // Header row must be exactly one column, as a string
  const headerRow = ['Table (no header, tableNoHeader18)'];
  const rows = [];

  // Get all direct children divs (each is a 'divider' block)
  const dividers = element.querySelectorAll(':scope > div');

  dividers.forEach(divider => {
    // Each divider contains a grid-layout div
    const grid = divider.querySelector('.w-layout-grid');
    if (!grid) return;
    // Each grid-layout has two children: question (heading), answer (rich-text)
    const children = grid.children;
    if (children.length < 2) return;
    const question = children[0];
    const answer = children[1];
    // Each row must be an array of two cells: question, answer
    rows.push([question, answer]);
  });

  // Compose the table: header row, then all rows
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
