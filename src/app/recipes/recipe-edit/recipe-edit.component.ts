import { Component, OnChanges, OnInit, SimpleChanges,} from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode: boolean = false;
  recipeForm!: FormGroup;
  recipe!:Recipe

  constructor(private route: ActivatedRoute,
    private recipeService:RecipeService,
    private router:Router) { }
//  ngOnChanges(changes: SimpleChanges): void {
     
// }
ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    this.id = +params['id'];
    this.editMode = params['id'] != null;
    this.initForm();
      
    });
  }
  onSubmit(){
    // const newRecipe=new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']
    // );
  if(this.editMode){
    this.recipeService.updateRecipe(this.id,this.recipeForm.value);
  }else{
    this.recipeService.addRecipe(this.recipeForm.value);
  }
 
  this.onCancel();
}
onAddIngredients(){
  (<FormArray>this.recipeForm.get('ingredient')).push(
    new FormGroup({
      'name':new FormControl(null,Validators.required),
      'amount':new FormControl(null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
    })
  
  
  )
}
onCancel(){
  this.router.navigate(['../'],{relativeTo:this.route});
 
}

 private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredient = new FormArray([]);

  if (this.editMode){
    const recipe=this.recipeService.getRecipeId(this.id);
    recipeName=recipe.name;
    recipeImagePath=recipe.imagePath;
    recipeDescription=recipe.description;
    if (recipe['ingredient']){
      for(let ingredient of recipe.ingredient){
        recipeIngredient.push(
          new FormGroup({
            'name':new FormControl(ingredient.name,Validators.required),
            'amount':new FormControl(ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        )
      }
  }
  
  this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName,Validators.required ),
    'imagePath': new FormControl(recipeImagePath,Validators.required),
    'description': new FormControl(recipeDescription ,Validators.required),
    'ingredient': recipeIngredient
  });
  }

}
getControls()  {
  return (<FormArray>this.recipeForm.get('ingredient')).controls;
}
onDeleteIngredients(index:number){
  (<FormArray>this.recipeForm.get('ingredient')).removeAt(index);

}
}