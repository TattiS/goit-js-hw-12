//функції для HTTP-запитів
export function getData(path, options) {
  const searchParams = new URLSearchParams(options);
  const url = path + `?${searchParams}`;
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
