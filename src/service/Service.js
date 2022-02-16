import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const API = 'http://139.59.225.83:3000/api/';

axios.interceptors.request.use(
  async config => {
    config.headers['Content-Type'] = 'application/json';
    if (
      config.url.includes('139.59.225.83') ||
      config.url.includes('coinbell')
    ) {
      const token = await AsyncStorage.getItem('accessToken');
      if (token) config.headers = {Authorization: 'Bearer ' + token};
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

export const getRequest = uri => {
  return new Promise((resolve, reject) => {
    axios
      .get(API + uri)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const postRequest = (uri, body) => {
  return new Promise((resolve, reject) => {
    axios
      .post(API + uri, body)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const putRequest = (uri, body) => {
  return new Promise((resolve, reject) => {
    axios
      .put(API + uri, body)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

// GET TOKENS
export const fetchCounhubPairs = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://sapi.coinhub.mn/v1/market/tickers')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const fetchTradePairs = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('https://trade.mn:116/api/v2/exchange/checkpair?pair=IHC/MNT')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const fetchDaxPairs = () => {
  return new Promise((resolve, reject) => {
    axios
      .post('https://api.dax.mn/v1/graphql', {
        operationName: 'Pairs',
        variables: {
          sysPairWhere: {
            is_active: {
              _eq: true,
            },
            quoteAsset: {
              code: {
                _eq: 'MNT',
              },
            },
          },
        },
        query:
          'query Pairs($sysPairWhere: sys_pair_bool_exp) {\n  sys_pair(where: $sysPairWhere) {\n    id\n    baseAsset {\n      code\n      name\n      scale\n      total_market_cap\n      __typename\n    }\n    price {\n      last_price\n      __typename\n    }\n    quoteAsset {\n      code\n      name\n      scale\n      __typename\n    }\n    symbol\n    is_active\n    stats24 {\n      change24h\n      __typename\n    }\n    base_tick_size\n    quote_tick_size\n    __typename\n  }\n  ex_pair_stats_24h {\n    b24h_price\n    change24h\n    symbol\n    pair_id\n    last_price\n    updated_dt\n    vol\n    __typename\n  }\n}\n',
      })
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};

export const fetchPhoneCodes = () => {
  return new Promise((resolve, reject) => {
    axios
      .get('http://country.io/phone.json')
      .then(response => {
        resolve(response.data);
      })
      .catch(error => {
        reject(error.response);
      });
  });
};
