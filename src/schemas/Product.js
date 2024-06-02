const { Schema, model } = require('mongoose');

const RaitingSchema = Schema({
  rate: {
    type: Number,
  },
  count: {
    type: Number,
  },
});

const ProductSchema = Schema({
  title: {
    type: String,
    required: [true, 'The title is required'],
  },
  price: {
    type: Number,
    required: [true, 'The price is required'],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: [true, 'The category is required'],
  },
  image: {
    type: String,
    required: [true, 'The image is required'],
  },
  rating: {
    type: RaitingSchema,
  },
});

ProductSchema.methods.toJSON = function () {
  const { __v, _id, ...product } = this.toObject();
  product.id = _id;

  return product;
};

module.exports = model('Product', ProductSchema, 'products');
