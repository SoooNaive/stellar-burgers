export const ingredients = [
  {
    _id: '60666c42cc7b410027a1a9b1',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    __v: 0,
    uuid: '1',
  },
  {
    _id: '60666c42cc7b410027a1a9b5',
    name: 'Говяжий метеорит (отбивная)',
    type: 'main',
    proteins: 800,
    fat: 800,
    carbohydrates: 300,
    calories: 2674,
    price: 3000,
    image: 'https://code.s3.yandex.net/react/code/meat-04.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
    __v: 0,
    uuid: '2',
  },
  {
    _id: '60666c42cc7b410027a1a9b7',
    name: 'Соус Spicy-X',
    type: 'sauce',
    proteins: 30,
    fat: 20,
    carbohydrates: 40,
    calories: 30,
    price: 90,
    image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
    __v: 0,
    uuid: '3',
  }
];

export const ingredientOne = {
  _id: '60666c42cc7b410027a1a9b7',
  name: 'Соус Spicy-X',
  type: 'sauce',
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  __v: 0,
  uuid: '3',
};

export const ingredientTwo = {
  _id: '60666c42cc7b410027a1a9b5',
  name: 'Говяжий метеорит (отбивная)',
  type: 'main',
  proteins: 800,
  fat: 800,
  carbohydrates: 300,
  calories: 2674,
  price: 3000,
  image: 'https://code.s3.yandex.net/react/code/meat-04.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/meat-04-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/meat-04-large.png',
  __v: 0,
  uuid: '2',
};

export const ingredientThree = {
  _id: '60666c42cc7b410027a1a9b1',
  name: 'Краторная булка N-200i',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0,
  uuid: '1',
};

export const allIngredients = ['60666c42cc7b410027a1a9b1', 'Говяжий метеорит (отбивная)', '60666c42cc7b410027a1a9b1'];

export const orders = {
  success: true,
  orders: [{
    _id: '1',
    ingredients: ['11', '12', '13'],
    status: 'done',
    name: 'Name',
    createdAt: '111',
    updatedAt: '1112',
    number: 1,
  }],
  total: 1,
  totalToday: 1,
};

export const order = {
  success: true,
  orders: [{
    _id: '2',
    ingredients: ['11', '12', '13'],
    status: 'done',
    name: 'Name',
    createdAt: '111',
    updatedAt: '1112',
    number: 1,
  }]
};

export const userAnswer = {
  success: true,
  user: {
    email: 'test@test.ru',
    name: 'Test',
    password: 'string',
    token: 'string',
  }
}