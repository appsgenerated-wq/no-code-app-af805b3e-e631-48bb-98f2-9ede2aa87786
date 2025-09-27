import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import './index.css';
import { testBackendConnection, createManifestWithLogging } from './services/apiService.js';

function App() {
  const [user, setUser] = useState(null);
  const [backendConnected, setBackendConnected] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [recipes, setRecipes] = useState([]);
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [isLoading, setIsLoading] = useState(true);
  const manifest = createManifestWithLogging('${appId}');

  useEffect(() => {
    // Check if user is logged in using Manifest SDK
    manifest.from('User').me()
      .then(currentUser => {
        if (currentUser) {
          setUser(currentUser);
          setCurrentScreen('dashboard');
        }
      })
      .catch(() => setUser(null))
      .finally(() => setIsLoading(false));
  }, [])

  useEffect(() => {
    // Enhanced backend connection test with detailed logging
    const testConnection = async () => {
      console.log('🚀 [APP] Starting enhanced backend connection test...');
      console.log('🔍 [APP] Backend URL:', 'https://no-code-app-af805b3e-e631-48bb-98f2-9ede2aa87786-generated-apps-234234-234.us-central1.run.app');
      console.log('🔍 [APP] App ID:', 'af805b3e-e631-48bb-98f2-9ede2aa87786');
      
      setConnectionStatus('Testing connection...');
      
      const result = await testBackendConnection(3);
      setBackendConnected(result.success);
      
      if (result.success) {
        console.log('✅ [APP] Backend connection successful - proceeding with app initialization');
        setConnectionStatus('Connected');
        
        // Test Manifest SDK connection
        console.log('🔍 [APP] Testing Manifest SDK connection...');
        try {
          const manifest = createManifestWithLogging('af805b3e-e631-48bb-98f2-9ede2aa87786');
          console.log('✅ [APP] Manifest SDK initialized successfully');
        } catch (error) {
          console.error('❌ [APP] Manifest SDK initialization failed:', error);
          setConnectionStatus('SDK Error');
        }
      } else {
        console.error('❌ [APP] Backend connection failed - app may not work properly');
        console.error('❌ [APP] Connection error:', result.error);
        setConnectionStatus('Connection Failed');
      }
    };
    
    testConnection();
  }, []);;

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      await manifest.login(email, password);
      const loggedInUser = await manifest.from('User').me();
      setUser(loggedInUser);
      setCurrentScreen('dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    await manifest.logout();
    setUser(null);
    setRecipes([]);
    setCurrentScreen('landing');
  };

  const loadRecipes = async () => {
    try {
      const response = await manifest.from('Recipe').find({
        include: ['author'],
        sort: { createdAt: 'desc' }
      });
      setRecipes(response.data);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    }
  };

  const createRecipe = async (recipeData) => {
    try {
      const newRecipe = await manifest.from('Recipe').create(recipeData);
      // Refetch recipes to get the new one with author included
      await loadRecipes();
    } catch (error) {
      console.error('Failed to create recipe:', error);
      alert('Error: Could not create recipe. Please check the fields and try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
      {/* Enhanced Backend Connection Status Indicator */}
      <div className="fixed top-4 right-4 z-50">
        <div className={`px-3 py-2 rounded-lg text-xs font-medium shadow-lg ${backendConnected ? 'bg-green-100 text-green-800 border border-green-200' : 'bg-red-100 text-red-800 border border-red-200'}`}>
          <div className="flex items-center space-x-2">
            <div className={`w-2 h-2 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span>{backendConnected ? '✅ Backend Connected' : '❌ Backend Disconnected'}</span>
          </div>
          <div className="text-xs opacity-75 mt-1">{connectionStatus}</div>
        </div>
      </div>
      
        <div className="text-xl font-semibold text-gray-700">Loading FoodieFinds...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {currentScreen === 'landing' || !user ? (
        <LandingPage onLogin={login} />
      ) : (
        <DashboardPage
          user={user}
          recipes={recipes}
          onLogout={logout}
          onLoadRecipes={loadRecipes}
          onCreateRecipe={createRecipe}
        />
      )}
    </div>
  );
}

export default App;
