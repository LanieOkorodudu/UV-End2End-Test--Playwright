
const { test, expect } = require('@playwright/test');
const { UniversalViewerPage } = require('../pages/universalViewerPage');

test('Test Universal Viewer functionality using test data', async ({ page }) => {
  const viewer = new UniversalViewerPage(page);

  // Navigate to initial URL
  await viewer.navigateToInitialUrl();

  // Perform image navigation and zoom controls
  await viewer.navigateImages();
  await viewer.zoomControls();

  // Rotate image and adjust it
  await viewer.rotateImage(4);
  await viewer.adjustImageAndClose();

  // Open Thumbnails, Index, and navigate to Front Cover
  await viewer.openThumbnailsAndIndex();
  await viewer.navigateToFrontCover();

  // Search by page number and adjust slider
  await viewer.searchByPageNumber();
  await viewer.adjustSlider();

  // Search within the item
  await viewer.searchWithinItem();

  
  // Perform downloads and ensure no errors occur
await viewer.downloadImages();


  // Share embed link
  await viewer.shareEmbedLink();
  //await viewer.toggleInformationPanel();

  // Toggle full-screen mode
  await viewer.toggleFullScreen();
});
