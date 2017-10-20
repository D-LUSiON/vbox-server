import { ElTest1Page } from './app.po';

describe('el-test1 App', () => {
  let page: ElTest1Page;

  beforeEach(() => {
    page = new ElTest1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
