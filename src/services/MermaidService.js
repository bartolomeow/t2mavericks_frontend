import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const MermaidService = {
  post: (body) => {
    const mock = new MockAdapter(axios, { delayResponse: 2000 });

    mock.onGet('/apiendpoint').reply(200, {
      users: [{ id: 1, name: 'John Smith' }],
    });

    axios
      .get('/apiendpoint')
      .then((response) => {
        console.log(response.data);
        return response;
      })
      .catch((error) => {
        console.error('There was a problem with the fetch operation: ', error);
        return error;
      });
  },
};

export default MermaidService;
