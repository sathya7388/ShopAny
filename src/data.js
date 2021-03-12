export var cart = [
  {
    id: '1',
    name: 'Logitech Keyboard',
    description: 'keyboard description',
    quantity: 20,
    price: 129.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
  {
    id: '2',
    name: 'Acer Aspire Desktop',
    description: 'desktop description',
    quantity: 43,
    price: 239.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
  {
    id: '3',
    name: 'Acer Aspire Desktop',
    description: 'dektop description',
    quantity: 43,
    price: 239.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
  {
    id: '4',
    name: 'Logitech Keyboard',
    description: 'keyboard description',
    quantity: 20,
    price: 129.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
];

export var savedForLater = [
  {
    id: '1',
    name: 'Logitech Keyboard',
    description: 'keyboard description',
    quantity: 20,
    price: 129.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
  {
    id: '2',
    name: 'Acer Aspire Desktop',
    description: 'desktop description',
    quantity: 43,
    price: 239.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
  {
    id: '3',
    name: 'Acer Aspire Desktop',
    description: 'dektop description',
    quantity: 43,
    price: 239.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
  {
    id: '4',
    name: 'Logitech Keyboard',
    description: 'keyboard description',
    quantity: 20,
    price: 129.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
];
export var productData = [
  {
    id: '1',
    name: 'Logitech Keyboard',
    description: 'keyboard description',
    quantity: 20,
    price: 129.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
  {
    id: '2',
    name: 'Acer Aspire Desktop',
    description: 'desktop description',
    quantity: 43,
    price: 239.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
  {
    id: '3',
    name: 'Acer Aspire Desktop',
    description: 'dektop description',
    quantity: 43,
    price: 239.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
  {
    id: '4',
    name: 'Logitech Keyboard',
    description: 'keyboard description',
    quantity: 20,
    price: 129.99,
    deliveryFee: 10,
    discount: 5,
    categoryId: 1,
    sellerId: 1,
  },
];
let futureDeliveryDate = new Date()
futureDeliveryDate.setDate(futureDeliveryDate.getDate() + 10)
export var orderData = [
  {
    id: '1',
    userId: 4,
    userName: 'Sri',
    userEmail: 'user1@abc.com',
    productId: 3,
    productName: 'Acer Aspire Desktop',
    productPrice: '239.99',
    categoryId: 1,
    sellerId: 1,
    sellerName: 'Mark',
    sellerCompanyName: 'Marks Shoppers',
    status: 2,
    quantity:1,
    placedDate: new Date (),
    deliveryDate: futureDeliveryDate ,
  },
  {
    id: '2',
    userId: 4,
    userName: 'Sri',
    userEmail: 'user1@abc.com',
    productId: 4,
    productName: 'HP DeskJet Plus',
    productPrice: '115.50',
    categoryId: 1,
    sellerId: 1,
    sellerName: 'Mark',
    sellerCompanyName: 'Marks Shoppers',
    status: 4,
    quantity:1,
    placedDate: new Date ('2020/5/30'),
    deliveryDate: new Date ('2020/6/12'),
  },
  {
    id: '3',
    userId: 4,
    userName: 'Sri',
    userEmail: 'user1@abc.com',
    productId: 14,
    productName: 'Hamilton Sandwich Maker',
    productPrice: '60.82',
    categoryId: 3,
    sellerId: 1,
    sellerName: 'Mark',
    sellerCompanyName: 'Marks Shoppers',
    status: 4,
    quantity:1,
    placedDate: new Date ('2021/2/10'),
    deliveryDate: new Date ('2021/2/13'),
  },
  {
    id: '4',
    userId: 4,
    userName: 'Sri',
    userEmail: 'user1@abc.com',
    productId: 18,
    productName: 'OMORC Sports Water Bottle',
    productPrice: '19.99',
    categoryId: 4,
    sellerId: 1,
    sellerName: 'Mark',
    sellerCompanyName: 'Marks Shoppers',
    status: 3,
    quantity:1,
    placedDate: new Date ('2021/2/14'),
    deliveryDate: new Date ('2021/2/18'),
  },
];
export var orderStatus = [
  {id: 1, name: 'Processing'},
  {id: 2, name: 'Ready For Shipment'},
  {id: 3, name: 'Shipped'},
  {id: 4, name: 'Delivered'}
]