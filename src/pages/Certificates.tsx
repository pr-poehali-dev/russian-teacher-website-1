import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

const CERTIFICATES_API = "https://functions.poehali.dev/38839045-2b7b-4eef-93e1-e8ae4cbac347";
const UPLOAD_API = "https://functions.poehali.dev/9d42a4ac-79a8-428e-b91b-d5e9edae0785";

interface Certificate {
  id: number;
  category_id: string;
  image_url: string;
  uploaded_at: string;
}

const certificatesTitles: Record<string, string> = {
  "additional-education": "Дополнительное образование",
  "higher-education": "Высшее педагогическое образование",
  "qualification-2023": "Современные образовательные технологии в преподавании филологии",
  "qualification-2022": "Подготовка учащихся к ОГЭ и ЕГЭ по русскому языку",
  "qualification-2021": "Цифровые инструменты в работе учителя-словесника",
  "award-ministry": "Почётная грамота Министерства образования",
  "award-municipal": "Победитель муниципального конкурса",
  "award-students": "Успехи учеников",
  "award-ege": "Высокие результаты ЕГЭ",
};

const Certificates = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  const title = id ? certificatesTitles[id] : null;

  useEffect(() => {
    if (id) {
      loadCertificates();
    }
  }, [id]);

  const loadCertificates = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${CERTIFICATES_API}?category_id=${id}`);
      const data = await response.json();
      setCertificates(data.certificates || []);
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось загрузить сертификаты",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!title) {
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
        const base64Image = await new Promise<string>((resolve) => {
          reader.onload = (e) => {
            resolve(e.target?.result as string);
          };
          reader.readAsDataURL(file);
        });

        const uploadResponse = await fetch(UPLOAD_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image }),
        });

        const uploadData = await uploadResponse.json();

        await fetch(CERTIFICATES_API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            category_id: id,
            image_url: uploadData.url,
          }),
        });
      }

      await loadCertificates();
      
      toast({
        title: "Успешно",
        description: `Загружено файлов: ${files.length}`,
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

  const handleRemoveImage = async (certId: number) => {
    try {
      await fetch(CERTIFICATES_API, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: certId }),
      });

      setCertificates(certificates.filter((cert) => cert.id !== certId));
      
      toast({
        title: "Удалено",
        description: "Изображение удалено",
      });
    } catch (error) {
      toast({
        title: "Ошибка",
        description: "Не удалось удалить изображение",
        variant: "destructive",
      });
    }
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
                {title}
              </h1>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading || isLoading}
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

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : certificates.length > 0 ? (
              <div className="grid gap-8">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="relative group overflow-hidden">
                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={() => handleRemoveImage(cert.id)}
                      >
                        <Icon name="Trash2" className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="p-4">
                      <img
                        src={cert.image_url}
                        alt={`${title} - документ`}
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
