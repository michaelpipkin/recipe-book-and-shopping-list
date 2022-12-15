import { Injectable } from '@angular/core';
import { Ingredient } from '@app-shared/ingredient.model';
import { Subject } from 'rxjs';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
      "Chocolate Cake",
      "Moist and scrumptious",
      "https://sallysbakingaddiction.com/wp-content/uploads/2013/04/triple-chocolate-cake-4.jpg",
      [new Ingredient('flour', '1 1/2 cups'), new Ingredient('sugar', '3/4 cup')]
    ),
    new Recipe(
      "Pan-seared Duck Breast",
      "Juicy and tender",
      "https://healthyrecipesblogs.com/wp-content/uploads/2022/06/duck-breast-featured.jpg",
      [new Ingredient('duck breast', '1'), new Ingredient('salt', '2 tsp')]
    ),
  ];

  constructor(private shopppingListService: ShoppingListService) { }

  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipeByIndex(index: number): Recipe {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shopppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe): void {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, recipe: Recipe): void {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
