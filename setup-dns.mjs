import { chromium } from 'playwright';

const DOMAIN = 'kineticrecruiter.com';
const A_RECORDS = [
  '216.239.32.21',
  '216.239.34.21',
  '216.239.36.21',
  '216.239.38.21',
];
const CNAME_RECORD = { name: 'www', value: 'ghs.googlehosted.com' };

const browser = await chromium.launch({ headless: false, slowMo: 500 });
const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
const page = await context.newPage();

// Step 1: Navigate to GoDaddy DNS management
console.log('Opening GoDaddy DNS management...');
await page.goto(`https://dcc.godaddy.com/manage/${DOMAIN}/dns/records`);

// Step 2: Pause for user to log in
console.log('\n========================================');
console.log('  LOG IN TO GODADDY IN THE BROWSER');
console.log('  Then navigate to the DNS records page');
console.log('  Press RESUME in Playwright Inspector');
console.log('  when you see the DNS records table');
console.log('========================================\n');
await page.pause();

// Step 3: Now we're on the DNS page — add records
console.log('Adding DNS records...');

// Helper: click "Add New Record" and fill it
async function addARecord(ip) {
  console.log(`  Adding A record: @ → ${ip}`);
  try {
    // Click "Add New Record"
    await page.getByRole('button', { name: /add new record/i }).click();
    await page.waitForTimeout(1000);

    // Select record type A
    const typeSelect = page.locator('[name="type"], [data-testid="record-type"]').last();
    if (await typeSelect.isVisible()) {
      await typeSelect.selectOption('A');
    }

    // Fill name field with @
    const nameInput = page.locator('[name="name"], [data-testid="record-name"]').last();
    await nameInput.clear();
    await nameInput.fill('@');

    // Fill value field
    const valueInput = page.locator('[name="value"], [name="data"], [data-testid="record-value"]').last();
    await valueInput.clear();
    await valueInput.fill(ip);

    // Set TTL if available
    const ttlSelect = page.locator('[name="ttl"]').last();
    if (await ttlSelect.isVisible().catch(() => false)) {
      await ttlSelect.selectOption('600');
    }

    // Save
    const saveBtn = page.getByRole('button', { name: /save/i }).last();
    await saveBtn.click();
    await page.waitForTimeout(2000);
    console.log(`  ✓ A record added: ${ip}`);
  } catch (e) {
    console.log(`  ⚠ Could not auto-add A record ${ip}: ${e.message}`);
    console.log('  → Please add it manually, then press RESUME');
    await page.pause();
  }
}

async function addCNAMERecord(name, value) {
  console.log(`  Adding CNAME record: ${name} → ${value}`);
  try {
    await page.getByRole('button', { name: /add new record/i }).click();
    await page.waitForTimeout(1000);

    const typeSelect = page.locator('[name="type"], [data-testid="record-type"]').last();
    if (await typeSelect.isVisible()) {
      await typeSelect.selectOption('CNAME');
    }

    const nameInput = page.locator('[name="name"], [data-testid="record-name"]').last();
    await nameInput.clear();
    await nameInput.fill(name);

    const valueInput = page.locator('[name="value"], [name="data"], [data-testid="record-value"]').last();
    await valueInput.clear();
    await valueInput.fill(value);

    const saveBtn = page.getByRole('button', { name: /save/i }).last();
    await saveBtn.click();
    await page.waitForTimeout(2000);
    console.log(`  ✓ CNAME record added: ${name} → ${value}`);
  } catch (e) {
    console.log(`  ⚠ Could not auto-add CNAME: ${e.message}`);
    console.log('  → Please add it manually, then press RESUME');
    await page.pause();
  }
}

// Add all A records
for (const ip of A_RECORDS) {
  await addARecord(ip);
}

// Add CNAME
await addCNAMERecord(CNAME_RECORD.name, CNAME_RECORD.value);

console.log('\n========================================');
console.log('  DNS RECORDS COMPLETE');
console.log('  Verify records look correct in browser');
console.log('  Press RESUME to close');
console.log('========================================\n');
await page.pause();

await browser.close();
console.log('Done. TLS certificate will provision in 15-60 minutes.');
