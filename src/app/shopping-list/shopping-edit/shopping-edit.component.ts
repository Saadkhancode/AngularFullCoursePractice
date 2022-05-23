import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component( {
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: [ './shopping-edit.component.css' ]
} )
export class ShoppingEditComponent implements OnInit ,OnDestroy{
  // @ViewChild( 'nameInput' ) nameInputRef!: ElementRef;
  @ViewChild( 'f' ) slForm!:NgForm
   Subscription!:Subscription;
   editMode:boolean=false;
   editingItemIndex!:number;
   editedItem!:Ingredient;
  constructor( private slService: ShoppingListService ) { }

  ngOnInit (): void {
this.Subscription=this.slService.startedEditing.subscribe((index:number)=>{
  this.editingItemIndex=index;
  this.editMode=true;
  this.editedItem=this.slService.getIngredientIndex(index)
  this.slForm.setValue({
    name:this.editedItem.name,
    amount:this.editedItem.amount
  })
})

  }
  onSubmit (form:NgForm) {
    const value=form.value;
    // const ingName = this.nameInputRef.nativeElement.value;
    // const ingAmount = this.amountInputRef.nativeElement.value
    const addIngredients = new Ingredient( value.name, value.amount )
    if(this.editMode){
      this.slService.updateIngredient(this.editingItemIndex,addIngredients)
    }else{

      this.slService.addIngredients( addIngredients )
    }
    this.editMode=false;
    form.reset();
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  onDelete(){
this.onClear()
this.slService.onDeleteIngredients(this.editingItemIndex)
  }
ngOnDestroy(): void {
    this.Subscription.unsubscribe();
}
}
