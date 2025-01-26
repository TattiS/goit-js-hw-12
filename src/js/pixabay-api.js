import axios from 'axios';
//функції для HTTP-запитів
const path = 'https://pixabay.com/api/';
const searchOptions = {
  key: '48221112-8c56db48dd0c7c6f6f060339d',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 15,
  page: 1,
};

export function getAllData(options) {
  const searchParams = new URLSearchParams(options);
  const url = path + `?${searchParams}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
export async function getData(query) {
  try {
    searchOptions.page = 1;
    searchOptions.q = query;
    const axiosOptions = {
      params: searchOptions,
    };
    const { data } = await axios.get(path, axiosOptions);
    return data;
  } catch (error) {
    throw new Error('There is an error:', error);
  }
}
export async function getDataByPage(pageGroup = 1) {
  try {
    searchOptions.page = pageGroup;
    const axiosOptions = {
      params: searchOptions,
    };
    const { data } = await axios.get(path, axiosOptions);
    return data;
  } catch (error) {
    throw new Error('There is an error:', error);
  }
}
export function getPerPage() {
  return searchOptions.per_page;
}
