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

        describe('POST', () => {
            const body = {content: 'test'};

            beforeEach(() => fetchMock.post('*', {hello: 'world'}));

            it('should use the default options when options is not defined', () => {
                optionsExpected = {
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                };

                Api.postJSON('/test', body);

                expect(fetchMock.lastOptions()).toStrictEqual(optionsExpected);
                // don't mutate
                expect(body).toStrictEqual({content: 'test'});
            });

            it('should overwrite method and body in options and Accept and Content-Type ' +
                'in headers when options is defined', () => {
                const config = {
                    method: 'old',
                    body: 'old',
                    extra: 'test',
                    headers: {Accept: 'old', 'Content-Type': 'old', extra: 'test2'},
                };
                optionsExpected = {
                    method: 'POST',
                    body: JSON.stringify(body),
                    extra: 'test',
                    headers: {Accept: 'application/json', 'Content-Type': 'application/json', extra: 'test2'},
                };

                Api.postJSON('/test', body, config);

                expect(fetchMock.lastOptions()).toStrictEqual(optionsExpected);
                // don't mutate
                expect(body).toStrictEqual({content: 'test'});
            });
        });

        describe('PUT', () => {
            const body = {content: 'test'};

            beforeEach(() => fetchMock.put('*', {hello: 'world'}));

            it('should use the default options when options is not defined', () => {
                optionsExpected = {
                    method: 'PUT',
                    body: JSON.stringify(body),
                    headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
                };

                Api.putJSON('/test', body);

                expect(fetchMock.lastOptions()).toStrictEqual(optionsExpected);
                // don't mutate
                expect(body).toStrictEqual({content: 'test'});
            });

            it('should overwrite method and body in options and Accept and Content-Type in headers' +
                ' when options is defined', () => {
                const config = {
                    method: 'old',
                    body: 'old',
                    extra: 'test',
                    headers: {Accept: 'old', 'Content-Type': 'old', extra: 'test2'},
                };
                optionsExpected = {
                    method: 'PUT',
                    body: JSON.stringify(body),
                    extra: 'test',
                    headers: {Accept: 'application/json', 'Content-Type': 'application/json', extra: 'test2'},
                };

                Api.putJSON('/test', body, config);

                expect(fetchMock.lastOptions()).toStrictEqual(optionsExpected);
                // don't mutate
                expect(body).toStrictEqual({content: 'test'});
            });
        });

        describe('DELETE', () => {
            beforeEach(() => fetchMock.delete('*', {hello: 'world'}));

            it('should use the default options when options is not defined', () => {
                optionsExpected = {
                    method: 'DELETE',
                    headers: {Accept: 'application/json'},
                };

                Api.deleteJSON('/test');

                expect(fetchMock.lastOptions()).toStrictEqual(optionsExpected);
            });

            it('should overwrite method in options and Accept in headers when options is defined', () => {
                const config = {method: 'old', extra: 'test', headers: {Accept: 'old', extra: 'test2'}};
                optionsExpected = {
                    method: 'DELETE',
                    extra: 'test',
                    headers: {Accept: 'application/json', extra: 'test2'},
                };

                Api.deleteJSON('/test', config);

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