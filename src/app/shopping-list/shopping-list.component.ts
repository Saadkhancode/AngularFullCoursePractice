import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component( {
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: [ './shopping-list.component.css' ]
} )
export class ShoppingListComponent implements OnInit ,OnDestroy{
  ingredients!: Ingredient[];
  private Subscription!:Subscription
  constructor( private ShoppService: ShoppingListService ) { }

  ngOnInit (): void {
    this.ingredients = this.ShoppService.getIngredients()
   this.Subscription= this.ShoppService.ingredientChanged.subscribe( ( ingredient: Ingredient[] ) => {
      this.ingredients = ingredient
    } )
  }
ngOnDestroy(): void {
    this.Subscription.unsubscribe();
}
onEditItem(index:number){
  this.ShoppService.startedEditing.next(index)
}

}

