
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2 } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Category {
  id: string;
  name: string;
  count: number;
  active: boolean;
  created_at: string;
}

const CategoriesManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    count: 0,
    active: true
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('furniture_categories')
        .select('*')
        .order('name');

      if (error) throw error;
      setCategories(data || []);
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar as categorias",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      count: 0,
      active: true
    });
    setEditingCategory(null);
  };

  const handleSave = async () => {
    try {
      if (editingCategory) {
        const { error } = await supabase
          .from('furniture_categories')
          .update({
            name: formData.name,
            count: formData.count,
            active: formData.active
          })
          .eq('id', editingCategory.id);

        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Categoria atualizada com sucesso",
        });
      } else {
        const { error } = await supabase
          .from('furniture_categories')
          .insert([{
            name: formData.name,
            count: formData.count,
            active: formData.active
          }]);

        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Categoria criada com sucesso",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Erro ao salvar categoria:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar a categoria",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      count: category.count,
      active: category.active
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir esta categoria?')) return;

    try {
      const { error } = await supabase
        .from('furniture_categories')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Categoria excluída com sucesso",
      });
      
      fetchCategories();
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir a categoria",
        variant: "destructive",
      });
    }
  };

  const updateCategoryCount = async (categoryName: string) => {
    try {
      const { count } = await supabase
        .from('furniture_catalog')
        .select('*', { count: 'exact', head: true })
        .eq('category', categoryName);

      await supabase
        .from('furniture_categories')
        .update({ count: count || 0 })
        .eq('name', categoryName);

      fetchCategories();
      
      toast({
        title: "Sucesso",
        description: "Contagem atualizada com sucesso",
      });
    } catch (error) {
      console.error('Erro ao atualizar contagem:', error);
      toast({
        title: "Erro",
        description: "Não foi possível atualizar a contagem",
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return <div className="text-center">Carregando categorias...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gerenciar Categorias</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Categoria
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome da Categoria</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Nome da categoria"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="count">Contagem de Itens</Label>
                    <Input
                      id="count"
                      type="number"
                      value={formData.count}
                      onChange={(e) => setFormData({...formData, count: parseInt(e.target.value) || 0})}
                      placeholder="0"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="active"
                      checked={formData.active}
                      onCheckedChange={(checked) => setFormData({...formData, active: checked})}
                    />
                    <Label htmlFor="active">Categoria Ativa</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className="bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                    {editingCategory ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Contagem</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Data de Criação</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {categories.map((category) => (
                  <TableRow key={category.id}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        {category.count}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => updateCategoryCount(category.name)}
                          className="text-xs"
                        >
                          Atualizar
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={category.active ? "default" : "secondary"}>
                        {category.active ? "Ativa" : "Inativa"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {new Date(category.created_at).toLocaleDateString('pt-BR')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CategoriesManagement;
