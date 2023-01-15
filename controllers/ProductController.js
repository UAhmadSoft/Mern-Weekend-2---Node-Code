const Product = require('../models/ProductModel');
const User = require('../models/userModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getAllProducts = catchAsync(async (req, res, next) => {
  // const products = await Product.find().populate('seller');
  // const products = await Product.find().populate({
  //   path: 'seller',
  //   select: 'firstName email',
  // });
  // const products = await Product.find().populate({
  //   path: 'seller',
  //   select: '-age -phone',
  // });
  const products = await Product.find();

  res.status(200).json({
    status: 'success',
    products,
  });
});

exports.addNewProduct = catchAsync(async (req, res, next) => {
  const product = await Product.create({
    ...req.body,
    seller: req.user._id,
  });

  const user = await User.findById(req.user._id);

  user.products = [...user.products, product._id];
  await user.save();

  res.status(201).json({
    status: 'success',
    product,
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product)
    return next(
      new AppError(`Can't find product for id ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    product,
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product)
    return next(
      new AppError(`Can't find product for id ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    product,
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product)
    return next(
      new AppError(`Can't find product for id ${req.params.id}`, 404)
    );

  res.status(200).json({
    status: 'success',
    product,
  });
});
