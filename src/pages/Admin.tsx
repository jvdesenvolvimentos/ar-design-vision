
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Package, Users, Settings, BarChart3, Plus } from "lucide-react";
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import FurnitureManagement from '@/components/admin/FurnitureManagement';
import CategoriesManagement from '@/components/admin/CategoriesManagement';
import UsersManagement from '@/components/admin/UsersManagement';
import AdminStats from '@/components/admin/AdminStats';

const Admin = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        navigate('/auth');
        return;
      }

      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (profile?.role === 'admin') {
          setIsAdmin(true);
        } else {
          navigate('/');
        }
      } catch (error) {
        console.error('Erro ao verificar role:', error);
        navigate('/');
      } finally {
        setCheckingRole(false);
      }
    };

    if (!loading) {
      checkAdminRole();
    }
  }, [user, loading, navigate]);

  if (loading || checkingRole) {
    return (
      <div className="min-h-screen bg-ar-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-ar-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-ar-gray-600">Verificando permissões...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-ar-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ar-gray-900 mb-2">Painel Administrativo</h1>
          <p className="text-ar-gray-600">Gerencie o catálogo de móveis, usuários e configurações do sistema</p>
        </div>

        <Tabs defaultValue="stats" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Estatísticas</span>
            </TabsTrigger>
            <TabsTrigger value="furniture" className="flex items-center gap-2">
              <Package className="w-4 h-4" />
              <span className="hidden sm:inline">Móveis</span>
            </TabsTrigger>
            <TabsTrigger value="categories" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Categorias</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              <span className="hidden sm:inline">Usuários</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stats">
            <AdminStats />
          </TabsContent>

          <TabsContent value="furniture">
            <FurnitureManagement />
          </TabsContent>

          <TabsContent value="categories">
            <CategoriesManagement />
          </TabsContent>

          <TabsContent value="users">
            <UsersManagement />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Admin;
