import { Injectable } from "@angular/core";
import { Subject } from "rxjs/internal/Subject";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Recipe } from "./recipe.model"
@Injectable()
export class RecipeService {

  constructor(private slService: ShoppingListService) { }
  // recipeSelected = new EventEmitter<Recipe>()
  recipeChanged= new Subject<Recipe[]>()
  private recipes:Recipe[]=[];
  // private recipes: Recipe[] = [
  //   new Recipe('Tasty Schnitzel', 'A super-tasty Schnitzel - just awesome!', 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG', [
  //     new Ingredient('meat', 1),
  //     new Ingredient('French Fries', 20)]),
  //   new Recipe('A Big Fat Burger ', 'What else u need to say?', 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg', [new Ingredient('Buns', 2),
  //   new Ingredient('Meat', 1)])
  // ];
  setRecipes(recipe:Recipe[]){
    this.recipes=recipe;
    this.recipeChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes.slice();
  }
  getRecipeId(index: number) {
    return this.recipes[index]
  }
  addIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.slService.addIngredient(ingredient)
  }
  addRecipe(recipe:Recipe){
  this.recipes.push(recipe);
  this.recipeChanged.next(this.recipes.slice());

  }
  updateRecipe(index:number,newRecipe:Recipe){
    this.recipes[index]=newRecipe;
  this.recipeChanged.next(this.recipes.slice());
}
deleteRecipe(index:number){
  this.recipes.splice(index,1);
  this.recipeChanged.next(this.recipes.slice());
}
}