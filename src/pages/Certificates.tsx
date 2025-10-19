import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

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
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12 text-center">
              {data.title}
            </h1>

            {data.images.length > 0 ? (
              <div className="grid gap-8">
                {data.images.map((image, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-lg p-4">
                    <img
                      src={image}
                      alt={`${data.title} - документ ${index + 1}`}
                      className="w-full h-auto rounded-md"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-secondary/30 rounded-lg p-12 text-center">
                <Icon name="FileText" className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">
                  Сканы сертификатов будут добавлены в ближайшее время
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Certificates;
