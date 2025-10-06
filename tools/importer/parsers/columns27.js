/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid layout
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;

  // Extract heading and quote
  const heading = grid.querySelector('p.h2-heading');
  const quote = grid.querySelector('p.paragraph-lg');

  // Extract the inner grid for profile and logo
  const innerGrids = grid.querySelectorAll('.w-layout-grid.grid-layout');
  // Use the second grid for profile/logo if present
  const innerGrid = innerGrids.length > 1 ? innerGrids[1] : innerGrids[0];

  // Divider (horizontal line)
  let divider = null;
  if (innerGrid) {
    divider = innerGrid.querySelector('.divider');
  }

  // Prepare profile cell (avatar + name + title)
  let profileCell = [];
  if (innerGrid) {
    const profileRow = innerGrid.querySelector('.flex-horizontal');
    if (profileRow) {
      const avatarImg = profileRow.querySelector('.avatar img');
      if (avatarImg) profileCell.push(avatarImg);
      const infoDivs = profileRow.querySelectorAll(':scope > div:not(.avatar) > div');
      infoDivs.forEach(div => profileCell.push(div));
    }
  }

  // Prepare logo cell
  let logoCell = [];
  if (innerGrid) {
    const logoWrap = innerGrid.querySelector('.utility-display-inline-block');
    if (logoWrap) {
      const logoImg = logoWrap.querySelector('img');
      if (logoImg) logoCell.push(logoImg);
    }
  }

  // Compose table rows
  const headerRow = ['Columns (columns27)'];
  const row1 = [heading, quote];
  // Divider row: single cell spanning both columns
  const rowDivider = [{ element: divider, colspan: 2 }];
  const row2 = [profileCell, logoCell];

  // Create columns table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    row1,
    rowDivider,
    row2
  ], document);

  element.replaceWith(table);
}
