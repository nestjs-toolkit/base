import { RequestLocale } from '../lib/locale';

describe('RequestLocale', () => {
  let request: RequestLocale;

  beforeEach(async () => {
    request = new RequestLocale();
  });

  it('get lang', () => {
    expect(request.getLang()).toEqual('en');
  });
});
