import prisma from '../db';

// ─── Get All Products ─────────────────────────────── 🟩 ─

export const getProducts = async (req, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.user.id,
    },
    include: {
      products: true,
    },
  });
  res.json({ data: user.products });
};

// ─── Get One Product ──────────────────────────────── 🟩 ─

export const getOneProduct = async (req, res) => {
  //get the id of product from params
  const id = req.params.id;
  // get the product out of data base
  const product = await prisma.product.findUnique({
    where: {
      id,
      belongsToId: req.user.id,
    },
  });
  res.json({ data: product });
};

// ─── Create A Product ─────────────────────────────── 🟩 ─
export const createProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        belongsToId: req.user.id,
      },
    });
    res.json({ data: product });
  } catch (e) {
    next(e); //throw error when it does not belongs to user id
  }
};

// ─── Update Product ───────────────────────────────── 🟩 ─

export const updateProduct = async (req, res) => {
  const updated = await prisma.product.update({
    //when we use where that is going to fine first then do sth
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
    },
    data: {
      name: req.body.name,
    },
  });
  res.json({ data: updated });
};

// ─── Delete a product ────────────────────────────────── 🟩 ─

export const deleteProduct = async (req, res) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsToId: req.user.id,
      // id_belongsToId: {
      //   id: req.params.id,
      //   belongsToId: req.user.id,
      // },
    },
  });
  res.json({ data: deleted });
};
