import { Component,  OnInit } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Component( {
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: [ './recipes.component.css' ],
  
} )
export class RecipesComponent implements OnInit {
  selectRecipe!: Recipe;
  /* we dont need subscription because that work done with routerLink directive */
  // private Subscription!:Subscription;
  constructor( private recipeService: RecipeService ) { }

  ngOnInit (): void {
  //  this.Subscription= this.recipeService.recipeSelected.subscribe( ( recipe: Recipe ) => {
  //     this.selectRecipe = recipe
  //   } )
  }
// ngOnDestroy(): void {
//     this.Subscription.unsubscribe();
// }
// }
}
