const { productService } = require("../services");

const createProduct = async (req,res) => {
    try {
        let product = await productService.createProduct(req.body)

        if (!product) {
            throw new Error('Create product error:')
        }

        res.status(200).json({
            success: true,
            message: 'Product created'
        })
    } catch (error) {
        console.log(error.message);
    }
}

const getProduct = async (req,res) => {
    try {
        let product = await productService.getProduct()

        if (!product) {
            throw new Error('Get product error:')
        }

        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        console.log(error.message);
        
    }
}

const getProductById = async (req,res) => {
    try {
        let product = await productService.getProductById(req.params.id)

        if (!product) {
            throw new Error('Get product error:')
        }

        res.status(200).json({
            success: true,
            data: product
        })
    } catch (error) {
        console.log(error.message);
    }
}

const deleteProduct = async (req,res) => {
    try {
        let product = await productService.deleteProduct(req.params.id)

        if (!product) {
            throw new Error('Delete product error:')
        }

        res.status(200).json({
            success: true,
            message: 'Product deleted!!'
        })
    } catch (error) {
        console.log(error.message);
    }
}

const updateProduct = async (req,res) => {
    try {
        let product = await productService.deleteProduct(req.params.id,req.body)

        if (!product) {
            throw new Error('Update product error:')
        }

        res.status(200).json({
            success: true,
            message: 'Product Updated!!',
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createProduct,
    getProduct,
    deleteProduct,
    updateProduct,
    getProductById
}