const { Router } = require("express");
const { Product,Brand,Category } = require('../db');

const router=Router();

router.post('/', async(req,res)=>{
    const{name,brand,stock,price,description,img,category}=req.body;
    try {
        
        const findBrand=await Brand.findOne({
            where:{
                name:brand,
            }
        })
        const findCategory=await Category.findOne({
            where:{
                name:category,
            }
        })
        await Product.create({
            title:name,
            img,
            price,
            description,
            stock,
            categoryId:findCategory.dataValues.id,
            brandId: findBrand.dataValues.id,
        },
        )
        res.send('Product created successfully') 
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
})


module.exports = router;