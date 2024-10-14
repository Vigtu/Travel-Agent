import { Plane, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  onResetApp: () => void;
}

const Header = ({ onResetApp }: HeaderProps) => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Plane className="w-8 h-8 mr-2 text-primary" />
          <h1 className="text-2xl font-bold text-primary tracking-tight">TravelAI</h1>
        </div>
        <Button
          variant="default"
          size="lg"
          onClick={onResetApp}
          className="flex items-center bg-primary text-white hover:bg-primary-600 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          <Home className="w-5 h-5 mr-2" />
          Home
        </Button>
      </div>
    </header>
  );
};

export default Header;