const getProductDetails = (id) => {
  return new Promise((resolve, reject) => {
    return fetch(id, (user) => {
      fetch(user.productId, (product) => {
        resolve(product);
      });
    });
  });
};
