import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import epicsAI from '../mocks/epicsAI.json';
import diagram from '../assets/diagram.png';

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

    mock.onGet(url).reply(200, epicsAI);

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
  postDocument: (url, body, type) => {
    const mock = new MockAdapter(axios, { delayResponse: 5000 });

    mock.onPost(url).reply(200, epicsAI);

    const getConfig = () => {
      const configArr = {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API}`,
        },
        responseType: 'arraybuffer',
      };
      const config = {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_API}`,
        },
      };
      if (type) return configArr;
      else return config;
    };

    return axios
      .post(url, body, getConfig())
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error;
      });
  },
};

export default RequestService;
