// Direction 2 — "Hyper-localisé Métier × Ville" (SEO/SEA local)
// Hero met la ville et le métier auto-détecté au coeur, carte cantonale, métiers cibles

function Direction2({ city, metiers, mode }) {
  const isMobile = mode === 'mobile';
  const cityKey = Object.keys(CITIES).find(k => CITIES[k] === city);
  const localMetiers = METIERS_BY_CITY[cityKey] || [];
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: 'white' }} className="artboard-scroll">
      {isMobile ? <MobileNav city={city} /> : <FakeNav city={city} />}

      {/* HERO */}
      <div style={{ padding: isMobile ? '24px 16px 32px' : '60px 64px', background: '#FBFAF6' }}>
        <SectionLabel n={1} name="Hero — angle local" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.3fr 1fr', gap: 32, alignItems: 'center' }}>
          <div>
            <SkPill style={{ background: '#D7E6FF', color: '#1B4FA8', borderColor: '#2C6BD2' }}>📍 {city.name} · canton {city.canton}</SkPill>
            <h1 style={{ fontSize: isMobile ? 30 : 52, fontWeight: 900, lineHeight: 1.05, margin: '12px 0 0', letterSpacing: '-0.03em' }}>
              La fiduciaire en ligne <span className="squiggle">de {city.name}</span>.
            </h1>
            <p style={{ fontSize: isMobile ? 14 : 16, color: '#555', marginTop: 14, lineHeight: 1.5 }}>
              Conseiller dédié pour {localMetiers.join(', ').toLowerCase()} et autres PME du {city.canton}. On parle votre métier, on connaît votre fiscalité cantonale.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 18, flexWrap: 'wrap' }}>
              <SkBtn>Devis pour {city.name} →</SkBtn>
              <SkBtn ghost>📞 +41 21 552 05 26</SkBtn>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 18, flexWrap: 'wrap' }}>
              {localMetiers.map((m, i) => <SkPill key={i} style={{ fontSize: 11 }}>✓ Spécial {m.toLowerCase()}</SkPill>)}
            </div>
          </div>
          <CantonMap activeCity={cityKey} />
        </div>
      </div>

      {/* MÉTIERS LOCAUX */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px', background: 'white', borderTop: '1px solid #eee' }}>
        <SectionLabel n={2} name="Spécialisations métier (NOUVEAU)" />
        <h2 style={{ fontSize: isMobile ? 22 : 30, fontWeight: 800, margin: '0 0 6px', letterSpacing: '-0.02em' }}>On connaît les PME de {city.name}.</h2>
        <p style={{ color: '#666', fontSize: 13, marginBottom: 20 }}>{city.spec.charAt(0).toUpperCase() + city.spec.slice(1)} — chaque secteur a ses spécificités.</p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
          {localMetiers.map((m, i) => (
            <SkBox key={i} style={{ padding: 16 }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: '#D7E6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>{['🍽️', '🛠️', '⚖️', '💼', '🏥', '⌚', '🏠', '🏗️'][i % 8]}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{m}</div>
              <div style={{ fontSize: 11, color: '#666', lineHeight: 1.4, marginBottom: 8 }}>TVA, charges sociales, particularités cantonales {city.canton} — on s'occupe de tout.</div>
              <a style={{ fontSize: 11, color: '#2C6BD2', fontWeight: 600 }}>Voir détails →</a>
            </SkBox>
          ))}
        </div>
      </div>

      {/* SPÉCIFICITÉS CANTONALES */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px', background: '#1a1a1a', color: 'white' }}>
        <SectionLabel n={3} name="Fiscalité cantonale (NOUVEAU)" style={{ color: '#888' }} />
        <h2 style={{ fontSize: isMobile ? 22 : 30, fontWeight: 800, margin: '0 0 16px', letterSpacing: '-0.02em' }}>Spécificités fiscales — canton {city.canton}.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(4, 1fr)', gap: 12 }}>
          {[
            { l: 'TVA', v: city.tva, sub: 'taux normal' },
            { l: 'Imp. bénéfice', v: '~14%', sub: city.canton + ' total' },
            { l: 'Charges soc.', v: '~13%', sub: 'AVS/AI/APG' },
            { l: 'Délai', v: '30 sept', sub: 'décl. annuelle' },
          ].map((s, i) => (
            <div key={i} style={{ borderLeft: '2px solid #FFE45C', paddingLeft: 12 }}>
              <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase' }}>{s.l}</div>
              <div style={{ fontSize: 22, fontWeight: 800, color: '#FFE45C' }}>{s.v}</div>
              <div style={{ fontSize: 10, color: '#aaa' }}>{s.sub}</div>
            </div>
          ))}
        </div>
      </div>

      {/* CALCULATEUR */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px', background: '#FBFAF6' }}>
        <SectionLabel n={4} name="Calculateur (NOUVEAU)" />
        <div style={{ maxWidth: 560, margin: '0 auto' }}><CalculateurEconomies /></div>
      </div>

      {/* CASE STUDY LOCAL */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px' }}>
        <SectionLabel n={5} name="Cas client local" />
        <SkBox style={{ padding: 24 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: 24, alignItems: 'center' }}>
            <SkImg label={`Photo client\n${localMetiers[0]} ${city.name}`} h={140} />
            <div>
              <SkPill style={{ marginBottom: 8 }}>📍 {localMetiers[0]} · {city.name}</SkPill>
              <p style={{ fontSize: isMobile ? 16 : 20, fontWeight: 600, lineHeight: 1.4, margin: '0 0 12px', fontStyle: 'italic' }}>
                « On a divisé nos frais comptables par 2 et on récupère 8h par semaine. »
              </p>
              <div style={{ fontSize: 12, color: '#666' }}><b>Felix Buchbinder</b> · Directeur, Kumbha Sàrl</div>
              <div style={{ display: 'flex', gap: 16, marginTop: 14 }}>
                <div><div style={{ fontSize: 22, fontWeight: 800, color: '#2C6BD2' }}>−52%</div><div style={{ fontSize: 10, color: '#888' }}>frais compta</div></div>
                <div><div style={{ fontSize: 22, fontWeight: 800, color: '#2C6BD2' }}>8h/sem</div><div style={{ fontSize: 10, color: '#888' }}>gagnées</div></div>
                <div><div style={{ fontSize: 22, fontWeight: 800, color: '#2C6BD2' }}>24h</div><div style={{ fontSize: 10, color: '#888' }}>onboarding</div></div>
              </div>
            </div>
          </div>
        </SkBox>
      </div>

      {/* RDV */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px', background: '#F7F7F8' }}>
        <SectionLabel n={6} name="RDV avec conseiller local (NOUVEAU)" />
        <PriseRDV city={city} />
      </div>

      <Footer city={city} />
      {isMobile && <StickyCTA city={city} label={`RDV ${city.name}`} />}
    </div>
  );
}

window.Direction2 = Direction2;
