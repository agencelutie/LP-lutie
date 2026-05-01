// Direction 1 — "Économies maximales" — LANDING PAGE COMPLÈTE
// Hero → Trust strip → Calculateur → Comparateur → Avant/Après → Services → Simulateur prix → Process → Cas client →
// Témoignages → Carte couverture → About → RDV → FAQ → CTA final → Footer

function Direction1({ city, mode }) {
  const isMobile = mode === 'mobile';
  const cityKey = Object.keys(CITIES).find(k => CITIES[k] === city);
  const localMetiers = METIERS_BY_CITY[cityKey] || [];
  const PAD = isMobile ? '32px 16px' : '80px 80px';
  return (
    <div style={{ width: '100%', height: '100%', overflowY: 'auto', background: 'white' }} className="artboard-scroll">
      {isMobile ? <MobileNav city={city} /> : <FakeNav city={city} />}

      {/* 01 · HERO */}
      <div style={{ padding: isMobile ? '24px 16px 40px' : '64px 80px 80px', background: 'linear-gradient(180deg, #D7E6FF 0%, #FBFAF6 100%)', borderBottom: '1px solid #eee', position: 'relative' }}>
        <SectionLabel n={1} name="Hero — angle économies + humain" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr', gap: 32, alignItems: 'center' }}>
          <div>
            <SkPill style={{ background: '#FFE45C', marginBottom: 14 }}>📍 N°1 fiduciaire en ligne · {city.name}</SkPill>
            <h1 style={{ fontSize: isMobile ? 32 : 60, fontWeight: 900, lineHeight: 1.02, margin: 0, letterSpacing: '-0.035em' }}>
              Divisez par 2 le coût de votre <span className="squiggle">fiduciaire</span> à {city.name}.
            </h1>
            <p style={{ fontSize: isMobile ? 14 : 18, color: '#444', marginTop: 18, lineHeight: 1.5, maxWidth: 540 }}>
              Comptabilité 100% en ligne pour PME ({localMetiers.join(' · ')}). Conseiller dédié, brevet fédéral, dès <b>CHF&nbsp;149.-/mois</b>.
            </p>
            <div style={{ display: 'flex', gap: 10, marginTop: 22, flexWrap: 'wrap' }}>
              <SkBtn>Calculer mes économies →</SkBtn>
              <SkBtn ghost>Voir le comparatif</SkBtn>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 24 }}>
              <PortraitStack count={4} size={40} />
              <div style={{ fontSize: 12, color: '#444', lineHeight: 1.4 }}>
                <div style={{ display: 'flex', gap: 2, color: '#FFC107', marginBottom: 2 }}>★★★★★</div>
                <div><b>+100 PME</b> accompagnées par notre équipe en {city.canton}</div>
              </div>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
            <Portrait src={TEAM_PHOTO} h={isMobile ? 280 : 460} style={{ borderRadius: 12 }} />
            <SkBox style={{ position: 'absolute', bottom: -16, left: -16, padding: 12, background: 'white', maxWidth: 220, boxShadow: '4px 4px 0 #2b2b2b' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34C26A', boxShadow: '0 0 0 3px rgba(52,194,106,0.2)' }} />
                <span style={{ fontSize: 10, color: '#1F8A4C', fontWeight: 700, textTransform: 'uppercase' }}>En ligne</span>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700 }}>Julie · Conseillère {city.canton}</div>
              <div style={{ fontSize: 10, color: '#666', marginTop: 2 }}>Réponse moyenne : 1h47</div>
            </SkBox>
            <Annot style={{ position: 'absolute', top: -28, right: 0, transform: 'rotate(-4deg)' }}>↑ votre conseillère dédiée</Annot>
          </div>
        </div>
      </div>

      {/* 01b · CALCULATEUR (déplacé après hero pour laisser place à l'humain) */}
      <div style={{ padding: isMobile ? '32px 16px' : '60px 80px', background: 'white', borderBottom: '1px solid #eee' }}>
        <SectionLabel n={2} name="Calculateur — interactif" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 24 : 34, fontWeight: 800, margin: '0 0 10px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Combien vous coûte vraiment votre fiduciaire ?</h2>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>Bougez le curseur. On vous montre l'écart en CHF, par an. Sans inscription, sans email.</p>
          </div>
          <CalculateurEconomies compact />
        </div>
      </div>

      {/* 02 · TRUST STRIP (logos clients) */}
      <div style={{ padding: isMobile ? '20px 16px' : '28px 80px', borderBottom: '1px solid #eee', background: 'white' }}>
        <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 12, textAlign: 'center' }}>+100 PME suisses nous font confiance</div>
        <div style={{ display: 'flex', gap: isMobile ? 12 : 32, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', opacity: 0.6 }}>
          {['KUMBHA', 'ALPLOG', 'ROCHE & CIE', 'ATELIER 7', 'NORD-SUD', 'HELVETIA-X'].map((l, i) => (
            <div key={i} style={{ fontFamily: 'JetBrains Mono', fontSize: 13, fontWeight: 700, letterSpacing: '0.05em', color: '#666' }}>{l}</div>
          ))}
        </div>
      </div>

      {/* 03 · KILLER FEATURES (4 stats) */}
      <div style={{ padding: PAD }}>
        <SectionLabel n={2} name="Pourquoi nous (4 KPI)" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { v: '−50%', l: 'moins cher qu\'un fiduciaire classique' },
            { v: '24h', l: 'pour démarrer, sans paperasse' },
            { v: '+100', l: 'PME romandes accompagnées' },
            { v: '4.9★', l: '127 avis Google vérifiés' },
          ].map((k, i) => (
            <div key={i} style={{ borderTop: '2px solid #2C6BD2', paddingTop: 14 }}>
              <div style={{ fontSize: isMobile ? 32 : 44, fontWeight: 900, letterSpacing: '-0.03em', color: '#2C6BD2' }}>{k.v}</div>
              <div style={{ fontSize: 12, color: '#555', marginTop: 4 }}>{k.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 04 · COMPARATEUR */}
      <div style={{ padding: PAD, background: '#F7F7F8' }}>
        <SectionLabel n={3} name="Comparateur tarifaire (NOUVEAU)" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: 32, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Combien vous coûte vraiment une fiduciaire à {city.name} ?</h2>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>Tarifs réels constatés pour une PME de 5 employés, configuration équivalente. Pas de frais cachés, pas de petites lignes.</p>
            <SkBtn style={{ marginTop: 16 }}>Voir mon offre →</SkBtn>
          </div>
          <ComparateurTarifaire />
        </div>
      </div>

      {/* 05 · AVANT / APRÈS */}
      <div style={{ padding: PAD }}>
        <SectionLabel n={4} name="Méthode trad vs DeskMachine" />
        <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: '0 0 24px', letterSpacing: '-0.02em' }}>L'ancien monde vs le nouveau.</h2>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 16 }}>
          <SkBox style={{ padding: 24, background: 'white' }}>
            <div style={{ fontSize: 11, color: '#999', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.08em' }}>Méthode traditionnelle</div>
            <SkCheck x>Processus manuels et chronophages</SkCheck>
            <SkCheck x>Déplacements à {city.name}</SkCheck>
            <SkCheck x>Pièces demandées en retard</SkCheck>
            <SkCheck x>Résultats trop tard pour décider</SkCheck>
            <SkCheck x>Tarifs opaques, frais cachés</SkCheck>
            <SkCheck x>Comptabilité partiellement à votre charge</SkCheck>
          </SkBox>
          <SkBox style={{ padding: 24, background: '#1a1a1a', color: 'white', borderColor: '#1a1a1a' }}>
            <div style={{ fontSize: 11, color: '#FFE45C', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.08em' }}>Avec DeskMachine</div>
            <div style={{ color: '#eee' }}>
              <SkCheck>100% en ligne, zéro déplacement</SkCheck>
              <SkCheck>Compta prise en charge de A à Z</SkCheck>
              <SkCheck>Suivi en temps réel sur dashboard</SkCheck>
              <SkCheck>Conseiller dédié basé en {city.canton}</SkCheck>
              <SkCheck>Tarif fixe transparent, dès CHF 149.-/mois</SkCheck>
              <SkCheck>Réponse en moins de 2h ouvrées</SkCheck>
            </div>
          </SkBox>
        </div>
      </div>

      {/* 06 · SERVICES (grille) */}
      <div style={{ padding: PAD, background: '#FBFAF6' }}>
        <SectionLabel n={5} name="Services (existant, repensé)" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Tout ce dont une PME a besoin.</h2>
            <p style={{ color: '#666', fontSize: 14, marginTop: 8, maxWidth: 480 }}>Comptable, salarial, administratif. Vous nous envoyez vos documents, on s'occupe du reste.</p>
          </div>
          <SkBtn ghost sm>Voir tous les services →</SkBtn>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr 1fr' : 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { ico: '📥', t: 'Saisie comptable', d: 'Vous envoyez, on saisit. Tous formats.' },
            { ico: '🧾', t: 'TVA & déclarations', d: 'Trimestriel, annuel, on s\'occupe de tout.' },
            { ico: '👥', t: 'Salaires & RH', d: 'Fiches de paie, AVS/LPP, attestations.' },
            { ico: '📊', t: 'Bouclement annuel', d: 'Bilan, P&L, rapport pour votre AG.' },
            { ico: '💼', t: 'Conseil fiscal', d: 'Optimisation fiscale {canton}.' },
            { ico: '📁', t: 'Archivage digital', d: 'Tous vos docs, accessibles 10 ans.' },
          ].map((s, i) => (
            <SkBox key={i} style={{ padding: 18 }}>
              <div style={{ fontSize: 24, marginBottom: 10 }}>{s.ico}</div>
              <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{s.t}</div>
              <div style={{ fontSize: 11, color: '#666', lineHeight: 1.5 }}>{s.d.replace('{canton}', city.canton)}</div>
            </SkBox>
          ))}
        </div>
      </div>

      {/* 07 · SIMULATEUR DE PRIX (existant) */}
      <div style={{ padding: PAD }}>
        <SectionLabel n={6} name="Simulateur de prix (existant)" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr', gap: 32, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Configurez votre service. Voyez le prix en direct.</h2>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>4 questions, une estimation transparente. Pas de surprise sur la facture.</p>
          </div>
          <SkBox style={{ padding: 24 }}>
            {[
              { l: 'Comptes de liquidités', v: 2, max: 7 },
              { l: 'Pièces par mois', v: 80, max: 200 },
              { l: 'Décomptes TVA / an', v: 4, max: 4 },
              { l: 'Nombre d\'employés', v: 5, max: 10 },
            ].map((r, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}><span>{r.l}</span><b>{r.v}</b></div>
                <div style={{ height: 6, background: '#eee', borderRadius: 3 }}><div style={{ width: `${r.v / r.max * 100}%`, height: '100%', background: '#2C6BD2', borderRadius: 3 }} /></div>
              </div>
            ))}
            <div style={{ marginTop: 16, padding: 16, background: '#1a1a1a', color: 'white', borderRadius: 6, textAlign: 'center' }}>
              <div style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Prix mensuel estimé</div>
              <div style={{ fontSize: 32, fontWeight: 900, color: '#FFE45C' }}>CHF 219.-</div>
              <div style={{ fontSize: 10, opacity: 0.6 }}>tout compris · sans engagement</div>
            </div>
            <SkBtn full style={{ marginTop: 12 }}>Recevoir mon offre →</SkBtn>
          </SkBox>
        </div>
      </div>

      {/* 08 · PROCESS — onboarding 4 étapes */}
      <div style={{ padding: PAD, background: '#1a1a1a', color: 'white' }}>
        <SectionLabel n={7} name="Process onboarding (NOUVEAU)" style={{ color: '#888' }} />
        <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: '0 0 8px', letterSpacing: '-0.02em' }}>Démarrer prend 24 heures. Pas 24 jours.</h2>
        <p style={{ color: '#aaa', fontSize: 14, marginBottom: 28, maxWidth: 540 }}>De l'appel découverte à la première saisie, sans interruption de service.</p>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(4, 1fr)', gap: 16, position: 'relative' }}>
          {[
            { n: '01', t: 'Discovery 30min', d: 'On comprend votre activité et vos besoins.' },
            { n: '02', t: 'Devis transparent', d: 'Tarif fixe, pas de petites lignes.' },
            { n: '03', t: 'Migration', d: 'On récupère tout chez votre fiduciaire actuelle.' },
            { n: '04', t: 'C\'est parti', d: 'Première saisie, dashboard activé.' },
          ].map((s, i) => (
            <div key={i} style={{ borderLeft: '2px solid #FFE45C', paddingLeft: 14 }}>
              <div className="sk-mono" style={{ fontSize: 11, color: '#FFE45C', marginBottom: 6 }}>JOUR {s.n}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 6 }}>{s.t}</div>
              <div style={{ fontSize: 12, color: '#bbb', lineHeight: 1.5 }}>{s.d}</div>
            </div>
          ))}
        </div>
      </div>

      {/* 09 · CAS CLIENT */}
      <div style={{ padding: PAD }}>
        <SectionLabel n={8} name="Cas client chiffré" />
        <SkBox style={{ padding: 28 }}>
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr', gap: 28, alignItems: 'center' }}>
            <Portrait src={TEAM_PHOTO} h={220} style={{ borderRadius: 8 }} />
            <div>
              <SkPill style={{ marginBottom: 10 }}>📍 {localMetiers[0]} · {city.name}</SkPill>
              <p style={{ fontSize: isMobile ? 18 : 24, fontWeight: 600, lineHeight: 1.4, margin: '0 0 14px', letterSpacing: '-0.01em' }}>
                « On a divisé nos frais comptables par 2 et on récupère 8h par semaine. »
              </p>
              <div style={{ fontSize: 12, color: '#666' }}><b>Felix Buchbinder</b> · Directeur, Kumbha Sàrl</div>
              <div style={{ display: 'flex', gap: 28, marginTop: 18 }}>
                <div><div style={{ fontSize: 28, fontWeight: 900, color: '#2C6BD2' }}>−52%</div><div style={{ fontSize: 10, color: '#888' }}>frais compta/an</div></div>
                <div><div style={{ fontSize: 28, fontWeight: 900, color: '#2C6BD2' }}>8h/sem</div><div style={{ fontSize: 10, color: '#888' }}>gagnées</div></div>
                <div><div style={{ fontSize: 28, fontWeight: 900, color: '#2C6BD2' }}>24h</div><div style={{ fontSize: 10, color: '#888' }}>onboarding</div></div>
              </div>
            </div>
          </div>
        </SkBox>
      </div>

      {/* 09b · MEET THE TEAM (NOUVEAU — humain) */}
      <div style={{ padding: PAD, background: 'white', borderTop: '1px solid #eee' }}>
        <SectionLabel n={9} name="L'équipe (NOUVEAU · humain)" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: 0, letterSpacing: '-0.02em', lineHeight: 1.1 }}>Des humains. Pas un call-center.</h2>
            <p style={{ color: '#666', fontSize: 14, marginTop: 8, maxWidth: 480 }}>Chaque PME a un conseiller dédié, basé en Suisse romande. On connaît votre dossier, votre métier, votre canton.</p>
          </div>
          <div style={{ fontSize: 12, color: '#666' }}>📍 Antennes : Yverdon · {city.name}</div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: 16 }}>
          {[
            { n: 'Julie Dubois', r: 'Conseillère senior · Brevet féd.', c: city.canton, src: TEAM_PHOTO },
            { n: 'Marc Lachance', r: 'Expert TVA & fiscalité', c: 'VD', src: null },
            { n: 'Sophie Roulin', r: 'Conseillère salaires & RH', c: 'GE', src: null },
            { n: 'Thomas Berger', r: 'Conseiller bouclements', c: 'NE', src: null },
          ].map((p, i) => (
            <div key={i}>
              <div style={{ position: 'relative', borderRadius: 10, overflow: 'hidden', aspectRatio: '4/5', background: ['#D7E6FF', '#FFE45C', '#FCE0E0', '#DAF1E2'][i] }}>
                {p.src ? <img src={p.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : (
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 56, fontWeight: 900, color: 'rgba(0,0,0,0.15)', letterSpacing: '-0.05em' }}>{p.n.split(' ').map(s=>s[0]).join('')}</div>
                )}
                <SkPill style={{ position: 'absolute', top: 10, left: 10, fontSize: 9, padding: '2px 8px' }}>📍 {p.c}</SkPill>
              </div>
              <div style={{ marginTop: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{p.n}</div>
                <div style={{ fontSize: 11, color: '#666', marginTop: 2 }}>{p.r}</div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <PortraitStack count={5} size={32} />
          <div style={{ fontSize: 12, color: '#555' }}>+ 8 autres conseillers · Tous brevet fédéral · Tous basés en Suisse romande</div>
        </div>
      </div>

      {/* 10 · TÉMOIGNAGES (grille 3) */}
      <div style={{ padding: PAD, background: '#FBFAF6' }}>
        <SectionLabel n={9} name="Témoignages clients" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 20, flexWrap: 'wrap' }}>
          <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>Ils nous font confiance.</h2>
          <span style={{ fontSize: 12, color: '#666' }}>⭐ 4.9/5 · 127 avis Google</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)', gap: 12 }}>
          {[
            { q: 'Migration en 2 semaines, économie de CHF 4\'200/an. Le conseiller comprend notre métier.', n: 'M. Roulin', s: `Restaurant · ${city.name}`, src: TEAM_PHOTO, color: '#FFE45C' },
            { q: 'Plus jamais de classeurs. Tout est en ligne, accessible quand je veux. Game changer.', n: 'A. Müller', s: `Architecte · ${city.canton}`, src: null, color: '#D7E6FF' },
            { q: 'Le tarif est exactement ce qui était annoncé. Aucune mauvaise surprise depuis 18 mois.', n: 'J. Perret', s: `Conseil · ${city.canton}`, src: null, color: '#FCE0E0' },
          ].map((t, i) => (
            <SkBox key={i} style={{ padding: 20 }}>
              <div style={{ display: 'flex', gap: 4, color: '#FFC107', marginBottom: 10, fontSize: 14 }}>★★★★★</div>
              <p style={{ fontSize: 13, lineHeight: 1.55, margin: '0 0 14px' }}>« {t.q} »</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 10, borderTop: '1px solid #eee' }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', background: t.color, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, color: '#1B4FA8', flexShrink: 0 }}>
                  {t.src ? <img src={t.src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : t.n.split(' ').map(s=>s[0]).join('')}
                </div>
                <div style={{ fontSize: 11 }}><b>{t.n}</b><br/><span style={{ color: '#888' }}>{t.s}</span></div>
              </div>
            </SkBox>
          ))}
        </div>
      </div>

      {/* 11 · CARTE DE COUVERTURE */}
      <div style={{ padding: PAD }}>
        <SectionLabel n={10} name="Couverture Suisse romande (NOUVEAU)" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: 32, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Présents partout en Suisse romande.</h2>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6, marginBottom: 14 }}>Conseiller dédié dans votre canton. On connaît votre fiscalité, vos délais, vos spécificités locales.</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {Object.values(CITIES).map((c, i) => (
                <SkPill key={i} style={{ fontSize: 11, background: c === city ? '#2C6BD2' : 'white', color: c === city ? 'white' : '#333', borderColor: c === city ? '#2C6BD2' : '#2b2b2b' }}>📍 {c.name}</SkPill>
              ))}
            </div>
          </div>
          <CantonMap activeCity={cityKey} />
        </div>
      </div>

      {/* 12 · ABOUT (existant, condensé) */}
      <div style={{ padding: PAD, background: '#F7F7F8' }}>
        <SectionLabel n={11} name="About — l'équipe fondatrice" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.4fr', gap: 32, alignItems: 'center' }}>
          <Portrait src={TEAM_PHOTO} h={isMobile ? 240 : 320} style={{ borderRadius: 12 }} />
          <div>
            <SkPill style={{ marginBottom: 12 }}>Qui sommes-nous</SkPill>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: '0 0 14px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Créé par des entrepreneurs, pour des entrepreneurs.</h2>
            <p style={{ fontSize: 14, lineHeight: 1.6, color: '#444', margin: 0 }}>
              Nous sommes comme vous : des entrepreneurs. Fatigués de perdre du temps avec l'administratif, on a créé nos propres outils pour automatiser la gestion comptable. Le résultat a séduit nos clients — alors on en a fait un vrai service.
            </p>
            <div style={{ display: 'flex', gap: 24, marginTop: 18 }}>
              <div><div style={{ fontSize: 24, fontWeight: 900, color: '#2C6BD2' }}>2021</div><div style={{ fontSize: 10, color: '#888' }}>fondation</div></div>
              <div><div style={{ fontSize: 24, fontWeight: 900, color: '#2C6BD2' }}>12</div><div style={{ fontSize: 10, color: '#888' }}>experts</div></div>
              <div><div style={{ fontSize: 24, fontWeight: 900, color: '#2C6BD2' }}>{city.canton}</div><div style={{ fontSize: 10, color: '#888' }}>antenne locale</div></div>
            </div>
          </div>
        </div>
      </div>

      {/* 13 · RDV */}
      <div style={{ padding: PAD }}>
        <SectionLabel n={12} name="Prise de RDV instantanée (NOUVEAU)" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.2fr', gap: 32, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Parlez à un conseiller {city.name} en 24h.</h2>
            <p style={{ color: '#555', fontSize: 14, lineHeight: 1.6 }}>30 minutes, en visio ou téléphone, sans engagement. On vous explique exactement combien vous économiseriez.</p>
            <div style={{ marginTop: 16 }}><ProofTicker city={city} /></div>
            <div style={{ marginTop: 14, fontSize: 12, color: '#666' }}>📞 +41 21 552 05 26 · ✉️ contact@deskmachine.ch</div>
          </div>
          <PriseRDV city={city} />
        </div>
      </div>

      {/* 14 · FAQ */}
      <div style={{ padding: PAD, background: '#FBFAF6' }}>
        <SectionLabel n={13} name="FAQ (existant)" />
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1.5fr', gap: 32 }}>
          <div>
            <h2 style={{ fontSize: isMobile ? 26 : 36, fontWeight: 800, margin: '0 0 12px', letterSpacing: '-0.02em', lineHeight: 1.1 }}>Vous avez encore des questions ?</h2>
            <p style={{ color: '#666', fontSize: 13, lineHeight: 1.5 }}>On répond aux plus fréquentes ci-contre. Sinon : contact@deskmachine.ch</p>
          </div>
          <div>
            {[
              'Que propose DeskMachine en plus d\'une fiduciaire normale ?',
              `Comment se passe la migration depuis ma fiduciaire actuelle à ${city.name} ?`,
              'Mes données sont-elles vraiment sécurisées en Suisse ?',
              'Puis-je résilier à tout moment ?',
              `Est-ce que vous gérez les spécificités fiscales du canton ${city.canton} ?`,
              'Quels sont les délais de réponse de mon conseiller ?',
            ].map((q, i) => (
              <div key={i} style={{ borderTop: '1px solid #ddd', padding: '14px 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <span style={{ fontSize: 14, fontWeight: i === 0 ? 700 : 500 }}>{q}</span>
                <span style={{ fontSize: 18, color: '#2C6BD2' }}>{i === 0 ? '−' : '+'}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 15 · CTA FINAL */}
      <div style={{ padding: PAD, background: '#2C6BD2', color: 'white', textAlign: 'center' }}>
        <SectionLabel n={14} name="CTA final" style={{ color: 'rgba(255,255,255,0.5)', justifyContent: 'center' }} />
        <h2 style={{ fontSize: isMobile ? 28 : 48, fontWeight: 900, margin: '0 0 12px', letterSpacing: '-0.03em', lineHeight: 1.05 }}>
          Prêt à économiser <span style={{ color: '#FFE45C' }}>50%</span> sur votre fiduciaire&nbsp;?
        </h2>
        <p style={{ fontSize: 16, opacity: 0.9, maxWidth: 580, margin: '0 auto 24px' }}>30 secondes pour simuler. 24h pour recevoir votre offre. 0 engagement.</p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <SkBtn style={{ background: '#FFE45C', color: '#1a1a1a', borderColor: '#1a1a1a' }}>Lancer ma simulation →</SkBtn>
          <SkBtn ghost style={{ background: 'transparent', color: 'white', borderColor: 'white', boxShadow: '3px 3px 0 rgba(255,255,255,0.4)' }}>📞 Nous appeler</SkBtn>
        </div>
      </div>

      <Footer city={city} />
      {isMobile && <StickyCTA city={city} />}
    </div>
  );
}

window.Direction1 = Direction1;
