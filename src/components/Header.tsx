import { Plane } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center">
        <Plane className="w-8 h-8 mr-2 text-primary" />
        <h1 className="text-2xl font-bold text-primary tracking-tight">TravelAI</h1>
      </div>
    </header>
  );
};

export default Header;