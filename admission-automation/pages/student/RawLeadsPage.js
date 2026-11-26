// pages/student/RawLeadsPage.js
import { expect } from '@playwright/test';

export class RawLeadsPage {
  constructor(page) {
    this.page = page;
    this.root = page.locator('app-manage-lead-data');

    // --- Top Tabs ---
    this.enquiryNowTab = this.root.locator('button', {
      has: page.locator('.font-medium', { hasText: /^Enquiry Now$/ }),
    });
    this.registerNowTab = this.root.locator('button', {
      has: page.locator('.font-medium', { hasText: /^Register Now$/ }),
    });

    // --- Toolbar Actions & Search ---
    this.bulkImportLink = this.root.locator('a[href="/lead/bulk-import"]');
    this.exportAllButton = this.root.getByRole('button', { name: /Export All/i });
    this.autoAssignButton = this.root.getByRole('button', { name: /Auto Assign Counsellors/i });
    this.searchInput = this.root.getByPlaceholder('Search...');

    // --- Filter Dropdowns ---
    this.programSelect = this.root.locator('select', {
      has: page.locator('option', { hasText: /^Program$/ }),
    });
    this.specializationSelect = this.root.locator('select', {
      has: page.locator('option', { hasText: /Specialization/ }),
    });
    this.verificationStatusSelect = this.root.locator('select', {
      has: page.locator('option', { hasText: /Verification Status/ }),
    });
    this.sourceSelect = this.root.locator('select', {
      has: page.locator('option', { hasText: /All Sources/ }),
    });
    this.moreFiltersButton = this.root.getByRole('button', { name: /More/i });

    // --- Table Elements ---
    this.table = this.root.locator('table');
    this.selectAllCheckbox = this.table.locator('thead input[type="checkbox"]');
    this.tableRows = this.table.locator('tbody tr');
  }

  // --- Tab Navigation ---

  async openEnquiryNowTab() {
    await this.enquiryNowTab.click();
    await expect(this.enquiryNowTab).toHaveClass(/bg-primaryGreen-500/);
  }

  async openRegisterNowTab() {
    await this.registerNowTab.click();
    await expect(this.registerNowTab).toHaveClass(/bg-primaryGreen-500/);
  }

  // --- Search & Filters ---

  async searchLead(query) {
    await this.searchInput.fill(query);
    // Wait for debounce / API refresh if needed
    await this.page.waitForLoadState('networkidle');
  }

  async filterByProgram(programValue) {
    await this.programSelect.selectOption(programValue);
  }

  async filterByVerificationStatus(status) {
    await this.verificationStatusSelect.selectOption(status);
  }

  async filterBySource(source) {
    await this.sourceSelect.selectOption(source);
  }

  // --- Row Locators & Verification ---

  /**
   * Finds a specific row matching a unique identifier (email, phone, or enquiry ID)
   */
  getRowByText(identifier) {
    return this.tableRows.filter({ hasText: identifier });
  }

  /**
   * Searches for the registered student in the Register Now tab and verifies
   * the row displays the expected Full Name, Surname, Email, and Phone.
   */
 async verifyRegisteredStudent(studentData) {
 //   await this.openRegisterNowTab();

    // Search using the unique mobile number (or email) so we isolate this exact registration
    const uniqueIdentifier = studentData.mobile || studentData.email;
    await this.searchLead(uniqueIdentifier);

    const matchingRow = this.tableRows.filter({ hasText: uniqueIdentifier });
    await expect(matchingRow).toHaveCount(1, { timeout: 10000 });

    // Columns: [1] Full Name, [2] Surname, [3] Contact (Email + Phone)
    const cells = matchingRow.locator('td');

    await expect(cells.nth(1)).toContainText(studentData.firstName, { ignoreCase: true });
    await expect(cells.nth(2)).toContainText(studentData.lastName, { ignoreCase: true });
    await expect(cells.nth(3)).toContainText(studentData.mobile);

    if (studentData.email) {
      await expect(cells.nth(5)).toContainText(studentData.email);
    }
  }
  /**
   * Opens the 3-dots Actions menu for a specific lead row
   */
  async openRowActions(identifier) {
    const row = this.getRowByText(identifier);
    await row.locator('button[title="Actions"]').click();
  }
}