import { Schema, model } from 'mongoose';

const RaitingSchema = new Schema({
  rate: {
    type: Number,
  },
  count: {
    type: Number,
  },
});

const ProductSchema = new Schema({
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

export const Product = model('Product', ProductSchema, 'products');
