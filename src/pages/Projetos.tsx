
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Eye, Edit, Share2, Trash2, Calendar, Folder } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface Projeto {
  id: string;
  name: string;
  description?: string;
  furniture_type?: string;
  dimensions?: any;
  materials?: any;
  ar_data?: any;
  created_at: string;
  updated_at: string;
}

const Projetos = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [ambienteFilter, setAmbienteFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  // Fetch projetos do usuário
  const { data: projetos = [], isLoading } = useQuery({
    queryKey: ['user-projects', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('user_projects')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Erro ao buscar projetos:', error);
        throw error;
      }

      return data as Projeto[];
    },
    enabled: !!user
  });

  // Mutation para deletar projeto
  const deleteMutation = useMutation({
    mutationFn: async (projectId: string) => {
      const { error } = await supabase
        .from('user_projects')
        .delete()
        .eq('id', projectId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-projects'] });
      toast({
        title: "Projeto deletado",
        description: "O projeto foi deletado com sucesso.",
      });
    },
    onError: (error) => {
      console.error('Erro ao deletar projeto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível deletar o projeto.",
        variant: "destructive",
      });
    }
  });

  useEffect(() => {
    if (!loading && !user) {
      navigate('/auth');
    }
  }, [user, loading, navigate]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-ar-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-ar-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-ar-gray-600">Carregando projetos...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

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

  const getProjectStatus = (projeto: Projeto) => {
    if (projeto.ar_data && Object.keys(projeto.ar_data).length > 0) {
      return "Concluído";
    }
    if (projeto.description && projeto.furniture_type) {
      return "Em Progresso";
    }
    return "Rascunho";
  };

  const handleShare = async (projeto: Projeto) => {
    const text = `Confira meu projeto "${projeto.name}" criado no MobiliAR!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Projeto MobiliAR: ${projeto.name}`,
          text: text,
          url: window.location.href
        });
        toast({
          title: "Projeto compartilhado",
          description: "O projeto foi compartilhado com sucesso!",
        });
      } catch (error) {
        console.log('Erro ao compartilhar:', error);
      }
    } else {
      // Fallback para navegadores que não suportam Web Share API
      try {
        await navigator.clipboard.writeText(text);
        toast({
          title: "Link copiado",
          description: "O link do projeto foi copiado para a área de transferência!",
        });
      } catch (error) {
        console.error('Erro ao copiar:', error);
      }
    }
  };

  const filteredProjetos = projetos.filter(projeto => {
    const matchesSearch = projeto.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAmbiente = !ambienteFilter || ambienteFilter === "todos" || 
      (projeto.furniture_type && projeto.furniture_type.toLowerCase().includes(ambienteFilter.toLowerCase()));
    const projectStatus = getProjectStatus(projeto);
    const matchesStatus = !statusFilter || statusFilter === "todos" || 
      projectStatus.toLowerCase().includes(statusFilter.toLowerCase());
    
    return matchesSearch && matchesAmbiente && matchesStatus;
  });

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Select value={ambienteFilter} onValueChange={setAmbienteFilter}>
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
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
        {filteredProjetos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjetos.map((projeto) => {
              const status = getProjectStatus(projeto);
              return (
                <Card key={projeto.id} className="overflow-hidden hover:shadow-lg transition-shadow border-ar-gray-200">
                  <div className="aspect-video bg-ar-gray-100 relative">
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-ar-blue/10 to-ar-purple/10">
                      <Folder className="w-16 h-16 text-ar-gray-400" />
                    </div>
                    <div className="absolute top-3 right-3">
                      <Badge className={getStatusColor(status)}>
                        {status}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-ar-gray-900">{projeto.name}</CardTitle>
                    <div className="flex items-center gap-4 text-sm text-ar-gray-600">
                      <div className="flex items-center gap-1">
                        <Folder className="w-4 h-4" />
                        {projeto.furniture_type || "Não especificado"}
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {new Date(projeto.created_at).toLocaleDateString('pt-BR')}
                      </div>
                    </div>
                    {projeto.description && (
                      <p className="text-sm text-ar-gray-600 line-clamp-2">{projeto.description}</p>
                    )}
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
                        onClick={() => navigate("/ar-viewer")}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-ar-gray-200 hover:bg-ar-gray-100"
                        onClick={() => handleShare(projeto)}
                      >
                        <Share2 className="w-4 h-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-red-200 text-red-600 hover:bg-red-50"
                        onClick={() => deleteMutation.mutate(projeto.id)}
                        disabled={deleteMutation.isPending}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16">
            <Folder className="w-16 h-16 text-ar-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-ar-gray-900 mb-2">
              {projetos.length === 0 ? "Nenhum projeto encontrado" : "Nenhum projeto corresponde aos filtros"}
            </h3>
            <p className="text-ar-gray-600 mb-6">
              {projetos.length === 0 ? "Comece criando seu primeiro projeto em AR" : "Tente ajustar os filtros para encontrar seus projetos"}
            </p>
            {projetos.length === 0 && (
              <Button 
                className="bg-ar-gradient hover:bg-ar-gradient-dark text-white"
                onClick={() => navigate("/ar-viewer")}
              >
                <Plus className="w-5 h-5 mr-2" />
                Criar Primeiro Projeto
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Projetos;
