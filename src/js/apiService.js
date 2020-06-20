// отвечает за логику HTTP-запросов к API
export default function pixabayApi(inguiry, pageNumber) {
  const baseUrl =
    'https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=';
  const key = '17103477-0bea4fbdc73e03f9367b91fb1';
  return fetch(
    baseUrl + `${inguiry}&page=${pageNumber}&per_page=12&key=${key}`,
  ).then(res => {
    return res.json();
  });
}
