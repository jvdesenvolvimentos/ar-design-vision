
import { Edit, Move } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const FurnitureCatalog = () => {
  const categories = [
    { name: "Sofás", count: 45, active: true },
    { name: "Mesas", count: 32 },
    { name: "Cadeiras", count: 28 },
    { name: "Estantes", count: 19 },
    { name: "Camas", count: 23 },
    { name: "Armários", count: 15 }
  ];

  const furniture = [
    {
      id: 1,
      name: "Sofá Modular Premium",
      category: "Sofá",
      price: "R$ 3.200",
      dimensions: "2.40x0.90x0.85m",
      materials: ["Tecido", "Couro", "Linho"],
      popular: true
    },
    {
      id: 2,
      name: "Mesa de Jantar Extensível",
      category: "Mesa",
      price: "R$ 1.800",
      dimensions: "1.60x0.90x0.75m",
      materials: ["Madeira", "Vidro", "Metal"]
    },
    {
      id: 3,
      name: "Estante Industrial",
      category: "Estante",
      price: "R$ 1.200",
      dimensions: "2.00x0.40x1.80m",
      materials: ["Madeira", "Metal"]
    },
    {
      id: 4,
      name: "Poltrona Executiva",
      category: "Cadeira",
      price: "R$ 890",
      dimensions: "0.65x0.70x1.20m",
      materials: ["Couro", "Metal"],
      popular: true
    },
    {
      id: 5,
      name: "Cama Box Casal",
      category: "Cama",
      price: "R$ 2.400",
      dimensions: "1.58x2.00x0.60m",
      materials: ["Tecido", "Madeira"]
    },
    {
      id: 6,
      name: "Armário Deslizante",
      category: "Armário",
      price: "R$ 4.200",
      dimensions: "2.50x0.60x2.40m",
      materials: ["Madeira", "Espelho"]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Catálogo de Móveis
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Escolha entre centenas de modelos ou crie seu móvel personalizado. 
            Todos podem ser visualizados em realidade aumentada.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {categories.map((category, index) => (
            <Button
              key={index}
              variant={category.active ? "default" : "outline"}
              className={`${
                category.active 
                  ? "bg-ar-gradient text-white" 
                  : "border-gray-300 hover:border-ar-blue hover:text-ar-blue"
              }`}
            >
              {category.name}
              <Badge variant="secondary" className="ml-2">
                {category.count}
              </Badge>
            </Button>
          ))}
        </div>

        {/* Furniture Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {furniture.map((item) => (
            <Card key={item.id} className="group hover:shadow-xl transition-all duration-300 border-gray-200 hover:border-ar-blue/30">
              <CardContent className="p-0">
                {/* Image Placeholder */}
                <div className="relative bg-gradient-to-br from-gray-100 to-gray-200 h-48 rounded-t-lg flex items-center justify-center overflow-hidden">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 bg-ar-gradient/20 rounded-xl flex items-center justify-center mx-auto">
                      <Move className="w-8 h-8 text-ar-blue" />
                    </div>
                    <p className="text-sm text-gray-500">Modelo 3D</p>
                  </div>
                  
                  {item.popular && (
                    <Badge className="absolute top-3 left-3 bg-orange-500 text-white">
                      Popular
                    </Badge>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Edit className="w-4 h-4 mr-1" />
                      Personalizar
                    </Button>
                    <Button size="sm" className="bg-ar-gradient text-white">
                      Ver em AR
                    </Button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-lg">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category}</p>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Dimensões:</span>
                      <span className="font-medium">{item.dimensions}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Materiais:</span>
                      <div className="flex space-x-1">
                        {item.materials.slice(0, 2).map((material, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {material}
                          </Badge>
                        ))}
                        {item.materials.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.materials.length - 2}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t">
                    <span className="text-xl font-bold text-ar-blue">{item.price}</span>
                    <Button className="bg-ar-gradient text-white hover:bg-ar-gradient-dark">
                      Visualizar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-ar-blue text-ar-blue hover:bg-ar-blue hover:text-white">
            Carregar Mais Móveis
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FurnitureCatalog;
