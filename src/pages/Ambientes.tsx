
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Home, Bed, Coffee, Car, Building, Eye, Plus } from "lucide-react";

const Ambientes = () => {
  const ambientes = [
    {
      id: 1,
      nome: "Sala de Estar",
      descricao: "Ambiente aconchegante para relaxar",
      icon: Home,
      thumbnail: "/placeholder.svg",
      templates: 12,
      categoria: "Residencial"
    },
    {
      id: 2,
      nome: "Quarto",
      descricao: "Espaço pessoal de descanso",
      icon: Bed,
      thumbnail: "/placeholder.svg",
      templates: 8,
      categoria: "Residencial"
    },
    {
      id: 3,
      nome: "Escritório",
      descricao: "Ambiente produtivo de trabalho",
      icon: Building,
      thumbnail: "/placeholder.svg",
      templates: 15,
      categoria: "Comercial"
    },
    {
      id: 4,
      nome: "Cozinha",
      descricao: "Centro da casa para refeições",
      icon: Coffee,
      thumbnail: "/placeholder.svg",
      templates: 6,
      categoria: "Residencial"
    }
  ];

  return (
    <div className="min-h-screen bg-ar-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ar-gray-900 mb-2">Ambientes</h1>
          <p className="text-ar-gray-600">Escolha o ambiente perfeito para seu projeto</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ambientes.map((ambiente) => (
            <Card key={ambiente.id} className="overflow-hidden hover:shadow-lg transition-shadow border-ar-gray-200">
              <div className="aspect-video bg-ar-gray-100 relative">
                <img 
                  src={ambiente.thumbnail} 
                  alt={ambiente.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className="bg-ar-blue text-white">
                    {ambiente.templates} templates
                  </Badge>
                </div>
                <div className="absolute bottom-3 left-3">
                  <ambiente.icon className="w-8 h-8 text-white bg-ar-gradient p-2 rounded-lg" />
                </div>
              </div>
              
              <CardHeader>
                <CardTitle className="text-lg text-ar-gray-900">{ambiente.nome}</CardTitle>
                <p className="text-sm text-ar-gray-600">{ambiente.descricao}</p>
                <Badge variant="outline" className="w-fit border-ar-gray-200">{ambiente.categoria}</Badge>
              </CardHeader>
              
              <CardContent>
                <div className="flex gap-2">
                  <Button className="flex-1 bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                    <Eye className="w-4 h-4 mr-2" />
                    Explorar
                  </Button>
                  <Button variant="outline" className="border-ar-gray-200 hover:bg-ar-gray-100">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ambientes;
