import { Camera, Edit, Move, Square } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const HeroSection = () => {
  const handleIniciarAR = () => {
    window.open("https://app-mobiliar.netlify.app/", "_blank");
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Visualize móveis em
                <span className="bg-ar-gradient bg-clip-text text-transparent"> Realidade Aumentada</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Projete e visualize móveis sob medida em seus ambientes reais. 
                Ajuste dimensões, escolha acabamentos e veja o resultado final antes mesmo de produzir.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-ar-gradient hover:bg-ar-gradient-dark text-white px-8 py-4 text-lg" onClick={handleIniciarAR}>
                <Camera className="w-5 h-5 mr-2" />
                Começar Agora
              </Button>
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg border-ar-blue text-ar-blue hover:bg-ar-blue hover:text-white transition-all">
                Ver Demonstração
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-ar-blue/10 rounded-lg flex items-center justify-center">
                  <Square className="w-5 h-5 text-ar-blue" />
                </div>
                <span className="text-gray-700 font-medium">Móveis 3D</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-ar-cyan/10 rounded-lg flex items-center justify-center">
                  <Edit className="w-5 h-5 text-ar-cyan" />
                </div>
                <span className="text-gray-700 font-medium">Personalização</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-ar-purple/10 rounded-lg flex items-center justify-center">
                  <Move className="w-5 h-5 text-ar-purple" />
                </div>
                <span className="text-gray-700 font-medium">AR Interativa</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-500/10 rounded-lg flex items-center justify-center">
                  <Camera className="w-5 h-5 text-green-500" />
                </div>
                <span className="text-gray-700 font-medium">Visualização Real</span>
              </div>
            </div>
          </div>

          {/* AR Preview Mockup */}
          <div className="relative">
            <div className="relative bg-ar-gradient rounded-3xl p-8 animate-float">
              <div className="bg-white rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Sofá Personalizado</h3>
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                <div className="bg-gray-100 rounded-xl h-40 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <Camera className="w-8 h-8 text-ar-blue mx-auto" />
                    <p className="text-sm text-gray-600">Câmera AR Ativa</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Largura:</span>
                    <span className="font-medium">2.20m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Profundidade:</span>
                    <span className="font-medium">0.90m</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Acabamento:</span>
                    <span className="font-medium">Tecido Azul</span>
                  </div>
                </div>

                <Button className="w-full bg-ar-gradient text-white" onClick={handleIniciarAR}>
                  Visualizar em AR
                </Button>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-ar-cyan/20 rounded-full animate-pulse"></div>
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-ar-purple/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
