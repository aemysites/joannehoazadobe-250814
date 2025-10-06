/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards23) block parsing
  const tabPanes = Array.from(element.querySelectorAll('.w-tab-pane'));
  tabPanes.forEach(tabPane => {
    const grid = tabPane.querySelector('.w-layout-grid');
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll('a.utility-link-content-block'));
    if (!cards.length) return;

    // Always use the standard Cards (cards23) header
    const headerRow = ['Cards (cards23)'];
    const rows = [headerRow];

    cards.forEach(card => {
      let imgDiv = card.querySelector('.utility-aspect-3x2');
      let img = imgDiv ? imgDiv.querySelector('img.cover-image') : card.querySelector('img.cover-image');
      let heading = card.querySelector('h3, .h4-heading');
      let desc = card.querySelector('.paragraph-sm');
      const textCell = [];
      if (heading) textCell.push(heading);
      if (desc) textCell.push(desc);
      // Always output two columns: image cell (may be empty), text cell
      rows.push([img || '', textCell]);
    });

    const table = WebImporter.DOMUtils.createTable(rows, document);
    grid.parentNode.replaceChild(table, grid);
  });
}
