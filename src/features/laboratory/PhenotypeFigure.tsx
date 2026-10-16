import { useId, useState, type KeyboardEvent } from 'react';
import { medicalArtwork, medicalArtworkUrl } from '../../data/medicalArtwork';
import { PhenotypeMuscleDetail } from './PhenotypeMuscleDetail';
import './editorial-phenotype.css';

export type PhenotypeRegion = 'ocular' | 'bulbar' | 'cervical' | 'proximal' | 'respiratory';
type AnatomicalView = 'all' | 'anterior' | 'posterior' | 'lateral';
type IndividualView = Exclude<AnatomicalView, 'all'>;

interface PhenotypeFigureProps {
  selected: PhenotypeRegion;
  onSelect: (id: PhenotypeRegion) => void;
}

const regions: { id: PhenotypeRegion; number: string; label: string; anatomy: string; note: string }[] = [
  { id: 'ocular', number: '01', label: 'Ocular', anatomy: 'Extraocular muscles and eyelid', note: 'The eye and eyelid outlines are surface landmarks. The detail below highlights the deeper extraocular muscles and eyelid levator.' },
  { id: 'bulbar', number: '02', label: 'Bulbar', anatomy: 'Tongue and pharyngeal musculature', note: 'The mouth and upper-neck outlines are surface landmarks. The detail below highlights the deeper tongue and pharyngeal muscles; the superficial facial muscles are not the bulbar muscle group.' },
  { id: 'cervical', number: '03', label: 'Cervical', anatomy: 'Anterior and posterior neck muscles', note: 'The visible neck muscles retain their color while the remaining anatomy fades. The detail below includes deeper cervical muscles that are not exposed in the full-body plate.' },
  { id: 'proximal', number: '04', label: 'Proximal', anatomy: 'Shoulder, upper arm, hip, gluteal and thigh muscles', note: 'The exposed proximal muscle groups retain their color in the anterior, posterior and lateral views. These teaching highlights do not map observed injury in an individual patient.' },
  { id: 'respiratory', number: '05', label: 'Respiratory', anatomy: 'Intercostal muscles and diaphragm', note: 'The thoracic outlines locate the respiratory muscle compartment. Superficial back muscles overlie the posterior intercostal region and remain subdued. The detail below highlights the intercostal muscles and the deep diaphragm; the heart is not included in this muscle group.' },
];

const views: { id: AnatomicalView; label: string; box: string }[] = [
  { id: 'all', label: 'All views', box: '0 0 1312 1199' },
  { id: 'anterior', label: 'Anterior', box: '0 0 515 1199' },
  { id: 'posterior', label: 'Posterior', box: '515 0 490 1199' },
  { id: 'lateral', label: 'Lateral', box: '1014 0 298 1199' },
];

type RegionGeometry = { highlight: string; dot: [number, number]; badge: [number, number] };
// Coordinates refer to the exact, unmodified 1,312 × 1,199 reference plate.
// Deep ocular, bulbar and respiratory structures have separate muscle details;
// their full-body outlines are regional landmarks, not substitute anatomy.
const geometry: Record<IndividualView, Partial<Record<PhenotypeRegion, RegionGeometry>>> = {
  anterior: {
    ocular: { highlight: 'M214 80 a19 12 0 1 0 38 0 a19 12 0 1 0 -38 0 M260 80 a19 12 0 1 0 38 0 a19 12 0 1 0 -38 0', dot: [233, 80], badge: [132, 51] },
    bulbar: { highlight: 'M230 113 Q255 105 280 113 L286 142 L273 167 L241 167 L222 144Z', dot: [272, 135], badge: [327, 109] },
    cervical: { highlight: 'M216 143 L230 154 Q232 178 247 207 L228 198 Q218 178 210 155Z M291 143 L278 154 Q276 179 262 207 L281 198 Q294 175 299 155Z', dot: [223, 180], badge: [121, 150] },
    proximal: { highlight: 'M154 214 Q114 217 99 249 L89 300 L112 322 Q147 294 166 247Z M354 215 Q395 217 408 252 L418 300 L396 321 Q362 293 342 248Z M95 310 Q107 320 128 315 L137 359 L125 412 L106 428 L85 405 L86 357Z M383 315 Q402 324 416 312 L426 363 L424 405 L404 430 L385 413 L375 358Z M164 504 L204 521 L193 576 L213 625 L185 650 L161 600 L153 553Z M343 505 L303 522 L315 577 L294 626 L324 652 L349 601 L358 551Z M173 604 Q201 609 224 641 L222 708 L205 780 L180 798 L153 777 L151 705Z M332 605 Q305 610 284 642 L285 709 L300 781 L325 799 L350 778 L355 706Z', dot: [120, 269], badge: [17, 240] },
    respiratory: { highlight: 'M189 236 Q168 263 169 301 Q174 334 199 358 L222 373 L230 354 Q202 336 197 307 L206 248Z M332 238 Q350 262 347 301 Q344 334 332 357 L324 370 L322 356 Q332 331 333 308 L333 283 L326 253Z', dot: [340, 306], badge: [437, 286] },
  },
  posterior: {
    cervical: { highlight: 'M700 138 Q712 145 724 165 L730 199 L685 222 L670 213 L698 184Z M773 138 Q762 146 750 166 L744 199 L788 222 L805 213 L777 184Z', dot: [760, 178], badge: [831, 146] },
    proximal: { highlight: 'M643 215 Q603 216 587 251 L578 295 L600 316 Q636 295 654 253Z M828 215 Q870 219 884 253 L893 296 L871 315 Q839 295 817 253Z M582 308 L603 313 L617 353 L604 415 L585 435 L566 413 L567 358Z M869 313 L891 309 L904 361 L903 414 L884 436 L864 416 L854 354Z M670 500 Q698 497 729 533 L729 591 Q714 627 673 640 L644 627 L640 582Z M801 500 Q775 498 744 533 L744 591 Q760 627 801 640 L831 627 L833 581Z M651 630 Q685 647 723 614 L724 703 L708 782 L686 803 L658 782 L639 704Z M819 630 Q787 649 748 615 L747 704 L764 783 L787 803 L814 781 L832 704Z', dot: [607, 267], badge: [520, 238] },
    respiratory: { highlight: 'M640 286 Q658 309 674 341 L679 390 L665 414 L646 390 L630 335Z M833 286 Q815 308 799 341 L794 389 L809 413 L828 389 L844 336Z', dot: [824, 352], badge: [928, 329] },
  },
  lateral: {
    ocular: { highlight: 'M1194 79 a15 12 0 1 0 30 0 a15 12 0 1 0 -30 0', dot: [1210, 79], badge: [1251, 47] },
    bulbar: { highlight: 'M1184 110 L1224 113 L1211 137 L1193 161 L1178 145Z', dot: [1204, 132], badge: [1250, 116] },
    cervical: { highlight: 'M1120 137 L1140 145 Q1138 170 1165 199 L1143 210 Q1123 180 1111 154Z M1186 151 L1203 164 L1194 203 L1176 193Z', dot: [1134, 176], badge: [1022, 147] },
    proximal: { highlight: 'M1111 207 Q1079 213 1072 245 L1074 292 L1095 319 Q1128 306 1141 272 L1139 232Z M1081 316 Q1104 327 1123 309 L1138 360 L1137 413 L1122 443 L1096 424 L1080 370Z M1094 514 L1125 538 L1134 580 L1126 620 L1096 643 L1063 622 L1055 572 L1067 540Z M1134 607 L1170 622 L1207 646 L1215 707 L1191 777 L1167 812 L1145 792 L1134 736 L1139 675 L1121 642Z', dot: [1095, 265], badge: [1020, 235] },
    respiratory: { highlight: 'M1149 241 Q1186 259 1204 293 L1217 345 L1207 397 L1187 419 L1175 395 Q1187 358 1178 328 L1146 285Z', dot: [1202, 333], badge: [1250, 312] },
  },
};

/** Three-view regional atlas; clinical distribution never defines a diagnosis. */
export function PhenotypeFigure({ selected, onSelect }: PhenotypeFigureProps) {
  const id = useId();
  const [view, setView] = useState<AnatomicalView>(() => typeof window !== 'undefined' && window.matchMedia('(max-width: 540px)').matches ? 'anterior' : 'all');
  const region = regions.find((item) => item.id === selected)!;
  const activeView = views.find((item) => item.id === view)!;
  const visibleViews: IndividualView[] = view === 'all' ? ['anterior', 'posterior', 'lateral'] : [view];
  const selectedShapes = visibleViews.flatMap(orientation => {
    // The posterior plate exposes back muscles over the ribs. Keep them subdued
    // rather than restoring them as a substitute for deeper intercostal anatomy.
    if (selected === 'respiratory' && orientation === 'posterior') return [];
    const shape = geometry[orientation][selected];
    return shape ? [{ ...shape, orientation }] : [];
  });
  const clipId = `${id}-selected-muscles`;
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
      <svg className="phenotype-anatomical-overlay" viewBox={activeView.box} role="group" aria-label="Select anatomical regions" data-selected-muscles={selected}>
        <title>{activeView.label}: regional skeletal-muscle anatomy</title>
        <desc>The supplied anatomical reference is shown without changes, with anterior, posterior and right lateral views. The selected muscle region retains its original color while surrounding anatomy is slightly transparent. Eye, mouth and thoracic outlines locate surface landmarks; the detail below shows the corresponding deeper muscles.</desc>
        <defs>
          <clipPath id={clipId} clipPathUnits="userSpaceOnUse" data-muscle-clip={selected}>
            {selectedShapes.map(shape => <path key={shape.orientation} data-anatomical-view={shape.orientation} d={shape.highlight} />)}
          </clipPath>
        </defs>
        <image className="phenotype-context-art" href={medicalArtworkUrl('clinical-distribution')} width="1312" height="1199" data-medical-artwork="clinical-distribution" role="img" aria-label={medicalArtwork['clinical-distribution'].alt} />
        <image className="phenotype-focused-art" href={medicalArtworkUrl('clinical-distribution')} width="1312" height="1199" clipPath={`url(#${clipId})`} aria-hidden="true" />
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
    <PhenotypeMuscleDetail selected={selected} />
    <p className="editorial-phenotype-heart-note">The anterior thoracic window shows cardiac context. The heart is separate from the five clinical muscle-distribution categories.</p>
  </div>;
}
