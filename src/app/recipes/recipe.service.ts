import { EventEmitter } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model"

export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>()
  private recipes: Recipe[] = [
    new Recipe( 'A  Test Recipe ', 'This is a simply test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', new Ingredient( 'meat', 1, ) ),
    new Recipe( 'A  Test Recipe ', 'This is a simply test', 'https://upload.wikimedia.org/wikipedia/commons/1/15/Recipe_logo.jpeg', new Ingredient( 'fish', 2 ) )
  ];
  getRecipes () {
    return this.recipes.slice();
  }
  addIngredients () {


  }
}
