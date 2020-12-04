const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/recipes', {
    useNewUrlParser: true
});
//need to add another param

const recipeSchema = mongoose.Schema({name: String, ingredients: String, author: String, instructions: String, likes: Number});

const Recipe = mongoose.model('Recipe', recipeSchema);

app.get('/api/recipes', async (req, res) => {
	try{
     var list = await Recipe.find();
     res.send(list); 
   } catch (error) {
     console.log(error);
     res.sendStatus(500);
   }
});

app.post('/api/add', async (req, res) => {
   const recipe = new Recipe({name: req.body.name, ingredients: req.body.ingredients, author: req.body.author, instructions: req.body.instructions, likes: 0});
   try{
       await recipe.save();
} catch(error) {
    res.sendStatus(500);
}

});

app.put('/api/edit:id', async (req, res) => {
    try {
        var recipe = await Recipe.findOne({_id: req.params.id});
        recipe.name = req.body.name;
        recipe.ingredients = req.body.ingredients;
        recipe.author = req.body.author;
        recipe.instructions = req.body.instructions;
        recipe.likes = req.body.likes;
        await item.save();
    } catch(error) {
        res.sendStatus(500);
    }
});

app.put('/api/like:id', async (req, res) => {
    try {
        var recipe = await Recipe.findOne({_id: req.params.id});
        recipe.likes = recipe.likes + 1;
        await recipe.save();
    } catch(error) {
        res.sendStatus(500);
    }
});

app.delete('/api/delete:id', async (req, res) => {
    try {
        await Recipe.deleteOne({_id: req.params.id});
    }
    catch(error) {
        res.sendStatus(500);
    }
});

app.listen(3001, () => console.log('Server listening on port 3001!'));

