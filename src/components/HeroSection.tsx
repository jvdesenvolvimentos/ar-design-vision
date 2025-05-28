
import { Button } from "@/components/ui/button";
import { Camera, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const HeroSection = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleARClick = () => {
    if (user) {
      // Redireciona para o site externo se o usuário estiver logado
      window.open("https://mobiliar.ct.ws/", "_blank");
    } else {
      // Redireciona para a página de login se não estiver logado
      navigate("/auth");
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-ar-gray-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-ar-gradient rounded-2xl mb-6 shadow-lg">
              <Camera className="w-10 h-10 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-ar-gray-900 mb-6 leading-tight">
            Visualize móveis em
            <span className="block bg-ar-gradient bg-clip-text text-transparent">
              Realidade Aumentada
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-ar-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Transforme sua experiência de decoração com MobiliAR. 
            Veja como os móveis ficam no seu espaço antes de comprar, 
            usando a tecnologia de realidade aumentada mais avançada.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Button 
              size="lg" 
              className="bg-ar-gradient hover:bg-ar-gradient-dark text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              onClick={handleARClick}
            >
              <Camera className="w-6 h-6 mr-3" />
              {user ? "Iniciar AR" : "Começar Grátis"}
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-ar-blue text-ar-blue hover:bg-ar-blue hover:text-white px-8 py-4 text-lg font-semibold transition-all duration-300"
              onClick={() => navigate("/catalogo")}
            >
              Ver Catálogo
              <ArrowRight className="w-5 h-5 ml-3" />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-ar-blue mb-2">500+</div>
              <div className="text-ar-gray-600">Móveis Disponíveis</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ar-blue mb-2">AR</div>
              <div className="text-ar-gray-600">Tecnologia Avançada</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-ar-blue mb-2">24/7</div>
              <div className="text-ar-gray-600">Suporte Online</div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-ar-blue/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-ar-blue/10 rounded-full blur-xl animate-pulse delay-1000"></div>
      <div className="absolute top-1/2 right-20 w-16 h-16 bg-ar-blue/10 rounded-full blur-xl animate-pulse delay-500"></div>
    </section>
  );
};

export default HeroSection;
