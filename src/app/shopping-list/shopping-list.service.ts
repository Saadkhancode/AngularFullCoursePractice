import { EventEmitter } from "@angular/core";
import { Observable } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  ingredientChanged = new EventEmitter<Ingredient[]>()
  ingredients: Ingredient[] = [
    new Ingredient( 'Apples', 5 ),
    new Ingredient( 'Tomatos', 10 )
  ];
  getIngredients () {
    return this.ingredients.slice();
  }
  addIngredients ( ingredient: Ingredient ) {
    this.ingredients.push( ingredient )
    this.ingredientChanged.emit( this.ingredients.slice() )
  }
  addIngredient ( ingredient: Ingredient[] ) {
    this.ingredients.push( ...ingredient )
    this.ingredientChanged.emit( this.ingredients.slice() )

  }
}
