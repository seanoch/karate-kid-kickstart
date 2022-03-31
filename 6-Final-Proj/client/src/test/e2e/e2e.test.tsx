import puppeteer from "puppeteer";
import { getDocument, queries, waitFor } from "pptr-testing-library";
import hooks from "../../dataHooks";

const { getByTestId, getByLabelText } = queries;

describe("E2E Testing", () => {
  let browser: puppeteer.Browser | undefined;
  let page: puppeteer.Page | undefined;

  jest.setTimeout(50000);

  beforeAll(async () => {
    browser = await puppeteer.launch({ headless: false });
    page = await browser.newPage();
    await page.goto("http://localhost:5001/");
  });

  afterAll(async () => {
    await new Promise((r) => setTimeout(r, 5000));
    browser?.close();
  });

  it("should add an item when inserting a new text", async () => {
    const textToAdd = "Itay the user";
    const addInput = await page?.$(`[data-hook='${hooks.addInput}']`);
    await addInput?.type(textToAdd, { delay: 100 });
    const addBtn = await page?.$(`[data-hook='${hooks.addBtn}']`);
    await addBtn?.click();
    const itemLabel = await page?.waitForSelector(
      `[data-hook='${hooks.label}']`
    );

    await waitFor(async () => {
      const textInDom = await (
        await itemLabel?.getProperty("innerHTML")
      )?.jsonValue();
      expect(textInDom).toBe(textToAdd);
    });
  });
});
