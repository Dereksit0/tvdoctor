'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper from '@/components/ui/SectionWrapper';
import Button from '@/components/ui/Button';
import { IconCheck, IconPin, IconLocate } from '@/components/ui/Icons';
import {
  SHOP_COORDS,
  SHOP_ADDRESS,
  FREE_PICKUP_RADIUS_KM,
  DIRECTIONS_URL,
  WA_DOMICILIO,
} from '@/lib/constants';

const LEAFLET_CSS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
const LEAFLET_JS = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';

type CheckResult = {
  lat: number;
  lng: number;
  label: string;
  distanceKm: number;
  inZone: boolean;
};

type Suggestion = {
  lat: number;
  lng: number;
  primary: string;
  secondary: string;
};

function loadLeaflet(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (!document.querySelector(`link[href="${LEAFLET_CSS}"]`)) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = LEAFLET_CSS;
      document.head.appendChild(link);
    }
    const w = window as unknown as { L?: unknown };
    if (w.L) {
      resolve();
      return;
    }
    const existing = document.querySelector(
      `script[src="${LEAFLET_JS}"]`,
    ) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener('load', () => resolve());
      existing.addEventListener('error', () => reject());
      return;
    }
    const script = document.createElement('script');
    script.src = LEAFLET_JS;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject();
    document.head.appendChild(script);
  });
}

// Distancia Haversine en km.
function distanceKm(a: [number, number], b: [number, number]): number {
  const R = 6371;
  const dLat = ((b[0] - a[0]) * Math.PI) / 180;
  const dLng = ((b[1] - a[1]) * Math.PI) / 180;
  const lat1 = (a[0] * Math.PI) / 180;
  const lat2 = (b[0] * Math.PI) / 180;
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export default function CoverageMap() {
  const mapRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const mapInstance = useRef<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const userLayer = useRef<any>(null);
  const ready = useRef(false);

  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<CheckResult | null>(null);
  const [showHint, setShowHint] = useState(true);

  // Autocompletado
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestLoading, setSuggestLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const skipNextFetch = useRef(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const center: [number, number] = [SHOP_COORDS.lat, SHOP_COORDS.lng];

  // Coloca/actualiza la ubicación del usuario en el mapa.
  const showUserOnMap = useCallback(
    (lat: number, lng: number, inZone: boolean) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const L = (window as any).L;
      const map = mapInstance.current;
      if (!L || !map) return;

      if (userLayer.current) {
        map.removeLayer(userLayer.current);
        userLayer.current = null;
      }

      const color = inZone ? '#22c55e' : '#f59e0b';
      const group = L.layerGroup();

      const icon = L.divIcon({
        className: '',
        html: `<div style="
          width:16px;height:16px;border-radius:50%;
          background:${color};border:3px solid #fff;
          box-shadow:0 0 0 4px ${color}55, 0 2px 8px rgba(0,0,0,0.6);
        "></div>`,
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });
      const marker = L.marker([lat, lng], { icon }).addTo(group);
      const dist = distanceKm(center, [lat, lng]);
      marker.bindPopup(
        `<strong>${inZone ? 'Dentro de la zona' : 'Fuera de la zona'}</strong><br/>` +
          `A ${dist.toFixed(1)} km del centro de servicio.<br/>` +
          (inZone
            ? 'Recolección y entrega <strong>GRATIS</strong>.'
            : 'Aplica un cargo adicional según la distancia.'),
      );
      L.polyline([center, [lat, lng]], {
        color,
        weight: 2,
        dashArray: '6 6',
        opacity: 0.9,
      }).addTo(group);

      group.addTo(map);
      userLayer.current = group;

      // Centra el mapa mostrando el local y la ubicación del usuario.
      map.fitBounds(
        L.latLngBounds([center, [lat, lng]]).pad(0.4),
        { maxZoom: 14 },
      );
      setTimeout(() => {
        map.invalidateSize();
        marker.openPopup();
      }, 200);
    },
    [center],
  );

  const handleFound = useCallback(
    (lat: number, lng: number, label: string) => {
      const d = distanceKm(center, [lat, lng]);
      const inZone = d <= FREE_PICKUP_RADIUS_KM;
      setResult({ lat, lng, label, distanceKm: d, inZone });
      setError(null);
      if (ready.current) showUserOnMap(lat, lng, inZone);
    },
    [center, showUserOnMap],
  );

  // Trae sugerencias de direcciones (Nominatim — gratuito, sin API key).
  const fetchSuggestions = useCallback(async (q: string) => {
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    setSuggestLoading(true);
    try {
      // viewbox centrado en Puebla para priorizar resultados locales.
      const url =
        'https://nominatim.openstreetmap.org/search?format=json&addressdetails=1&limit=6&countrycodes=mx' +
        '&viewbox=-98.55,19.25,-98.00,18.85&bounded=0&q=' +
        encodeURIComponent(q + ', Puebla');
      const res = await fetch(url, {
        headers: { 'Accept-Language': 'es' },
        signal: controller.signal,
      });
      const data: Array<{
        lat: string;
        lon: string;
        display_name: string;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        address?: any;
      }> = await res.json();

      const mapped: Suggestion[] = data.map((d) => {
        const a = d.address ?? {};
        const primary =
          a.road ||
          a.neighbourhood ||
          a.suburb ||
          a.amenity ||
          a.shop ||
          d.display_name.split(',')[0];
        const secondaryParts = [
          a.neighbourhood || a.suburb || a.quarter,
          a.city || a.town || a.village || a.municipality,
          a.state,
        ].filter(Boolean);
        const secondary = Array.from(new Set(secondaryParts)).join(', ');
        return {
          lat: parseFloat(d.lat),
          lng: parseFloat(d.lon),
          primary,
          secondary: secondary || d.display_name,
        };
      });
      setSuggestions(mapped);
      setShowSuggestions(true);
      setActiveIndex(-1);
    } catch (e) {
      if ((e as Error).name !== 'AbortError') setSuggestions([]);
    } finally {
      setSuggestLoading(false);
    }
  }, []);

  // Debounce sobre lo que el usuario escribe.
  useEffect(() => {
    if (skipNextFetch.current) {
      skipNextFetch.current = false;
      return;
    }
    const q = query.trim();
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (q.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(() => fetchSuggestions(q), 350);
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, fetchSuggestions]);

  // Selecciona una sugerencia del listado.
  const selectSuggestion = useCallback(
    (s: Suggestion) => {
      skipNextFetch.current = true;
      setQuery(s.primary + (s.secondary ? `, ${s.secondary}` : ''));
      setShowSuggestions(false);
      setSuggestions([]);
      setActiveIndex(-1);
      handleFound(s.lat, s.lng, `${s.primary}${s.secondary ? `, ${s.secondary}` : ''}`);
    },
    [handleFound],
  );

  // Botón "Verificar": usa la sugerencia activa, la primera, o busca directo.
  const searchAddress = useCallback(async () => {
    if (showSuggestions && suggestions.length) {
      selectSuggestion(suggestions[activeIndex >= 0 ? activeIndex : 0]);
      return;
    }
    const q = query.trim();
    if (!q) return;
    setLoading(true);
    setError(null);
    try {
      const url =
        'https://nominatim.openstreetmap.org/search?format=json&limit=1&countrycodes=mx&q=' +
        encodeURIComponent(q + ', Puebla, México');
      const res = await fetch(url, { headers: { 'Accept-Language': 'es' } });
      const data: Array<{ lat: string; lon: string; display_name: string }> =
        await res.json();
      if (!data.length) {
        setResult(null);
        setError(
          'No encontramos esa dirección. Intenta con calle y colonia, o usa tu ubicación actual.',
        );
        return;
      }
      const { lat, lon, display_name } = data[0];
      handleFound(parseFloat(lat), parseFloat(lon), display_name);
    } catch {
      setError('Hubo un problema al buscar. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  }, [query, handleFound, showSuggestions, suggestions, activeIndex, selectSuggestion]);

  // Cierra el dropdown al hacer clic fuera.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  // Usar ubicación del dispositivo: centra el mapa en el usuario y avisa
  // si está dentro o fuera de la zona.
  const useMyLocation = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setError('Tu navegador no permite compartir ubicación.');
      return;
    }
    setLocating(true);
    setError(null);
    setShowHint(false);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocating(false);
        handleFound(pos.coords.latitude, pos.coords.longitude, 'Mi ubicación');
        // Lleva la vista al mapa para que el usuario vea su posición.
        mapRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      },
      (err) => {
        setLocating(false);
        setError(
          err.code === err.PERMISSION_DENIED
            ? 'Permiso de ubicación denegado. Actívalo en tu navegador para usar esta opción.'
            : 'No pudimos obtener tu ubicación. Inténtalo de nuevo o escribe tu dirección.',
        );
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 },
    );
  }, [handleFound]);

  // Inicializa el mapa.
  useEffect(() => {
    let cancelled = false;
    loadLeaflet()
      .then(() => {
        if (cancelled || !mapRef.current || mapInstance.current) return;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const L = (window as any).L;
        if (!L) return;

        const map = L.map(mapRef.current, {
          center,
          zoom: 11,
          scrollWheelZoom: false, // se activa al hacer clic (ver abajo)
          touchZoom: true, // pellizco en móvil
          doubleClickZoom: true,
          dragging: true,
          zoomControl: false, // se añade abajo en la esquina superior derecha
          zoomSnap: 0.5,
          zoomDelta: 0.5,
          attributionControl: true,
        });
        mapInstance.current = map;

        // Control de zoom a la derecha para no encimarse con la leyenda.
        L.control.zoom({ position: 'topright' }).addTo(map);

        // Zoom con rueda solo cuando el usuario interactúa con el mapa
        // (evita "atrapar" el scroll de la página en PC).
        map.on('click focus', () => {
          map.scrollWheelZoom.enable();
          setShowHint(false);
        });
        map.on('mouseout blur', () => map.scrollWheelZoom.disable());
        map.on('movestart zoomstart', () => setShowHint(false));

        L.tileLayer(
          'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
          {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
            maxZoom: 19,
          },
        ).addTo(map);

        const circle = L.circle(center, {
          radius: FREE_PICKUP_RADIUS_KM * 1000,
          color: '#E01535',
          weight: 2,
          fillColor: '#B9122C',
          fillOpacity: 0.18,
        }).addTo(map);

        const icon = L.divIcon({
          className: '',
          html: `<div style="
            width:18px;height:18px;border-radius:50%;
            background:#E01535;border:3px solid #fff;
            box-shadow:0 0 0 4px rgba(224,21,53,0.35), 0 2px 8px rgba(0,0,0,0.6);
          "></div>`,
          iconSize: [18, 18],
          iconAnchor: [9, 9],
        });
        L.marker(center, { icon })
          .addTo(map)
          .bindPopup(
            `<strong>TV Doctor</strong><br/>${SHOP_ADDRESS}<br/><br/>Recolección y entrega <strong>GRATIS</strong> en ${FREE_PICKUP_RADIUS_KM} km a la redonda.`,
          );

        map.fitBounds(circle.getBounds(), { padding: [24, 24] });
        ready.current = true;
        setTimeout(() => map.invalidateSize(), 200);

        // Si ya había un resultado (p. ej. ubicación rápida), dibújalo.
        if (result) showUserOnMap(result.lat, result.lng, result.inZone);
      })
      .catch(() => {});

    return () => {
      cancelled = true;
      if (mapInstance.current) {
        mapInstance.current.remove();
        mapInstance.current = null;
        ready.current = false;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <SectionWrapper id="cobertura" dark dotPattern>
      <div className="text-center mb-10">
        <p className="text-brand-red text-xs font-semibold font-sans tracking-[0.25em] uppercase mb-3">
          Recolección y entrega
        </p>
        <h2
          className="font-display text-white uppercase"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          ZONA DE <span className="text-brand-red">SERVICIO GRATUITO</span>
        </h2>
        <p className="font-sans text-brand-gray text-sm mt-4 max-w-2xl mx-auto">
          Recogemos y entregamos tu pantalla{' '}
          <strong className="text-white">sin costo</strong> dentro de un radio de{' '}
          <strong className="text-brand-red-light">{FREE_PICKUP_RADIUS_KM} km</strong>.
          Escribe tu dirección y verifica al instante si estás en la zona.
        </p>
      </div>

      {/* Verificador de domicilio */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="flex flex-col sm:flex-row gap-2.5">
          {/* Caja de búsqueda con autocompletado */}
          <div ref={boxRef} className="relative flex-1">
            <div
              className={`flex items-center gap-2 rounded-xl bg-brand-dark-3/80 border px-3.5 transition-all duration-200 ${
                showSuggestions && suggestions.length
                  ? 'border-brand-red/70 rounded-b-none shadow-[0_0_0_3px_rgba(185,18,44,0.12)]'
                  : 'border-white/15 focus-within:border-brand-red/70 focus-within:shadow-[0_0_0_3px_rgba(185,18,44,0.12)]'
              }`}
            >
              {/* ícono de búsqueda */}
              <svg
                className="w-[18px] h-[18px] text-brand-gray/70 shrink-0"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
              <input
                type="text"
                inputMode="text"
                autoComplete="off"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => {
                  if (suggestions.length) setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    if (suggestions.length) {
                      setShowSuggestions(true);
                      setActiveIndex((i) => (i + 1) % suggestions.length);
                    }
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setActiveIndex((i) =>
                      i <= 0 ? suggestions.length - 1 : i - 1,
                    );
                  } else if (e.key === 'Enter') {
                    e.preventDefault();
                    searchAddress();
                  } else if (e.key === 'Escape') {
                    setShowSuggestions(false);
                  }
                }}
                placeholder="Escribe tu calle y colonia…"
                aria-label="Dirección para verificar cobertura"
                role="combobox"
                aria-expanded={showSuggestions && suggestions.length > 0}
                aria-controls="address-suggestions"
                className="flex-1 min-h-[52px] bg-transparent text-sm text-white placeholder:text-brand-gray/50 outline-none"
              />
              {/* spinner o botón limpiar */}
              {suggestLoading ? (
                <span
                  className="w-4 h-4 shrink-0 rounded-full border-2 border-brand-gray/30 border-t-brand-red animate-spin"
                  aria-hidden="true"
                />
              ) : query ? (
                <button
                  type="button"
                  onClick={() => {
                    setQuery('');
                    setSuggestions([]);
                    setShowSuggestions(false);
                  }}
                  aria-label="Limpiar"
                  className="shrink-0 text-brand-gray/60 hover:text-white transition-colors cursor-pointer p-1"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              ) : null}
            </div>

            {/* Dropdown de sugerencias */}
            {showSuggestions && suggestions.length > 0 && (
              <ul
                id="address-suggestions"
                role="listbox"
                className="absolute z-[500] left-0 right-0 top-full bg-brand-dark-2 border border-brand-red/40 border-t-0 rounded-b-xl overflow-hidden shadow-[0_16px_40px_rgba(0,0,0,0.6)] max-h-72 overflow-y-auto"
              >
                {suggestions.map((s, i) => (
                  <li
                    key={`${s.lat}-${s.lng}-${i}`}
                    role="option"
                    aria-selected={i === activeIndex}
                    onMouseEnter={() => setActiveIndex(i)}
                    onMouseDown={(e) => {
                      e.preventDefault();
                      selectSuggestion(s);
                    }}
                    className={`flex items-start gap-3 px-4 py-3 cursor-pointer transition-colors ${
                      i === activeIndex ? 'bg-brand-red/15' : 'hover:bg-white/5'
                    }`}
                  >
                    <svg
                      className="w-4 h-4 mt-0.5 text-brand-red-light shrink-0"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    <span className="min-w-0">
                      <span className="block text-sm text-white font-medium truncate">
                        {s.primary}
                      </span>
                      {s.secondary && (
                        <span className="block text-xs text-brand-gray/70 truncate">
                          {s.secondary}
                        </span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <button
            type="button"
            onClick={searchAddress}
            disabled={loading}
            className="min-h-[52px] sm:px-7 inline-flex items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold font-sans bg-brand-red text-white border border-brand-red hover:bg-brand-red-dark btn-glow disabled:opacity-60 cursor-pointer"
          >
            {loading ? 'Buscando…' : 'Verificar'}
          </button>
        </div>
        <button
          type="button"
          onClick={useMyLocation}
          disabled={locating}
          className="mt-2 w-full sm:w-auto min-h-[44px] inline-flex items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold font-sans bg-transparent text-white border border-white/40 hover:border-white hover:bg-white/5 transition-all disabled:opacity-60 cursor-pointer"
        >
          <IconLocate className="w-4 h-4" />
          {locating ? 'Obteniendo ubicación…' : 'Usar mi ubicación actual'}
        </button>

        {error && (
          <p className="mt-3 text-sm font-sans text-amber-400/90">{error}</p>
        )}

        {result && (
          <motion.div
            key={result.label + result.distanceKm}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mt-3 rounded-lg border p-4 text-sm font-sans ${
              result.inZone
                ? 'border-green-500/40 bg-green-500/10'
                : 'border-amber-500/40 bg-amber-500/10'
            }`}
          >
            <p
              className={`flex items-center gap-2 font-semibold ${
                result.inZone ? 'text-green-400' : 'text-amber-400'
              }`}
            >
              {result.inZone ? (
                <IconCheck className="w-4 h-4 shrink-0" />
              ) : (
                <IconPin className="w-4 h-4 shrink-0" />
              )}
              {result.inZone
                ? '¡Estás dentro de la zona gratuita!'
                : 'Estás fuera de la zona gratuita'}
            </p>
            <p className="text-brand-gray mt-1">
              A{' '}
              <strong className="text-white">
                {result.distanceKm.toFixed(1)} km
              </strong>{' '}
              del centro de servicio.{' '}
              {result.inZone
                ? 'Recolección y entrega sin costo.'
                : 'Aplica un cargo adicional según la distancia — te lo confirmamos antes.'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Mapa */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.6 }}
        className="glass-card overflow-hidden p-0"
      >
        <div className="relative">
          <div
            ref={mapRef}
            className="w-full h-[340px] sm:h-[440px] lg:h-[520px] bg-brand-dark-3 z-0"
            style={{ minHeight: 340 }}
          >
            <div className="flex items-center justify-center h-full text-brand-gray/60 text-sm font-sans">
              Cargando mapa…
            </div>
          </div>

          {/* Pista de zoom (se oculta al interactuar) */}
          {showHint && (
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[400] glass-card !bg-brand-black/80 backdrop-blur-md px-3 py-1.5 text-[11px] font-sans text-brand-gray pointer-events-none whitespace-nowrap">
              <span className="hidden sm:inline">Haz clic y usa la rueda, o los botones +/−, para hacer zoom</span>
              <span className="sm:hidden">Pellizca con dos dedos para hacer zoom</span>
            </div>
          )}

          <div className="absolute top-3 left-3 right-3 sm:right-auto z-[400] glass-card !bg-brand-black/80 backdrop-blur-md px-3 py-2.5 text-[11px] sm:text-xs font-sans flex flex-wrap gap-x-4 gap-y-1.5 sm:max-w-[230px] pointer-events-none">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-full border-2 border-white bg-brand-red-light shrink-0" />
              <span className="text-white font-semibold">Centro</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-3 h-3 rounded-sm border border-brand-red-light bg-brand-red/30 shrink-0" />
              <span className="text-brand-gray">
                {FREE_PICKUP_RADIUS_KM} km <span className="text-white">GRATIS</span>
              </span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tarjetas informativas */}
      <div className="grid sm:grid-cols-2 gap-4 mt-6">
        <div className="glass-card p-5 flex items-start gap-3.5">
          <span className="shrink-0 w-10 h-10 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center text-green-400">
            <IconCheck className="w-5 h-5" />
          </span>
          <div>
            <p className="text-white font-sans font-semibold text-sm">
              Dentro de {FREE_PICKUP_RADIUS_KM} km
            </p>
            <p className="text-brand-gray text-sm mt-1">
              Pasamos por tu pantalla y te la devolvemos reparada{' '}
              <strong className="text-brand-red-light">sin ningún costo</strong> de traslado.
            </p>
          </div>
        </div>
        <div className="glass-card p-5 flex items-start gap-3.5">
          <span className="shrink-0 w-10 h-10 rounded-full bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <IconPin className="w-5 h-5" />
          </span>
          <div>
            <p className="text-white font-sans font-semibold text-sm">
              Fuera de la zona
            </p>
            <p className="text-brand-gray text-sm mt-1">
              También vamos por ti. Aplica un{' '}
              <strong className="text-white">cargo adicional</strong> según la distancia —
              te lo confirmamos antes.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
        <Button href={WA_DOMICILIO} target="_blank" rel="noopener noreferrer">
          Solicitar recolección
        </Button>
        <Button
          href={DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
        >
          Cómo llegar
        </Button>
      </div>

      <p className="text-center text-brand-gray/60 text-xs font-sans mt-6">
        {SHOP_ADDRESS}
      </p>
    </SectionWrapper>
  );
}
