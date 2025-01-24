import axios from 'axios';
//функції для HTTP-запитів
export function getAllData(path, options) {
  const searchParams = new URLSearchParams(options);
  const url = path + `?${searchParams}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
export async function getData(path, options) {
  try {
    const axiosOptions = {
      params: options,
    };
    const { data } = await axios.get(path, axiosOptions);
    return data;
  } catch (error) {
    throw new Error('There is an error:', error);
  }
}
