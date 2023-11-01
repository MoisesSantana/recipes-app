export const APP_ROUTES = {
  private: {
    mealsDetails: '/recipes/meals/:id',
    drinksDetails: '/recipes/drinks/:id',
    profile: '/profile',
    completedRecipes: '/recipes/completed-recipes',
    favoriteRecipes: '/recipes/favorite-recipes',
  },
  public: {
    login: '/',
    mealsRecipes: '/recipes/meals',
    drinksRecipes: '/recipes/drinks',
    explore: '/explore',
  },
};
