// Shared low-fi primitives for DeskMachine wireframes
const { useState, useEffect, useMemo, useRef } = React;

// City data with canton info
const CITIES = {
  geneve:    { name: 'Genève',           canton: 'GE', tva: '8.1%', spec: 'finance internationale' },
  lausanne:  { name: 'Lausanne',         canton: 'VD', tva: '8.1%', spec: 'PME & startups' },
  montreux:  { name: 'Montreux-Riviera', canton: 'VD', tva: '8.1%', spec: 'tourisme & hôtellerie' },
  yverdon:   { name: 'Yverdon-les-Bains',canton: 'VD', tva: '8.1%', spec: 'industrie & artisanat' },
  neuchatel: { name: 'Neuchâtel',        canton: 'NE', tva: '8.1%', spec: 'horlogerie & micro-tech' },
  nyon:      { name: 'Nyon',             canton: 'VD', tva: '8.1%', spec: 'multinationales & sièges' },
  bienne:    { name: 'Bienne',           canton: 'BE', tva: '8.1%', spec: 'bilingue DE/FR' },
  sion:      { name: 'Sion (Valais)',    canton: 'VS', tva: '8.1%', spec: 'tourisme & vignerons' },
};

// Auto-detected métier examples per city (decided for the user)
const METIERS_BY_CITY = {
  geneve:    ['Avocats', 'Conseil & finance', 'E-commerce'],
  lausanne:  ['Startups tech', 'Consultants IT', 'Architectes'],
  montreux:  ['Restaurants', 'Hôtels', 'Salons & esthétique'],
  yverdon:   ['Artisans', 'Construction', 'PME industrie'],
  neuchatel: ['Horlogerie', 'Bureaux d\u2019études', 'Cabinets médicaux'],
  nyon:      ['Sièges sociaux', 'Conseil', 'Immobilier'],
  bienne:    ['Industrie', 'Médecins', 'Garages'],
  sion:      ['Vignerons', 'Restaurants', 'Construction'],
};

// Squiggly box wrapper using SVG outline
function SkBox({ children, style, dashed, soft, hand }) {
  const cls = ['sk-box', dashed && 'dashed', soft && 'soft', hand && 'hand'].filter(Boolean).join(' ');
  return <div className={cls} style={style}>{children}</div>;
}

// Sketchy CTA button
function SkBtn({ children, ghost, sm, full, style, onClick }) {
  const cls = ['sk-btn', ghost && 'ghost', sm && 'sm'].filter(Boolean).join(' ');
  const s = { ...(full ? { width: '100%', justifyContent: 'center' } : {}), ...style };
  return <button className={cls} style={s} onClick={onClick}>{children}</button>;
}

// Image placeholder
function SkImg({ label, w, h, style }) {
  return <div className="sk-img" style={{ width: w || '100%', height: h || 120, ...style }}>{label || 'image'}</div>;
}

// Real DeskMachine team photo from the live site
const TEAM_PHOTO = 'https://cdn.prod.website-files.com/68c005c9c1663ab4e1b4ea1b/69689c36b792f12c948acd54_WhatsApp%20Image%202026-01-15%20at%2008.38.46.jpeg';

// Portrait — uses real photo with optional grayscale label overlay
function Portrait({ src, name, role, w, h, round, style, ring }) {
  return (
    <div style={{ position: 'relative', width: w || '100%', height: h || 180, borderRadius: round ? '50%' : 8, overflow: 'hidden', border: ring ? '3px solid white' : '1px solid #ddd', boxShadow: ring ? '0 4px 12px rgba(0,0,0,0.12)' : 'none', ...style }}>
      <img src={src || TEAM_PHOTO} alt={name || 'Portrait'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      {(name || role) && !round && (
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '8px 10px', background: 'linear-gradient(0deg, rgba(0,0,0,0.7), transparent)', color: 'white' }}>
          {name && <div style={{ fontSize: 12, fontWeight: 700 }}>{name}</div>}
          {role && <div style={{ fontSize: 10, opacity: 0.85 }}>{role}</div>}
        </div>
      )}
    </div>
  );
}

// Portrait stack — overlapping circles for "meet the team" feel
function PortraitStack({ count = 4, size = 36 }) {
  const initials = ['JD', 'ML', 'SR', 'TB', 'AC'];
  return (
    <div style={{ display: 'flex' }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: '2px solid white', marginLeft: i > 0 ? -size * 0.3 : 0, position: 'relative', background: ['#D7E6FF', '#FFE45C', '#FCE0E0', '#DAF1E2', '#E8E8E8'][i % 5], display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.32, fontWeight: 700, color: '#1B4FA8', flexShrink: 0 }}>
          {i === 0 ? <img src={TEAM_PHOTO} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : initials[i]}
        </div>
      ))}
    </div>
  );
}

// Pill / badge
function SkPill({ children, color, style }) {
  return <span className="sk-pill" style={{ background: color || 'white', ...style }}>{children}</span>;
}

// Bullet check item
function SkCheck({ children, x }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', fontSize: 12, color: '#333', marginBottom: 6 }}>
      <span style={{ display: 'inline-flex', width: 16, height: 16, borderRadius: 4, background: x ? '#FCE0E0' : '#DAF1E2', color: x ? '#C03030' : '#1F8A4C', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0, marginTop: 1 }}>{x ? '✕' : '✓'}</span>
      <span>{children}</span>
    </div>
  );
}

// Section frame label
function SectionLabel({ n, name, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: 'JetBrains Mono', fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 12, ...style }}>
      <span style={{ background: '#222', color: 'white', padding: '2px 6px', borderRadius: 3, fontSize: 9 }}>{String(n).padStart(2, '0')}</span>
      <span>{name}</span>
      <span style={{ flex: 1, height: 1, background: '#ddd' }} />
    </div>
  );
}

// Annotation arrow + caption
function Annot({ children, style }) {
  return <div className="sk-annot" style={style}>{children}</div>;
}

// Fake nav bar (compact)
function FakeNav({ city, scale = 1 }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 24px', borderBottom: '1px solid #eee', background: 'white', position: 'sticky', top: 0, zIndex: 5 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div className="dm-logo">Desk<span className="dot">M</span>achine</div>
        <div style={{ display: 'flex', gap: 16, fontSize: 11, color: '#555' }}>
          <span>Services</span><span>Tarifs</span><span>Pourquoi nous</span><span>Contact</span>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 8 }}>
        <span className="sk-pill" style={{ fontSize: 10 }}>📍 {city?.name || 'Suisse romande'}</span>
        <SkBtn sm>Demander un RDV →</SkBtn>
      </div>
    </div>
  );
}

// Compact mobile nav
function MobileNav({ city }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 14px', borderBottom: '1px solid #eee', background: 'white', position: 'sticky', top: 0, zIndex: 5 }}>
      <div className="dm-logo" style={{ fontSize: 14 }}>Desk<span className="dot">M</span>achine</div>
      <div style={{ fontSize: 18, lineHeight: 1 }}>≡</div>
    </div>
  );
}

// Swipe-style page indicator
function SwipeChrome({ active = 0, total = 8 }) {
  return (
    <div style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 6, zIndex: 8 }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{ width: 4, height: i === active ? 22 : 8, background: i === active ? '#2C6BD2' : '#ccc', borderRadius: 2 }} />
      ))}
    </div>
  );
}

// Sticky bottom CTA (mobile)
function StickyCTA({ city, label = 'Simuler mes économies' }) {
  return (
    <div style={{ position: 'sticky', bottom: 0, left: 0, right: 0, padding: '10px 14px', background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(8px)', borderTop: '1px solid #eee', display: 'flex', gap: 8, zIndex: 9 }}>
      <SkBtn full style={{ flex: 1 }}>{label} →</SkBtn>
      <SkBtn ghost sm style={{ width: 44, justifyContent: 'center', padding: 0 }}>💬</SkBtn>
    </div>
  );
}

// Footer (compact)
function Footer({ city }) {
  return (
    <div style={{ padding: '24px', background: '#1a1a1a', color: '#bbb', fontSize: 11 }}>
      <div className="dm-logo" style={{ color: 'white', marginBottom: 12 }}>Desk<span style={{ color: '#7AA8F0' }}>M</span>achine</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 12 }}>
        <div>Services<br/>Tarifs<br/>FAQ</div>
        <div>+41 21 552 05 26<br/>contact@deskmachine.ch</div>
        <div>Yverdon-les-Bains<br/>{city?.name && `Antenne ${city.name}`}</div>
      </div>
      <div style={{ borderTop: '1px solid #333', paddingTop: 8, fontSize: 9, color: '#666' }}>© 2025 DeskMachine Sàrl · CHE-300.783.289</div>
    </div>
  );
}

Object.assign(window, { CITIES, METIERS_BY_CITY, TEAM_PHOTO, Portrait, PortraitStack, SkBox, SkBtn, SkImg, SkPill, SkCheck, SectionLabel, Annot, FakeNav, MobileNav, SwipeChrome, StickyCTA, Footer });
