const express = require('express')
const { getRecipes , getRecipe , removeRecipe , addRecipe , updateRecipe} = require('./recipe.controller')
const router = express.Router()



router.get('/', getRecipes)
router.get('/:recipeId', getRecipe)
router.delete('/:recipeId', removeRecipe)
router.post('/', addRecipe)
router.put('/:recipeId', updateRecipe)


module.exports = router