import { Request, Response } from 'express';
import { Router } from 'express';
import { Product } from '../schemas/Product';

const router = Router();

router.get('/', async (req: Request, res: Response) => {
  const category = req.query.category;

  try {
    const products = category
      ? await Product.find({ category })
      : await Product.find();

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

router.get('/:id', async (req: Request, res: Response) => {
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

router.post('/', async (req: Request, res: Response) => {
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
