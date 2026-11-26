// pages/AdminSidebarPage.js
export class AdminSidebarPage {
  constructor(page) {
    this.page = page;
    this.sidebar = page.locator('.menu-container');

    // Direct navigation items (<a> tags)
    this.dashboardLink = this.getMenuItem('Dashboard');
    this.campaignsLink = this.getMenuItem('Campaigns');
    this.calendarLink = this.getMenuItem('Calendar');
    this.monitorLink = this.getMenuItem('Monitor');
    this.enrollmentLink = this.getMenuItem('Enrollment');
    this.erpIntegrationLink = this.getMenuItem('ERP Integration');
    this.supportLink = this.getMenuItem('Support');
    this.userRolesLink = this.getMenuItem('User Roles');

    // Expandable submenu headers (<div class="submenu-header">)
    this.leadsMenu = this.getMenuItem('Leads');
    this.applicantsMenu = this.getMenuItem('Applicants');
    this.examsMenu = this.getMenuItem('Exams');
    this.documentsMenu = this.getMenuItem('Documents');
    this.reportsMenu = this.getMenuItem('Reports');
    this.settingsMenu = this.getMenuItem('Settings');

    // --- Leads Submenu Items ---
    this.leadsWrapper = this.getSubmenuWrapper('Leads');
    // Matches "LeadConsole", "leadconsole", or "Lead Console"
    this.leadConsoleLink = this.getSubmenuItem(this.leadsWrapper, 'Lead\\s*Console');
    this.rawLeadsLink = this.getSubmenuItem(this.leadsWrapper, 'Raw Leads');
    this.leadsImportLink = this.getSubmenuItem(this.leadsWrapper, 'Import');
  }

  /**
   * Hovers over the collapsed icon sidebar to trigger the CSS/Angular expansion
   * and waits until the menu labels become visible.
   */
  async expandSidebar() {
    await this.sidebar.hover();
    // Wait for the expand animation to reveal labels before interacting
    await this.sidebar.locator('.menu-label').first().waitFor({ state: 'visible' });
  }

  /**
   * Helper to locate any top-level menu item by its exact label
   */
  getMenuItem(label) {
    return this.sidebar.locator('.menu-item', {
      has: this.page.locator('.menu-label', { hasText: new RegExp(`^${label}$`, 'i') }),
    });
  }

  /**
   * Locates the parent .submenu-wrapper for a given expandable section
   */
  getSubmenuWrapper(parentLabel) {
    return this.sidebar.locator('.submenu-wrapper', {
      has: this.page.locator('.menu-label', { hasText: new RegExp(`^${parentLabel}$`, 'i') }),
    });
  }

  /**
   * Locates a clickable child item inside a specific submenu wrapper
   */
  getSubmenuItem(wrapperLocator, childLabelPattern) {
    return wrapperLocator
      .locator('a, .submenu-item, .menu-item:not(.submenu-header)')
      .filter({ hasText: new RegExp(`^\\s*${childLabelPattern}\\s*$`, 'i') });
  }

  /**
   * Hovers the sidebar, clicks a top-level link, and waits for navigation/active state
   */
  async clickMenuItem(locator) {
    await this.expandSidebar();
    await locator.click();
  }

  /**
   * Hovers the sidebar, opens a submenu, and selects a nested option
   * @param {string} parentLabel - e.g., 'Leads', 'Settings'
   * @param {string} childLabel - The text of the sub-item once expanded
   */
  async selectSubmenuOption(parentLabel, childLabel) {
    await this.expandSidebar();

    const wrapper = this.sidebar.locator('.submenu-wrapper', {
      has: this.page.locator('.menu-label', { hasText: new RegExp(`^${parentLabel}$`) }),
    });

    await wrapper.locator('.submenu-header').click();
    await wrapper.getByText(childLabel, { exact: true }).click();
  }

  async clickSubmenuItem(parentHeaderLocator, childItemLocator) {
    await this.expandSidebar();

    // Only click the parent header if the child item isn't already visible (prevents accidentally collapsing it)
    if (!(await childItemLocator.isVisible())) {
      await parentHeaderLocator.click();
    }

    await childItemLocator.click();
  }

  // --- Direct Navigation Actions ---

  async goToDashboard() {
    await this.clickMenuItem(this.dashboardLink);
  }

  async goToCampaigns() {
    await this.clickMenuItem(this.campaignsLink);
  }

  async goToCalendar() {
    await this.clickMenuItem(this.calendarLink);
  }

  async goToMonitor() {
    await this.clickMenuItem(this.monitorLink);
  }

  async goToEnrollment() {
    await this.clickMenuItem(this.enrollmentLink);
  }

  async goToErpIntegration() {
    await this.clickMenuItem(this.erpIntegrationLink);
  }

  async goToSupport() {
    await this.clickMenuItem(this.supportLink);
  }

  async goToUserRoles() {
    await this.clickMenuItem(this.userRolesLink);
  }

  // --- Submenu Toggles ---

  async expandLeads() {
    await this.clickMenuItem(this.leadsMenu);
  }

  async expandApplicants() {
    await this.clickMenuItem(this.applicantsMenu);
  }

  async expandExams() {
    await this.clickMenuItem(this.examsMenu);
  }

  async expandDocuments() {
    await this.clickMenuItem(this.documentsMenu);
  }

  async expandReports() {
    await this.clickMenuItem(this.reportsMenu);
  }

  async expandSettings() {
    await this.clickMenuItem(this.settingsMenu);
  }

  // --- Leads Submenu Actions ---

  async goToLeadConsole() {
    await this.clickSubmenuItem(this.leadsMenu, this.leadConsoleLink);
  }

  async goToRawLeads() {
    await this.clickSubmenuItem(this.leadsMenu, this.rawLeadsLink);
  }
  
  async goToLeadsImport() {
    await this.clickSubmenuItem(this.leadsMenu, this.leadsImportLink);
  }
}