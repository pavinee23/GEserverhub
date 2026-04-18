"use client";

import { useDeferredValue, useEffect, useState } from "react";
import {
  languageStorageKey,
  fallbackProfile,
  fallbackServices,
  fallbackClients,
  filterOptions,
  getJson,
} from "@/lib/data";
import { translations } from "@/lib/translations";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Sidebar from "@/components/Sidebar";
import ServicesSection from "@/components/ServicesSection";
import ShowcaseSection from "@/components/ShowcaseSection";
import JourneySection from "@/components/JourneySection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Page() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [services, setServices] = useState(fallbackServices);
  const [clients, setClients] = useState(fallbackClients);
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState("th");
  const deferredQuery = useDeferredValue(query);

  useEffect(() => {
    const saved = window.localStorage.getItem(languageStorageKey);
    if (saved && translations[saved]) setCurrentLanguage(saved);
  }, []);

  useEffect(() => {
    window.localStorage.setItem(languageStorageKey, currentLanguage);
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage]);

  // Scroll-reveal: mark body ready, then observe [data-reveal] elements
  useEffect(() => {
    document.body.classList.add("ge-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px" }
    );

    const elements = document.querySelectorAll("[data-reveal]");
    elements.forEach((el) => observer.observe(el));

    // Fallback: if observer doesn't fire within 1.5s, reveal all remaining elements
    const fallback = setTimeout(() => {
      document.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => {
        el.classList.add("is-revealed");
      });
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [loading]); // re-observe after async data loads

  useEffect(() => {
    let active = true;

    async function loadData() {
      try {
        const [profilePayload, servicesPayload, clientsPayload] = await Promise.all([
          getJson(["/api/backend/profile", "/backend-api/profile"]),
          getJson(["/api/backend/services", "/backend-api/services"]),
          getJson(["/api/backend/clients", "/backend-api/clients"]),
        ]);
        if (!active) return;
        setProfile(profilePayload.profile || fallbackProfile);
        setServices(servicesPayload.services || fallbackServices);
        setClients(clientsPayload.clients || fallbackClients);
      } catch {
        // fallback data already set as initial state
      } finally {
        if (active) setLoading(false);
      }
    }

    loadData();
    return () => {
      active = false;
    };
  }, []);

  const ui = translations[currentLanguage] || translations.th;

  const normalizedQuery = deferredQuery.trim().toLowerCase();
  const filteredClients = clients.filter((client) => {
    const matchesFilter = activeFilter === "all" || client.status === activeFilter;
    const haystack = `${client.name} ${client.slug} ${client.description}`.toLowerCase();
    return matchesFilter && (!normalizedQuery || haystack.includes(normalizedQuery));
  });

  const onlineCount = clients.filter((c) => c.status === "online").length;
  const maintenanceCount = clients.filter((c) => c.status === "maintenance").length;
  const comingSoonCount = clients.filter((c) => c.status === "coming-soon").length;

  const localizedServices = services.map((service) => {
    const copy = ui.serviceMap[service.highlight];
    return copy ? { ...service, ...copy } : service;
  });

  const translatedFilterOptions = filterOptions.map((option) => ({
    ...option,
    label:
      option.key === "all"
        ? ui.filterAll
        : option.key === "online"
          ? ui.filterOnline
          : option.key === "maintenance"
            ? ui.filterMaintenance
            : ui.filterComingSoon,
  }));

  return (
    <div className="agency-app-layout">
      <Sidebar ui={ui} profile={profile} />

      <main className="agency-main-content">
        <div className="agency-page">
          <div className="agency-ambient agency-ambient-a" aria-hidden="true" />
          <div className="agency-ambient agency-ambient-b" aria-hidden="true" />
          <div className="agency-ambient agency-ambient-c" aria-hidden="true" />

          <Navbar
            ui={ui}
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            query={query}
            setQuery={setQuery}
          />
          <Hero
            ui={ui}
            profile={profile}
            services={localizedServices}
            clients={clients}
            onlineCount={onlineCount}
            maintenanceCount={maintenanceCount}
            comingSoonCount={comingSoonCount}
            loading={loading}
            query={query}
            setQuery={setQuery}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
          <ShowcaseSection
            ui={ui}
            filteredClients={filteredClients}
          />
          <ServicesSection ui={ui} services={localizedServices} />
          <JourneySection ui={ui} />
          <ContactSection ui={ui} profile={profile} />
          <Footer ui={ui} profile={profile} />
        </div>
      </main>
    </div>
  );
}
