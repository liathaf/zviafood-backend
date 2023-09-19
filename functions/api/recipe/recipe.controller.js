const recipeService = require('./recipe.service');


async function getRecipes(req,res){
    const recipes = await recipeService.query(req.query.q);
    res.send(recipes);
}

async function getRecipe(req,res){
    const recipeId = req.params.recipeId;
    const recipes = await recipeService.getById(recipeId);
    res.send(recipes);
} 

async function removeRecipe(req,res){
    const recipeId = req.params.recipeId;
    await recipeService.remove(recipeId);
    const newRecipes = await getRecipes(req,res);
    res.send(newRecipes);
} 

async function addRecipe(req,res){
    const recipe = req.body;
    await recipeService.add(recipe);
    res.send(recipe);
} 

async function updateRecipe(req,res){
    const recipe = req.body;
    await recipeService.update(recipe);
    res.send(recipe);
} 

module.exports = {
    getRecipes,
    getRecipe,
    removeRecipe,
    addRecipe,
    updateRecipe,
}
