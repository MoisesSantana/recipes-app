export enum SearchType {
  NAME = 'name',
  FIRST_LETTER = 'first-letter',
  INGREDIENT = 'ingredient',
}

export type Search = {
  search: string;
  searchType: SearchType | '';
}
