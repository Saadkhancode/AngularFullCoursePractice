import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeResolverService implements Resolve<Recipe[]> {

  constructor( private dataStoreService:DataStorageService,
    private recipeService:RecipeService
) { }

    resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot) {
      const recipe=this.recipeService.getRecipes();
      if (recipe.length===0){
      return   this.dataStoreService.fetchRecipes();
      }else{
      return recipe;
      }

    }
}
