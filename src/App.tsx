import React from 'react';
import RecipeProvider from './context/RecipeProvider';
import RecipeEditor from './components/editor/RecipeEditor';
import GeneratedRecipe from './components/GeneratedRecipe';
import './styles.css';

function App() {
  return (
    <div className="app-container">
      <RecipeProvider>
        <RecipeEditor />
        <GeneratedRecipe />
      </RecipeProvider>
    </div>
  );
}

export default App;
