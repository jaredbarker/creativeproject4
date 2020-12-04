<template>
  <div class="home">
    <p>This is a collection of recipes from my family.  Feel free try them out and add your own!</p>
    <button @click="startAdd">Add a Recipe</button>
    <div v-show="addingRecipe === 'true'">
      <form v-on:submit.prevent="addRecipe">
        <input v-model="addName">
        <input v-model="addIngredients">
        <input v-model="addInstructions">
        <input v-model="addAuthor">
        <button type="submit">Add</button>
      </form>
    </div>
    <ul v-for="recipe in recipes" :key="recipe._id">
      <li>
        <div v-show="editingRecipe === 'true'">
          <form v-on:submit.prevent="editRecipe(recipe)">
            <input v-model="addName" :placeholder="recipe.name">
            <input v-model="addIngredients">
            <input v-model="addInstructions">
            <input v-model="addAuthor">
            <button type="submit">Save</button>
          </form>
        </div>
        <div>
          {{recipe.name}} 
          <button v-on:click="likeRecipe(recipe)">Like ({{recipe.likes}})</button>
          <button v-on:click="startEdit">Edit</button>
          <button v-on:click="deleteRecipe(recipe)">Delete</button>
        </div>
        <div>
          Contributed by: {{recipe.author}}
        </div>
        <div>
          {{recipe.ingredients}}
        </div>
        <div>
          {{recipe.instructions}}
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
   return {
      recipes: [],
      addingRecipe: "false",
      editingRecipe: "false",
      addName: '',
      addIngredients: '',
      addInstructions: '',
      addAuthor: ''
   }
  },
  created() {
    this.getRecipes();
  },
  methods: {
     async getRecipes() {
       try {
        var response = await axios.get('/api/recipes');
        this.recipes = response.data;
        }
        catch (error) {
          console.log(error);
        }
     },
     async deleteRecipe(recipe) {
       try {
          await axios.delete('/api/delete' + recipe._id);
          this.getRecipes();
        }
        catch (error) {
          console.log(error);
        }
     },
     startEdit() {
       this.editingRecipe = 'true';
     },
     async editRecipe(recipe) {
       try {
        await axios.put('/api/edit' + recipe._id, {name: this.addName, ingredients: this.addIngredients, author: this.addAuthor, instructions: this.addInstructions});
        this.getRecipes();
        this.editingRecipe = 'false';
        }
        catch (error) {
          console.log(error);
        }
     },
     startAdd() {
       this.addingRecipe = 'true';
     },
     async addRecipe() {
       try {
        await axios.post('/api/add');
        this.getRecipes();
        this.addingRecipe = 'false';
        }
        catch (error) {
          console.log(error);
        }
     },
     async likeRecipe(recipe) {
        try {
        await axios.put('/api/like' + recipe._id);
        this.getRecipes();
        } catch(error) {
          console.log(error);
        }
     }
  }
}
</script>
