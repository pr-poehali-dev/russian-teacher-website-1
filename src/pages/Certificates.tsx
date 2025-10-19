import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

const certificatesData: Record<string, { title: string; images: string[] }> = {
  "additional-education": {
    title: "Дополнительное образование",
    images: ["https://cdn.poehali.dev/files/ef0155e1-4853-4330-9642-28323a6d3edf.jpg"],
  },
  "higher-education": {
    title: "Высшее педагогическое образование",
    images: [],
  },
  "qualification-2023": {
    title: "Современные образовательные технологии в преподавании филологии",
    images: [],
  },
  "qualification-2022": {
    title: "Подготовка учащихся к ОГЭ и ЕГЭ по русскому языку",
    images: [],
  },
  "qualification-2021": {
    title: "Цифровые инструменты в работе учителя-словесника",
    images: [],
  },
  "award-ministry": {
    title: "Почётная грамота Министерства образования",
    images: [],
  },
  "award-municipal": {
    title: "Победитель муниципального конкурса",
    images: [],
  },
  "award-students": {
    title: "Успехи учеников",
    images: [],
  },
  "award-ege": {
    title: "Высокие результаты ЕГЭ",
    images: [],
  },
};

const Certificates = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>(id ? certificatesData[id]?.images || [] : []);
  const [isUploading, setIsUploading] = useState(false);
  
  const data = id ? certificatesData[id] : null;

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-serif font-bold text-primary mb-4">Страница не найдена</h1>
          <Button onClick={() => navigate("/")}>
            <Icon name="ArrowLeft" className="w-4 h-4 mr-2" />
            Вернуться на главную
          </Button>
        </div>
      </div>
    );
  }

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);

    try {
      const newImages: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (!file.type.startsWith('image/')) {
          toast({
            title: "Ошибка",
            description: `Файл ${file.name} не является изображением`,
            variant: "destructive",
          });
          continue;
        }

        const reader = new FileReader();
        const imageUrl = await new Promise<string>((resolve) => {
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });
        
        newImages.push(imageUrl);
      }

      setImages([...images, ...newImages]);
      
      toast({
        title: "Успешно",
        description: `Загружено файлов: ${newImages.length}`,
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить изображения",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleRemoveImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
    toast({
      title: "Удалено",
      description: "Изображение удалено",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/")} className="gap-2">
            <Icon name="ArrowLeft" className="w-4 h-4" />
            Назад к портфолио
          </Button>
        </div>
      </header>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
                {data.title}
              </h1>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="gap-2"
              >
                <Icon name="Upload" className="w-4 h-4" />
                {isUploading ? "Загрузка..." : "Добавить скан"}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleFileSelect}
              />
            </div>

            {images.length > 0 ? (
              <div className="grid gap-8">
                {images.map((image, index) => (
                  <Card key={index} className="relative group overflow-hidden">
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Icon name="Trash2" className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <img
                        src={image}
                        alt={`${data.title} - документ ${index + 1}`}
                        className="w-full h-auto rounded-md"
                      />
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="bg-secondary/30 p-12 text-center border-dashed border-2">
                <Icon name="FileText" className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-6">
                  Сканы сертификатов пока не добавлены
                </p>
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="gap-2"
                >
                  <Icon name="Upload" className="w-4 h-4" />
                  Загрузить первый документ
                </Button>
              </Card>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certificates;
