import { de } from "@/lib/fr";
﻿import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowRight, CheckCircle, MessageCircle, MapPin, Phone, Mail, Star, TrendingUp, Clock, Shield } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Breadcrumb } from "@/components/Breadcrumb";
import { cities, services, CONTACT, generateServiceCityContent, generateServiceCityFAQs } from "@/lib/seo-data";
import { useI18n } from "@/lib/i18n";
import { ContactCTA } from "@/components/home/ContactCTA";
import { SEOHead } from "@/components/SEOHead";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const ServiceCityPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const location = useLocation();
  const { t, locale } = useI18n();
  const isAr = locale === "ar";

  let foundService = null;
  let foundCity = null;
  for (const service of services) {
    for (const city of cities) {
      if (`${service.slug}-${city.slug}` === slug) {
        foundService = service;
        foundCity = city;
        break;
      }
    }
    if (foundService) break;
  }

  if (!foundService || !foundCity) {
    return (
      <Layout>
        <SEOHead
          title={isAr ? "الصفحة غير موجودة | أيوب التواتي" : "Page non trouvée | Ayoub Touati"}
          description={isAr ? "هذه الصفحة غير موجودة أو تم نقلها." : "Cette page n'existe pas ou a été déplacée."}
          path={location.pathname}
          noindex
        />
        <div className="container py-20 text-center">
          <h1 className="text-2xl font-bold">{isAr ? "الصفحة غير موجودة" : "Page non trouvée"}</h1>
          <Link to="/" className="text-accent mt-4 inline-block">{isAr ? "العودة إلى الرئيسية" : "Retour à l'accueil"}</Link>
        </div>
      </Layout>
    );
  }

  const service = foundService;
  const city = foundCity;
  const features = isAr ? service.featuresAr : service.features;
  const otherCities = cities.filter((c) => c.slug !== city.slug).slice(0, 8);
  const otherServices = services.filter((s) => s.slug !== service.slug);
  const contentSections = generateServiceCityContent(service, city, isAr);
  const faqs = generateServiceCityFAQs(service, city, isAr);
  const painPoints = isAr ? service.painPointsAr : service.painPoints;
  const benefits = isAr ? service.benefitsAr : service.benefits;

  const qualifier = service.cityTitleQualifier ? ` ${service.cityTitleQualifier}` : "";
  const metaTitle = isAr
    ? `${service.nameAr} في ${city.nameAr} | خبير رقمي المغرب`
    : `${service.name}${qualifier} à ${city.name} | Expert Digital Maroc`;
  const metaDesc = isAr
    ? `${service.shortDescAr} في ${city.nameAr}، المغرب. عرض سعر مخصص عند الطلب.`
    : `${service.shortDesc} à ${city.name}, Maroc. Devis personnalisé, +50 projets réalisés.`;

  return (
    <Layout>
      <SEOHead
        title={metaTitle}
        description={metaDesc}
        path={`/${service.slug}-${city.slug}`}
      />

      <Breadcrumb items={[
        { label: isAr ? service.nameAr : service.name, href: `/services/${service.slug}` },
        { label: city.name, href: `/agence-digitale-${city.slug}` },
        { label: isAr ? `${service.nameAr} ${city.nameAr}` : `${service.name} ${city.name}` },
      ]} />

      {/* Hero */}
      <section className="bg-gradient-hero py-16 md:py-24">
        <div className="container">
          <div className="flex items-center gap-2 mb-4 justify-center md:justify-start">
            <MapPin className="h-4 w-4 text-accent" />
            <span className="text-accent text-sm font-semibold">{city.name}, Maroc</span>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-3xl font-extrabold text-primary-foreground md:text-5xl leading-tight">
                {isAr ? `${service.nameAr} في ${city.nameAr}` : `${service.name} à ${city.name}`}
              </h1>
              <p className="mt-6 text-lg text-primary-foreground/80 leading-relaxed">
                {isAr
                  ? `هل تبحث عن خبير في ${service.nameAr} في ${city.nameAr}؟ أنا أيوب التواتي، متخصص في ${service.shortDescAr}. أساعد الشركات في ${city.nameAr} على التميز عبر الإنترنت وتحقيق نتائج ملموسة. الأسعار عند الطلب.`
                  : `Vous cherchez un expert en ${service.name.toLowerCase()} à ${city.name} ? Je suis Ayoub Touati, spécialisé en ${service.shortDesc.toLowerCase()}. J'aide les entreprises à ${city.name} à se démarquer en ligne et à obtenir des résultats concrets. Prix sur demande.`}
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-gold">
                  <Link to="/contact">
                    {t("hero.cta.quote")} <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-white/10 hover:text-primary-foreground">
                  <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
                  </a>
                </Button>
              </div>
              <div className="mt-6 flex items-center gap-4 text-sm text-primary-foreground/60">
                <div className="flex items-center gap-1">
                  <CheckCircle className="h-4 w-4 text-accent" />
                  {isAr ? "عرض سعر مخصص" : "Devis personnalisé"}
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-accent" />
                  {isAr ? "+50 مشروع" : "+50 projets réussis"}
                </div>
              </div>
            </div>

            <Card className="border-border/50">
              <CardContent className="p-6 space-y-4">
                <h3 className="font-bold text-lg">{isAr ? "تواصل معي الآن" : "Contactez-moi maintenant"}</h3>
                <div className="space-y-3 text-sm">
                  <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                    <Phone className="h-4 w-4 text-accent" /> {CONTACT.phone}
                  </a>
                  <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                    <Mail className="h-4 w-4 text-accent" /> {CONTACT.email}
                  </a>
                  <a href={CONTACT.whatsappMessage} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-muted-foreground hover:text-accent transition-colors">
                    <MessageCircle className="h-4 w-4 text-accent" /> WhatsApp
                  </a>
                </div>
                <div className="rounded-lg bg-muted/60 p-3 text-center">
                  <p className="text-sm font-semibold text-accent">
                    {isAr
                      ? "الأسعار عند الطلب — اتصل بي للحصول على عرض سعر مخصص"
                      : "Prix sur demande — Contactez-moi pour un devis personnalisé"}
                  </p>
                </div>
                <Button asChild className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link to="/contact">{t("hero.cta.quote")}</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 md:text-3xl text-center">
            {isAr ? `تحديات الشركات في ${city.nameAr}` : `Les défis des entreprises à ${city.name}`}
          </h2>
          <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3">
            {painPoints.map((p, i) => (
              <div key={i} className="rounded-xl border border-destructive/20 bg-destructive/5 p-6">
                <div className="mb-3 text-2xl font-black text-destructive/60">✗</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits / Solutions */}
      <section className="py-16 md:py-20">
        <div className="container">
          <h2 className="text-2xl font-bold mb-8 md:text-3xl text-center">
            {isAr ? `ما أقدمه لك` : `Ce que je vous apporte`}
          </h2>
          <div className="mx-auto max-w-4xl grid gap-6 md:grid-cols-3">
            {benefits.map((b, i) => (
              <div key={i} className="rounded-xl border border-accent/20 bg-accent/5 p-6">
                <div className="mb-3 text-2xl font-black text-accent">✓</div>
                <p className="text-sm font-medium leading-relaxed">{b}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl font-bold mb-4 md:text-3xl">
            {isAr
              ? `ماذا أقدم في ${service.nameAr} في ${city.nameAr}`
              : `Mes prestations ${de(service.name.toLowerCase())} à ${city.name}`}
          </h2>
          <p className="text-muted-foreground mb-10 max-w-2xl">
            {isAr
              ? `أقدم خدمات ${service.nameAr} الشاملة للشركات في ${city.nameAr}. كل خدمة مصممة لتحقيق أقصى عائد على الاستثمار.`
              : `Je propose des services ${de(service.name.toLowerCase())} complets pour les entreprises à ${city.name}. Chaque prestation est conçue pour maximiser votre retour sur investissement.`}
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f) => (
              <div key={f} className="flex items-start gap-3 rounded-lg border border-border/50 bg-card p-4">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <span className="text-sm font-medium">{f}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deep content sections */}
      <section className="py-16 md:py-24">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-12">
            {contentSections.map((section, i) => (
              <div key={i}>
                <h2 className="text-xl font-bold mb-4 md:text-2xl">{section.title}</h2>
                <p className="text-muted-foreground leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-16 md:py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-12 md:text-3xl">
            {isAr ? "لماذا تختارني؟" : "Pourquoi me choisir ?"}
          </h2>
          <div className="mx-auto grid max-w-4xl gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <TrendingUp className="mx-auto mb-4 h-8 w-8 text-accent" />
              <h3 className="font-bold mb-2">{isAr ? "نتائج مثبتة" : "Résultats prouvés"}</h3>
              <p className="text-sm text-muted-foreground">{isAr ? `+50 مشروع ناجح في المغرب بما في ذلك ${city.nameAr}` : `+50 projets réussis au Maroc, dont ${city.name}`}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <Clock className="mx-auto mb-4 h-8 w-8 text-accent" />
              <h3 className="font-bold mb-2">{isAr ? "سرعة التنفيذ" : "Rapidité d'exécution"}</h3>
              <p className="text-sm text-muted-foreground">{isAr ? "عرض سعر مخصص ومواعيد تسليم واضحة" : "Devis personnalisé et délais de livraison clairs"}</p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-6 text-center">
              <Shield className="mx-auto mb-4 h-8 w-8 text-accent" />
              <h3 className="font-bold mb-2">{isAr ? "ضمان الرضا" : "Garantie satisfaction"}</h3>
              <p className="text-sm text-muted-foreground">{isAr ? "نطاق عمل واضح قبل الانطلاق" : "Périmètre clair avant le démarrage"}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Industries in this city */}
      <section className="py-10">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-bold mb-4 md:text-2xl">
              {isAr ? `القطاعات التي أخدمها في ${city.nameAr}` : `Secteurs que je sers à ${city.name}`}
            </h2>
            <div className="flex flex-wrap gap-2">
              {(isAr ? city.industriesAr : city.industries).map((ind) => (
                <span key={ind} className="rounded-full bg-accent/10 px-4 py-2 text-sm font-medium text-accent">
                  {ind}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 md:py-24 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-10 md:text-3xl">
            {isAr ? "الأسئلة الشائعة" : "Questions fréquentes"}
          </h2>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq, i) => (
                <AccordionItem
                  key={i}
                  value={`faq-${i}`}
                  className="rounded-lg border border-border/50 bg-card px-6"
                >
                  <AccordionTrigger className="text-left font-semibold hover:text-accent">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Same service, other cities */}
      <section className="py-10">
        <div className="container">
          <h2 className="text-lg font-bold mb-4">
            {isAr ? `${service.nameAr} في مدن أخرى` : `${service.name} dans d'autres villes`}
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherCities.map((c) => (
              <Link
                key={c.slug}
                to={`/${service.slug}-${c.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                {isAr ? `${service.nameAr} ${c.nameAr}` : `${service.name} ${c.name}`}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Other services in this city */}
      <section className="py-10 bg-muted/30">
        <div className="container">
          <h2 className="text-lg font-bold mb-4">
            {isAr ? `خدمات أخرى في ${city.nameAr}` : `Autres services à ${city.name}`}
          </h2>
          <div className="flex flex-wrap gap-2">
            {otherServices.map((s) => (
              <Link
                key={s.slug}
                to={`/${s.slug}-${city.slug}`}
                className="rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:border-accent hover:text-accent transition-colors"
              >
                {isAr ? `${s.nameAr} ${city.nameAr}` : `${s.name} ${city.name}`}
              </Link>
            ))}
            <Link
              to={`/agence-digitale-${city.slug}`}
              className="rounded-full border border-accent bg-accent/10 px-4 py-2 text-sm font-semibold text-accent"
            >
              {isAr ? `وكالة رقمية ${city.nameAr}` : `Agence digitale ${city.name}`}
            </Link>
          </div>
        </div>
      </section>

      <ContactCTA />

      {/* JSON-LD: Service + FAQPage + BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              "@context": "https://schema.org",
              "@type": "Service",
              name: `${service.name} à ${city.name}`,
              description: `${service.shortDesc} à ${city.name}, Maroc`,
              provider: {
                "@type": "LocalBusiness",
                name: CONTACT.name,
                telephone: CONTACT.phone,
                email: CONTACT.email,
                url: "https://touatiayoub.com",
                address: {
                  "@type": "PostalAddress",
                  addressLocality: city.name,
                  addressRegion: city.region,
                  addressCountry: "MA",
                },
              },
              areaServed: { "@type": "City", name: city.name },
            },
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: faqs.map((faq) => ({
                "@type": "Question",
                name: faq.q,
                acceptedAnswer: { "@type": "Answer", text: faq.a },
              })),
            },
            {
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: isAr ? "الرئيسية" : "Accueil", item: "https://touatiayoub.com/" },
                { "@type": "ListItem", position: 2, name: isAr ? service.nameAr : service.name, item: `https://touatiayoub.com/services/${service.slug}` },
                { "@type": "ListItem", position: 3, name: isAr ? city.nameAr : city.name, item: `https://touatiayoub.com/agence-digitale-${city.slug}` },
                { "@type": "ListItem", position: 4, name: isAr ? `${service.nameAr} ${city.nameAr}` : `${service.name} ${city.name}` },
              ],
            },
          ]),
        }}
      />
    </Layout>
  );
};

export default ServiceCityPage;

