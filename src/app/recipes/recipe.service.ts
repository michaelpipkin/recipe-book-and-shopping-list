import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

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

  addIngredientsToShoppingList(ingredients: Ingredient[]): void {
    this.shopppingListService.addIngredients(ingredients);
  }
}
