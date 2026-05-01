// Main app — Design Canvas with 4 directions × desktop/mobile, plus a "swipe" variant
const { useState: useStateA } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "city": "lausanne",
  "showSwipe": true,
  "showMobile": true,
  "darkAccent": false,
  "componentsOnly": false
}/*EDITMODE-END*/;

// Swipe-mode wrapper: shows one section at a time with side dots
function SwipeView({ children, total = 6 }) {
  const [idx, setIdx] = useStateA(0);
  const sections = React.Children.toArray(children);
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', background: 'white', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'stretch', justifyContent: 'stretch' }}>
        <div style={{ width: '100%', height: '100%', overflowY: 'auto' }} className="artboard-scroll">
          {sections[idx]}
        </div>
      </div>
      <SwipeChrome active={idx} total={sections.length} />
      <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 8, zIndex: 8 }}>
        <button onClick={() => setIdx(Math.max(0, idx - 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid #2b2b2b', background: 'white', cursor: 'pointer' }}>↑</button>
        <button onClick={() => setIdx(Math.min(sections.length - 1, idx + 1))} style={{ width: 36, height: 36, borderRadius: '50%', border: '1.5px solid #2b2b2b', background: '#2C6BD2', color: 'white', cursor: 'pointer' }}>↓</button>
      </div>
    </div>
  );
}

function PhoneFrame({ children }) {
  return (
    <div className="phone-frame">
      <div className="phone-screen">{children}</div>
    </div>
  );
}

// Wrapper that picks the right Direction component
function DirectionWrap({ which, city, mode }) {
  const Comp = { 1: Direction1, 2: Direction2, 3: Direction3, 4: Direction4 }[which];
  return <Comp city={city} mode={mode} />;
}

function DesignSystem() {
  return (
    <div style={{ padding: 24, background: '#FBFAF6', height: '100%', overflowY: 'auto' }} className="artboard-scroll">
      <h2 style={{ fontWeight: 800, margin: '0 0 4px', fontSize: 22 }}>Design system mid-fi</h2>
      <p style={{ fontSize: 12, color: '#666', marginBottom: 20 }}>Couleurs et composants partagés par les 4 directions.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 8, marginBottom: 20 }}>
        {[
          ['#2C6BD2', 'Blue 500'],
          ['#1B4FA8', 'Blue 700'],
          ['#D7E6FF', 'Blue 100'],
          ['#1a1a1a', 'Ink'],
          ['#FFE45C', 'Yellow'],
          ['#FBFAF6', 'Paper'],
        ].map(([c, l]) => (
          <div key={c}>
            <div style={{ height: 60, background: c, borderRadius: 6, border: '1px solid #ddd' }} />
            <div style={{ fontSize: 10, marginTop: 4, fontFamily: 'JetBrains Mono' }}>{c}</div>
            <div style={{ fontSize: 10, color: '#888' }}>{l}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, flexWrap: 'wrap' }}>
        <SkBtn>Primary CTA</SkBtn>
        <SkBtn ghost>Secondary</SkBtn>
        <SkBtn sm>Small</SkBtn>
        <SkPill>📍 Pill</SkPill>
        <SkPill style={{ background: '#FFE45C' }}>⚡ Yellow</SkPill>
      </div>
      <h3 style={{ fontSize: 14, fontWeight: 700, marginTop: 24, marginBottom: 8 }}>Type</h3>
      <div style={{ fontSize: 36, fontWeight: 900, letterSpacing: '-0.03em' }}>Display 36 / 900</div>
      <div style={{ fontSize: 22, fontWeight: 800 }}>Heading 22 / 800</div>
      <div style={{ fontSize: 14 }}>Body 14 / 400 — Inter sans-serif. <span className="squiggle">Highlight</span> via squiggle SVG.</div>
      <div className="sk-mono" style={{ fontSize: 12, color: '#666' }}>Mono — JetBrains Mono pour metadata</div>
    </div>
  );
}

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const cityKey = tweaks.city || 'lausanne';
  const city = CITIES[cityKey];

  return (
    <>
      <DesignCanvas projectName="DeskMachine — Landing v3 wireframes">
        <DCSection id="ds" title="Design system">
          <DCArtboard id="ds-1" label="Tokens & primitives" width={680} height={540}>
            <DesignSystem />
          </DCArtboard>
          <DCArtboard id="comp-calc" label="NEW · Calculateur d'économies" width={420} height={620}>
            <div style={{ padding: 24, background: '#FBFAF6', height: '100%', boxSizing: 'border-box' }}>
              <CalculateurEconomies />
            </div>
          </DCArtboard>
          <DCArtboard id="comp-comp" label="NEW · Comparateur tarifaire" width={620} height={380}>
            <div style={{ padding: 24, background: '#FBFAF6', height: '100%', boxSizing: 'border-box' }}>
              <ComparateurTarifaire />
            </div>
          </DCArtboard>
          <DCArtboard id="comp-rdv" label="NEW · RDV instantané" width={420} height={520}>
            <div style={{ padding: 24, background: '#FBFAF6', height: '100%', boxSizing: 'border-box' }}>
              <PriseRDV city={city} />
            </div>
          </DCArtboard>
          <DCArtboard id="comp-map" label="NEW · Carte cantonale" width={520} height={360}>
            <div style={{ padding: 24, background: '#FBFAF6', height: '100%', boxSizing: 'border-box' }}>
              <CantonMap activeCity={cityKey} />
            </div>
          </DCArtboard>
        </DCSection>

        <DCSection id="d1" title={`★ Direction 1 — Économies max · LP COMPLÈTE · ${city.name}`}>
          <DCArtboard id="d1-desktop" label="Desktop · LP complète (scroll dans la carte)" width={1280} height={4800}>
            <DirectionWrap which={1} city={city} mode="desktop" />
          </DCArtboard>
          {tweaks.showMobile && (
            <DCArtboard id="d1-mobile" label="Mobile · LP complète" width={420} height={4800}>
              <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 20, height: '100%', background: '#ECECEE', boxSizing: 'border-box' }}>
                <PhoneFrame><DirectionWrap which={1} city={city} mode="mobile" /></PhoneFrame>
              </div>
            </DCArtboard>
          )}
          {tweaks.showSwipe && (
            <DCArtboard id="d1-swipe" label="Desktop · swipe (1 section/vue)" width={1280} height={900}>
              <SwipeView>
                <DirectionWrap which={1} city={city} mode="desktop" />
              </SwipeView>
            </DCArtboard>
          )}
        </DCSection>

        <DCSection id="alt" title="Directions alternatives — aperçu hero (pour comparaison)">
          <DCArtboard id="d2-desktop" label="D2 · Hyper-local métier×ville" width={1280} height={900}>
            <DirectionWrap which={2} city={city} mode="desktop" />
          </DCArtboard>
          <DCArtboard id="d3-desktop" label="D3 · Calculateur-first" width={1280} height={900}>
            <DirectionWrap which={3} city={city} mode="desktop" />
          </DCArtboard>
          <DCArtboard id="d4-desktop" label="D4 · Conversational/humain" width={1280} height={900}>
            <DirectionWrap which={4} city={city} mode="desktop" />
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection title="Ville">
          <TweakSelect label="Ville cible" value={tweaks.city} onChange={(v) => setTweak('city', v)}
            options={Object.entries(CITIES).map(([k, c]) => ({ value: k, label: `${c.name} (${c.canton})` }))} />
          <div style={{ fontSize: 11, color: '#666', marginTop: 6 }}>
            Métiers auto: {(METIERS_BY_CITY[cityKey] || []).join(', ')}
          </div>
        </TweakSection>
        <TweakSection title="Affichage">
          <TweakToggle label="Vue mobile" value={tweaks.showMobile} onChange={(v) => setTweak('showMobile', v)} />
          <TweakToggle label="Variante swipe (D1)" value={tweaks.showSwipe} onChange={(v) => setTweak('showSwipe', v)} />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
