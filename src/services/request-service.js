import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import epics from '../mocks/epics.json';
import diagram from '../assets/diagram.png'

const RequestService = {
  get: (url, body) => {
    const mock = new MockAdapter(axios, { delayResponse: 2000 });

    mock.onGet(url).reply(200, {
      message: 'Request successful',
      data: body,
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
  getEpics: (url) => {
    const mock = new MockAdapter(axios, { delayResponse: 2000 });

    mock.onGet(url).reply(200, epics);

    return axios
      .get(url)
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
  postMermaid: (url, body) => {
    const mock = new MockAdapter(axios, { delayResponse: 2000 });

    mock.onPost(url).reply(200, {
      message: 'Request successful',
      data: diagram,
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
