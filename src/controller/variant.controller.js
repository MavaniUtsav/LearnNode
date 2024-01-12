const { variantService } = require("../services");

const createVariant = async (req,res) => {
    try {
        let variant = await variantService.createVariant(req.body)

        if (!variant) {
            throw new Error('Create variant error:')
        }

        res.status(200).json({
            success: true,
            message: 'variant created'
        })
    } catch (error) {
        console.log(error.message);
    }
}

const getVariant = async (req,res) => {
    try {
        let variant = await variantService.getVariant()

        if (!variant) {
            throw new Error('Get variant error:')
        }

        res.status(200).json({
            success: true,
            data: variant
        })
    } catch (error) {
        console.log(error.message);
        
    }
}

const getVariantById = async (req,res) => {
    try {
        let variant = await variantService.getVariant(req.params.id)

        if (!variant) {
            throw new Error('Get variant error:')
        }

        res.status(200).json({
            success: true,
            data: variant
        })
    } catch (error) {
        console.log(error.message);
    }
}

const deleteVariant = async (req,res) => {
    try {
        let variant = await variantService.deleteVariant(req.params.id)

        if (!variant) {
            throw new Error('Delete variant error:')
        }

        res.status(200).json({
            success: true,
            message: 'variant deleted!!'
        })
    } catch (error) {
        console.log(error.message);
    }
}

const updateVariant = async (req,res) => {
    try {
        let variant = await variantService.updateVariant(req.params.id,req.body)

        if (!variant) {
            throw new Error('Update variant error:')
        }

        res.status(200).json({
            success: true,
            message: 'variant Updated!!',
        })
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createVariant,
    getVariant,
    deleteVariant,
    updateVariant,
    getVariantById
}