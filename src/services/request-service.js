import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const RequestService = {
  get: (url, body) => {
    const mock = new MockAdapter(axios, { delayResponse: 2000 });

    mock.onGet(url).reply(200, {
      users: [{ id: 1, name: 'John Smith' }],
    });

    return axios
      .get(url, body)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  post: (url, body) => {
    const mock = new MockAdapter(axios, { delayResponse: 2000 });

    mock.onPost(url).reply(200, {
      message: 'Request successful',
      data: body,
    });

    return axios
      .post(url, body)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
  put: (url, body) => {
    const mock = new MockAdapter(axios, { delayResponse: 2000 });

    mock.onPut(url).reply(200, {
      message: 'Request successful',
      data: body,
    });

    return axios
      .put(url, body)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
};

export default RequestService;