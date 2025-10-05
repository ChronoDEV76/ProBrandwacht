import { test, expect } from "@playwright/test";

test("ZZP form submits happy path", async ({ page }) => {
  await page.goto("/zzp/aanmelden");
  await page.getByLabel("Voornaam").fill("Jan");
  await page.getByLabel("Achternaam").fill("Jansen");
  await page.getByLabel("E-mail").fill("jan@example.com");
  await page.getByLabel("Telefoon").fill("0612345678");
  await page.getByLabel("KvK-nummer").fill("12345678");
  await page.getByLabel("BTW-nummer").fill("NL123456789B01");
  await page.getByLabel("IBAN (t.b.v. uitbetaling)").fill("NL91ABNA0417164300");
  await page.getByLabel("Specialisaties").fill("Industriële brandwacht");
  await page.getByLabel("Bestandsnaam certificaat (referentie)").fill("VCA_JanJansen.pdf");
  await page.getByLabel("Opmerking").fill("Beschikbaar do/vr");
  await page.getByRole("button", { name: "Aanmelding versturen" }).click();
  await expect(page.getByText("Aanmelding ontvangen")).toBeVisible();
});

test("Client form submits happy path", async ({ page }) => {
  await page.goto("/opdrachtgevers/aanmelden");
  await page.getByLabel("Bedrijfsnaam").fill("Bedrijf BV");
  await page.getByLabel("KvK-nummer").fill("87654321");
  await page.getByLabel("Contactpersoon").fill("Piet Peters");
  await page.getByLabel("E-mail").fill("inkoop@bedrijf.nl");
  await page.getByRole("button", { name: "Account aanvragen" }).click();
  await expect(page.getByText("Account aangevraagd")).toBeVisible();
});

