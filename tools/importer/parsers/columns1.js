/* global WebImporter */
export default function parse(element, { document }) {
  // Extract all images inside the grid
  const images = Array.from(element.querySelectorAll('img'));

  // For each image, create an <img> element with its attributes
  const contentRow = images.map(img => {
    const newImg = document.createElement('img');
    newImg.src = img.src;
    newImg.alt = img.alt || '';
    if (img.width) newImg.width = img.width;
    if (img.height) newImg.height = img.height;
    return newImg;
  });

  // Table header row
  const headerRow = ['Columns (columns1)'];

  // Create the block table with one header row and one content row (one cell per image)
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow,
  ], document);

  // Replace the original element with the block table
  element.replaceWith(table);
}
