'use client';

import SectionWrapper from '@/components/ui/SectionWrapper';

type Review = {
  id: number;
  name: string;
  initials: string;
  avatarBg: string;
  reviews: number;
  isLocalGuide?: boolean;
  timeAgo: string;
  text: string;
};

const REVIEWS: Review[] = [
  {
    id: 1,
    name: 'Luis Antonio Arriaga García',
    initials: 'LA',
    avatarBg: '#B9122C',
    reviews: 1,
    timeAgo: 'Reciente',
    text: 'Buen dia: excelente servicio y asesoría, resolvió el problema en cuestión de minutos de mi Tv smart. Lo recomiendo. Mil gracias, saludos.',
  },
  {
    id: 2,
    name: 'Thai Cat',
    initials: 'TC',
    avatarBg: '#1A73E8',
    reviews: 12,
    isLocalGuide: true,
    timeAgo: 'Hace 6 meses',
    text: 'Excelente atención por parte del técnico, me resolvió el problema de la pantalla de mi televisor el mismo dia, super amable y eficiente. Si quieren atención de 10 y que les resuelvan su problema rápido es aqui en TV DOCTOR. No se van a arrepentir.',
  },
  {
    id: 3,
    name: 'Car Ballina',
    initials: 'CB',
    avatarBg: '#0D8050',
    reviews: 1,
    timeAgo: 'Hace 3 meses',
    text: 'Muy buen técnico, muy buen servicio. Pasan por tu televisión, la revisan, explican qué es lo que tiene y te consultan si deseas la reparación. Te dan garantía, muy buen servicio. La entregan y recogen a domicilio.',
  },
  {
    id: 4,
    name: 'Didier Garcia',
    initials: 'DG',
    avatarBg: '#8E24AA',
    reviews: 3,
    timeAgo: 'Hace 4 meses',
    text: 'Desde que se le entrega la tv realiza el diagnóstico de manera clara y precisa. La atención es muy buena y me agrada mucho que otorga una garantía de su trabajo. Altamente recomendado.',
  },
  {
    id: 5,
    name: 'Benito Saldana',
    initials: 'BS',
    avatarBg: '#E37400',
    reviews: 1,
    timeAgo: 'Hace 3 meses',
    text: 'Excelente servicio y honestidad, mi reparación quedó el mismo día y me explicaron todo lo que tenía a detalle. Los recomiendo ampliamente. Saludos.',
  },
  {
    id: 6,
    name: 'Elizabeth Flores',
    initials: 'EF',
    avatarBg: '#C0392B',
    reviews: 1,
    timeAgo: 'Hace 5 meses',
    text: 'Muy buen servicio, muy decentes y sobre todo muy rápido su trabajo. De un día para otro me hizo el trabajo, son muy honrados. Felicidades.',
  },
  {
    id: 7,
    name: 'Cristina Lopez M',
    initials: 'CL',
    avatarBg: '#00897B',
    reviews: 15,
    timeAgo: 'Hace 7 meses',
    text: 'Excelente servicio puntual, formal y honesto. Súper amables y me explicaron muy bien lo que se reparó de mi TV. Lo recomiendo ampliamente 🙌🏼',
  },
  {
    id: 8,
    name: 'Jorge Juárez',
    initials: 'JJ',
    avatarBg: '#3949AB',
    reviews: 3,
    timeAgo: 'Hace 4 meses',
    text: 'Excelente atención, información a detalle de lo que sucede y podría suceder. Reparación rápida y segura con garantía y buen precio. Muy recomendable.',
  },
  {
    id: 9,
    name: 'Eduardo Serrano',
    initials: 'ES',
    avatarBg: '#6D4C41',
    reviews: 3,
    timeAgo: 'Hace 6 meses',
    text: 'Lo contacté para una cotización y en una llamada me resolvió lo que tenía mi pantalla. Excelente servicio y atención. Muy recomendable!!',
  },
];

const ROW1 = REVIEWS.slice(0, 5);
const ROW2 = REVIEWS.slice(5, 9);

function Stars() {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <svg key={i} className="w-3.5 h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <div
      className="glass-card p-5 flex flex-col gap-3 shrink-0"
      style={{ width: '300px' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-white font-sans font-bold text-sm shrink-0 shadow"
          style={{ background: review.avatarBg }}
        >
          {review.initials}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white font-semibold font-sans text-sm leading-tight truncate">
            {review.name}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            {review.isLocalGuide && (
              <span className="inline-flex items-center gap-1 text-[10px] font-sans text-[#1A73E8] bg-[#1A73E8]/10 border border-[#1A73E8]/20 px-1.5 py-0.5 rounded-full leading-none">
                <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
                </svg>
                Guía local
              </span>
            )}
            <span className="text-[10px] text-brand-gray font-sans">
              {review.reviews} {review.reviews === 1 ? 'reseña' : 'reseñas'}
            </span>
          </div>
        </div>
        {/* Google icon */}
        <svg className="w-5 h-5 shrink-0 opacity-60" viewBox="0 0 24 24" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>

      {/* Stars + time */}
      <div className="flex items-center justify-between">
        <Stars />
        <span className="text-[10px] text-brand-gray/60 font-sans">{review.timeAgo}</span>
      </div>

      {/* Text */}
      <p className="font-sans font-light text-brand-gray text-xs leading-relaxed line-clamp-4">
        {review.text}
      </p>
    </div>
  );
}

export default function Testimonials() {
  return (
    <SectionWrapper dark dotPattern>
      {/* Header */}
      <div className="text-center mb-12">
        {/* Google rating badge */}
        <div className="inline-flex items-center gap-3 glass-card px-5 py-3 mb-8">
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24" fill="none">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-white text-lg leading-none">5.0</span>
            <div className="flex gap-0.5">
              {[1,2,3,4,5].map(i => (
                <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
          <div className="w-px h-5 bg-white/10" />
          <span className="font-sans text-brand-gray text-xs">Reseñas en Google</span>
        </div>

        <p className="text-brand-red text-xs font-semibold font-sans tracking-[0.25em] uppercase mb-3">
          Casos de éxito
        </p>
        <h2
          className="font-display text-white uppercase"
          style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
        >
          LO QUE DICEN{' '}
          <span className="text-brand-red">NUESTROS CLIENTES</span>
        </h2>
      </div>

      {/* ── Marquee row 1 — scrolls left ── */}
      <div
        className="overflow-hidden mb-4"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex gap-4 w-max"
          style={{ animation: 'marquee-left 40s linear infinite' }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')
          }
        >
          {[...ROW1, ...ROW1].map((r, i) => (
            <ReviewCard key={`r1-${i}`} review={r} />
          ))}
        </div>
      </div>

      {/* ── Marquee row 2 — scrolls right ── */}
      <div
        className="overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        }}
      >
        <div
          className="flex gap-4 w-max"
          style={{ animation: 'marquee-right 45s linear infinite' }}
          onMouseEnter={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'paused')
          }
          onMouseLeave={(e) =>
            ((e.currentTarget as HTMLDivElement).style.animationPlayState = 'running')
          }
        >
          {[...ROW2, ...ROW2].map((r, i) => (
            <ReviewCard key={`r2-${i}`} review={r} />
          ))}
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-6 border-t border-brand-red/15 pt-12">
        {[
          { number: '+500', label: 'Pantallas reparadas' },
          { number: '5.0★', label: 'Calificación en Google' },
          { number: '98%', label: 'Clientes satisfechos' },
          { number: '6 meses', label: 'Garantía máxima' },
        ].map((stat) => (
          <div key={stat.label} className="text-center">
            <p
              className="font-display text-brand-red"
              style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
            >
              {stat.number}
            </p>
            <p className="font-sans text-brand-gray text-xs mt-1 tracking-wide">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
