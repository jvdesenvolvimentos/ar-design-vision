
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Filter, Eye, Edit, Share2, Trash2, Calendar, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Projetos = () => {
  const navigate = useNavigate();

  const projetos = [
    {
      id: 1,
      nome: "Sala de Estar Moderna",
      ambiente: "Sala de Estar",
      dataModificacao: "2024-01-15",
      status: "Em Progresso",
      thumbnail: "/placeholder.svg",
      itens: 5
    },
    {
      id: 2,
      nome: "Quarto Minimalista",
      ambiente: "Quarto",
      dataModificacao: "2024-01-10",
      status: "Concluído",
      thumbnail: "/placeholder.svg",
      itens: 8
    },
    {
      id: 3,
      nome: "Escritório Corporativo",
      ambiente: "Escritório",
      dataModificacao: "2024-01-08",
      status: "Rascunho",
      thumbnail: "/placeholder.svg",
      itens: 12
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Concluído":
        return "bg-green-100 text-green-800";
      case "Em Progresso":
        return "bg-blue-100 text-blue-800";
      case "Rascunho":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-ar-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header da Página */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-ar-gray-900 mb-2">Meus Projetos</h1>
              <p className="text-ar-gray-600">Gerencie seus projetos de mobiliário em AR</p>
            </div>
            <Button 
              className="bg-ar-gradient hover:bg-ar-gradient-dark text-white shadow-lg"
              onClick={() => navigate("/ar-viewer")}
            >
              <Plus className="w-5 h-5 mr-2" />
              Novo Projeto
            </Button>
          </div>
        </div>

        {/* Filtros e Busca */}
        <div className="mb-8 bg-white rounded-lg shadow-sm border border-ar-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-ar-gray-400 w-4 h-4" />
                <Input
                  placeholder="Buscar projetos..."
                  className="pl-10 border-ar-gray-200 focus:ring-ar-blue focus:border-ar-blue"
                />
              </div>
            </div>
            <Select>
              <SelectTrigger className="w-full sm:w-48 border-ar-gray-200">
                <SelectValue placeholder="Filtrar por ambiente" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os ambientes</SelectItem>
                <SelectItem value="sala">Sala de Estar</SelectItem>
                <SelectItem value="quarto">Quarto</SelectItem>
                <SelectItem value="escritorio">Escritório</SelectItem>
                <SelectItem value="cozinha">Cozinha</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-full sm:w-48 border-ar-gray-200">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os status</SelectItem>
                <SelectItem value="concluido">Concluído</SelectItem>
                <SelectItem value="progresso">Em Progresso</SelectItem>
                <SelectItem value="rascunho">Rascunho</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Grid de Projetos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projetos.map((projeto) => (
            <Card key={projeto.id} className="overflow-hidden hover:shadow-lg transition-shadow border-ar-gray-200">
              <div className="aspect-video bg-ar-gray-100 relative">
                <img 
                  src={projeto.thumbnail} 
                  alt={projeto.nome}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3">
                  <Badge className={getStatusColor(projeto.status)}>
                    {projeto.status}
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg text-ar-gray-900">{projeto.nome}</CardTitle>
                <div className="flex items-center gap-4 text-sm text-ar-gray-600">
                  <div className="flex items-center gap-1">
                    <Folder className="w-4 h-4" />
                    {projeto.ambiente}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(projeto.dataModificacao).toLocaleDateString('pt-BR')}
                  </div>
                </div>
                <p className="text-sm text-ar-gray-600">{projeto.itens} itens</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="flex-1 border-ar-gray-200 hover:bg-ar-gray-100"
                    onClick={() => navigate("/ar-viewer")}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Visualizar
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-ar-gray-200 hover:bg-ar-gray-100"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-ar-gray-200 hover:bg-ar-gray-100"
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    className="border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Estado Vazio */}
        {projetos.length === 0 && (
          <div className="text-center py-16">
            <Folder className="w-16 h-16 text-ar-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-ar-gray-900 mb-2">Nenhum projeto encontrado</h3>
            <p className="text-ar-gray-600 mb-6">Comece criando seu primeiro projeto em AR</p>
            <Button 
              className="bg-ar-gradient hover:bg-ar-gradient-dark text-white"
              onClick={() => navigate("/ar-viewer")}
            >
              <Plus className="w-5 h-5 mr-2" />
              Criar Primeiro Projeto
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Projetos;
