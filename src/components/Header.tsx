
import { Camera, Menu, Search, Home, Folder, User, Phone, Palette, BookOpen, Settings, LogOut } from "lucide-react";
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
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";

const Header = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();

  const handleSignOut = async () => {
    await signOut();
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso",
    });
    navigate("/");
  };

  const handleARClick = () => {
    // Redireciona para o site externo
    window.open("https://mobiliar.ct.ws/", "_blank");
  };

  const menuItems = [
    { label: "Início", href: "/", icon: Home },
    { label: "Projetos", href: "/projetos", icon: Folder, protected: true },
    { label: "Catálogo", href: "/catalogo", icon: Search },
    { label: "Ambientes", href: "/ambientes", icon: Home },
    { label: "Materiais", href: "/materiais", icon: Palette },
    { label: "Tutoriais", href: "/tutoriais", icon: BookOpen },
    { label: "Perfil", href: "/perfil", icon: User, protected: true },
  ];

  return (
    <header className="bg-white border-b border-ar-gray-200 sticky top-0 z-50 shadow-sm">
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
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {menuItems.slice(0, 5).map((item) => (
                <NavigationMenuItem key={item.label}>
                  <NavigationMenuLink
                    asChild
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium transition-colors hover:bg-ar-gray-100 hover:text-ar-blue focus:bg-ar-gray-100 focus:text-ar-blue focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Link to={item.href}>
                      <item.icon className="w-4 h-4 mr-2" />
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <NavigationMenuTrigger className="hover:bg-ar-gray-100 hover:text-ar-blue">
                  <Settings className="w-4 h-4 mr-2" />
                  Mais
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid gap-3 p-4 w-[400px] bg-white">
                    {menuItems.slice(5).map((item) => (
                      <NavigationMenuLink key={item.label} asChild>
                        <Link 
                          to={item.href}
                          className="flex items-center space-x-3 p-3 rounded-md hover:bg-ar-gray-100 transition-colors"
                        >
                          <item.icon className="w-5 h-5 text-ar-blue" />
                          <span className="font-medium text-ar-gray-900">{item.label}</span>
                        </Link>
                      </NavigationMenuLink>
                    ))}
                    {user && (
                      <button
                        onClick={handleSignOut}
                        className="flex items-center space-x-3 p-3 rounded-md hover:bg-ar-gray-100 transition-colors w-full text-left"
                      >
                        <LogOut className="w-5 h-5 text-ar-blue" />
                        <span className="font-medium text-ar-gray-900">Sair</span>
                      </button>
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search */}
          <div className="flex-1 max-w-lg mx-8 hidden lg:block">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ar-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Buscar móveis, estilos, ambientes..."
                className="pl-10 bg-ar-gray-50 border-ar-gray-200 focus:bg-white focus:ring-2 focus:ring-ar-blue focus:border-ar-blue"
              />
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Button 
                  variant="outline" 
                  className="hidden sm:flex border-ar-blue text-ar-blue hover:bg-ar-blue hover:text-white"
                  onClick={() => navigate("/projetos")}
                >
                  Meus Projetos
                </Button>
                <Button 
                  className="bg-ar-gradient hover:bg-ar-gradient-dark text-white shadow-lg"
                  onClick={handleARClick}
                >
                  Iniciar AR
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="outline" 
                  className="hidden sm:flex border-ar-blue text-ar-blue hover:bg-ar-blue hover:text-white"
                  onClick={() => navigate("/auth")}
                >
                  Entrar
                </Button>
                <Button 
                  className="bg-ar-gradient hover:bg-ar-gradient-dark text-white shadow-lg"
                  onClick={() => navigate("/auth")}
                >
                  Cadastrar
                </Button>
              </>
            )}
            
            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden hover:bg-ar-gray-100">
                  <Menu className="w-5 h-5 text-ar-gray-700" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white">
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
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ar-gray-400 w-4 h-4" />
                    <Input
                      type="text"
                      placeholder="Buscar móveis..."
                      className="pl-10 border-ar-gray-200"
                    />
                  </div>

                  {/* Mobile Menu Items */}
                  {menuItems.map((item) => (
                    <Button
                      key={item.label}
                      variant="ghost"
                      className="justify-start w-full h-12 hover:bg-ar-gray-100 hover:text-ar-blue"
                      onClick={() => navigate(item.href)}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.label}
                    </Button>
                  ))}

                  {user && (
                    <Button
                      variant="ghost"
                      className="justify-start w-full h-12 hover:bg-ar-gray-100 hover:text-ar-blue"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-5 h-5 mr-3" />
                      Sair
                    </Button>
                  )}
                  
                  <div className="border-t border-ar-gray-200 pt-4 mt-6">
                    {user ? (
                      <Button 
                        className="w-full bg-ar-gradient hover:bg-ar-gradient-dark text-white"
                        onClick={handleARClick}
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Iniciar AR
                      </Button>
                    ) : (
                      <Button 
                        className="w-full bg-ar-gradient hover:bg-ar-gradient-dark text-white"
                        onClick={() => navigate("/auth")}
                      >
                        <Camera className="w-5 h-5 mr-2" />
                        Entrar / Cadastrar
                      </Button>
                    )}
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
