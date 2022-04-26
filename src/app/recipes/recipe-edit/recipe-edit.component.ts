import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editmode= false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private router: Router, private recipeService: RecipeService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id =+params['id'];
        this.editmode = params['id'] != null;
        this.initForm();
      }
    );
  }

get controls(){
  return (<FormArray>this.recipeForm.get('ingridients')).controls;
}

  onSubmit(){
    // const newRecipe = new Recipe(this.recipeForm.value['name'],
    // this.recipeForm.value['description'],
    // this.recipeForm.value['imagePath'],
    // this.recipeForm.value['ingridients'])
    if(this.editmode){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    }
    else{
      this.recipeService.addRecipe(this.recipeForm.value);
    }
this.onCancel();
  }
  onAddIngridient(){
    (<FormArray>this.recipeForm.get('ingridients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }
  ondeleteIngridient(index: number){
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(index);
  }
onCancel(){
  this.router.navigate(['../'], {relativeTo: this.route});
}

 private initForm(){
   
   let recipeName = '';
   let recipeImgURL = '';
   let recipeDesc ='';
   let recipeIngridients = new FormArray([]);

   if(this.editmode){
    const recipe = this.recipeService.getRecipe(this.id);
     recipeName = recipe.name;
     recipeImgURL = recipe.imagePath;
     recipeDesc  = recipe.description;
     if (recipe['ingridients']){
       for(let ingridient of recipe.ingridients){
         recipeIngridients.push(
           new FormGroup({
             'name': new FormControl(ingridient.name, Validators.required),
             'amount': new FormControl(ingridient.amount, 
              [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
           })
         );
       }
     }
   }
  this.recipeForm = new FormGroup({
    'name': new FormControl(recipeName, Validators.required),
    'imagePath': new FormControl(recipeImgURL, Validators.required),
    'description': new FormControl(recipeDesc, Validators.required),
    'ingridients': recipeIngridients
  });
 }
}
