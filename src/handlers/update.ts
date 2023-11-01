import prisma from '../db';

// ─── Get All Updates ─────────────────────────────── 🟩 ─

const getUpdates = async (req, res) => {
  //prisma search in product model
  const products = await prisma.product.findMany({
    //where to search? where that id is equal  to req.update.id
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = products.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  res.json({ data: updates });
};

// ─── Get One Update ──────────────────────────────── 🟩 ─

const getOneUpdate = async (req, res) => {
  // get the update out of data base
  const update = await prisma.update.findUnique({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: update });
};

// ─── Create Update ────────────────────────────────── 🟩 ─

const createUpdate = async (req, res) => {
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.productId,
    },
  });
  if (!product) {
    //does not belongs to user
    return res.json({ message: 'nope' });
  }
  const update = await prisma.update.create({
    data: {
      title: req.body.title,
      body: req.body.body,
      product: { connect: { id: product.id } },
    },
  });
  res.json({ data: update });
};

// ─── Update an Update ───────────────────────────────── 🟩 ─

const updateUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    //when we use where that is going to fine first then do sth
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({ message: 'nope' });
  }

  const updatedUpdate = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  res.json({ data: updatedUpdate });
};

// ─── Delete an Update ────────────────────────────────── 🟩 ─

const deleteUpdate = async (req, res) => {
  const product = await prisma.product.findMany({
    //when we use where that is going to fine first then do sth
    where: {
      belongsToId: req.user.id,
    },
    include: {
      updates: true,
    },
  });
  const updates = product.reduce((allUpdates, product) => {
    return [...allUpdates, ...product.updates];
  }, []);
  const match = updates.find((update) => update.id === req.params.id);

  if (!match) {
    // handle this
    return res.json({ message: 'nope' });
  }

  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  res.json({ data: deleted });
};

/* ■■■■■■■■■■■■■■■■■■■■■■■ Export ■■■■■■■■■■■■■■■■■■■■■■■ */

export { getUpdates, getOneUpdate, createUpdate, updateUpdate, deleteUpdate };
