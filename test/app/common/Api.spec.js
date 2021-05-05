/* eslint-disable max-lines */
import fetchMock from 'fetch-mock';
import Api from 'app/common/Api';

describe('Api', () => {
  afterEach(() => fetchMock.restore());

  describe('Success calls', () => {
    let optionsExpected;

    describe('GET', () => {
      beforeEach(() => fetchMock.get('*', {hello: 'world'}));

      it('should use the default options when options is not defined', () => {
        optionsExpected = {
          method: 'GET',
          headers: {Accept: 'application/json'},
        };

        Api.getJSON('/test');

        expect(fetchMock.lastOptions()).toStrictEqual(optionsExpected);
      });

      it('should overwrite method in options and Accept in headers when options is defined', () => {
        const config = {method: 'old', extra: 'test', headers: {Accept: 'old', extra: 'test2'}};
        optionsExpected = {
          method: 'GET',
          extra: 'test',
          headers: {Accept: 'application/json', extra: 'test2'},
        };

        Api.getJSON('/test', config);

        expect(fetchMock.lastOptions()).toStrictEqual(optionsExpected);
      });
    });
  });

  describe('Error calls', () => {
    describe('Internal Error', () => {
      it('should handle a 500 error when error 500', async () => {
        fetchMock.get('*', {
          status: 500,
          body: {error: 'error'},
        });

        try {
          await Api.getJSON('/test');
          throw new Error('promise should fail but it did not!!!!');
        } catch (error) {
          expect(error).toBeDefined();
        }
      });
    });
  });
});