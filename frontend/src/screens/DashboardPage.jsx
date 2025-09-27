import React, { useEffect, useState } from 'react';
import config from '../constants';

const DashboardPage = ({ user, recipes, onLogout, onLoadRecipes, onCreateRecipe }) => {
  const [newRecipe, setNewRecipe] = useState({ title: '', description: '', ingredients: '', instructions: '', prepTime: 30, cuisine: '' });
  const [photoFile, setPhotoFile] = useState(null);

  useEffect(() => {
    onLoadRecipes();
  }, []);

  const handleCreateRecipe = async (e) => {
    e.preventDefault();
    const recipeData = { ...newRecipe, prepTime: Number(newRecipe.prepTime) };
    if (photoFile) {
        recipeData.photo = photoFile;
    }
    await onCreateRecipe(recipeData);
    setNewRecipe({ title: '', description: '', ingredients: '', instructions: '', prepTime: 30, cuisine: '' });
    setPhotoFile(null);
    e.target.reset();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">FoodieFinds Dashboard</h1>
            <p className="text-gray-600">Welcome, <span className='font-semibold'>{user.name}</span>!</p>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`${config.BACKEND_URL}/admin`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-200 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-300 transition"
            >
              Admin
            </a>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Add a New Recipe</h2>
              <form onSubmit={handleCreateRecipe} className="space-y-4">
                <input type="text" placeholder="Recipe Title" value={newRecipe.title} onChange={(e) => setNewRecipe({ ...newRecipe, title: e.target.value })} className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500" required />
                <textarea placeholder="Description" value={newRecipe.description} onChange={(e) => setNewRecipe({ ...newRecipe, description: e.target.value })} className="w-full p-2 border rounded-md h-24 focus:ring-green-500 focus:border-green-500" />
                <textarea placeholder="Ingredients (one per line)" value={newRecipe.ingredients} onChange={(e) => setNewRecipe({ ...newRecipe, ingredients: e.target.value })} className="w-full p-2 border rounded-md h-32 focus:ring-green-500 focus:border-green-500" required />
                <textarea placeholder="Instructions" value={newRecipe.instructions} onChange={(e) => setNewRecipe({ ...newRecipe, instructions: e.target.value })} className="w-full p-2 border rounded-md h-40 focus:ring-green-500 focus:border-green-500" required />
                <input type="number" placeholder="Prep Time (mins)" value={newRecipe.prepTime} onChange={(e) => setNewRecipe({ ...newRecipe, prepTime: e.target.value })} className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500" />
                <input type="text" placeholder="Cuisine (e.g., Italian)" value={newRecipe.cuisine} onChange={(e) => setNewRecipe({ ...newRecipe, cuisine: e.target.value })} className="w-full p-2 border rounded-md focus:ring-green-500 focus:border-green-500" />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Recipe Photo</label>
                  <input type="file" onChange={(e) => setPhotoFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" />
                </div>
                <button type="submit" className="w-full bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700 transition">Add Recipe</button>
              </form>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Latest Recipes</h2>
            {recipes.length === 0 ? (
              <div className="text-center bg-white p-10 rounded-lg shadow">
                <p className="text-gray-500">No recipes yet. Be the first to add one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recipes.map(recipe => (
                  <div key={recipe.id} className="bg-white rounded-lg shadow overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
                    {recipe.photo && <img src={recipe.photo.thumbnail.url} alt={recipe.title} className="w-full h-48 object-cover" />}
                    <div className="p-4">
                      <h3 className="font-bold text-lg text-gray-900">{recipe.title}</h3>
                      <p className="text-xs text-gray-500 uppercase font-semibold tracking-wide">{recipe.cuisine}</p>
                      <p className="text-gray-600 text-sm mt-2 truncate">{recipe.description}</p>
                      <p className="text-xs text-gray-500 mt-3">By: {recipe.author ? recipe.author.name : 'Unknown'}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
