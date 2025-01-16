const testData = require('../utils/testdata.json');

class SettingsPage {
  constructor(page) {
    this.page = page;

    // General Locators
    this.reducedAnimationCheckbox = page.getByLabel('Reduce motion (disables animations)');
    this.navigatorEnabledCheckbox = page.getByLabel('Navigator Enabled');
    this.twoPageViewCheckbox = page.getByLabel('Two page view');
    this.truncateThumbnailLabelsCheckbox = page.getByLabel('Truncate Thumbnail Labels');
    this.mouseClickToZoomCheckbox = page.getByLabel('Mouse Click To Zoom');
    this.preserveZoomCheckbox = page.getByLabel('Preserve Zoom');
    this.moreInfoLink = page.getByRole('link', { name: 'More info about the Universal Viewer' });
  }

  /**
   * Navigate to the initial URL from testdata.json.
   */
  async navigateToInitialUrl() {
    const url = testData.initialUrl;
    if (!url || typeof url !== 'string' || url.trim() === '') {
      throw new Error(`Invalid URL found in testdata.json: ${url}`);
    }

    console.log(`Navigating to initial URL: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    console.log('Navigation successful.');
  }

  /**
   * Open the settings menu using the "Settings" button.
   */
  async openSettingsForGeneralActions() {
    console.log('Opening general settings menu...');
    const settingsButton = this.page.getByRole('button', { name: 'Settings' });
  
    const overlay = this.page.locator('div.overlays');
    if (await overlay.isVisible()) {
      console.log('Overlay detected. Adjusting...');
      await this.page.evaluate(() => {
        const overlayElement = document.querySelector('div.overlays');
        if (overlayElement) overlayElement.style.pointerEvents = 'none';
      });
    }
  
    await settingsButton.waitFor({ state: 'visible', timeout: 15000 });
    await settingsButton.click();
    console.log('Settings menu opened successfully.');
  }
  

  /**
   * Toggle a checkbox.
   * @param {Locator} checkbox - Locator for the checkbox.
   * @param {string} state - 'check' or 'uncheck'.
   */
  async setCheckboxState(checkbox, state) {
    const isChecked = await checkbox.isChecked();
    if (state === 'check' && !isChecked) {
      console.log(`Checking checkbox...`);
      await checkbox.check();
    } else if (state === 'uncheck' && isChecked) {
      console.log(`Unchecking checkbox...`);
      await checkbox.uncheck();
    } else {
      console.log(`Checkbox is already in the desired state: ${state}`);
    }
  }

  async toggleReducedAnimation(state) {
    await this.setCheckboxState(this.reducedAnimationCheckbox, state);
  }

  async toggleNavigatorEnabled(state) {
    await this.setCheckboxState(this.navigatorEnabledCheckbox, state);
  }

  async toggleTwoPageView(state) {
    await this.setCheckboxState(this.twoPageViewCheckbox, state);
  }

  async toggleTruncateThumbnailLabels(state) {
    await this.setCheckboxState(this.truncateThumbnailLabelsCheckbox, state);
  }

  async toggleMouseClickToZoom(state) {
    await this.setCheckboxState(this.mouseClickToZoomCheckbox, state);
  }

  async togglePreserveZoom(state) {
    await this.setCheckboxState(this.preserveZoomCheckbox, state);
  }

  /**
   * Open "More Info" link in a new tab.
   */
  async openMoreInfo() {
    console.log('Opening "More Info" link...');
    await this.moreInfoLink.waitFor({ state: 'visible', timeout: 10000 });

    const [newPage] = await Promise.all([
      this.page.waitForEvent('popup', { timeout: 15000 }),
      this.moreInfoLink.click(),
    ]);

    if (!newPage) {
      throw new Error('The popup for "More Info" did not open within the timeout.');
    }

    console.log('Popup opened successfully. Closing it now...');
    await newPage.close();
    console.log('Popup closed.');
  }
}

module.exports = { SettingsPage };
