
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Heart, ShoppingCart, Eye, Grid, List } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Furniture {
  id: string;
  name: string;
  category: string;
  price: number;
  material: string;
  dimensions: string;
  colors: string[];
  description: string;
  image_url?: string;
  available: boolean;
  popular: boolean;
}

interface Category {
  id: string;
  name: string;
  count: number;
  active: boolean;
}

const Catalogo = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('relevancia');
  const { toast } = useToast();

  useEffect(() => {
    fetchFurniture();
    fetchCategories();
  }, []);

  const fetchFurniture = async () => {
    try {
      const { data, error } = await supabase
        .from('furniture_catalog')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setFurniture(data || []);
    } catch (error) {
      console.error('Erro ao buscar móveis:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar o catálogo",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('furniture_categories')
        .select('*')
        .eq('active', true)
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
    }
  };

  const filteredAndSortedFurniture = furniture
    .filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           item.description?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = !selectedCategory || item.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'preco-menor':
          return a.price - b.price;
        case 'preco-maior':
          return b.price - a.price;
        case 'nome':
          return a.name.localeCompare(b.name);
        default:
          return b.popular ? 1 : -1;
      }
    });

  if (loading) {
    return (
      <div className="min-h-screen bg-ar-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-ar-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-ar-gray-600">Carregando catálogo...</p>
          </div>
        </div>
      </div>
    );
  }

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
                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer">
                      <input 
                        type="radio" 
                        name="category"
                        value=""
                        checked={selectedCategory === ''}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="mr-2" 
                      />
                      <span className="text-sm text-ar-gray-600">Todos</span>
                    </label>
                    <span className="text-xs text-ar-gray-400">({furniture.length})</span>
                  </div>
                  {categories.map((categoria) => (
                    <div key={categoria.id} className="flex items-center justify-between">
                      <label className="flex items-center cursor-pointer">
                        <input 
                          type="radio" 
                          name="category"
                          value={categoria.name}
                          checked={selectedCategory === categoria.name}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-2" 
                        />
                        <span className="text-sm text-ar-gray-600">{categoria.name}</span>
                      </label>
                      <span className="text-xs text-ar-gray-400">({categoria.count})</span>
                    </div>
                  ))}
                </div>
              </div>

              <Button 
                className="w-full bg-ar-gradient hover:bg-ar-gradient-dark text-white"
                onClick={() => {
                  setSelectedCategory('');
                  setSearchTerm('');
                  setSortBy('relevancia');
                }}
              >
                Limpar Filtros
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
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-ar-gray-200 focus:ring-ar-blue focus:border-ar-blue"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
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

            {/* Resultados */}
            <div className="mb-4">
              <p className="text-sm text-ar-gray-600">
                {filteredAndSortedFurniture.length} móveis encontrados
              </p>
            </div>

            {/* Grid/Lista de Produtos */}
            {filteredAndSortedFurniture.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-ar-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-ar-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-ar-gray-900 mb-2">Nenhum móvel encontrado</h3>
                <p className="text-ar-gray-600">Tente ajustar os filtros ou termos de busca</p>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredAndSortedFurniture.map((movel) => (
                  <Card key={movel.id} className={`overflow-hidden hover:shadow-lg transition-shadow border-ar-gray-200 ${viewMode === 'list' ? 'flex' : ''}`}>
                    <div className={`${viewMode === 'grid' ? 'aspect-square' : 'w-48'} bg-ar-gray-100 relative`}>
                      <img 
                        src={movel.image_url || '/placeholder.svg'} 
                        alt={movel.name}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        {!movel.available && (
                          <Badge variant="destructive">Indisponível</Badge>
                        )}
                        {movel.popular && (
                          <Badge className="bg-yellow-100 text-yellow-800">Popular</Badge>
                        )}
                        <Button
                          size="sm"
                          variant="secondary"
                          className="w-8 h-8 p-0"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg text-ar-gray-900">{movel.name}</CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="border-ar-gray-200">{movel.category}</Badge>
                        </div>
                      </CardHeader>
                      
                      <CardContent className="pt-0">
                        <div className="space-y-2 mb-4">
                          <p className="text-xl font-bold text-ar-blue">
                            {new Intl.NumberFormat('pt-BR', {
                              style: 'currency',
                              currency: 'BRL'
                            }).format(movel.price)}
                          </p>
                          <p className="text-sm text-ar-gray-600">Material: {movel.material}</p>
                          <p className="text-sm text-ar-gray-600">Dimensões: {movel.dimensions}</p>
                          <div className="flex gap-1 flex-wrap">
                            {movel.colors.map((cor) => (
                              <span key={cor} className="text-xs bg-ar-gray-100 px-2 py-1 rounded">
                                {cor}
                              </span>
                            ))}
                          </div>
                          {movel.description && (
                            <p className="text-sm text-ar-gray-600 line-clamp-2">{movel.description}</p>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          <Button 
                            className="flex-1 bg-ar-gradient hover:bg-ar-gradient-dark text-white"
                            disabled={!movel.available}
                            onClick={() => window.open("https://app-mobiliar.netlify.app/", "_blank")}
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            Ver em AR
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            className="border-ar-gray-200 hover:bg-ar-gray-100"
                            disabled={!movel.available}
                          >
                            <ShoppingCart className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
