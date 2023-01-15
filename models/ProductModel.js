const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Seller is required'],
  },
  name: { type: String, required: [true, 'name is required'] },
  description: { type: String, required: [true, 'description is required'] },
});

// /^find/
productSchema.pre(/^find/, function (next) {
  this.populate({ path: 'seller', select: '-age -phone' });
  next();
});

const Product = mongoose.model('Product', productSchema);
module.exports = Product;
