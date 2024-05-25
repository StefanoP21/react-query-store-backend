const { Router } = require('express');
const { request, response } = require('express');
const Product = require('../schemas/Product');

const router = Router();

router.get('/', async (req = request, res = response) => {
  const category = req.query.category;

  if (!category) {
    return res.status(400).json({
      ok: false,
      msg: 'La categoria es obligatoria',
    });
  }

  try {
    const products = await Product.find({ category });

    if (!products || products.length === 0) {
      return res.status(404).json({
        ok: false,
        msg: 'No hay productos en esta categoria',
      });
    }

    res.status(200).json({
      ok: true,
      products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
    });
  }
});

router.get('/:id', async (req = request, res = response) => {
  const productId = req.params.id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        ok: false,
        msg: 'Producto no encontrado',
      });
    }

    res.status(200).json({
      ok: true,
      product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
    });
  }
});

router.post('/', async (req = request, res = response) => {
  const product = new Product(req.body);

  try {
    const productDB = await product.save();

    res.status(201).json({
      ok: true,
      product: productDB,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: 'Error en el servidor',
    });
  }
});

module.exports = router;
