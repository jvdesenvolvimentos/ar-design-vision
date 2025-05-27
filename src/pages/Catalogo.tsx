
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Heart, ShoppingCart, Eye, Grid, List } from "lucide-react";
import { useState } from "react";

const Catalogo = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const moveis = [
    {
      id: 1,
      nome: "Sofá Moderno 3 Lugares",
      categoria: "Sofás",
      preco: "R$ 2.850,00",
      material: "Tecido Premium",
      dimensoes: "220x90x85cm",
      cores: ["Cinza", "Bege", "Azul"],
      thumbnail: "/placeholder.svg",
      favorito: false,
      disponivel: true
    },
    {
      id: 2,
      nome: "Mesa de Centro Redonda",
      categoria: "Mesas",
      preco: "R$ 890,00",
      material: "Madeira Maciça",
      dimensoes: "80x80x45cm",
      cores: ["Natural", "Branco", "Preto"],
      thumbnail: "/placeholder.svg",
      favorito: true,
      disponivel: true
    },
    {
      id: 3,
      nome: "Estante Industrial",
      categoria: "Estantes",
      preco: "R$ 1.250,00",
      material: "Metal e Madeira",
      dimensoes: "180x35x200cm",
      cores: ["Preto", "Branco"],
      thumbnail: "/placeholder.svg",
      favorito: false,
      disponivel: false
    }
  ];

  const categorias = [
    { nome: "Todos", count: 156 },
    { nome: "Sofás", count: 24 },
    { nome: "Poltronas", count: 18 },
    { nome: "Mesas", count: 32 },
    { nome: "Cadeiras", count: 28 },
    { nome: "Estantes", count: 19 },
    { nome: "Camas", count: 15 },
    { nome: "Cômodas", count: 20 }
  ];

  return (
    <div className="min-h-screen bg-ar-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header da Página */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ar-gray-900 mb-2">Catálogo de Móveis</h1>
          <p className="text-ar-gray-600">Explore nossa coleção completa de móveis em AR</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar de Filtros */}
          <div className="lg:w-64">
            <div className="bg-white rounded-lg shadow-sm border border-ar-gray-200 p-6 sticky top-24">
              <h3 className="font-semibold text-ar-gray-900 mb-4">Filtros</h3>
              
              {/* Categorias */}
              <div className="mb-6">
                <h4 className="font-medium text-ar-gray-700 mb-3">Categorias</h4>
                <div className="space-y-2">
                  {categorias.map((categoria) => (
                    <div key={categoria.nome} className="flex items-center justify-between">
                      <label className="flex items-center cursor-pointer">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm text-ar-gray-600">{categoria.nome}</span>
                      </label>
                      <span className="text-xs text-ar-gray-400">({categoria.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Faixa de Preço */}
              <div className="mb-6">
                <h4 className="font-medium text-ar-gray-700 mb-3">Preço</h4>
                <div className="space-y-2">
                  <Input placeholder="Mínimo" className="border-ar-gray-200" />
                  <Input placeholder="Máximo" className="border-ar-gray-200" />
                </div>
              </div>

              {/* Material */}
              <div className="mb-6">
                <h4 className="font-medium text-ar-gray-700 mb-3">Material</h4>
                <Select>
                  <SelectTrigger className="border-ar-gray-200">
                    <SelectValue placeholder="Selecionar material" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="madeira">Madeira</SelectItem>
                    <SelectItem value="tecido">Tecido</SelectItem>
                    <SelectItem value="metal">Metal</SelectItem>
                    <SelectItem value="couro">Couro</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button className="w-full bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                Aplicar Filtros
              </Button>
            </div>
          </div>

          {/* Conteúdo Principal */}
          <div className="flex-1">
            {/* Barra de Busca e Controles */}
            <div className="mb-6 bg-white rounded-lg shadow-sm border border-ar-gray-200 p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ar-gray-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar móveis..."
                    className="pl-10 border-ar-gray-200 focus:ring-ar-blue focus:border-ar-blue"
                  />
                </div>
                <div className="flex gap-2">
                  <Select>
                    <SelectTrigger className="w-48 border-ar-gray-200">
                      <SelectValue placeholder="Ordenar por" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="relevancia">Relevância</SelectItem>
                      <SelectItem value="preco-menor">Menor preço</SelectItem>
                      <SelectItem value="preco-maior">Maior preço</SelectItem>
                      <SelectItem value="nome">Nome A-Z</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="flex border border-ar-gray-200 rounded-md">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-3 ${viewMode === 'grid' ? 'bg-ar-gray-100' : ''}`}
                      onClick={() => setViewMode('grid')}
                    >
                      <Grid className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`px-3 ${viewMode === 'list' ? 'bg-ar-gray-100' : ''}`}
                      onClick={() => setViewMode('list')}
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid/Lista de Produtos */}
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {moveis.map((movel) => (
                <Card key={movel.id} className={`overflow-hidden hover:shadow-lg transition-shadow border-ar-gray-200 ${viewMode === 'list' ? 'flex' : ''}`}>
                  <div className={`${viewMode === 'grid' ? 'aspect-square' : 'w-48'} bg-ar-gray-100 relative`}>
                    <img 
                      src={movel.thumbnail} 
                      alt={movel.nome}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 flex gap-2">
                      {!movel.disponivel && (
                        <Badge variant="destructive">Indisponível</Badge>
                      )}
                      <Button
                        size="sm"
                        variant="secondary"
                        className={`w-8 h-8 p-0 ${movel.favorito ? 'text-red-500' : ''}`}
                      >
                        <Heart className="w-4 h-4" fill={movel.favorito ? 'currentColor' : 'none'} />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg text-ar-gray-900">{movel.nome}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="border-ar-gray-200">{movel.categoria}</Badge>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <div className="space-y-2 mb-4">
                        <p className="text-xl font-bold text-ar-blue">{movel.preco}</p>
                        <p className="text-sm text-ar-gray-600">Material: {movel.material}</p>
                        <p className="text-sm text-ar-gray-600">Dimensões: {movel.dimensoes}</p>
                        <div className="flex gap-1">
                          {movel.cores.map((cor) => (
                            <span key={cor} className="text-xs bg-ar-gray-100 px-2 py-1 rounded">
                              {cor}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-ar-gradient hover:bg-ar-gradient-dark text-white"
                          disabled={!movel.disponivel}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Ver em AR
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm"
                          className="border-ar-gray-200 hover:bg-ar-gray-100"
                          disabled={!movel.disponivel}
                        >
                          <ShoppingCart className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              ))}
            </div>

            {/* Paginação */}
            <div className="mt-8 flex justify-center">
              <div className="flex gap-2">
                <Button variant="outline" className="border-ar-gray-200">Anterior</Button>
                <Button variant="outline" className="bg-ar-blue text-white">1</Button>
                <Button variant="outline" className="border-ar-gray-200">2</Button>
                <Button variant="outline" className="border-ar-gray-200">3</Button>
                <Button variant="outline" className="border-ar-gray-200">Próximo</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
