import HomePage from '../features/home/pages/HomePage';
import MenuPage from '../features/menu/pages/MenuPage';
import { useAppNavigation } from '../hooks/useAppNavigation';
import { MenuProvider } from './MenuContext';

const App = () => {
  const { currentPath, navigateToPath, navigateToSection } = useAppNavigation();

  return (
    <MenuProvider>
      {currentPath === '/menu' ? (
        <MenuPage onNavigateHome={() => navigateToPath('/')} />
      ) : (
        <HomePage onNavigate={navigateToSection} />
      )}
    </MenuProvider>
  );
};

export default App;
