import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingridient } from '../shared/ingridient.model';
import { ShoppingListService } from '../shoppoing-list/shopping-list.service';
import { Recipe } from './recipe.model'

@Injectable()

export class RecipeService{

  recipeschanged = new Subject<Recipe[]>();

    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [];
      //   new Recipe('A test recipe', 'test yo', 
      //   'https://www.cookipedia.co.uk/wiki/images/c/cf/Seven_spice_swordfish_steaks_recipe.jpg',
      //   [
      //     new Ingridient('Potato', 2),
      //     new Ingridient ('Tomato', 3)
      //   ]),
      //   new Recipe('A test recipe', 'testinggg', 
      //   'https://www.cookipedia.co.uk/wiki/images/c/cf/Seven_spice_swordfish_steaks_recipe.jpg',
      //   [
      //     new Ingridient('Lemon', 3),
      //     new Ingridient('Ginger', 2)
      //   ])
      // ];

      constructor(private SLservice: ShoppingListService){

      }

      setrecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipeschanged.next(this.recipes.slice());
      }

      getRecipes(){
        return this.recipes.slice();
      }

      getRecipe(index: number){
        return this.recipes[index];
      }
      
      addIngridientstoShoppingList(ingridients: Ingridient[]){
        this.SLservice.addIngridients(ingridients);
      }

      addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipeschanged.next(this.recipes.slice());
      }
      updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index]= newRecipe;
        this.recipeschanged.next(this.recipes.slice());
      }
      deleteRecipe(index: number){
        this.recipes.splice(index,1);
        this.recipeschanged.next(this.recipes.slice());
      }
}