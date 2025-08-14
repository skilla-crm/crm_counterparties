import axios from 'axios';
const token = document.getElementById('root_reconciliation')?.getAttribute('token');
const baseURL = process.env.REACT_APP_BASE_URL;
const instanceWithToken = axios.create({
  withCredentials: false,
  baseURL: baseURL,
})

instanceWithToken.interceptors.request.use((config) => {
  config.headers.Authorization = token
  return config
})

export const getProfile = () => {
  return instanceWithToken.get(`https://api2.skilla.ru/api/profile`)
}

export const getNextPage = async (nextPage) => {
  try {
    const { data } = await axios.get(`${nextPage}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getRandomNumber = async (type) => {
  try {
    const { data } = await axios.get(`https://api2.skilla.ru/api/random_doc_num?type=${type}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: token
      }
    });
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

export const getCheckNumber = (type, num, partnership_id) => {
  return instanceWithToken.get(`https://api2.skilla.ru/api/check_doc_num?type=${type}&num=${num}&partnership_id=${partnership_id}`)
}





