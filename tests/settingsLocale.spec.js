const { test, expect } = require('@playwright/test');
const { SettingsPage } = require('../pages/settingsLocale');
const testData = require('../utils/testdata.json');

test.describe('Settings Page Tests', () => {
  let settingsPage;

  test.beforeEach(async ({ page }) => {
    settingsPage = new SettingsPage(page);
  });

  test('Navigate to initial URL', async ({ page }) => {
    await settingsPage.navigateToLocaleUrl('en-GB');
    const expectedUrl = `${testData.initialUrl}${testData.localeOptions['en-GB'].ENurl}`;
    expect(page.url()).toContain(testData.localeOptions['en-GB'].ENurl);
  });

  test('Open English settings', async ({ page }) => {
    await settingsPage.openEnglishSettings();
    expect(page.url()).toContain(testData.localeOptions['en-GB'].ENurl);
  });

  test('Open Français settings', async ({ page }) => {
    await settingsPage.openFrancaisSettings();
    expect(page.url()).toContain(testData.localeOptions['fr-FR'].FRurl);
  });

  test('Open Cymraeg settings', async ({ page }) => {
    await settingsPage.openCymraegSettings();
    expect(page.url()).toContain(testData.localeOptions['cy-GB'].GBurl);
  });

  test('Open Svenska settings', async ({ page }) => {
    await settingsPage.openSvenskaSettings();
    expect(page.url()).toContain(testData.localeOptions['sv-SE'].SEurl);
  });

  test('Open Polski settings', async ({ page }) => {
    await settingsPage.openPolskiSettings();
    expect(page.url()).toContain(testData.localeOptions['pl-PL'].PLurl);
  });
});
