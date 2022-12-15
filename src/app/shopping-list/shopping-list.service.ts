import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '@app-shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startEdit = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apples", "3"),
    new Ingredient("Cinnamon", "1/2 tbsp")
  ];

  constructor() { }

  getIngredients(): Ingredient[] {
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient): void {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]): void {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, ingredient: Ingredient): void {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  checkIngredient(index: number): void {
    this.ingredients[index].checked = !this.ingredients[index].checked;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number): void {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeCheckedItems(): void {
    let length = this.ingredients.length;
    for (let i = 0; i < length;) {
      if (this.ingredients[i].checked) {
        this.ingredients.splice(i, 1);
        length--;
      } else {
        i++;
      }
    }
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  clearIngredients(): void {
    this.ingredients = [];
    this.ingredientsChanged.next([]);
  }
}
