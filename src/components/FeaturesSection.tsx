
import { Camera, Edit, Move, Square } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const FeaturesSection = () => {
  const features = [
    {
      icon: Camera,
      title: "Visualização em AR",
      description: "Posicione móveis virtuais no seu ambiente real usando a câmera do dispositivo. Veja como ficará antes de comprar.",
      color: "text-ar-blue",
      bgColor: "bg-ar-blue/10"
    },
    {
      icon: Edit,
      title: "Personalização Total",
      description: "Ajuste dimensões, cores, materiais e acabamentos em tempo real. Crie móveis únicos para cada projeto.",
      color: "text-ar-cyan",
      bgColor: "bg-ar-cyan/10"
    },
    {
      icon: Move,
      title: "Interação 3D",
      description: "Mova, rotacione e redimensione móveis virtualmente. Teste diferentes posições e configurações facilmente.",
      color: "text-ar-purple",
      bgColor: "bg-ar-purple/10"
    },
    {
      icon: Square,
      title: "Catálogo Extenso",
      description: "Acesse centenas de modelos 3D profissionais. De sofás a armários, tudo pronto para personalização.",
      color: "text-green-500",
      bgColor: "bg-green-500/10"
    }
  ];

  const stats = [
    { number: "500+", label: "Modelos 3D" },
    { number: "1000+", label: "Projetos Realizados" },
    { number: "98%", label: "Satisfação" },
    { number: "24h", label: "Suporte" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Por que escolher o MobiliAR?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tecnologia de ponta para transformar a forma como você projeta e visualiza móveis
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="border-none shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardContent className="p-8 text-center space-y-4">
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-white rounded-3xl shadow-xl p-8 lg:p-12">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold bg-ar-gradient bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Process Steps */}
        <div className="mt-20">
          <h3 className="text-2xl lg:text-3xl font-bold text-center text-gray-900 mb-12">
            Como funciona
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-ar-gradient rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                1
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Escolha o Móvel</h4>
              <p className="text-gray-600">Navegue pelo catálogo e selecione o móvel que deseja visualizar ou personalizar</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-ar-gradient rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                2
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Personalize</h4>
              <p className="text-gray-600">Ajuste dimensões, materiais, cores e acabamentos conforme sua necessidade</p>
            </div>
            
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-ar-gradient rounded-full flex items-center justify-center mx-auto text-white font-bold text-xl">
                3
              </div>
              <h4 className="text-xl font-semibold text-gray-900">Visualize em AR</h4>
              <p className="text-gray-600">Use a câmera para posicionar o móvel no ambiente real e ver o resultado final</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
