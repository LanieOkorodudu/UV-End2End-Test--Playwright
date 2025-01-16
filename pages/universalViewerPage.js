
const testData = require('../utils/testdata.json');

class UniversalViewerPage {
  constructor(page) {
    this.page = page;

    // Locators
    this.previousImageButton = page.getByLabel('Previous Image');
    this.nextImageButton = page.getByLabel('Next Image');
    this.zoomInButton = page.getByLabel('Zoom In');
    this.zoomOutButton = page.getByLabel('Zoom Out');
    this.rotateRightButton = page.getByLabel('Rotate Right');
    this.adjustImageButton = page.getByLabel('Adjust image');
    this.closeButton = page.getByRole('button', { name: 'Close' });
    this.thumbnailsButton = page.getByText('Thumbnails');
    this.indexButton = page.getByText('Index');
    this.frontCoverLink = page.getByRole('link', { name: 'Front Cover' });
    this.searchPageTextbox = page.getByRole('textbox', { name: 'Search by Page Number' });
    this.singlePageViewButton = page.getByRole('button', { name: 'Single page view' });
    this.twoPageViewButton = page.getByRole('button', { name: 'Two page view' });
    this.galleryButton = page.getByRole('button', { name: 'Gallery' });
    this.sliderMinusButton = page.locator('input[type="button"]').first();
    this.sliderPlusButton = page.getByRole('button', { name: '+' });
    this.searchWithinTextbox = page.getByRole('textbox', { name: 'Search within this item:' });
    this.okButton = page.getByRole('button', { name: 'OK' });
    this.downloadButton = page.getByRole('button', { name: 'Download' });
    this.shareButton = page.getByRole('button', { name: 'Share' });
    this.embedLink = page.locator('a').filter({ hasText: 'Embed' });
    this.fullScreenButton = page.getByRole('button', { name: 'Full Screen Full Screen' });
    this.exitFullScreenButton = page.getByRole('button', { name: 'Exit Full Screen Full Screen' });
  }

  async navigateToInitialUrl() {
    await this.page.goto(testData.initialUrl);
  }

  async navigateImages() {
    await this.nextImageButton.click();
    await this.previousImageButton.click();
  }

  async zoomControls() {
    await this.zoomInButton.click();
    await this.zoomOutButton.click();
  }

  async rotateImage(times = 1) {
    for (let i = 0; i < times; i++) {
      await this.rotateRightButton.click();
    }
  }

  async adjustImageAndClose() {
    await this.adjustImageButton.click();
    await this.closeButton.click();
  }

  async openThumbnailsAndIndex() {
    await this.thumbnailsButton.click();
    await this.indexButton.click();
  }

  async navigateToFrontCover() {
    await this.frontCoverLink.click();
  }

  async searchByPageNumber() {
    await this.searchPageTextbox.fill(testData.pageNumber);
    await this.searchPageTextbox.press('Enter');
  }

  async viewModes() {
    await this.singlePageViewButton.click();
    await this.twoPageViewButton.click();
    await this.galleryButton.click();
  }


  async searchWithinItem() {
    await this.searchWithinTextbox.fill(testData.searchKeyword);
    await this.searchWithinTextbox.press('Enter');
    await this.okButton.click();
  }

  async downloadImages() {
    await this.downloadButton.click
    await this.closeButton.click
  } 
  
  async shareEmbedLink() {
    const overlay = this.page.locator('.overlays');
  
    console.log('Checking for overlay...');
    if (await overlay.isVisible()) {
        console.log('Overlay detected, waiting for it to disappear...');
  
        try {
            // Wait for the overlay to disappear
            await overlay.waitFor({ state: 'hidden', timeout: 30000 }); // Increased timeout
            console.log('Overlay disappeared successfully.');
        } catch (error) {
            console.warn('Overlay did not disappear within the timeout. Proceeding anyway...');
        }
    } else {
        console.log('No overlay detected. Proceeding...');
    }
  
    console.log('Clicking the Share button...');
    try {
        await this.shareButton.click();
        console.log('Share button clicked successfully.');
    } catch (error) {
        console.error('Failed to click the Share button:', error);
        throw error;
    }
  
    console.log('Clicking the Embed link...');
    try {
        await this.embedLink.click();
        console.log('Embed link clicked successfully.');
    } catch (error) {
        console.error('Failed to click the Embed link:', error);
        throw error;
    }
  
    console.log('Closing the pop-up...');
    try {
        await this.closeButton.click();
        console.log('Pop-up closed successfully.');
    } catch (error) {
        console.error('Failed to close the pop-up:', error);
        throw error;
    }
}

  async adjustSlider() {
    await this.galleryButton.click();
    await this.page.waitForTimeout(500);
    await this.thumbnailsButton.click();
    await this.page.waitForTimeout(500);
    await this.sliderMinusButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.sliderMinusButton.click();
    await this.sliderPlusButton.waitFor({ state: 'visible', timeout: 10000 });
    await this.sliderPlusButton.click();
  }

  async toggleFullScreen() {
    await this.fullScreenButton.click();
    await this.exitFullScreenButton.click();
  }
}

module.exports = { UniversalViewerPage };
