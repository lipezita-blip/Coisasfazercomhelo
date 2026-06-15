import { useState, useEffect } from 'react';
import { Coffee, Sun, Wine, MapPin, Heart, Loader2, Film } from 'lucide-react';

const COLORS = {
  bgDeep: '#111409',
  bgCard: '#F4EDD8',
  bgCardEdge: '#E5D9BC',
  ink: '#211B0E',
  inkLight: '#4A3F2A',
  terra: '#B8501A',
  gold: '#C9952E',
  goldLight: '#E4B84A',
  stamp: '#9B2D22',
  sage: '#6B7A5C',
  sageDim: '#4D5842',
  cream: '#F4EDD8',
};

const PLACES = [
  // CAFÉ
  {
    id: 'oh-bruder-bezerra',
    name: 'Oh Brüder',
    area: 'Passo da Areia — Rua Bezerra de Menezes',
    desc: 'O pão de queijo é o motivo real da visita, o café é só desculpa.',
    task: 'Pedir o pão de queijo e parar de fingir que vim por outra coisa',
    category: 'cafe',
    tag: 'brunch',
  },
  {
    id: 'william-sons',
    name: 'William & Sons',
    area: 'Pedro Ivo, quase esquina Silva Jardim',
    desc: 'Escondido de propósito. Torram o próprio café ali atrás. Cardápio pequeno porque não precisa de mais.',
    task: 'Pedir o café da casa e perguntar qual é o grão do dia',
    category: 'cafe',
    tag: 'micro-torrefação',
  },
  {
    id: 'porto-farro',
    name: 'Café Porto Farró',
    area: 'Farroupilha',
    desc: 'Café da manhã devagar, sem hora pra acabar.',
    task: 'Ir num dia sem compromisso depois e ficar até enjoar do lugar',
    category: 'cafe',
    tag: 'manhã',
  },
  {
    id: 'relicario',
    name: 'Relicário Café',
    area: 'Cidade Baixa — Av. João Pessoa',
    desc: 'Toca a campainha pra entrar. Antiquário e café juntos — parece invasão na casa da vó de alguém.',
    task: 'Tocar a campainha sem rir',
    category: 'cafe',
    tag: 'escondido',
  },
  {
    id: 'leiteria',
    name: 'Leiteria 639',
    area: 'Santana — Av. Venâncio Aires',
    desc: 'Fila no fim de semana, mas a varanda no sol compensa a espera.',
    task: 'Encarar a fila e garantir mesa na varanda',
    category: 'cafe',
    tag: 'brunch',
  },

  // TARDE
  {
    id: 'gasometro-lago',
    name: 'Orla do Guaíba',
    area: 'Usina do Gasômetro',
    desc: 'Vinho, mureta, e o céu ficando laranja de um jeito que parece exagero.',
    task: 'Levar um vinho e sentar na mureta até o céu mudar de cor',
    category: 'tarde',
    tag: 'pôr do sol',
  },
  {
    id: 'moinhos-parque',
    name: 'Parque Moinhos de Vento',
    area: 'Moinhos de Vento',
    desc: 'Andar sem destino e parar onde der vontade.',
    task: 'Caminhar sem rota e ver onde a gente para',
    category: 'tarde',
    tag: 'passeio',
  },
  {
    id: 'farroupilha-chope',
    name: 'Refúgio do Lago',
    area: 'Parque Farroupilha',
    desc: 'Chope olhando pro lago, num domingo que sempre acaba rápido demais.',
    task: 'Tomar um chope vendo o domingo acabar rápido demais',
    category: 'tarde',
    tag: 'ao ar livre',
  },

  // CINEMA — só um
  {
    id: 'cinemateca-capitolio',
    name: 'Cinemateca Capitólio',
    area: 'Centro — Rua Demétrio Ribeiro',
    desc: 'Filme que não passa em nenhum outro lugar da cidade.',
    task: 'Ver algo que não vai estar em nenhum streaming depois',
    category: 'cinema',
    tag: 'cinema arte',
  },

  // JANTAR
  {
    id: 'bottega-maria',
    name: 'Bottega Maria',
    area: 'Rio Branco',
    desc: 'Massa fresca, luz baixa, poucas mesas. Jantar que não combina com pressa.',
    task: 'Pedir uma massa fresca e não olhar pro relógio',
    category: 'jantar',
    tag: 'italiano',
  },
  {
    id: 'capincho',
    name: 'Capincho',
    area: 'Moinhos de Vento',
    desc: 'Menu surpresa. Quem decide é a cozinha, não você.',
    task: 'Aceitar o que vier sem perguntar o nome do prato',
    category: 'jantar',
    tag: 'menu degustação',
  },
  {
    id: 'raven',
    name: 'The Raven',
    area: 'Cidade Baixa',
    desc: 'Decoração meio esquisita, tartare bom, tiramisù de martini. Não é pra qualquer humor.',
    task: 'Pedir o tartare e o tiramisù de martini no mesmo dia',
    category: 'jantar',
    tag: 'bistrô',
  },
  {
    id: 'fondue-outback',
    name: 'Outback',
    area: 'qualquer unidade',
    desc: 'Fondue de chocolate no final, sem cerimônia nenhuma.',
    task: 'Pedir o fondue e não levar o jantar tão a sério',
    category: 'jantar',
    tag: 'sem pretensão',
  },
];

const SECTIONS = [
  { key: 'cafe', label: 'Cafés pra demorar', Icon: Coffee },
  { key: 'tarde', label: 'Tardes & pôr do sol', Icon: Sun },
  { key: 'cinema', label: 'Cinema de verdade', Icon: Film },
  { key: 'jantar', label: 'Jantares especiais', Icon: Wine },
];

const ROTATIONS = [-9, 5, -5, 7, -7, 4, -11, 6, -4, 9, -6, 3, -8, 8];

function formatDate(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  } catch {
    return '';
  }
}

const TAG_COLORS = {
  'brunch': '#C9952E',
  'café especial': '#6B7A5C',
  'micro-torrefação': '#9B2D22',
  'manhã': '#C9952E',
  'escondido': '#4D5842',
  'pôr do sol': '#B8501A',
  'passeio': '#6B7A5C',
  'ao ar livre': '#4D5842',
  'cinema arte': '#9B2D22',
  'italiano': '#B8501A',
  'menu degustação': '#9B2D22',
  'bistrô': '#6B7A5C',
  'sem pretensão': '#C9952E',
};

export default function RoteiroHelo() {
  const [checkins, setCheckins] = useState({});
  const [loading, setLoading] = useState(true);
  const [saveError, setSaveError] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await window.storage.get('checkins-helo-v3', true);
        if (mounted) setCheckins(res ? JSON.parse(res.value) : {});
      } catch {
        if (mounted) setCheckins({});
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const toggle = async (id) => {
    const next = { ...checkins };
    if (next[id]) {
      delete next[id];
    } else {
      next[id] = { date: new Date().toISOString() };
    }
    setCheckins(next);
    setSaveError(false);
    try {
      const result = await window.storage.set('checkins-helo-v3', JSON.stringify(next), true);
      if (!result) setSaveError(true);
    } catch {
      setSaveError(true);
    }
  };

  const total = PLACES.length;
  const done = Object.keys(checkins).length;
  const pct = Math.round((done / total) * 100);

  return (
    <div style={{
      minHeight: '100vh',
      background: `linear-gradient(160deg, #1E2518 0%, ${COLORS.bgDeep} 100%)`,
      fontFamily: "'Inter', sans-serif",
      color: COLORS.cream,
      paddingBottom: '4rem',
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Caveat:wght@600;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .card {
          background: ${COLORS.bgCard};
          border-radius: 12px;
          border: 1px solid ${COLORS.bgCardEdge};
          box-shadow: 0 2px 12px rgba(0,0,0,0.22), 0 1px 3px rgba(0,0,0,0.15);
          transition: box-shadow 0.18s ease;
        }
        .card:hover { box-shadow: 0 4px 20px rgba(0,0,0,0.28); }

        .stamp-btn {
          transition: transform 0.18s ease;
          border: none;
          background: none;
          padding: 0;
        }
        .stamp-btn:hover:not(:disabled) { transform: scale(1.06); }
        .stamp-btn:focus-visible { outline: 2px solid ${COLORS.gold}; outline-offset: 3px; border-radius: 50%; }

        @keyframes stampDrop {
          0% { transform: scale(2.2) rotate(0deg); opacity: 0; }
          55% { transform: scale(0.88) rotate(var(--rot)); opacity: 1; }
          100% { transform: scale(1) rotate(var(--rot)); opacity: 1; }
        }
        .stamp-mark { animation: stampDrop 0.38s cubic-bezier(0.22,1,0.36,1); }

        .section-label {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          margin-bottom: 1rem;
          padding-bottom: 0.4rem;
          border-bottom: 1px solid rgba(244,237,216,0.1);
        }

        @media (prefers-reduced-motion: reduce) {
          .stamp-mark { animation: none; }
          .stamp-btn:hover { transform: none; }
          .card { transition: none; }
        }
      `}</style>

      {/* ── Header ── */}
      <div style={{ padding: '2.8rem 1.5rem 2rem', textAlign: 'center', maxWidth: '36rem', margin: '0 auto' }}>
        <div style={{
          fontFamily: "'Caveat', cursive",
          fontSize: '1.1rem',
          color: COLORS.gold,
          letterSpacing: '0.06em',
          marginBottom: '0.8rem',
        }}>
          roteiro de bolso · Porto Alegre
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          fontSize: 'clamp(2rem, 6vw, 2.8rem)',
          lineHeight: 1.12,
          color: COLORS.cream,
          marginBottom: '0.9rem',
        }}>
          Coisas que ainda<br />
          <span style={{ fontStyle: 'italic', color: COLORS.goldLight }}>quero fazer</span> com a Helo
        </h1>

        <p style={{
          color: COLORS.sage,
          fontSize: '0.92rem',
          lineHeight: 1.6,
          maxWidth: '24rem',
          margin: '0 auto',
        }}>
          Cafés, tardes, cinema e jantares pela cidade. Carimba quando rolar — fica registrado pra nós dois.
        </p>

        {/* Progress bar */}
        <div style={{ maxWidth: '20rem', margin: '1.8rem auto 0' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.78rem',
            color: COLORS.sageDim,
            marginBottom: '0.4rem',
          }}>
            <span>
              {loading
                ? 'carregando…'
                : done === 0
                  ? 'nenhum carimbado ainda'
                  : `${done} de ${total} feitos`}
            </span>
            <Heart size={13} color={COLORS.terra} fill={COLORS.terra} />
          </div>
          <div style={{
            height: '6px',
            borderRadius: '999px',
            background: 'rgba(244,237,216,0.1)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${pct}%`,
              background: `linear-gradient(90deg, ${COLORS.gold}, ${COLORS.terra})`,
              transition: 'width 0.5s ease',
              borderRadius: '999px',
            }} />
          </div>
        </div>
      </div>

      {/* ── Sections ── */}
      <div style={{ maxWidth: '36rem', margin: '0 auto', padding: '0 1.25rem' }}>
        {SECTIONS.map((section) => {
          const items = PLACES.filter((p) => p.category === section.key);
          return (
            <div key={section.key} style={{ marginBottom: '2.4rem' }}>
              <div className="section-label">
                <section.Icon size={16} color={COLORS.goldLight} strokeWidth={1.8} />
                <h2 style={{
                  fontFamily: "'Playfair Display', serif",
                  fontWeight: 500,
                  fontSize: '1rem',
                  color: COLORS.cream,
                  letterSpacing: '0.01em',
                }}>
                  {section.label}
                </h2>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {items.map((place) => {
                  const idx = PLACES.findIndex((p) => p.id === place.id);
                  const rotation = ROTATIONS[idx % ROTATIONS.length];
                  const checked = checkins[place.id];
                  const tagColor = TAG_COLORS[place.tag] || COLORS.sage;

                  return (
                    <div key={place.id} className="card" style={{
                      padding: '1rem 0.9rem 1rem 1.1rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.85rem',
                    }}>
                      {/* Text */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Tag */}
                        <div style={{
                          display: 'inline-block',
                          fontSize: '0.65rem',
                          fontWeight: 600,
                          textTransform: 'uppercase',
                          letterSpacing: '0.08em',
                          color: tagColor,
                          background: `${tagColor}18`,
                          border: `1px solid ${tagColor}33`,
                          borderRadius: '4px',
                          padding: '1px 6px',
                          marginBottom: '0.35rem',
                        }}>
                          {place.tag}
                        </div>

                        <div style={{
                          fontFamily: "'Playfair Display', serif",
                          fontWeight: 700,
                          fontSize: '1.02rem',
                          color: COLORS.ink,
                          marginBottom: '0.2rem',
                          lineHeight: 1.2,
                        }}>
                          {place.name}
                        </div>

                        <div style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '0.2rem',
                          fontSize: '0.7rem',
                          color: COLORS.terra,
                          fontWeight: 600,
                          marginBottom: '0.35rem',
                          textTransform: 'uppercase',
                          letterSpacing: '0.04em',
                          lineHeight: 1.3,
                        }}>
                          <MapPin size={10} style={{ marginTop: '1px', flexShrink: 0 }} />
                          <span>{place.area}</span>
                        </div>

                        <p style={{
                          margin: '0 0 0.45rem 0',
                          fontSize: '0.82rem',
                          lineHeight: 1.5,
                          color: COLORS.inkLight,
                        }}>
                          {place.desc}
                        </p>

                        <div style={{
                          fontFamily: "'Caveat', cursive",
                          fontWeight: 600,
                          fontSize: '0.92rem',
                          color: COLORS.terra,
                          lineHeight: 1.3,
                        }}>
                          → {place.task}
                        </div>
                      </div>

                      {/* Stamp */}
                      <button
                        className="stamp-btn"
                        onClick={() => toggle(place.id)}
                        disabled={loading}
                        aria-pressed={!!checked}
                        aria-label={checked ? `Remover carimbo de ${place.name}` : `Carimbar ${place.name}`}
                        style={{
                          flexShrink: 0,
                          width: '4rem',
                          height: '4rem',
                          borderRadius: '50%',
                          border: checked
                            ? `2px solid ${COLORS.stamp}`
                            : `2px dashed ${COLORS.terra}55`,
                          background: checked ? `${COLORS.stamp}0E` : 'transparent',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: loading ? 'default' : 'pointer',
                        }}
                      >
                        {checked ? (
                          <div
                            className="stamp-mark"
                            style={{
                              '--rot': `${rotation}deg`,
                              transform: `rotate(${rotation}deg)`,
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              color: COLORS.stamp,
                            }}
                          >
                            <span style={{
                              fontFamily: "'Caveat', cursive",
                              fontWeight: 700,
                              fontSize: '0.9rem',
                              lineHeight: 1,
                            }}>feito ♥</span>
                            <span style={{
                              fontFamily: "'Caveat', cursive",
                              fontWeight: 600,
                              fontSize: '0.82rem',
                              lineHeight: 1.15,
                            }}>{formatDate(checked.date)}</span>
                          </div>
                        ) : (
                          <span style={{
                            fontFamily: "'Caveat', cursive",
                            fontSize: '0.82rem',
                            color: COLORS.terra,
                            fontWeight: 600,
                          }}>carimbar</span>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Footer ── */}
      <div style={{ textAlign: 'center', padding: '0 1.5rem', marginTop: '0.5rem' }}>
        {saveError && (
          <p style={{ color: COLORS.terra, fontSize: '0.78rem', marginBottom: '0.5rem' }}>
            Não consegui salvar agora — tenta de novo em um instante.
          </p>
        )}
        {loading && (
          <div style={{ display: 'flex', justifyContent: 'center', color: COLORS.sageDim, gap: '0.4rem', fontSize: '0.82rem' }}>
            <Loader2 size={13} />
            carregando carimbos…
          </div>
        )}
        {done === total && !loading && (
          <p style={{
            fontFamily: "'Caveat', cursive",
            fontSize: '1.2rem',
            color: COLORS.goldLight,
            marginBottom: '0.5rem',
          }}>
            todos os carimbos! ♥
          </p>
        )}
        <p style={{ color: COLORS.sageDim, fontSize: '0.72rem', marginTop: '1rem' }}>
          feito com carinho · Porto Alegre, RS
        </p>
      </div>
    </div>
  );
}
