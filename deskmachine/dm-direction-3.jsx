// Direction 3 — "Calculateur-first interactif" (lead magnet immédiat)
// Toute la page est construite autour d'un calculateur progressif : on entre, on simule, on convertit

function Direction3({ city, mode }) {
  const isMobile = mode === 'mobile';
  const [step, setStep] = React.useState(1);
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: '#FBFAF6' }} className="artboard-scroll">
      {isMobile ? <MobileNav city={city} /> : <FakeNav city={city} />}

      {/* HERO = CALCULATEUR */}
      <div style={{ padding: isMobile ? '20px 16px' : '40px 64px', background: 'linear-gradient(180deg, #2C6BD2 0%, #1B4FA8 100%)', color: 'white' }}>
        <SectionLabel n={1} name="Hero = simulateur progressif (NOUVEAU)" style={{ color: 'rgba(255,255,255,0.5)' }} />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.3fr', gap: 32, alignItems: 'center' }}>
          <div>
            <SkPill style={{ background: '#FFE45C', color: '#1a1a1a', borderColor: '#1a1a1a' }}>⚡ 30 secondes · sans inscription</SkPill>
            <h1 style={{ fontSize: isMobile ? 28 : 46, fontWeight: 900, lineHeight: 1.05, margin: '12px 0 0', letterSpacing: '-0.03em' }}>
              Combien votre fiduciaire à {city.name} vous coûte-t-elle <span style={{ color: '#FFE45C' }}>vraiment</span>&nbsp;?
            </h1>
            <p style={{ fontSize: 14, opacity: 0.85, marginTop: 12, lineHeight: 1.5 }}>3 questions, une estimation immédiate, votre offre personnalisée par email en 24h.</p>
          </div>
          <SkBox style={{ padding: 18, background: 'white', color: '#1a1a1a' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
              {[1, 2, 3, 4].map(s => (
                <div key={s} style={{ flex: 1, height: 4, background: s <= step ? '#2C6BD2' : '#eee', marginRight: s < 4 ? 4 : 0, borderRadius: 2 }} />
              ))}
            </div>
            <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', marginBottom: 6 }}>Étape {step} / 4</div>
            {step === 1 && <>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Quel est votre métier ?</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
                {['🍽️ Restaurant', '🛠️ Artisan', '⚖️ Profession lib.', '💼 Conseil/IT', '🏥 Santé', '🛒 E-commerce'].map((m, i) => (
                  <button key={i} onClick={() => setStep(2)} style={{ padding: 12, border: '1px solid #ddd', background: 'white', borderRadius: 6, fontSize: 12, cursor: 'pointer', textAlign: 'left' }}>{m}</button>
                ))}
              </div>
            </>}
            {step === 2 && <>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Combien d'employés ?</div>
              <div style={{ display: 'flex', gap: 6 }}>
                {['1', '2-5', '6-10', '11-25', '25+'].map((m, i) => (
                  <button key={i} onClick={() => setStep(3)} style={{ flex: 1, padding: 14, border: '1px solid #ddd', background: i === 1 ? '#D7E6FF' : 'white', borderRadius: 6, fontSize: 13, cursor: 'pointer', fontWeight: 600 }}>{m}</button>
                ))}
              </div>
            </>}
            {step === 3 && <>
              <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 12 }}>Tarif fiduciaire actuel ?</div>
              <CalculateurEconomies compact />
              <SkBtn full style={{ marginTop: 12 }} onClick={() => setStep(4)}>Voir mes économies →</SkBtn>
            </>}
            {step === 4 && <>
              <div style={{ fontSize: 14, color: '#666', marginBottom: 4 }}>Vous économiseriez</div>
              <div style={{ fontSize: 38, fontWeight: 900, color: '#1B4FA8', lineHeight: 1 }}>CHF 3'612.-</div>
              <div style={{ fontSize: 12, color: '#888', marginBottom: 14 }}>par an, soit ~52% de réduction</div>
              <input placeholder="Votre email pro" style={{ width: '100%', padding: 12, border: '1px solid #ddd', borderRadius: 6, fontSize: 13, marginBottom: 8, boxSizing: 'border-box' }} />
              <SkBtn full>Recevoir l'offre détaillée →</SkBtn>
            </>}
            <div style={{ fontSize: 10, color: '#999', marginTop: 10, textAlign: 'center' }}>🔒 Vos données restent en Suisse · jamais partagées</div>
          </SkBox>
        </div>
        <div style={{ marginTop: 24, opacity: 0.85 }}><TrustBar minimal /></div>
      </div>

      {/* WHAT YOU GET */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px' }}>
        <SectionLabel n={2} name="Ce que vous obtenez en 24h" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { n: '01', t: 'Estimation chiffrée', d: 'Votre tarif personnalisé, en CHF, transparent.' },
            { n: '02', t: 'Audit gratuit 30min', d: 'Un conseiller {city} analyse votre setup actuel.' },
            { n: '03', t: 'Plan de migration', d: 'Étape par étape, sans interruption de service.' },
          ].map((s, i) => (
            <SkBox key={i} style={{ padding: 18 }}>
              <div className="sk-mono" style={{ fontSize: 11, color: '#2C6BD2', marginBottom: 6 }}>{s.n}</div>
              <div style={{ fontWeight: 700, marginBottom: 6 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: '#666', lineHeight: 1.4 }}>{s.d.replace('{city}', city.name)}</div>
            </SkBox>
          ))}
        </div>
      </div>

      {/* COMPARATEUR */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px', background: 'white' }}>
        <SectionLabel n={3} name="Comparateur (NOUVEAU)" />
        <ComparateurTarifaire />
      </div>

      {/* TÉMOIGNAGES */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px' }}>
        <SectionLabel n={4} name="Preuve sociale" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', gap: 12 }}>
          {[1, 2].map(i => (
            <SkBox key={i} style={{ padding: 18 }}>
              <div style={{ display: 'flex', gap: 4, color: '#FFC107', marginBottom: 8 }}>{'★★★★★'}</div>
              <p style={{ fontSize: 13, lineHeight: 1.5, margin: '0 0 12px' }}>« Migration en 2 semaines, économie de CHF 4'200/an. Le conseiller à {city.name} comprend notre métier. »</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#D7E6FF' }} />
                <div style={{ fontSize: 11 }}><b>Client #{i}</b><br/><span style={{ color: '#888' }}>{['Restaurant', 'Artisan'][i-1]} · {city.name}</span></div>
              </div>
            </SkBox>
          ))}
        </div>
      </div>

      {/* RDV */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 64px', background: '#1a1a1a' }}>
        <SectionLabel n={5} name="RDV (NOUVEAU)" style={{ color: '#888' }} />
        <PriseRDV city={city} />
      </div>

      <Footer city={city} />
      {isMobile && <StickyCTA city={city} />}
    </div>
  );
}

window.Direction3 = Direction3;
