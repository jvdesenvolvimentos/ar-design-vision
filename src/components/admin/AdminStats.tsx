
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, Users, Eye, TrendingUp } from "lucide-react";
import { supabase } from '@/integrations/supabase/client';

interface Stats {
  totalFurniture: number;
  totalCategories: number;
  totalUsers: number;
  popularItems: number;
}

const AdminStats = () => {
  const [stats, setStats] = useState<Stats>({
    totalFurniture: 0,
    totalCategories: 0,
    totalUsers: 0,
    popularItems: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [furnitureCount, categoriesCount, usersCount, popularCount] = await Promise.all([
          supabase.from('furniture_catalog').select('*', { count: 'exact', head: true }),
          supabase.from('furniture_categories').select('*', { count: 'exact', head: true }),
          supabase.from('profiles').select('*', { count: 'exact', head: true }),
          supabase.from('furniture_catalog').select('*', { count: 'exact', head: true }).eq('popular', true)
        ]);

        setStats({
          totalFurniture: furnitureCount.count || 0,
          totalCategories: categoriesCount.count || 0,
          totalUsers: usersCount.count || 0,
          popularItems: popularCount.count || 0
        });
      } catch (error) {
        console.error('Erro ao buscar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total de Móveis",
      value: stats.totalFurniture,
      icon: Package,
      color: "text-blue-600"
    },
    {
      title: "Categorias",
      value: stats.totalCategories,
      icon: Eye,
      color: "text-green-600"
    },
    {
      title: "Usuários",
      value: stats.totalUsers,
      icon: Users,
      color: "text-purple-600"
    },
    {
      title: "Itens Populares",
      value: stats.popularItems,
      icon: TrendingUp,
      color: "text-orange-600"
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="pb-2">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-ar-gray-600">
                  {stat.title}
                </CardTitle>
                <IconComponent className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-ar-gray-900">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Resumo do Sistema</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">Catálogo</h3>
              <p className="text-sm text-blue-700">
                {stats.totalFurniture} móveis distribuídos em {stats.totalCategories} categorias diferentes.
              </p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-semibold text-green-900 mb-2">Engagement</h3>
              <p className="text-sm text-green-700">
                {stats.popularItems} itens marcados como populares pelos usuários.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminStats;
