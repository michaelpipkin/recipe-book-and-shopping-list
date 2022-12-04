// Adding accessibility decorator to constructor parameters makes them
// accessible as properties of the class without explicitly declaring them.

export class Ingredient {
  constructor(public name: string, public amount: string) { }
}
