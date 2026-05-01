// Direction 4 — "Conversational / Humain" (RDV-first, réassurance)
// Met l'humain et la simplicité au centre. Pas de calculateur en hero, plutôt un conseiller qui parle.

function Direction4({ city, mode }) {
  const isMobile = mode === 'mobile';
  const cityKey = Object.keys(CITIES).find(k => CITIES[k] === city);
  const localMetiers = METIERS_BY_CITY[cityKey] || [];
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: 'white' }} className="artboard-scroll">
      {isMobile ? <MobileNav city={city} /> : <FakeNav city={city} />}

      {/* HERO conversationnel */}
      <div style={{ padding: isMobile ? '24px 16px 32px' : '60px 64px', background: '#FBFAF6' }}>
        <SectionLabel n={1} name="Hero — angle humain" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.4fr 1fr', gap: 32, alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', gap: 8, marginBottom: 14 }}>
              {[1,2,3].map(i => <div key={i} style={{ width: 32, height: 32, borderRadius: '50%', background: '#D7E6FF', border: '2px solid white', marginLeft: i > 1 ? -10 : 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, color: '#1B4FA8' }}>{['JD','ML','SR'][i-1]}</div>)}
              <div style={{ fontSize: 11, color: '#666', alignSelf: 'center', marginLeft: 4 }}>L'équipe DeskMachine · {city.name}</div>
            </div>
            <h1 style={{ fontSize: isMobile ? 30 : 50, fontWeight: 900, lineHeight: 1.05, margin: 0, letterSpacing: '-0.03em' }}>
              Un humain. Pas un robot.<br/>
              <span style={{ color: '#2C6BD2' }}>Votre conseiller à {city.name}.</span>
            </h1>
            <p style={{ fontSize: isMobile ? 14 : 17, color: '#555', marginTop: 16, lineHeight: 1.5, maxWidth: 480 }}>
              Une fiduciaire 100% en ligne, mais avec un <span className="squiggle">vrai conseiller dédié</span>. Brevet fédéral, basé en Suisse romande, qui répond en moins de 2h.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 20, flexWrap: 'wrap' }}>
              <SkBtn>📅 Prendre 30 min avec un conseiller</SkBtn>
              <SkBtn ghost>💬 Discuter par WhatsApp</SkBtn>
            </div>
            <div style={{ marginTop: 18, fontSize: 12, color: '#666' }}>⚡ Réponse moyenne : <b>1h47</b> · ⭐ 4.9/5 sur 127 avis</div>
          </div>
          <SkBox style={{ padding: 16, background: 'white' }}>
            <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
              <SkImg w={56} h={56} label="📷" style={{ borderRadius: '50%' }} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Julie Dubois</div>
                <div style={{ fontSize: 11, color: '#666' }}>Conseillère · Brevet fédéral · {city.name}</div>
                <div style={{ fontSize: 10, color: '#34C26A', marginTop: 2 }}>● En ligne</div>
              </div>
            </div>
            <div style={{ background: '#F4F4F4', padding: 10, borderRadius: 8, fontSize: 12, marginBottom: 8 }}>Bonjour 👋 Je m'appelle Julie. Dites-moi en 2 mots votre activité, je vous prépare une offre.</div>
            <input placeholder={`Ex: restaurant à ${city.name}, 4 employés...`} style={{ width: '100%', padding: 10, border: '1px solid #ddd', borderRadius: 6, fontSize: 12, boxSizing: 'border-box' }} />
            <SkBtn full sm style={{ marginTop: 8 }}>Envoyer →</SkBtn>
          </SkBox>
        </div>
      </div>

      {/* PROCESSUS HUMAIN */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px' }}>
        <SectionLabel n={2} name="Process — 3 étapes" />
        <h2 style={{ fontSize: isMobile ? 22 : 30, fontWeight: 800, margin: '0 0 24px', letterSpacing: '-0.02em' }}>De votre 1er appel à votre 1ère décla, en 3 étapes.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 16, position: 'relative' }}>
          {[
            { n: '01', t: 'On discute', d: '30 min en visio. Vous expliquez, on écoute. On vous dit franchement si on peut vous aider.' },
            { n: '02', t: 'On migre', d: 'On récupère vos docs auprès de votre fiduciaire. Zéro stress, zéro paperasse de votre côté.' },
            { n: '03', t: 'On gère', d: 'Saisie, TVA, salaires, bouclement. Vous voyez tout sur votre dashboard, en temps réel.' },
          ].map((s, i) => (
            <SkBox key={i} style={{ padding: 20 }}>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#D7E6FF', lineHeight: 1, marginBottom: 8 }}>{s.n}</div>
              <div style={{ fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: '#666', lineHeight: 1.5 }}>{s.d}</div>
            </SkBox>
          ))}
        </div>
      </div>

      {/* RÉASSURANCE */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px', background: '#1a1a1a', color: 'white' }}>
        <SectionLabel n={3} name="Réassurance" style={{ color: '#888' }} />
        <h2 style={{ fontSize: isMobile ? 22 : 30, fontWeight: 800, margin: '0 0 20px', letterSpacing: '-0.02em' }}>Pourquoi nous faire confiance ?</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { ico: '🇨🇭', t: 'Données 100% en Suisse', d: 'Hébergement Infomaniak.' },
            { ico: '🛡️', t: 'Brevet fédéral', d: 'Tous nos conseillers.' },
            { ico: '🤝', t: 'Sans engagement', d: 'Résiliable à tout moment.' },
            { ico: '⏱️', t: 'Réponse < 2h', d: 'En jours ouvrés.' },
          ].map((r, i) => (
            <div key={i}>
              <div style={{ fontSize: 28, marginBottom: 6 }}>{r.ico}</div>
              <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4 }}>{r.t}</div>
              <div style={{ fontSize: 11, color: '#aaa' }}>{r.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CALCULATEUR EN BAS */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px', background: '#FBFAF6' }}>
        <SectionLabel n={4} name="Calculateur (NOUVEAU, secondaire)" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 24, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 22 : 28, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em' }}>Curieux de savoir combien vous économiseriez ?</h2>
            <p style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>Pas obligé de tout calculer maintenant. Mais si ça vous tente, voici notre simulateur express.</p>
          </div>
          <CalculateurEconomies compact />
        </div>
      </div>

      {/* RDV FINAL */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px' }}>
        <SectionLabel n={5} name="RDV (NOUVEAU)" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: 24 }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 22 : 30, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Un café (virtuel) avec Julie ?</h2>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.5 }}>30 min. Sans engagement. Pour {localMetiers.slice(0,2).join(' et ').toLowerCase()} et toutes PME du {city.canton}.</p>
            <div style={{ marginTop: 16 }}><ProofTicker city={city} /></div>
          </div>
          <PriseRDV city={city} />
        </div>
      </div>

      <Footer city={city} />
      {isMobile && <StickyCTA city={city} label="Parler à Julie" />}
    </div>
  );
}

window.Direction4 = Direction4;
