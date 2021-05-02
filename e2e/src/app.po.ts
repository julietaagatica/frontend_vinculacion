import { browser, by, element } from "protractor";

export class AppPage {
  navigateTo(s: string) {
    return browser.get(browser.baseUrl + s) as Promise<unknown>;
  }

  // navigateToHome(): Promise<unknown> {
  //   return browser.get(browser.baseUrl + "/home") as Promise<unknown>;
  // }

  getText(s: string) {
    return element(by.css(s)).getText() as Promise<string>;
  }
}
