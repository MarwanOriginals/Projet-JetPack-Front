const JetpackApi = require('./JetpackApi');
const Jetpack = require('../../Entity/Jetpack');

describe('JetpackApi get Jetpacks', function () {

  test('Test GetJetpacks empty', () => {
      let httpClientMock = {
          fetch: jest.fn()
      };

      httpClientMock.fetch.mockResolvedValue();

      let jetpackApi = new JetpackApi(httpClientMock);
      jetpackApi.getJetpacks().then(resp => {
          expect(Array.isArray(resp)).toBe(true);
          expect(resp.length).toBe(0);
      });
  });

    test('Test GetJetpacks', () => {
        let httpClientMock = {
            fetch: jest.fn()
        };

        httpClientMock.fetch.mockResolvedValue([
            {
                id: "123",
                name: "The Jetpack",
                image: "base64 ..."
            }
        ]);

        let jetpackApi = new JetpackApi(httpClientMock);
        jetpackApi.getJetpacks().then(resp => {
            expect(Array.isArray(resp)).toBe(true);
            expect(resp.length).toBe(1);
            expect(resp[0]).toBeInstanceOf(Jetpack)
        });
    });
});

describe('JetpackApi create Jetpack', function () {

  test('Test save no data', () => {
      let httpClientMock = {
          fetch: jest.fn()
      };

      let jetpack = new Jetpack();

      httpClientMock.fetch.mockResolvedValue();

      let jetpackApi = new JetpackApi(httpClientMock);
      jetpackApi.save(jetpack).then(resp => {
          expect(resp).toBeInstanceOf(Jetpack);
          expect(resp.id).toBeNull();
      });
  });

  test('Test save a Jetpack', () => {
      let httpClientMock = {
          fetch: jest.fn()
      };

      httpClientMock.fetch.mockResolvedValue([
            {
              "id": "e8019ec0-bfdc-4140-9dbb-4927e5ef5c8d",
              "name": "Le jetpack",
              "image": "Image 3"
            }
        ]);

      let jetpack = new Jetpack();
      jetpack.id = "e8019ec0-bfdc-4140-9dbb-4927e5ef5c8d";
      jetpack.name = "Le jetpack";
      jetpack.image = "Image 3";

      httpClientMock.fetch.mockResolvedValue();

      let jetpackApi = new JetpackApi(httpClientMock);
      jetpackApi.save(jetpack).then(resp => {
          expect(resp).toBeInstanceOf(Jetpack);
          expect(resp).toBeEqual(jetpack);
      });
  });

});

describe('JetpackApi search for Jetpacks', function () {

  test('Test getBookings empty', () => {
      let httpClientMock = {
          fetch: jest.fn()
      };

      httpClientMock.fetch.mockResolvedValue();

      let jetpackApi = new JetpackApi(httpClientMock);
      jetpackApi.getBookings().then(resp => {
          expect(Array.isArray(resp)).toBe(true);
          expect(resp.length).toBe(0);
      });
  });

  test('Test getBookings', () => {
      let httpClientMock = {
          fetch: jest.fn()
      };

      httpClientMock.fetch.mockResolvedValue([
          {
            id: "123",
            jetpackId: "456",
            startDate: "2019-09-10T00:00:00.000Z",
            endDate: "2019-09-15T00:00:00.000Z"
          }
      ]);

      let jetpackApi = new JetpackApi(httpClientMock);
      jetpackApi.getBookings().then(resp => {
          expect(Array.isArray(resp)).toBe(true);
          expect(resp.length).toBe(1);
          expect(resp[0]).toBeInstanceOf(Booking)
      });
  });

  test('Test getBookings multiple', () => {
      let httpClientMock = {
          fetch: jest.fn()
      };

      httpClientMock.fetch.mockResolvedValue([
          {
            id: "123",
            jetpackId: "456",
            startDate: "2019-09-10T00:00:00.000Z",
            endDate: "2019-09-15T00:00:00.000Z"
          },
          {
            id: "EZDA21",
            jetpackId: "456789",
            startDate: "2019-09-10T00:00:00.000Z",
            endDate: "2019-09-15T00:00:00.000Z"
          }
      ]);

      let jetpackApi = new JetpackApi(httpClientMock);
      jetpackApi.getBookings().then(resp => {
          expect(Array.isArray(resp)).toBe(true);
          expect(resp.length).toBe(2);
          expect(resp[0]).toBeInstanceOf(Booking);
          expect(resp[1]).toBeInstanceOf(Booking)
      });
  });
});