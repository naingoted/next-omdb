import { getOmdbApi } from '../../actions/hookActions';
import moxios from 'moxios';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  describe('non-error response', () => {
    // create mocks for callback args
    const mockSetData = jest.fn();
    const mockSetServerError = jest.fn();
    const data = {};
      
    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 200,
          response: data,
        });
      });
      
      await getOmdbApi(mockSetData, mockSetServerError);
      
    });
    test('calls the getOmdbApi callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetData).toHaveBeenCalledWith(data);
    });
    test('does not call the setServerError callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetServerError).not.toHaveBeenCalled();
    });
  });

  describe('5xx error response', () => {
    // create mocks for callback args
    const mockSetData = jest.fn();
    const mockSetServerError = jest.fn();
      
    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 500,
        });
      });
      
      await getOmdbApi(mockSetData, mockSetServerError);
      
    });
    test('calls the getOmdbApi callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetServerError).toHaveBeenCalledWith(true);
    });
    test('does not call the setServerError callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetData).not.toHaveBeenCalled();
    });
  });
  describe('4xx error response', () => {

    const mockSetData = jest.fn();
    const mockSetServerError = jest.fn();
      
    beforeEach(async () => {
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.respondWith({
          status: 404,
        });
      });
      
      await getOmdbApi(mockSetData, mockSetServerError);
      
    });
    test('calls the getOmdbApi callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetServerError).toHaveBeenCalledWith(true);
    });
    test('does not call the setServerError callback on axios response', async () => {
     // see whether mock was run with the correct argument
      expect(mockSetData).not.toHaveBeenCalled();
    });
  });
});