import { describe, expect, it } from "vitest";
import { cities, services } from "@/lib/seo-data";

describe("GSC local SEO overrides", () => {
  it("targets the El Jadida mobile-app query with a precise title, H1 and description", () => {
    const service = services.find((item) => item.slug === "application-mobile");
    expect(service?.citySeoOverrides?.["el-jadida"]).toEqual({
      title: "Application mobile sur mesure à El Jadida | Expert Digital Maroc",
      h1: "Application mobile sur mesure à El Jadida",
      description:
        "Développement d’application mobile sur mesure à El Jadida avec Flutter, iOS et Android. Devis personnalisé sous 24h.",
    });
  });

  it("targets the Beni Mellal agency SEO query without changing the URL", () => {
    const service = services.find((item) => item.slug === "referencement-seo");
    expect(service?.citySeoOverrides?.["beni-mellal"]).toEqual({
      title: "Agence SEO à Béni Mellal | Référencement Google",
      h1: "Agence SEO à Béni Mellal",
      description:
        "Agence SEO à Béni Mellal : référencement local, optimisation Google, contenu et suivi des positions. Devis personnalisé.",
    });
  });

  it("keeps the existing target city slugs unchanged", () => {
    expect(cities.some((city) => city.slug === "el-jadida")).toBe(true);
    expect(cities.some((city) => city.slug === "beni-mellal")).toBe(true);
  });
});
