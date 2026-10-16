import { useId, useState, type KeyboardEvent } from 'react';
import { medicalArtwork, medicalArtworkUrl } from '../../data/medicalArtwork';
import './editorial-phenotype.css';

export type PhenotypeRegion = 'ocular' | 'bulbar' | 'cervical' | 'proximal' | 'respiratory';
type AnatomicalView = 'all' | 'anterior' | 'posterior' | 'lateral';
type IndividualView = Exclude<AnatomicalView, 'all'>;

interface PhenotypeFigureProps {
  selected: PhenotypeRegion;
  onSelect: (id: PhenotypeRegion) => void;
}

const regions: { id: PhenotypeRegion; number: string; label: string; anatomy: string; note: string }[] = [
  { id: 'ocular', number: '01', label: 'Ocular', anatomy: 'Extraocular muscles and eyelid', note: 'The regional marker locates the eye and eyelid. Extraocular muscles and the eyelid levator lie deeper than the surface anatomy shown.' },
  { id: 'bulbar', number: '02', label: 'Bulbar', anatomy: 'Tongue and pharyngeal musculature', note: 'The mouth and upper-neck markers locate the region. Tongue and pharyngeal muscles are deep structures, not the superficial facial muscles displayed.' },
  { id: 'cervical', number: '03', label: 'Cervical', anatomy: 'Anterior and posterior neck regions', note: 'Anterior neck and posterior cervical regions can be compared. The surface illustration does not expose every deep cervical flexor or extensor.' },
  { id: 'proximal', number: '04', label: 'Proximal', anatomy: 'Shoulder, upper arm and visible thigh', note: 'Shoulder, upper-arm and visible thigh muscles orient the proximal category. Shorts cover the hip and much of the proximal thigh; those muscles are not exposed. The outlines are regional landmarks, not a map of observed injury.' },
  { id: 'respiratory', number: '05', label: 'Respiratory', anatomy: 'Intercostal region and deep diaphragm', note: 'The thoracic regions orient the intercostal muscles. The diaphragm lies deep and is not fully exposed; no view establishes respiratory-muscle function.' },
];

const views: { id: AnatomicalView; label: string; box: string }[] = [
  { id: 'all', label: 'All views', box: '0 0 1536 1024' },
  { id: 'anterior', label: 'Anterior', box: '110 0 500 1024' },
  { id: 'posterior', label: 'Posterior', box: '590 0 500 1024' },
  { id: 'lateral', label: 'Lateral', box: '1036 0 500 1024' },
];

type RegionGeometry = { highlight: string; dot: [number, number]; badge: [number, number] };
// These regions are calibrated to the project-owned 1,536 × 1,024 three-view plate.
// A regional outline does not imply that the depicted superficial muscle is the
// anatomical source of ocular, bulbar or respiratory dysfunction.
const geometry: Record<IndividualView, Partial<Record<PhenotypeRegion, RegionGeometry>>> = {
  anterior: {
    ocular: { highlight: 'M328 69 a18 12 0 1 0 36 0 a18 12 0 1 0 -36 0 M365 69 a18 12 0 1 0 36 0 a18 12 0 1 0 -36 0', dot: [346, 69], badge: [273, 46] },
    bulbar: { highlight: 'M337 105 Q359 94 384 105 L379 132 Q361 143 341 131Z', dot: [379, 116], badge: [416, 100] },
    cervical: { highlight: 'M328 125 L342 136 Q343 159 356 183 L340 174 Q328 154 325 138Z M391 125 L379 136 Q376 158 366 183 L382 174 Q393 153 396 138Z', dot: [332, 155], badge: [263, 143] },
    proximal: { highlight: 'M247 187 Q220 194 217 227 L225 267 Q245 257 267 236 L279 192Z M468 188 Q497 196 506 229 L498 266 Q474 255 454 236 L443 194Z M220 267 Q212 298 217 334 L241 350 L256 307 L254 266Z M474 265 Q497 267 512 300 L509 338 L487 350 L470 306Z M255 579 L338 582 L328 652 L308 672 L274 658Z M384 581 L466 577 L453 659 L420 675 L393 649Z', dot: [236, 222], badge: [125, 207] },
    respiratory: { highlight: 'M288 213 Q272 239 279 276 L292 312 L310 328 L320 309 Q299 292 297 266 L305 226Z M425 215 Q448 236 446 275 L434 312 L420 326 L409 309 Q428 289 429 263 L416 227Z', dot: [438, 285], badge: [539, 286] },
  },
  posterior: {
    cervical: { highlight: 'M799 109 Q816 123 826 152 L826 183 L792 165 L779 178 L783 153Z M859 109 Q846 123 835 152 L835 183 L869 166 L882 179 L876 150Z', dot: [849, 147], badge: [931, 108] },
    proximal: { highlight: 'M722 188 Q692 196 688 229 L698 268 Q721 256 743 235 L753 196Z M938 190 Q966 197 974 228 L966 266 Q944 258 923 235 L912 196Z M686 269 L715 267 L727 304 L711 350 L686 337 L675 305Z M946 267 L976 272 L992 310 L980 344 L958 350 L942 303Z M733 581 L809 583 L795 656 L768 678 L742 657Z M850 582 L925 577 L913 661 L883 681 L858 655Z', dot: [712, 223], badge: [605, 207] },
    respiratory: { highlight: 'M735 251 Q756 266 768 294 L773 343 L755 374 L741 345 L729 287Z M923 252 Q904 265 894 294 L888 344 L903 374 L920 344 L932 286Z', dot: [913, 294], badge: [1000, 289] },
  },
  lateral: {
    ocular: { highlight: 'M1309 70 a17 12 0 1 0 34 0 a17 12 0 1 0 -34 0', dot: [1326, 70], badge: [1401, 47] },
    bulbar: { highlight: 'M1301 105 Q1319 103 1336 111 L1331 136 L1308 148 L1296 132Z', dot: [1330, 119], badge: [1394, 109] },
    cervical: { highlight: 'M1269 111 Q1270 143 1293 173 L1282 184 Q1256 153 1251 120Z M1304 137 L1317 155 L1319 177 L1304 172Z', dot: [1271, 145], badge: [1120, 124] },
    proximal: { highlight: 'M1223 179 Q1200 183 1197 217 L1208 255 Q1229 259 1250 240 L1272 198 L1250 182Z M1215 264 Q1230 275 1253 268 L1277 309 L1273 340 L1252 357 L1229 323Z M1247 577 L1334 576 Q1339 614 1313 657 L1291 682 L1258 663Z', dot: [1220, 218], badge: [1098, 210] },
    respiratory: { highlight: 'M1302 210 Q1334 231 1346 264 L1346 305 L1329 337 L1316 317 Q1330 289 1325 267 L1294 237Z', dot: [1336, 279], badge: [1402, 273] },
  },
};

/** Three-view regional atlas; clinical distribution never defines a diagnosis. */
export function PhenotypeFigure({ selected, onSelect }: PhenotypeFigureProps) {
  const id = useId();
  const [view, setView] = useState<AnatomicalView>(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 540px)').matches ? 'anterior' : 'all');
  const region = regions.find((item) => item.id === selected)!;
  const activeView = views.find((item) => item.id === view)!;
  const visibleViews: IndividualView[] = view === 'all' ? ['anterior', 'posterior', 'lateral'] : [view];
  const selectRegion = (target: PhenotypeRegion) => {
    if (view === 'posterior' && (target === 'ocular' || target === 'bulbar')) setView('anterior');
    onSelect(target);
  };
  const activate = (event: KeyboardEvent<SVGGElement>, target: PhenotypeRegion) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectRegion(target);
    }
  };
  return <div className="phenotype-figure editorial-phenotype" role="group" aria-labelledby={`${id}-title`}>
    <div className="editorial-phenotype-heading"><span id={`${id}-title`}>Regional muscle anatomy</span><span>Three complementary anatomical views</span></div>
    <div className="editorial-phenotype-view-controls" role="group" aria-label="Anatomical views">
      {views.map(item => <button key={item.id} type="button" aria-pressed={view === item.id} onClick={() => setView(item.id)}>{item.label}</button>)}
    </div>
    <div className={`editorial-phenotype-art${view === 'all' ? ' is-all-views' : ' is-single-view'}`} data-phenotype-view={view}>
      <svg className="phenotype-anatomical-overlay" viewBox={activeView.box} role="group" aria-label="Select anatomical regions">
        <title>{activeView.label}: regional skeletal-muscle anatomy</title>
        <desc>Original pastel medical illustration with anterior, posterior and right lateral views. Select the numbered region markers or use the clinical-region controls below. Deep structures are described separately.</desc>
        <image href={medicalArtworkUrl('clinical-distribution')} width="1536" height="1024" data-medical-artwork="clinical-distribution" role="img" aria-label={medicalArtwork['clinical-distribution'].alt} />
        {regions.map(item => {
          const shapes = visibleViews.flatMap(orientation => {
            const shape = geometry[orientation][item.id];
            return shape ? [{ ...shape, orientation }] : [];
          });
          if (!shapes.length) return null;
          const primary = shapes[0];
          return <g key={item.id} className={`phenotype-anatomical-target${selected === item.id ? ' is-selected' : ''}`} role="button" tabIndex={0}
            aria-label={`Select ${item.id} anatomy`} aria-pressed={selected === item.id} onClick={() => selectRegion(item.id)} onKeyDown={event => activate(event, item.id)}>
            <title>{item.label}: {item.anatomy}</title>
            {shapes.map(shape => <path key={shape.orientation} data-anatomical-view={shape.orientation} className="phenotype-region phenotype-anatomical-highlight" d={shape.highlight} />)}
            <path className="phenotype-anatomical-connector" d={`M${primary.dot[0]} ${primary.dot[1]} L${primary.badge[0] + 25} ${primary.badge[1] + 20}`} />
            <circle className="phenotype-anatomical-dot" cx={primary.dot[0]} cy={primary.dot[1]} r="6" />
            <rect className="phenotype-anatomical-label" x={primary.badge[0]} y={primary.badge[1]} width="50" height="40" rx="5" />
            <text className="phenotype-anatomical-title" x={primary.badge[0] + 25} y={primary.badge[1] + 27} textAnchor="middle">{item.number}</text>
          </g>;
        })}
      </svg>
    </div>
    <div className={`editorial-phenotype-view-caption${view === 'all' ? ' is-all-views' : ''}`} aria-live="polite">
      {view === 'all' ? <><span>Anterior</span><span>Posterior</span><span>Right lateral</span></> : <span>{view === 'lateral' ? 'Right lateral' : activeView.label} view</span>}
    </div>
    <div className="editorial-phenotype-controls region-controls lab-option-controls" role="group" aria-label="Clinical muscle regions">
      {regions.map((item) => <button key={item.id} type="button" className={`phenotype-hit-target${selected === item.id ? ' is-selected' : ''}`} aria-label={`Select ${item.id} region`} aria-pressed={selected === item.id} onClick={() => selectRegion(item.id)}>
        <span className="editorial-phenotype-number" aria-hidden="true">{item.number}</span><span>{item.label}</span>
      </button>)}
    </div>
    <p className="editorial-phenotype-selection" aria-live="polite"><strong>{region.label}:</strong> {region.anatomy}. {region.note} {view === 'posterior' && (selected === 'ocular' || selected === 'bulbar') ? 'This region is not visible from behind; choose the anterior or lateral view to locate it. ' : ''}{view === 'posterior' && selected === 'respiratory' ? 'The posterior outline locates the thorax; superficial back muscles overlie the intercostal compartment. ' : ''}Select a region to read its clinical manifestations and mechanistic limits.</p>
    <p className="editorial-phenotype-heart-note">The anterior thoracic window shows cardiac context. The heart is separate from the five clinical muscle-distribution categories.</p>
  </div>;
}
