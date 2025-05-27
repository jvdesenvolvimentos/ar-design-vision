
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Eye, Heart } from "lucide-react";

const Materiais = () => {
  const materiais = [
    {
      id: 1,
      nome: "Madeira de Carvalho",
      categoria: "Madeira",
      cor: "#8B4513",
      thumbnail: "/placeholder.svg",
      preco: "Premium"
    },
    {
      id: 2,
      nome: "Tecido Linho Bege",
      categoria: "Tecido",
      cor: "#F5F5DC",
      thumbnail: "/placeholder.svg",
      preco: "Padrão"
    },
    {
      id: 3,
      nome: "Metal Preto Fosco",
      categoria: "Metal",
      cor: "#2C2C2C",
      thumbnail: "/placeholder.svg",
      preco: "Premium"
    },
    {
      id: 4,
      nome: "Couro Marrom",
      categoria: "Couro",
      cor: "#8B4513",
      thumbnail: "/placeholder.svg",
      preco: "Luxo"
    }
  ];

  return (
    <div className="min-h-screen bg-ar-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ar-gray-900 mb-2">Materiais e Acabamentos</h1>
          <p className="text-ar-gray-600">Escolha os melhores materiais para seus móveis</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {materiais.map((material) => (
            <Card key={material.id} className="overflow-hidden hover:shadow-lg transition-shadow border-ar-gray-200">
              <div className="aspect-square bg-ar-gray-100 relative">
                <img 
                  src={material.thumbnail} 
                  alt={material.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Button size="sm" variant="secondary" className="w-8 h-8 p-0">
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <div 
                    className="w-8 h-8 rounded-full border-2 border-white shadow-lg"
                    style={{ backgroundColor: material.cor }}
                  />
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-sm text-ar-gray-900">{material.nome}</CardTitle>
                <p className="text-xs text-ar-gray-600">{material.categoria}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-medium text-ar-blue">{material.preco}</span>
                  <Palette className="w-4 h-4 text-ar-gray-400" />
                </div>
                <Button size="sm" className="w-full bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                  <Eye className="w-3 h-3 mr-1" />
                  Visualizar
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Materiais;
