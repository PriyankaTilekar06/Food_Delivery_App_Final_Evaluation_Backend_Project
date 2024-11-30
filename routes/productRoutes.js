const express = require('express');
const app = express()
const Product = require('../models/product');

app.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});


app.post('/', async (req, res) => {
    try {
        const { title, description, image, price } = req.body;

        if (!title || !description || !image || !price) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const product = await Product.create({ title, description, image, price });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: 'Failed to add product' });
    }
});


app.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description, image, price } = req.body;

        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { title, description, image, price },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json(updatedProduct);
    } catch (err) {
        res.status(500).json({ error: 'Failed to update product' });
    }
});

app.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const deletedProduct = await Product.findByIdAndDelete(id);

        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

module.exports = app;
