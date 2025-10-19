import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-secondary/20">
      <header className="sticky top-0 bg-white/80 backdrop-blur-md z-10 border-b border-border/50">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-primary">Портфолио педагога</h1>
            <div className="flex gap-6">
              <a href="#about" className="text-sm hover:text-accent transition-colors">О себе</a>
              <a href="#education" className="text-sm hover:text-accent transition-colors">Образование</a>
              <a href="#qualifications" className="text-sm hover:text-accent transition-colors">Квалификация</a>
              <a href="#awards" className="text-sm hover:text-accent transition-colors">Награды</a>
            </div>
          </nav>
        </div>
      </header>

      <section id="about" className="py-16 md:py-24 animate-fade-in">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-8 items-start">
              <div className="w-full md:w-64 flex-shrink-0">
                <img
                  src="https://cdn.poehali.dev/projects/ec1f15b9-0f07-4152-a7f1-3da586a0f872/files/2f1d86a6-c30d-42b8-b5f1-4ed8c9bb121a.jpg"
                  alt="Доржиева Цыцык Викторовна"
                  className="w-full aspect-[3/4] object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-4xl md:text-5xl font-serif font-bold text-primary mb-2">
                  Доржиева Цыцык Викторовна
                </h2>
                <p className="text-xl text-muted-foreground mb-4">Учитель русского языка и литературы</p>
                <Badge variant="secondary" className="mb-6">
                  <Icon name="School" className="w-3 h-3 mr-1" />
                  МБОУ Иройская СОШ
                </Badge>
                <p className="text-foreground/80 leading-relaxed">
                  Преподаватель с многолетним опытом работы, ориентированный на развитие глубокого понимания русского языка и литературы у учащихся. 
                  Стремлюсь создавать вдохновляющую образовательную среду, где каждый ученик может раскрыть свой потенциал.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Separator className="container mx-auto" />

      <section id="education" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12 flex items-center gap-3">
              <Icon name="GraduationCap" className="w-8 h-8 text-accent" />
              Сведения об образовании
            </h2>
            <div className="space-y-6">
              <Card className="border-l-4 border-l-accent hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Высшее педагогическое образование</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Building2" className="w-4 h-4 text-muted-foreground mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Бурятский государственный университет</p>
                      <p className="text-sm text-muted-foreground">Филологический факультет</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Calendar" className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">Год окончания: 2005</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon name="Award" className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm">Квалификация: Учитель русского языка и литературы</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-accent/50 hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-xl font-serif">Дополнительное образование</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p className="text-sm">Регулярное участие в семинарах и вебинарах по современным методикам преподавания русского языка</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="qualifications" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12 flex items-center gap-3">
              <Icon name="BookOpen" className="w-8 h-8 text-accent" />
              Повышение квалификации
            </h2>
            <div className="grid gap-6">
              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif font-semibold text-lg">Современные образовательные технологии в преподавании филологии</h3>
                    <Badge variant="outline">2023</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Институт развития образования Республики Бурятия</p>
                  <p className="text-sm">72 часа</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif font-semibold text-lg">Подготовка учащихся к ОГЭ и ЕГЭ по русскому языку</h3>
                    <Badge variant="outline">2022</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Московский институт открытого образования</p>
                  <p className="text-sm">108 часов</p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <h3 className="font-serif font-semibold text-lg">Цифровые инструменты в работе учителя-словесника</h3>
                    <Badge variant="outline">2021</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Яндекс.Учебник</p>
                  <p className="text-sm">36 часов</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="awards" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-primary mb-12 flex items-center gap-3">
              <Icon name="Trophy" className="w-8 h-8 text-accent" />
              Награды и достижения
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="bg-gradient-to-br from-accent/5 to-transparent border-accent/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Icon name="Medal" className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1">Почётная грамота Министерства образования</h3>
                      <p className="text-sm text-muted-foreground">2022 год</p>
                    </div>
                  </div>
                  <p className="text-sm">За значительные успехи в организации и совершенствовании учебного процесса</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/5 to-transparent border-accent/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Icon name="Star" className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1">Победитель муниципального конкурса</h3>
                      <p className="text-sm text-muted-foreground">2021 год</p>
                    </div>
                  </div>
                  <p className="text-sm">"Лучший учитель русского языка и литературы"</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/5 to-transparent border-accent/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Icon name="Users" className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1">Успехи учеников</h3>
                      <p className="text-sm text-muted-foreground">2020-2024 годы</p>
                    </div>
                  </div>
                  <p className="text-sm">15 призёров и победителей олимпиад и конкурсов различного уровня</p>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-accent/5 to-transparent border-accent/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3 mb-3">
                    <Icon name="Target" className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-serif font-semibold text-lg mb-1">Высокие результаты ЕГЭ</h3>
                      <p className="text-sm text-muted-foreground">2023 год</p>
                    </div>
                  </div>
                  <p className="text-sm">Средний балл учеников - 82, что выше среднего по региону</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm opacity-80">© 2024 Доржиева Цыцык Викторовна • МБОУ Иройская СОШ</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
