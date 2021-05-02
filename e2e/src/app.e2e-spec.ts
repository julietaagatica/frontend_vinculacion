import { AppPage } from "./app.po";
import { browser, logging, element, by, $ } from "protractor";

describe("Pruebas en el frontend - VINCULACION", () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
    browser.sleep(10000);
  });

  // it("should display welcome message", () => {
  //   page.navigateTo();
  //   expect(page.getTitleText()).toEqual("Welcome to vinculacion!");
  // });

  it("3.2.1.1 -	CU01 – Vinculación - Autenticar Vinculación 3.0 -> Login incorrecto", async () => {
    page.navigateTo("/#/login");
    await element(by.css("app-login #inputEmail")).clear();
    await element(by.css("app-login #inputEmail")).sendKeys(
      "camimt22@gmail.com"
    );
    await element(by.css("app-login #inputPassword")).clear();
    await element(by.css("app-login #inputPassword")).sendKeys("37716506");
    await element(by.css("app-login #loginbtn")).click();
    expect(page.getText("app-root #msgUserInc")).toEqual(
      "Proyecto de Vinculación Educativa"
    );
  });

  it("3.2.1.1 -	CU01 – Vinculación - Autenticar Vinculación 3.0 -> Login correcto", async () => {
    page.navigateTo("/#/login");
    await element(by.css("app-login #inputEmail")).clear();
    await element(by.css("app-login #inputEmail")).sendKeys(
      "camimt25@gmail.com"
    );
    await element(by.css("app-login #inputPassword")).clear();
    await element(by.css("app-login #inputPassword")).sendKeys("37716506");
    await element(by.css("app-login #loginbtn")).click();
    expect(page.getText("app-root #msgUserInc")).toEqual(
      "Proyecto de Vinculación Educativa"
    );
  });

  it("3.2.1.2 - CU13 – Vinculación - Alta documento educativo -> Alta fallida", async () => {
    await page.navigateTo("/#/biblioteca_digital");
    await element(by.css("app-biblioteca-digital #subirDoc")).click();
    await element(by.css("app-subida-documento #nombreDoc")).clear();
    await element(by.css("app-subida-documento #nombreDoc")).sendKeys(
      "Documento de Prueba"
    );

    await element(by.css("app-subida-documento #categorias")).clear();
    await element(by.css("app-subida-documento #categorias")).sendKeys(
      "Categoria 1, Categoria 2"
    );
    await element(by.css("app-subida-documento #institucion"))
      .element(by.css("option[value='1']"))
      .click();

    await element(by.css("app-subida-documento #ramaInst"))
      .element(by.css("option[value='1']"))
      .click();

    await element(by.css("app-subida-documento #curso"))
      .element(by.css("option[value='1']"))
      .click();

    await element(by.css("app-subida-documento #materia"))
      .element(by.css("option[value='5']"))
      .click();

    await element(by.css("app-subida-documento #nombreAut")).clear();
    await element(by.css("app-subida-documento #nombreAut")).sendKeys("Juan");

    await element(by.css("app-subida-documento #apellidoAut")).clear();
    await element(by.css("app-subida-documento #apellidoAut")).sendKeys(
      "Perez"
    );

    await element(by.css("app-subida-documento #archivo")).sendKeys(
      "C:/Users/kami_/Documents/lian.pdf"
    );
    browser.sleep(10000);
    await element(by.css("app-subida-documento #botonSubirDoc")).click();

    expect(page.getText("app-subida-documento #subirDocTitulo")).toEqual(
      "Subir documento"
    );
  });

  it("3.2.1.2 - CU13 – Vinculación - Alta documento educativo -> Alta exitosa", async () => {
    await page.navigateTo("/#/biblioteca_digital");
    await element(by.css("app-biblioteca-digital #subirDoc")).click();
    await element(by.css("app-subida-documento #nombreDoc")).clear();
    await element(by.css("app-subida-documento #nombreDoc")).sendKeys(
      "Documento de Prueba"
    );

    await element(by.css("app-subida-documento #categorias")).clear();
    await element(by.css("app-subida-documento #categorias")).sendKeys(
      "Categoria 1, Categoria 2"
    );
    await element(by.css("app-subida-documento #institucion"))
      .element(by.css("option[value='1']"))
      .click();

    await element(by.css("app-subida-documento #ramaInst"))
      .element(by.css("option[value='1']"))
      .click();

    await element(by.css("app-subida-documento #curso"))
      .element(by.css("option[value='1']"))
      .click();

    await element(by.css("app-subida-documento #materia"))
      .element(by.css("option[value='5']"))
      .click();

    await element(by.css("app-subida-documento #nombreAut")).clear();
    await element(by.css("app-subida-documento #nombreAut")).sendKeys("Juan");

    await element(by.css("app-subida-documento #apellidoAut")).clear();
    await element(by.css("app-subida-documento #apellidoAut")).sendKeys(
      "Perez"
    );

    await element(by.css("app-subida-documento #agregarAutor")).click();

    await element(by.css("app-subida-documento #archivo")).sendKeys(
      "C:/Users/kami_/Documents/lian.pdf"
    );

    browser.sleep(10000);
    await element(by.css("app-subida-documento #botonSubirDoc")).click();

    expect(page.getText("app-root #msgUserInc")).toEqual(
      "Proyecto de Vinculación Educativa"
    );
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(
      jasmine.objectContaining({
        level: logging.Level.SEVERE,
      } as logging.Entry)
    );
  });
});
