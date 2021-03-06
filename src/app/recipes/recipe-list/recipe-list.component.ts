import { Component, OnDestroy, OnInit, } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component( {
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: [ './recipe-list.component.css' ]
} )
export class RecipeListComponent implements OnInit,OnDestroy {

  recipes!: Recipe[]
  Subscription!:Subscription
  constructor( private recipeService: RecipeService ,private route:ActivatedRoute,private router:Router) { }

  ngOnInit (): void {
  this.Subscription=  this.recipeService.recipeChanged.subscribe((recipe:Recipe[])=>{
     this.recipes=recipe;
    })
    
    this.recipes = this.recipeService.getRecipes();
  }
   onNewRecipe(){
   this.router.navigate(['new'],{relativeTo:this.route})
  }
  ngOnDestroy(): void {
      this.Subscription.unsubscribe()
  }
}
