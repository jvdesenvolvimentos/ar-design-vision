
import { Camera, Menu, Search, Home, Folder, User, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const menuItems = [
    { label: "Início", href: "/", icon: Home },
    { label: "Catálogo", href: "#catalog", icon: Folder },
    { label: "Meus Projetos", href: "#projects", icon: User },
    { label: "Contato", href: "#contact", icon: Phone },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-ar-gradient rounded-lg flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-ar-gradient bg-clip-text text-transparent">
              MobiliAR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {menuItems.map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    href={item.href}
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.label}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar móveis, estilos, ambientes..."
                className="pl-10 bg-gray-50 border-none focus:bg-white focus:ring-2 focus:ring-ar-blue"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="outline" 
              className="hidden sm:flex"
              onClick={() => navigate("#projects")}
            >
              Meus Projetos
            </Button>
            <Button 
              className="bg-ar-gradient hover:bg-ar-gradient-dark text-white"
              onClick={() => navigate("/ar-viewer")}
            >
              Iniciar AR
            </Button>
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="w-5 h-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="flex items-center space-x-2 mb-6">
                    <div className="w-8 h-8 bg-ar-gradient rounded-lg flex items-center justify-center">
                      <Camera className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold bg-ar-gradient bg-clip-text text-transparent">
                      MobiliAR
                    </span>
                  </div>
                  
                  {/* Mobile Search */}
                  <div className="relative mb-6">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Buscar móveis..."
                      className="pl-10"
                    />
                  </div>

                  {/* Mobile Menu Items */}
                  {menuItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      className="justify-start w-full h-12"
                      onClick={() => {
                        if (item.href.startsWith('/')) {
                          navigate(item.href);
                        } else {
                          // Handle anchor links
                          const element = document.querySelector(item.href);
                          element?.scrollIntoView({ behavior: 'smooth' });
                        }
                      }}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  ))}
                  
                  <div className="border-t pt-4 mt-6">
                    <Button 
                      className="w-full bg-ar-gradient hover:bg-ar-gradient-dark text-white"
                      onClick={() => navigate("/ar-viewer")}
                    >
                      <Camera className="w-5 h-5 mr-2" />
                      Iniciar AR
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
