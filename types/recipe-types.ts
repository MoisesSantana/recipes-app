export type CurrentRecipe = {
  id: string;
  image: string;
  name: string;
  category: string,
}

type IngredientsAndMeasures = {
  ingredient: string;
  measure: string;
}[]

export type RecipeDetails = CurrentRecipe & {
  instructions: string;
  ingredientAndMeasures: IngredientsAndMeasures;
}

export type DinamicDataValues = {
  [key: string]: string,
}

export type DinamicData = {
  [key: string]: DinamicDataValues[],
}