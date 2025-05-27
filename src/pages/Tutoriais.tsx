
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Clock, BookOpen, Video, FileText } from "lucide-react";

const Tutoriais = () => {
  const tutoriais = [
    {
      id: 1,
      titulo: "Primeiros Passos no MobiliAR",
      tipo: "Video",
      duracao: "5 min",
      nivel: "Iniciante",
      thumbnail: "/placeholder.svg",
      descricao: "Aprenda o básico para começar a usar a realidade aumentada"
    },
    {
      id: 2,
      titulo: "Configurando Móveis Personalizados",
      tipo: "Video",
      duracao: "8 min",
      nivel: "Intermediário",
      thumbnail: "/placeholder.svg",
      descricao: "Como personalizar dimensões e materiais"
    },
    {
      id: 3,
      titulo: "Dicas de Design de Interiores",
      tipo: "Artigo",
      duracao: "3 min",
      nivel: "Iniciante",
      thumbnail: "/placeholder.svg",
      descricao: "Princípios básicos para harmonizar seu ambiente"
    }
  ];

  return (
    <div className="min-h-screen bg-ar-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-ar-gray-900 mb-2">Tutoriais</h1>
          <p className="text-ar-gray-600">Aprenda a usar o MobiliAR como um profissional</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tutoriais.map((tutorial) => (
            <Card key={tutorial.id} className="overflow-hidden hover:shadow-lg transition-shadow border-ar-gray-200">
              <div className="aspect-video bg-ar-gray-100 relative">
                <img 
                  src={tutorial.thumbnail} 
                  alt={tutorial.titulo}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button size="lg" className="bg-ar-gradient hover:bg-ar-gradient-dark text-white rounded-full w-16 h-16">
                    {tutorial.tipo === "Video" ? <Play className="w-6 h-6" /> : <FileText className="w-6 h-6" />}
                  </Button>
                </div>
                <div className="absolute top-3 left-3">
                  <Badge className="bg-ar-blue text-white">
                    {tutorial.tipo === "Video" ? <Video className="w-3 h-3 mr-1" /> : <BookOpen className="w-3 h-3 mr-1" />}
                    {tutorial.tipo}
                  </Badge>
                </div>
                <div className="absolute bottom-3 right-3">
                  <Badge variant="secondary" className="bg-black/50 text-white">
                    <Clock className="w-3 h-3 mr-1" />
                    {tutorial.duracao}
                  </Badge>
                </div>
              </div>
              
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="border-ar-gray-200">{tutorial.nivel}</Badge>
                </div>
                <CardTitle className="text-lg text-ar-gray-900">{tutorial.titulo}</CardTitle>
                <p className="text-sm text-ar-gray-600">{tutorial.descricao}</p>
              </CardHeader>
              
              <CardContent>
                <Button className="w-full bg-ar-gradient hover:bg-ar-gradient-dark text-white">
                  {tutorial.tipo === "Video" ? "Assistir" : "Ler"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tutoriais;
