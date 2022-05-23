import { Observable, Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService {
  // ingredientChanged=new EventEmitter<Ingredient[]>()
  ingredientChanged = new Subject<Ingredient[]>()
  startedEditing = new Subject<number>()
  private ingredients:Ingredient[]=[];
  // ingredients: Ingredient[] = [
  //   new Ingredient( 'Apples', 5 ),
  //   new Ingredient( 'Tomatos', 10 )
  // ];
  getIngredients () {
    return this.ingredients.slice();
  }
  getIngredientIndex(index:number){
    return this.ingredients[index]
  }
  addIngredients ( ingredient: Ingredient ) {
    this.ingredients.push( ingredient )
    this.ingredientChanged.next( this.ingredients.slice() )
  }
  addIngredient ( ingredient: Ingredient[] ) {
    this.ingredients.push( ...ingredient )
    this.ingredientChanged.next( this.ingredients.slice() )

  }
  updateIngredient(index:number,newIngredient:Ingredient){
    this.ingredients[index]=newIngredient;
    this.ingredientChanged.next(this.ingredients.slice());
  }
  onDeleteIngredients(index:number){
    this.ingredients.splice(index,1);
    this.ingredientChanged.next(this.ingredients.slice());
  }
}
