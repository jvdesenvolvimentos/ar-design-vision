
import { useState } from "react";
import { Camera, RotateCcw, Settings, Save, Share2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const ARViewer = () => {
  const navigate = useNavigate();
  const [isARActive, setIsARActive] = useState(false);
  const [selectedFurniture, setSelectedFurniture] = useState("sofa");
  const [dimensions, setDimensions] = useState({
    width: [200],
    height: [80],
    depth: [90]
  });
  const [selectedMaterial, setSelectedMaterial] = useState("madeira");

  const furnitureOptions = [
    { value: "sofa", label: "Sofá" },
    { value: "mesa", label: "Mesa de Centro" },
    { value: "estante", label: "Estante" },
    { value: "cama", label: "Cama" },
    { value: "guarda-roupa", label: "Guarda-roupa" }
  ];

  const materialOptions = [
    { value: "madeira", label: "Madeira Clara" },
    { value: "madeira-escura", label: "Madeira Escura" },
    { value: "metal", label: "Metal" },
    { value: "vidro", label: "Vidro" },
    { value: "tecido", label: "Tecido" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/")}
              className="hover:bg-gray-100"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            
            <h1 className="text-xl font-semibold text-gray-900">
              Visualizador AR
            </h1>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Save className="w-4 h-4 mr-2" />
                Salvar
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Compartilhar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-4rem)]">
        {/* AR Viewer Area */}
        <div className="flex-1 relative bg-gradient-to-br from-blue-50 to-purple-50">
          <div className="absolute inset-0 flex items-center justify-center">
            {!isARActive ? (
              <div className="text-center space-y-6">
                <div className="w-32 h-32 bg-ar-gradient rounded-full flex items-center justify-center mx-auto">
                  <Camera className="w-16 h-16 text-white" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Visualização AR
                  </h2>
                  <p className="text-gray-600 max-w-md">
                    Aponte sua câmera para o ambiente onde deseja visualizar o móvel
                  </p>
                </div>
                <Button 
                  onClick={() => setIsARActive(true)}
                  className="bg-ar-gradient hover:bg-ar-gradient-dark text-white px-8 py-3 text-lg"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Iniciar AR
                </Button>
              </div>
            ) : (
              <div className="w-full h-full bg-black rounded-lg relative overflow-hidden">
                {/* Simulated AR View */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-48 h-32 bg-white/20 rounded-lg mb-4 mx-auto flex items-center justify-center border-2 border-white/30">
                      <span className="text-lg font-medium">{furnitureOptions.find(f => f.value === selectedFurniture)?.label}</span>
                    </div>
                    <p className="text-sm text-gray-300">Câmera AR Ativa</p>
                  </div>
                </div>
                
                {/* AR Controls Overlay */}
                <div className="absolute top-4 left-4 right-4 flex justify-between">
                  <Button 
                    variant="secondary" 
                    size="sm"
                    onClick={() => setIsARActive(false)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Sair do AR
                  </Button>
                  <Button variant="secondary" size="sm">
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Resetar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Control Panel */}
        <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Furniture Selection */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Settings className="w-5 h-5 mr-2" />
                Configurações
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tipo de Móvel
                  </label>
                  <Select value={selectedFurniture} onValueChange={setSelectedFurniture}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {furnitureOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Material/Acabamento
                  </label>
                  <Select value={selectedMaterial} onValueChange={setSelectedMaterial}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {materialOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Dimensions */}
            <Card className="p-4">
              <h3 className="text-lg font-semibold mb-4">Dimensões (cm)</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Largura: {dimensions.width[0]} cm
                  </label>
                  <Slider
                    value={dimensions.width}
                    onValueChange={(value) => setDimensions({...dimensions, width: value})}
                    max={300}
                    min={50}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura: {dimensions.height[0]} cm
                  </label>
                  <Slider
                    value={dimensions.height}
                    onValueChange={(value) => setDimensions({...dimensions, height: value})}
                    max={200}
                    min={30}
                    step={5}
                    className="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Profundidade: {dimensions.depth[0]} cm
                  </label>
                  <Slider
                    value={dimensions.depth}
                    onValueChange={(value) => setDimensions({...dimensions, depth: value})}
                    max={150}
                    min={30}
                    step={5}
                    className="w-full"
                  />
                </div>
              </div>
            </Card>

            {/* Actions */}
            <div className="space-y-3">
              <Button className="w-full bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                Aplicar Alterações
              </Button>
              <Button variant="outline" className="w-full">
                Salvar Configuração
              </Button>
              <Button variant="outline" className="w-full">
                Exportar Medidas
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ARViewer;
