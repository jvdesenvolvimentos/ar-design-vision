
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, Search } from "lucide-react";
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
}

const FurnitureManagement = () => {
  const [furniture, setFurniture] = useState<Furniture[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Furniture | null>(null);
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    material: '',
    dimensions: '',
    colors: '',
    description: '',
    image_url: '',
    available: true,
    popular: false
  });

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
        description: "Não foi possível carregar os móveis",
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

  const resetForm = () => {
    setFormData({
      name: '',
      category: '',
      price: '',
      material: '',
      dimensions: '',
      colors: '',
      description: '',
      image_url: '',
      available: true,
      popular: false
    });
    setEditingItem(null);
  };

  const handleSave = async () => {
    try {
      const colorsArray = formData.colors.split(',').map(c => c.trim()).filter(c => c);
      
      const furnitureData = {
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        material: formData.material,
        dimensions: formData.dimensions,
        colors: colorsArray,
        description: formData.description,
        image_url: formData.image_url || null,
        available: formData.available,
        popular: formData.popular
      };

      if (editingItem) {
        const { error } = await supabase
          .from('furniture_catalog')
          .update(furnitureData)
          .eq('id', editingItem.id);

        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Móvel atualizado com sucesso",
        });
      } else {
        const { error } = await supabase
          .from('furniture_catalog')
          .insert([furnitureData]);

        if (error) throw error;
        
        toast({
          title: "Sucesso",
          description: "Móvel criado com sucesso",
        });
      }

      setIsDialogOpen(false);
      resetForm();
      fetchFurniture();
    } catch (error) {
      console.error('Erro ao salvar móvel:', error);
      toast({
        title: "Erro",
        description: "Não foi possível salvar o móvel",
        variant: "destructive",
      });
    }
  };

  const handleEdit = (item: Furniture) => {
    setEditingItem(item);
    setFormData({
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      material: item.material,
      dimensions: item.dimensions,
      colors: item.colors.join(', '),
      description: item.description,
      image_url: item.image_url || '',
      available: item.available,
      popular: item.popular
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este móvel?')) return;

    try {
      const { error } = await supabase
        .from('furniture_catalog')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      toast({
        title: "Sucesso",
        description: "Móvel excluído com sucesso",
      });
      
      fetchFurniture();
    } catch (error) {
      console.error('Erro ao excluir móvel:', error);
      toast({
        title: "Erro",
        description: "Não foi possível excluir o móvel",
        variant: "destructive",
      });
    }
  };

  const filteredFurniture = furniture.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.material.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <div className="text-center">Carregando móveis...</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Gerenciar Móveis</CardTitle>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={resetForm} className="bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Móvel
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingItem ? 'Editar Móvel' : 'Adicionar Novo Móvel'}
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Nome do móvel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Categoria</Label>
                    <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="price">Preço</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="material">Material</Label>
                    <Input
                      id="material"
                      value={formData.material}
                      onChange={(e) => setFormData({...formData, material: e.target.value})}
                      placeholder="Material do móvel"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dimensions">Dimensões</Label>
                    <Input
                      id="dimensions"
                      value={formData.dimensions}
                      onChange={(e) => setFormData({...formData, dimensions: e.target.value})}
                      placeholder="Ex: 200x90x80cm"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="colors">Cores (separadas por vírgula)</Label>
                    <Input
                      id="colors"
                      value={formData.colors}
                      onChange={(e) => setFormData({...formData, colors: e.target.value})}
                      placeholder="Ex: Branco, Preto, Marrom"
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="description">Descrição</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      placeholder="Descrição do móvel"
                      rows={3}
                    />
                  </div>
                  <div className="col-span-2 space-y-2">
                    <Label htmlFor="image_url">URL da Imagem</Label>
                    <Input
                      id="image_url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({...formData, image_url: e.target.value})}
                      placeholder="https://exemplo.com/imagem.jpg"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="available"
                      checked={formData.available}
                      onCheckedChange={(checked) => setFormData({...formData, available: checked})}
                    />
                    <Label htmlFor="available">Disponível</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="popular"
                      checked={formData.popular}
                      onCheckedChange={(checked) => setFormData({...formData, popular: checked})}
                    />
                    <Label htmlFor="popular">Popular</Label>
                  </div>
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleSave} className="bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                    {editingItem ? 'Atualizar' : 'Criar'}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar móveis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Categoria</TableHead>
                  <TableHead>Preço</TableHead>
                  <TableHead>Material</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredFurniture.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>R$ {item.price.toFixed(2)}</TableCell>
                    <TableCell>{item.material}</TableCell>
                    <TableCell>
                      <div className="flex gap-1">
                        <Badge variant={item.available ? "default" : "secondary"}>
                          {item.available ? "Disponível" : "Indisponível"}
                        </Badge>
                        {item.popular && (
                          <Badge variant="outline">Popular</Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleDelete(item.id)}
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

export default FurnitureManagement;
