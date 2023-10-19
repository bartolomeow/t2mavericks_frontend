import axios from 'axios';
// import epicsAI from '../mocks/epicsAI.json';

const RequestService = {
  postDocument: (url, body, type) => {
    // Uncomment these if you want a mocked response!
    // const mock = new MockAdapter(axios, { delayResponse: 5000 });
    // mock.onPost(url).reply(200, epicsAI);

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
