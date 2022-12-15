import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from '@app-shared/ingredient.model';
import { Subscription } from 'rxjs';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-edit-shopping-list',
  templateUrl: './edit-shopping-list.component.html',
  styleUrls: ['./edit-shopping-list.component.scss']
})

export class EditShoppingListComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) itemForm: NgForm;
  startEditSub: Subscription;
  ingredient: Ingredient;
  editMode: boolean = false;
  selectedItemIndex: number;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit(): void {
    this.startEditSub = this.shoppingListService.startEdit.subscribe(
      (index: number) => {
        this.selectedItemIndex = index;
        this.editMode = true;
        this.ingredient = this.shoppingListService.getIngredient(index);
        this.itemForm.setValue({
          name: this.ingredient.name,
          amount: this.ingredient.amount
        });
      }
    );
  }

  ngOnDestroy(): void {
    this.startEditSub.unsubscribe();
  }

  getIngredientCount(): number {
    return this.shoppingListService.getIngredients().length;
  }

  onSubmit(form: NgForm) {
    const input = form.value;
    this.ingredient = new Ingredient(input.name, input.amount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.selectedItemIndex, this.ingredient);
    } else {
      this.shoppingListService.addIngredient(this.ingredient);
    }
    this.clearForm();
  }

  onDelete(): void {
    this.shoppingListService.deleteIngredient(this.selectedItemIndex);
    this.clearForm();
  }

  clearForm(): void {
    this.itemForm.reset();
    this.editMode = false;
  }

  onClearList(): void {
    this.shoppingListService.clearIngredients();
    this.clearForm();
  }

  onRemoveCheckedItems(): void {
    this.shoppingListService.removeCheckedItems();
    this.clearForm();
  }
}
