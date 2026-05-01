// New components: calculateur d'économies, comparateur tarifaire, prise de RDV instantanée
const { useState: useStateC } = React;

// ── Calculateur d'économies vs fiduciaire actuelle ─────────────
function CalculateurEconomies({ compact }) {
  const [chf, setChf] = useStateC(450);
  const dm = Math.max(149, Math.round(chf * 0.55 / 10) * 10);
  const economie = chf - dm;
  const economieAn = economie * 12;
  return (
    <div style={{ border: '1.5px solid #2b2b2b', borderRadius: 10, padding: 18, background: '#FBFAF6', boxShadow: '4px 4px 0 #2b2b2b' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <span className="sk-pill" style={{ background: '#FFE45C' }}>🧮 Calculateur</span>
        <span style={{ fontSize: 12, color: '#666' }}>Estimez vos économies en 10s</span>
      </div>
      <div style={{ fontSize: 13, color: '#333', marginBottom: 8 }}>Combien payez-vous votre fiduciaire actuelle / mois ?</div>
      <input type="range" min={150} max={1500} step={50} value={chf} onChange={(e) => setChf(+e.target.value)} style={{ width: '100%', accentColor: '#2C6BD2' }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'JetBrains Mono', fontSize: 11, color: '#888', marginTop: 4 }}>
        <span>150 CHF</span>
        <span style={{ fontWeight: 700, color: '#2C6BD2', fontSize: 14 }}>CHF {chf}.-</span>
        <span>1500+ CHF</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 14 }}>
        <div style={{ border: '1px solid #ddd', borderRadius: 6, padding: 10, background: 'white' }}>
          <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase' }}>Aujourd'hui</div>
          <div style={{ fontSize: 22, fontWeight: 800, textDecoration: 'line-through', color: '#999' }}>CHF {chf}.-</div>
          <div style={{ fontSize: 10, color: '#888' }}>par mois</div>
        </div>
        <div style={{ border: '1.5px solid #2C6BD2', borderRadius: 6, padding: 10, background: '#D7E6FF' }}>
          <div style={{ fontSize: 10, color: '#1B4FA8', textTransform: 'uppercase', fontWeight: 600 }}>Avec DeskMachine</div>
          <div style={{ fontSize: 22, fontWeight: 800, color: '#1B4FA8' }}>CHF {dm}.-</div>
          <div style={{ fontSize: 10, color: '#1B4FA8' }}>par mois</div>
        </div>
      </div>
      <div style={{ marginTop: 12, padding: 10, background: '#1a1a1a', color: 'white', borderRadius: 6, textAlign: 'center' }}>
        <div style={{ fontSize: 10, opacity: 0.7, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Vous économisez</div>
        <div style={{ fontSize: 24, fontWeight: 800, color: '#FFE45C' }}>CHF {economieAn.toLocaleString('fr-CH')}.- / an</div>
      </div>
      {!compact && <SkBtn full style={{ marginTop: 12 }}>Recevoir mon offre exacte →</SkBtn>}
    </div>
  );
}

// ── Comparateur tarifaire vs concurrents ─────────────
function ComparateurTarifaire() {
  const rows = [
    { name: 'DeskMachine',   price: 'CHF 149.-',  digital: true,  rdv: '24h',  brevet: true,  highlight: true },
    { name: 'Fiduciaire A',  price: 'CHF 380.-',  digital: false, rdv: '1-2 sem', brevet: true,  highlight: false },
    { name: 'Fiduciaire B',  price: 'CHF 450.-',  digital: 'partiel', rdv: '1 sem', brevet: true, highlight: false },
    { name: 'Comptable indé.', price: 'CHF 320.-', digital: false, rdv: 'variable', brevet: false, highlight: false },
  ];
  return (
    <div style={{ border: '1.5px solid #2b2b2b', borderRadius: 10, overflow: 'hidden', background: 'white' }}>
      <div style={{ background: '#1a1a1a', color: 'white', padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontWeight: 700, fontSize: 13 }}>Comparatif tarifaire — PME 5 employés</span>
        <span style={{ fontSize: 10, color: '#999' }}>maj. 04/2026</span>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 12 }}>
        <thead>
          <tr style={{ background: '#f4f4f4', fontSize: 10, textTransform: 'uppercase', color: '#666' }}>
            <th style={{ textAlign: 'left', padding: 8 }}>Prestataire</th>
            <th style={{ padding: 8 }}>Prix/mois</th>
            <th style={{ padding: 8 }}>100% digital</th>
            <th style={{ padding: 8 }}>Réponse</th>
            <th style={{ padding: 8 }}>Brevet féd.</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ background: r.highlight ? '#D7E6FF' : 'white', borderTop: '1px solid #eee', fontWeight: r.highlight ? 700 : 400 }}>
              <td style={{ padding: 8 }}>{r.highlight && '⭐ '}{r.name}</td>
              <td style={{ padding: 8, textAlign: 'center', color: r.highlight ? '#1B4FA8' : '#333' }}>{r.price}</td>
              <td style={{ padding: 8, textAlign: 'center' }}>{r.digital === true ? '✅' : r.digital === 'partiel' ? '🟡' : '❌'}</td>
              <td style={{ padding: 8, textAlign: 'center' }}>{r.rdv}</td>
              <td style={{ padding: 8, textAlign: 'center' }}>{r.brevet ? '✅' : '❌'}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ padding: '8px 14px', fontSize: 10, color: '#888', background: '#fafafa', borderTop: '1px solid #eee' }}>
        Tarifs moyens constatés en Suisse romande, configuration équivalente.
      </div>
    </div>
  );
}

// ── Prise de RDV instantanée (Calendly-like embed) ─────────────
function PriseRDV({ city }) {
  const slots = ['09:00', '10:30', '14:00', '15:30', '17:00'];
  const days = ['Lun 28', 'Mar 29', 'Mer 30', 'Jeu 01', 'Ven 02'];
  const [selected, setSelected] = useStateC({ d: 1, s: 1 });
  return (
    <div style={{ border: '1.5px solid #2b2b2b', borderRadius: 10, background: 'white', overflow: 'hidden' }}>
      <div style={{ padding: 14, background: '#1a1a1a', color: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', overflow: 'hidden', flexShrink: 0, border: '2px solid #FFE45C' }}>
            <img src={window.TEAM_PHOTO} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700 }}>RDV avec Julie · votre conseillère</div>
            <div style={{ fontSize: 10, color: '#aaa' }}>30 min · Visio ou téléphone · {city?.name}</div>
          </div>
        </div>
      </div>
      <div style={{ padding: 14 }}>
        <div style={{ fontSize: 11, color: '#666', marginBottom: 8, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Avril 2026</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginBottom: 12 }}>
          {days.map((d, i) => (
            <button key={i} onClick={() => setSelected(s => ({ ...s, d: i }))} style={{ padding: '8px 4px', border: '1px solid ' + (selected.d === i ? '#2C6BD2' : '#ddd'), background: selected.d === i ? '#D7E6FF' : 'white', borderRadius: 4, fontSize: 10, cursor: 'pointer', fontWeight: selected.d === i ? 700 : 400 }}>{d}</button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: '#666', marginBottom: 8, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Créneaux disponibles</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {slots.map((s, i) => (
            <button key={i} onClick={() => setSelected(o => ({ ...o, s: i }))} style={{ padding: '10px 4px', border: '1px solid ' + (selected.s === i ? '#2C6BD2' : '#ddd'), background: selected.s === i ? '#2C6BD2' : 'white', color: selected.s === i ? 'white' : '#333', borderRadius: 4, fontSize: 11, cursor: 'pointer', fontWeight: 600 }}>{s}</button>
          ))}
        </div>
        <SkBtn full style={{ marginTop: 12 }}>Confirmer le RDV →</SkBtn>
        <div style={{ marginTop: 10, fontSize: 10, color: '#888', textAlign: 'center' }}>✓ Sans engagement · ✓ Confidentiel · ✓ Conseiller {city?.name}</div>
      </div>
    </div>
  );
}

// ── Trust bar (badges) ─────────────
function TrustBar({ minimal }) {
  const items = [
    { ico: '🛡️', t: 'Brevet fédéral' },
    { ico: '🔒', t: 'Données en CH' },
    { ico: '⭐', t: '4.9/5 (127 avis)' },
    { ico: '🏆', t: '+100 PME' },
  ];
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: minimal ? 'flex-start' : 'center' }}>
      {items.map((it, i) => (
        <div key={i} className="sk-pill" style={{ fontSize: 11 }}><span>{it.ico}</span>{it.t}</div>
      ))}
    </div>
  );
}

// ── Carte cantonale (placeholder SVG) ─────────────
function CantonMap({ activeCity }) {
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', background: '#F4F4F4', border: '1px dashed #c2c2c2', borderRadius: 8, overflow: 'hidden' }}>
      <svg viewBox="0 0 400 250" style={{ width: '100%', height: '100%' }}>
        <path d="M30 80 Q 80 40 150 60 T 280 70 Q 350 90 370 140 Q 360 200 280 210 Q 180 220 100 200 Q 30 180 30 80 Z" fill="#E6EFFA" stroke="#2C6BD2" strokeWidth="1.5" strokeDasharray="3 3" />
        {[
          { id: 'geneve',   x: 70,  y: 180, l: 'Genève' },
          { id: 'nyon',     x: 95,  y: 165, l: 'Nyon' },
          { id: 'lausanne', x: 130, y: 150, l: 'Lausanne' },
          { id: 'montreux', x: 165, y: 165, l: 'Montreux' },
          { id: 'yverdon',  x: 145, y: 110, l: 'Yverdon' },
          { id: 'neuchatel',x: 175, y: 95,  l: 'Neuchâtel' },
          { id: 'bienne',   x: 215, y: 90,  l: 'Bienne' },
          { id: 'sion',     x: 235, y: 175, l: 'Sion' },
        ].map(c => (
          <g key={c.id}>
            <circle cx={c.x} cy={c.y} r={c.id === activeCity ? 8 : 5} fill={c.id === activeCity ? '#2C6BD2' : 'white'} stroke="#2C6BD2" strokeWidth="1.5" />
            <text x={c.x + 10} y={c.y + 4} fontSize="10" fontFamily="Inter" fontWeight={c.id === activeCity ? 700 : 400} fill="#1a1a1a">{c.l}</text>
          </g>
        ))}
      </svg>
      <div style={{ position: 'absolute', bottom: 8, left: 8, fontSize: 9, color: '#888', fontFamily: 'JetBrains Mono' }}>SUISSE ROMANDE</div>
    </div>
  );
}

// ── Sticky social proof ticker ─────────────
function ProofTicker({ city }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px', background: '#1a1a1a', color: 'white', borderRadius: 6, fontSize: 11 }}>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#34C26A', boxShadow: '0 0 0 4px rgba(52,194,106,0.2)' }} />
      <span><b>3 PME à {city?.name}</b> ont demandé une simulation cette semaine</span>
    </div>
  );
}

Object.assign(window, { CalculateurEconomies, ComparateurTarifaire, PriseRDV, TrustBar, CantonMap, ProofTicker });
