/* global WebImporter */
export default function parse(element, { document }) {
  // Helper: Get immediate tab menu and tab content containers
  const tabMenu = element.querySelector('.w-tab-menu');
  const tabContent = element.querySelector('.w-tab-content');
  if (!tabMenu || !tabContent) return;

  // Extract tab labels (anchors inside tabMenu)
  const tabLinks = Array.from(tabMenu.querySelectorAll('a[role="tab"]'));
  // Extract tab panes (direct children of tabContent)
  const tabPanes = Array.from(tabContent.children).filter(
    (pane) => pane.classList.contains('w-tab-pane')
  );

  // Defensive: Only proceed if tab count matches pane count
  if (tabLinks.length !== tabPanes.length || tabLinks.length === 0) return;

  // Build table rows
  const rows = [];
  // Header row
  rows.push(['Tabs (tabs22)']);

  // For each tab, extract label and content
  tabLinks.forEach((tabLink, i) => {
    // Tab label: use the visible text inside the anchor
    let label = tabLink.textContent.trim();
    // Defensive: If label is empty, try innerText
    if (!label) label = tabLink.innerText.trim();
    // Tab content: use the entire tab pane element (reference, not clone)
    const contentPane = tabPanes[i];
    if (!contentPane) return;
    rows.push([label, contentPane]);
  });

  // Create block table
  const block = WebImporter.DOMUtils.createTable(rows, document);
  // Replace original element
  element.replaceWith(block);
}
