# Playwright End-to-End Tests for Universal Viewer (Release Candidates)

This repository contains end-to-end tests for Release Candidates  of the Universal Viewer application, built using Playwright. The tests validate critical functionalities, including UI interactions, settings, locale-specific behaviors, and universal navigation.

## Features
  - **Cross-Browser Testing**: Supports testing across Chromium, Firefox, and WebKit.
  - **Locale-Specific Testing**: Validates button interactions and locale-specific settings (e.g., English, French, Swedish).
  - **UI Interaction Testing**: Covers key navigation controls like zoom, rotate, search, and fullscreen.
  - **Detailed Reporting**: Generates HTML, JSON, and Allure reports for test runs.
  - **Error Debugging**: Captures screenshots and videos on test failure for efficient debugging

## Prerequisites
 Ensure the following tools are installed:
 * Node.js (v16 or higher)
 * npm (bundled with Node.js)
 * Git (for version control)

## Installation
1. Clone the repository:
  `git clone https://github.com/your-username/universal-viewer-tests.git
cd universal-viewer-tests`

2. Install dependencies:
  `npm install`
3. Install Playwright browsers:
  `npx playwright install`

## Test Configuration
 The Playwright configuration file (`playwright.config.js`) is pre-configured with:
  - **Test directory**: `tests/`
  - **Reporters**: HTML, JSON, and list reporters.
  - **Browsers**: Chromium, Firefox, and WebKit.
  - **Timeout**: Customized to handle slow-loading pages.  
  - Test data, including the initial URL and locale-specific settings, is stored in testdata.json

## Running Tests
1. Run all tests:
  `npx playwright test`
2. Run all the test with visual inspection and specific browser
  `npx playwright test --headed --project=chromium`
3. Run tests in a specific file: 
  Example;
  `npx playwright test tests/settingsButton.spec.js`
4. Run tests in debug mode:
  `npx playwright test --debug`
5. View available test options:
  `npx playwright test --help`


## Generating Reports
  HTML Report
  1. Run the tests:
    `npx playwright test`
  2. Open the report:
    `npx playwright show-report`

## JSON Report
  The JSON report is generated in the root directory as test-results.json:
    `npx playwright test --reporter=json`

## Project Structure and Key Test Cases
  The repository is organized as follows, with each file serving specific purposes:
  - **Pages** (`/pages`)  
       This folder contains the Page Object Models (POMs) that encapsulate locators and reusable actions for different sections of the application.
     
    **`settingsButton.js`**
    * Reduce Motion: Toggle the reduced motion checkbox to enable/disable animations.  
    * Navigator Enabled: Verify enabling/disabling the navigator feature.  
    * Two Page View: Test the functionality for switching between single and two-page views.  
    * Truncate Thumbnail Labels: Validate truncation of thumbnail labels.  
    * Mouse Click To Zoom: Test zoom functionality via mouse clicks.  
    * Preserve Zoom: Check the option to maintain zoom levels across navigation.  
    * More Info: Ensure the "More Info" link opens in a new tab and can be closed successfully.  
  
    **`settingsLocale.js`**
    * Test locale-specific buttons and settings for English, French, Welsh, Swedish, and Polish.
    * Example test scenarios include verifying navigation to locale-specific URLs and validating button interactions.
    
    **`universalViewerPage.js`**  
    * Validate core navigation controls: Next/Previous Image, Zoom   In/Out, Rotate Right, and Adjust Image.
    * Test overlay functionality and visibility adjustments.
    * Interact with key UI elements such as Thumbnails, thumbnail slider, Index, and Gallery.
    * Verify text input and actions: Search by Page Number, Search within Item, and Embed functionality.
    * Validate Share, download, Full Screen, and Exit Full Screen interactions.

  - **Test Pages** (`/test`)  
        This folder contains all the Playwright test files that execute the end-to-end tests using the Page Object Models.
    
    **`settingsButton.spec.js`**  
        Executes tests for general settings functionality, such as:
      * Toggling the "Reduce Motion" checkbox
      * Validating "Navigator Enabled" and other checkbox states
      * Verifying locale-specific configurations like labels and buttons
        
    **`settingsLocale.spec.js`**  
        Covers tests for locale-specific navigation and interactions, including:
      * Navigating to English, French, Welsh, Swedish, and Polish settings
      * Verifying locale-specific configurations like labels and buttons
        
    **`universalViewer.spec.js`**  
        Executes tests for Universal Viewer navigation and UI interactions, including:
      * Image navigation (Next/Previous Image)
      * Zooming, rotating, and adjusting images
      * Index and Gallery interactions
      * Fullscreen and sharing options and other UI interactions.

  - **Utils** (`/utils`)  
      This folder contains utility files, including configuration and test data.

    **`testdata.json`**  
      Stores configuration data, such as:
      * The base application URL (initialUrl)
      * pageNumber
      * sliderValue
      * search keywords
      * Locale-specific options (e.g., button names and labels, buttonName, and specific locale urls)

## Debugging
  1. Run tests in headed mode for visual inspection:
    `npx playwright test --headed`
  2. Use the Playwright Inspector:
    `npx playwright test --debug`

## Root Files  
  - `playwright.config.js`  
      The configuration file for Playwright tests, including:
      * Timeout settings
      * Reporters (e.g., HTML, JSON)
      * Browser settings (Chromium, Firefox, WebKit)
      
  - `README.md`
      Documentation for the project, including setup instructions, usage, and test structure.
    

## CI/CD Integration
   For automated testing in CI/CD pipelines, configure your workflow file (e.g., .`github/workflows/playwright.yml`):  
    name:

<pre style="color:green;">
name: Playwright Tests

on:
  push:
    branches:
      - main

jobs:
  tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v2
        with:
          node-version: '16'
      - run: npm install
      - run: npx playwright install
      - run: npx playwright test
</pre>

## Example Directory Structure  

`/pages`  
  ├── settingsLocale.js           `# POM for locale-specific settings`  
  ├── settingsButton.js           `# POM for general settings functionality`  
  ├── universalViewerPage.js      `# POM for Universal Viewer interactions`   
  
  `/tests`  
  ├── settingsButton.spec.js      `# Tests for general settings functionality`    
  ├── settingsLocale.spec.js      `# Tests for locale-specific navigation`  
  ├── universalViewer.spec.js     `# Tests for Universal Viewer navigation`  
  
`/utils`  
  ├── testdata.json               `# Configuration and test data`  

playwright.config.js              `# Playwright configuration file`  
README.md                          `# Project documentation`


## Contributors
  Lanie Okorodudu   
  Senior Test Engineer  
  Universal Viewer (BL)
