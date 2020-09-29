import { RequestLocale } from '@nestjs-toolkit/base';

describe('RequestLocale', () => {
  let request: RequestLocale;

  beforeEach(async () => {
    request = new RequestLocale();
  });

  it('get lang', () => {
    expect(request.getLang()).toEqual('en');
  });
});
