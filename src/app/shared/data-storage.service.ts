import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) { }

  private DbUrl = 'https://my-course-app-76190-default-rtdb.asia-southeast1.firebasedatabase.app';

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(this.DbUrl, recipes).subscribe(response => {
      console.log(response);
    });
  }
  fetchRecipes() {
    return this.authService.user.pipe(take(1), exhaustMap(user => {
      return this.http.get<Recipe[]>(this.DbUrl,
        {
          params: new HttpParams().set('auth', user.token)
        }
      );
    }), map(recipes => {
      return recipes.map(recipe => {
        return { ...recipe, ingredients: recipe.ingredient ? recipe.ingredient : [] };
      });
    }), tap(recipes => {
      this.recipeService.setRecipes(recipes);
    })
    )

  }
}
