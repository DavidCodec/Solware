import { Bot, Zap, BarChart2, FileSpreadsheet, Clock, Database } from 'lucide-react';
import Carousel from './Carousel';
import BlurText from './effectsComponents/BlurText'
import { useTranslation } from 'react-i18next'

const Automation = () => {
  const { t } = useTranslation()
  const automations = [
    {
      id: 1,
      title: t("automation.automatizacion.title"),
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/automatizacion.webp",
      description: t("automation.automatizacion.description"),
      icon: <Zap className="w-12 h-12 text-blue-500" />
    },
    {
      id: 2,
      title: t("automation.analisis.title"),
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/soporte.webp",
      description: t("automation.analisis.description"),
      icon: <BarChart2 className="w-12 h-12 text-green-500" />
    },
    {
      id: 3,
      title: t("automation.gestion.title"),
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/crm.webp",
      description: t("automation.gestion.description"),
      icon: <FileSpreadsheet className="w-12 h-12 text-purple-500" />
    },
    {
      id: 4,
      title: t("automation.tareas.title"),  
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/desarrollo.webp",
      description: t("automation.tareas.description"),
      icon: <Clock className="w-12 h-12 text-orange-500" />
    },
    {
      id: 5,
      title: t("automation.integracion.title"),
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/digitalizacion%20(2).webp",
      description: t("automation.integracion.description"),
      icon: <Database className="w-12 h-12 text-red-500" />
    },
    {
      id: 6,
      title: t("automation.asistentes.title"),
      image: "https://lafysstpyiejevhrlmzc.supabase.co/storage/v1/object/public/imagenes/Servicios/Agentes%20ia2.webp",
      description: t("automation.asistentes.description"),
      icon: <Bot className="w-12 h-12 text-indigo-500" />
    }
  ];
  return (
    <section className="py-24 bg-white dark:bg-gray-900 transition-colors duration-300\" id="automatizacion">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto mb-16">
          <BlurText
            text={t("automation.title")}
            delay={150}
            animateBy="words"
            direction="top"
            className="text-4xl font-bold text-gray-900 dark:text-white mb-4 text-center w-full"
          />
          <BlurText
            text={t("automation.description")}
            delay={200}
            animateBy="words"
            direction="bottom"
            className="text-xl text-gray-600 dark:text-gray-300 text-center w-full"
          />
        </div>

        <div>
          <Carousel items={automations} />
        </div>
      </div>
    </section>
  );
};

export default Automation;