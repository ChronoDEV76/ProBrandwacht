import { test, expect } from "@playwright/test";

test("ZZP form submits happy path", async ({ page }) => {
  await page.goto("/zzp/aanmelden");
  await page.getByPlaceholder("Jan").fill("Jan");
  await page.getByPlaceholder("Jansen").fill("Jansen");
  await page.getByPlaceholder("jan@example.com").fill("jan@example.com");
  await page.getByPlaceholder("12345678").fill("12345678");
  await page.getByPlaceholder("NL123456789B01").fill("NL123456789B01");
  await page.getByPlaceholder("Industriële brandwacht, Mangatwacht, Gasmeting…").fill("Industriële brandwacht");
  await page
    .getByPlaceholder("VCA_JanJansen.pdf; BHV_JanJansen.pdf")
    .fill("VCA_JanJansen.pdf");
  await page
    .getByPlaceholder("Beschikbaarheid, regio, dag/nacht/weekend…")
    .fill("Beschikbaar do/vr");
  await page.getByRole("button", { name: "Aanmelding opslaan" }).click();
  await expect(page.getByText("Aanmelding opgeslagen")).toBeVisible();
});

test("Client form submits happy path", async ({ page }) => {
  await page.goto("/opdrachtgevers/aanmelden");
  await page.getByLabel("Bedrijfsnaam").fill("Bedrijf BV");
  await page.getByLabel("KvK-nummer").fill("87654321");
  await page.getByLabel("Contactpersoon").fill("Piet Peters");
  await page.getByLabel("E-mail").fill("inkoop@bedrijf.nl");
  await page.getByRole("button", { name: "Aanmelding opslaan" }).click();
  await expect(page.getByText("Accountaanvraag opgeslagen")).toBeVisible();
});
