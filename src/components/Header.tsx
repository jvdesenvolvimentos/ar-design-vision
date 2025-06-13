
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Camera, User, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) return;

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        setIsAdmin(profile?.role === 'admin');
      } catch (error) {
        console.error('Erro ao verificar role:', error);
      }
    };

    checkAdminRole();
  }, [user]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const navigationItems = [
    { name: "Início", href: "/" },
    { name: "AR Viewer", href: "/ar-viewer" },
    { name: "Projetos", href: "/projetos" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Ambientes", href: "/ambientes" },
    { name: "Materiais", href: "/materiais" },
    { name: "Tutoriais", href: "/tutoriais" },
  ];

  return (
    <header className="bg-white shadow-lg border-b border-ar-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate("/")}>
            <div className="w-10 h-10 bg-ar-gradient rounded-xl flex items-center justify-center mr-3">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-ar-gradient bg-clip-text text-transparent">
              MobiliAR
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.name}
                onClick={() => navigate(item.href)}
                className="text-ar-gray-700 hover:text-ar-blue transition-colors duration-200 font-medium"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center space-x-2">
                {isAdmin && (
                  <Button
                    variant="outline"
                    onClick={() => navigate("/admin")}
                    className="border-ar-gray-200 hover:bg-ar-gray-100"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Admin
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => navigate("/perfil")}
                  className="border-ar-gray-200 hover:bg-ar-gray-100"
                >
                  <User className="w-4 h-4 mr-2" />
                  Perfil
                </Button>
                <Button
                  variant="outline"
                  onClick={handleSignOut}
                  className="border-ar-gray-200 hover:bg-ar-gray-100"
                >
                  Sair
                </Button>
              </div>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => navigate("/auth")}
                  className="border-ar-gray-200 hover:bg-ar-gray-100"
                >
                  Entrar
                </Button>
                <Button
                  onClick={() => window.open("https://app-mobiliar.netlify.app/", "_blank")}
                  className="bg-ar-gradient hover:bg-ar-gradient-dark text-white shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  Iniciar AR
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-ar-gray-700"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-ar-gray-200">
            <nav className="flex flex-col space-y-3">
              {navigationItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => {
                    navigate(item.href);
                    setIsMenuOpen(false);
                  }}
                  className="text-ar-gray-700 hover:text-ar-blue transition-colors duration-200 font-medium text-left px-2 py-1"
                >
                  {item.name}
                </button>
              ))}
              
              {user ? (
                <div className="flex flex-col space-y-2 pt-2 border-t border-ar-gray-200">
                  {isAdmin && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        navigate("/admin");
                        setIsMenuOpen(false);
                      }}
                      className="justify-start border-ar-gray-200 hover:bg-ar-gray-100"
                    >
                      <Settings className="w-4 h-4 mr-2" />
                      Admin
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/perfil");
                      setIsMenuOpen(false);
                    }}
                    className="justify-start border-ar-gray-200 hover:bg-ar-gray-100"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Perfil
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => {
                      handleSignOut();
                      setIsMenuOpen(false);
                    }}
                    className="justify-start border-ar-gray-200 hover:bg-ar-gray-100"
                  >
                    Sair
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2 border-t border-ar-gray-200">
                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate("/auth");
                      setIsMenuOpen(false);
                    }}
                    className="justify-start border-ar-gray-200 hover:bg-ar-gray-100"
                  >
                    Entrar
                  </Button>
                  <Button
                    onClick={() => {
                      window.open("https://app-mobiliar.netlify.app/", "_blank");
                      setIsMenuOpen(false);
                    }}
                    className="justify-start bg-ar-gradient hover:bg-ar-gradient-dark text-white"
                  >
                    Iniciar AR
                  </Button>
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
