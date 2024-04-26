export function checkResponse(response: Response) {
  return response.ok
    ? response.json()
    : Promise.reject(`Ошибка ${response.status}`);
}
