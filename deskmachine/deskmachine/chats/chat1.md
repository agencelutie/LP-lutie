# Landing page variantes métiers/villes

_Started 2026-04-29 13:40 UTC_

---

## User

Voici la landing page actuelle pour générer des leads : fiduciaire + comptabilité en suisse via Google Ads. 

J'ai besoin d'avoir des variantes / métiers + ville pour augmenter le taux de conversions
+ variantes avec des composants pertinents qui ne serait peut être pas encore là.

## Assistant

Je vais explorer la capture pour comprendre la structure actuelle, puis poser quelques questions clés avant de proposer des wireframes.

_[tool: run_script]_

J'ai une bonne compréhension de la landing actuelle (DeskMachine — fiduciaire en ligne pour PME suisses, structure : hero → trust badges → comparaison vs traditionnel → about → services → simulateur de prix → formulaire → témoignages → FAQ → footer).

Avant de partir sur les wireframes, quelques questions essentielles pour cadrer les variantes métier × ville et les nouveaux composants.

_[tool: questions_v2]_

## User

Questions answered:
- metiers_cibles: Pas de secteur à cibler en priorité
- villes_cibles: Genève, Montreux / Vevey / Riviera, Yverdon-les-Bains, Lausanne (Vaud), Neuchâtel, Nyon, Bienne / Berne francophone, Sion / Valais
- combinaison: Décide pour moi
- nb_variantes_layout: 4
- nouveaux_composants: Calculateur d'économies vs fiduciaire actuelle (avant/après en CHF), Comparateur tarifaire dynamique (DeskMachine vs concurrents nommés), Chat / prise de RDV instantanée (Calendly embed), Décide pour moi (les plus impactants pour conversion Ads)
- fidelite_visuelle: Mid-fi (couleurs DeskMachine, polices simulées) — proche du final
- swipe_ou_scroll: Variantes des deux à comparer
- tone_copy: Économies / prix (jusqu'à -50%), Modernité / 100% digital / pas de paperasse, Réassurance / proximité humaine ('un conseiller dédié')
- tweaks: Décide pour moi
- device: Les deux côte à côte

## Assistant

Parfait. Je vais explorer un peu plus la capture pour récupérer les couleurs/polices DeskMachine, puis construire le wireframe.

_[tool: run_script]_

_[tool: run_script]_

Couleur principale identifiée : **bleu rgb(44, 107, 210)** (#2C6BD2). Je commence à construire les wireframes.

_[tool: update_todos]_

Je vais commencer par poser la structure : un fichier principal avec design canvas pour comparer les 4 directions côte à côte, puis les composants.

_[tool: copy_starter_component]_

_[tool: copy_starter_component]_

_[tool: snip]_

Je vais maintenant créer le fichier wireframe principal. Stratégie:

- 4 directions narratives × 2 formats (desktop scroll / desktop swipe / mobile scroll) côte à côte sur design canvas
- Chaque direction = un angle différent : (1) Économies/prix, (2) Métier×Ville hyper-localisé, (3) Calculateur-first, (4) Conversational/RDV-first
- Tweaks : ville, métier (auto), angle, mode swipe/scroll, dark/light, toggle composants
- Style sketchy mid-fi : bleu DeskMachine #2C6BD2, Arial, traits crayonnés mais propres

_[tool: write_file]_

I'll continue building the wireframes.

_[tool: snip]_

_[tool: write_file]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: write_file]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Voilà — j'ai préparé un design canvas avec **4 directions narratives** pour la landing DeskMachine, chacune en desktop scroll + mobile (et une variante swipe pour la D1) :

**Directions explorées**
1. **Économies max** — calculateur dès le hero, comparateur tarifaire en #2
2. **Hyper-local métier × ville** — carte cantonale, métiers auto-détectés par ville, fiscalité cantonale
3. **Calculateur-first** — la page entière est un funnel progressif 4 étapes
4. **Conversational / humain** — conseiller dédié au centre, chat-style hero, RDV-first

**Nouveaux composants** (visibles isolément en haut du canvas) :
- 🧮 Calculateur d'économies (slider + avant/après CHF)
- 📊 Comparateur tarifaire DeskMachine vs concurrents
- 📅 Module RDV instantané (Calendly-like)
- 🗺️ Carte cantonale interactive
- 💬 Sticky CTA mobile + ticker social proof

**Tweaks** (panneau bas-droite) : sélecteur de ville (8 villes romandes, métiers auto-suggérés par ville), toggle vue mobile, toggle variante swipe.

**Prochaines étapes possibles** — dis-moi ce qui t'intéresse :
- Pousser une direction en hi-fi (fonts, vraies images, micro-interactions)
- Ajouter un combinateur métier × ville explicite (ex: page « Fiduciaire pour restaurants à Montreux »)
- Variantes A/B des hero copy par angle (prix vs temps vs expertise)
- Templates dynamiques génératifs pour ton SEA (1 URL par couple)

## User

- j'ai besoin d'avoir LP complète, pas que hero section 

- graphiquement Direction 1 mieux

## Assistant

_[tool: snip]_

_[tool: read_file]_

Je vais étoffer Direction 1 en LP complète avec toutes les sections (services, témoignages, FAQ, about, etc.) et l'utiliser comme base graphique principale.

_[tool: snip]_

_[tool: write_file]_

Now I need to make the artboards taller so they show the full LP. Let me update the canvas heights.

_[tool: snip]_

_[tool: read_file]_

I'll restructure: make D1 the primary feature with full-page artboards, and reduce other directions to just hero previews to keep the canvas focused on D1.

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

Direction 1 est maintenant en **LP complète** avec 14 sections : hero → trust strip logos → 4 KPI → comparateur tarifaire → avant/après → grille 6 services → simulateur de prix → onboarding 4 jours → cas client chiffré → 3 témoignages → carte couverture Suisse romande → about → RDV → FAQ → CTA final → footer.

Sur le canvas :
- ⭐ **Direction 1** placée en premier, en grand (1280×4800px desktop + 420×4800px mobile, scrollables dans la carte)
- Les directions 2, 3, 4 sont reléguées en aperçu (1280×900) pour pouvoir comparer sans encombrer
- La section design system + composants nouveaux reste en haut

Tweaks (panneau bas-droite) : sélecteur de ville (les 8 romandes — métiers auto par ville), toggle mobile, toggle variante swipe.

Dis-moi si tu veux :
- Pousser D1 encore plus en hi-fi (vraies images, Inter → font custom, micro-interactions)
- Ajouter d'autres sections (vidéo démo dashboard, intégrations bancaires, sécurité/RGPD…)
- Variantes A/B du hero D1 (3 angles de copy à tester en SEA)

## User

Il faut faire apparaitre de l'humain

## Assistant

_[tool: snip]_

_[tool: run_script]_

[I'll add human imagery throughout the LP — team photos in the hero, conseiller portraits in About, real face in case study, conseiller avatars in RDV, and a "meet the team" section.]

_[tool: snip]_

_[tool: read_file]_

[I'll add a portrait component using the existing real photo from the site, plus a "meet your conseiller" section, team strip, and inline avatars throughout. Let me update the primitives first to add a Portrait helper, then patch direction 1.]

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: str_replace_edit]_

[Continuing with adding human imagery — moving the calculator after hero, adding "meet the team" section, adding portraits to testimonials, case study, RDV.]

_[tool: snip]_

_[tool: str_replace_edit]_

[I'll continue adding human imagery to remaining sections.]

_[tool: snip]_

_[tool: str_replace_edit]_

[Adding portraits to testimonials and updating About + RDV with humans, then ship.]

_[tool: snip]_

_[tool: str_replace_edit]_

[Aggressive snip of all completed work and finishing the human-centric pass.]

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: str_replace_edit]_

_[tool: snip]_

_[tool: done]_

_[tool: snip]_

_[tool: fork_verifier_agent]_

L'humain est maintenant partout dans Direction 1 :

- **Hero** : grande photo de l'équipe à droite + carte « Julie en ligne · réponse 1h47 » en surimpression + stack de portraits avec note 4.9★
- **Cas client** : portrait du client (Felix) au lieu d'un placeholder
- **Nouvelle section "L'équipe"** : 4 cartes conseillers (Julie / Marc / Sophie / Thomas) avec badge canton + footer « +8 conseillers, tous brevet fédéral, tous en Suisse romande »
- **Témoignages** : avatars circulaires avec photo au lieu d'initiales
- **About** : photo équipe à la place du placeholder
- **RDV** : avatar photo de Julie dans le header du module

Le calculateur a été déplacé en section #2 (sous le hero) pour libérer la place à l'humain en hero.

Dis-moi si tu veux des ajustements ou si on pousse encore plus loin l'humain (vidéo intro fondateur, photos clients réels par métier, signature manuscrite du conseiller dans les CTA…).

