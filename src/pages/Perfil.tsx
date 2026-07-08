
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { User, Settings, Bell, Shield, Camera, Edit } from "lucide-react";

const Perfil = () => {
  return (
    <div className="min-h-screen bg-ar-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ar-gray-900 mb-2">Meu Perfil</h1>
          <p className="text-ar-gray-600">Gerencie suas informações e configurações</p>
        </div>

        <Tabs defaultValue="perfil" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-ar-gray-200">
            <TabsTrigger value="perfil" className="data-[state=active]:bg-ar-blue data-[state=active]:text-white">
              <User className="w-4 h-4 mr-2" />
              Perfil
            </TabsTrigger>
            <TabsTrigger value="configuracoes" className="data-[state=active]:bg-ar-blue data-[state=active]:text-white">
              <Settings className="w-4 h-4 mr-2" />
              Configurações
            </TabsTrigger>
            <TabsTrigger value="notificacoes" className="data-[state=active]:bg-ar-blue data-[state=active]:text-white">
              <Bell className="w-4 h-4 mr-2" />
              Notificações
            </TabsTrigger>
            <TabsTrigger value="seguranca" className="data-[state=active]:bg-ar-blue data-[state=active]:text-white">
              <Shield className="w-4 h-4 mr-2" />
              Segurança
            </TabsTrigger>
          </TabsList>

          <TabsContent value="perfil">
            <Card className="border-ar-gray-200">
              <CardHeader>
                <CardTitle className="text-ar-gray-900">Informações Pessoais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-ar-gradient text-white text-xl">U</AvatarFallback>
                    </Avatar>
                    <Button size="sm" className="absolute -bottom-1 -right-1 rounded-full bg-ar-blue text-white">
                      <Camera className="w-3 h-3" />
                    </Button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-ar-gray-900">João Silva</h3>
                    <p className="text-ar-gray-600">Designer de Interiores</p>
                    <Badge className="mt-2 bg-ar-blue text-white">Usuário Premium</Badge>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input id="nome" defaultValue="João Silva" className="border-ar-gray-200" />
                  </div>
                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input id="email" defaultValue="joao@email.com" className="border-ar-gray-200" />
                  </div>
                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input id="telefone" defaultValue="(11) 99999-9999" className="border-ar-gray-200" />
                  </div>
                  <div>
                    <Label htmlFor="empresa">Empresa</Label>
                    <Input id="empresa" defaultValue="Design Studio" className="border-ar-gray-200" />
                  </div>
                </div>

                <Button className="bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                  <Edit className="w-4 h-4 mr-2" />
                  Salvar Alterações
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="configuracoes">
            <Card className="border-ar-gray-200">
              <CardHeader>
                <CardTitle className="text-ar-gray-900">Configurações Gerais</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-ar-gray-600">Personalize sua experiência no MobiliAR</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-ar-gray-900">Modo Escuro</h4>
                      <p className="text-sm text-ar-gray-600">Ative o tema escuro</p>
                    </div>
                    <Button variant="outline" className="border-ar-gray-200">Ativar</Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-ar-gray-900">Unidade de Medida</h4>
                      <p className="text-sm text-ar-gray-600">Escolha entre metros ou pés</p>
                    </div>
                    <Button variant="outline" className="border-ar-gray-200">Metros</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notificacoes">
            <Card className="border-ar-gray-200">
              <CardHeader>
                <CardTitle className="text-ar-gray-900">Preferências de Notificação</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-ar-gray-600 mb-4">Configure como deseja receber notificações</p>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-ar-gray-900">E-mail</h4>
                      <p className="text-sm text-ar-gray-600">Receber novidades por e-mail</p>
                    </div>
                    <Button variant="outline" className="border-ar-gray-200">Ativado</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seguranca">
            <Card className="border-ar-gray-200">
              <CardHeader>
                <CardTitle className="text-ar-gray-900">Segurança da Conta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button className="bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                    Alterar Senha
                  </Button>
                  <Button variant="outline" className="border-ar-gray-200">
                    Ativar Autenticação em Duas Etapas
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Perfil;
