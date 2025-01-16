const { test, expect } = require('@playwright/test');
const { SettingsPage } = require('../pages/settingsButton');
const testData = require('../utils/testdata.json');

test.describe('Settings Page Tests', () => {
  let settingsPage;
  let page;

  test.setTimeout(90000); // Increase global timeout

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    settingsPage = new SettingsPage(page);

    console.log(`Navigating to initial URL: ${testData.initialUrl}`);
    await settingsPage.navigateToInitialUrl();

    console.log('Opening settings menu...');
    await settingsPage.openSettingsForGeneralActions();
  }, 60000); // Increase timeout for beforeAll

  test.afterAll(async () => {
    if (page) {
      console.log('Closing the browser...');
      await page.close();
    }
  });

  test('should toggle Reduce Motion checkbox', async () => {
    await settingsPage.toggleReducedAnimation('check');
    expect(await settingsPage.reducedAnimationCheckbox.isChecked()).toBe(true);
    console.log('Reduce Motion checkbox toggled successfully.');
  });

  test('should toggle Navigator Enabled checkbox', async () => {
    await settingsPage.toggleNavigatorEnabled('uncheck');
    expect(await settingsPage.navigatorEnabledCheckbox.isChecked()).toBe(false);
    console.log('Navigator Enabled checkbox toggled successfully.');
  });

  test('should toggle Two Page View checkbox', async () => {
    await settingsPage.toggleTwoPageView('uncheck');
    expect(await settingsPage.twoPageViewCheckbox.isChecked()).toBe(false);
    console.log('Two Page View checkbox toggled successfully.');
  });

  test('should toggle Truncate Thumbnail Labels checkbox', async () => {
    await settingsPage.toggleTruncateThumbnailLabels('uncheck');
    expect(await settingsPage.truncateThumbnailLabelsCheckbox.isChecked()).toBe(false);
    console.log('Truncate Thumbnail Labels checkbox toggled successfully.');
  });

  test('should toggle Mouse Click To Zoom checkbox', async () => {
    await settingsPage.toggleMouseClickToZoom('check');
    expect(await settingsPage.mouseClickToZoomCheckbox.isChecked()).toBe(true);
    console.log('Mouse Click To Zoom checkbox toggled successfully.');
  });

  test('should toggle Preserve Zoom checkbox', async () => {
    await settingsPage.togglePreserveZoom('check');
    expect(await settingsPage.preserveZoomCheckbox.isChecked()).toBe(true);
    console.log('Preserve Zoom checkbox toggled successfully.');
  });

  test('should open "More Info" link in a new tab and close it', async () => {
    await settingsPage.openMoreInfo();
    console.log('"More Info" link test completed.');
  });
});
