import { Router } from 'express';
import { body, oneOf, validationResult } from 'express-validator';
import { handleInputErrors } from './modules/middlewares';
import {
  getProducts,
  getOneProduct,
  createProduct,
  deleteProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getOneUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/update';

const router = Router();
//ANCHOR Product Stuff
/* ■■■■■■■■■■■■■■■■■■■■ Product Stuff ■■■■■■■■■■■■■■■■■■■ */

// ─── Get A Product ────────────────────────────────── 🟩 ─
router.get('/product', getProducts);

// ─── Get A Product By Id ──────────────────────────── 🟩 ─
router.get('/product/:id', getOneProduct);

// ─── Update A Product By Id ───────────────────────── 🟩 ─
/**
 * body('name') => req.body should have a field on it called name
 * body middleware will attach sth to req  then validationResult look at it
 */
router.put(
  '/product/:id',
  //two middleware is here
  body('name').isString(),
  handleInputErrors,
  (req, res) => {}
);

// ─── Create A Product ─────────────────────────────── 🟩 ─
router.post(
  '/product',
  body('name').isString(),
  handleInputErrors,
  createProduct
);

// ─── Delete A Product By Id ───────────────────────── 🟩 ─
router.delete('/product/:id', deleteProduct);

//ANCHOR Update Stuff
/* ■■■■■■■■■■■■■■■■■■■■ Update Stuff ■■■■■■■■■■■■■■■■■■■■ */

// ─── Get All Updates ─────────────────────────────────── 🟩 ─
router.get('/update', getUpdates);

// ─── Get A Update By Id ───────────────────────────── 🟩 ─
router.get('/update/:id', getOneUpdate);

// ─── Update An Update By Id ───────────────────────── 🟩 ─
router.put(
  '/update/:id',
  //middlewares
  body('title').optional(),
  body('body').optional(),
  body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
  body('version').optional(),
  updateUpdate
);

// ─── Create A Update ──────────────────────────────── 🟩 ─
router.post(
  '/update',
  body('title').exists().isString(),
  body('body').exists().isString(),
  body('productId').exists().isString(),
  createUpdate
);

// ─── Delete A Update By Id ────────────────────────── 🟩 ─
router.delete('/update/:id', deleteUpdate);

//ANCHOR Update Points
/* ■■■■■■■■■■■■■■■■■■■■ Update Points ■■■■■■■■■■■■■■■■■■■ */

// ─── Get A Update Point ───────────────────────────── 🟩 ─
router.get('/updatepoint', (req, res) => {
  res.json({ message: 'amir' });
});

// ─── Get A Update Point By Id ─────────────────────── 🟩 ─
router.get('/updatepoint/:id', () => {});

// ─── Update A Update Point By Id ──────────────────── 🟩 ─
router.put(
  '/updatepoint/:id',
  body('name').optional().isString(),
  body('description').optional().isString(),
  () => {}
);

// ─── Create A Update Point ────────────────────────── 🟩 ─
router.post(
  '/updatepoint',
  body('name').isString(),
  body('description').isString(),
  body('updateId').exists().isString(),
  () => {}
);

// ─── Delete A Update Point By Id ──────────────────── 🟩 ─
router.delete('/updatepoint/:id', () => {});

// ─── Handle Error ─────────────────────────────────── 🟩 ─

router.use((err, req, res, next) => {
  console.log(err);
  res.json({ message: 'error from router handler' });
});
/* ■■■■■■■■■■■■■■■■■■■■■■■ Export ■■■■■■■■■■■■■■■■■■■■■■■ */
export default router;
