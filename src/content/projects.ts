import {siteUrl} from '../lib/hosting';
export const projectSlugs=['cuneiform-reader','gaze-sketchpad','eyespy','data-explorer','poetry-assistant','snooker','terra'] as const;
export type ProjectSlug=typeof projectSlugs[number];
export type ProjectAccent='cobalt'|'petrol'|'green'|'rust';
export type CaseMedia=
 |{kind:'image';src:string;alt:string;caption:string;width:number;height:number}
 |{kind:'video';src:string;poster:string;caption:string;label:string}
 |{kind:'diagram';caption:string};
type ProjectBase={
 slug:ProjectSlug;name:string;category:string;summary:string;distinction:string;stack:readonly string[];
 accent:ProjectAccent;role:'Solo project';repo:string|null;live:string|null;
 problem:string;approach:readonly string[];pipeline:readonly {title:string;detail:string}[];
 decisions:readonly {title:string;body:string}[];validation:readonly string[];limitations:string;attribution:string;
 media:readonly CaseMedia[];
};
const sourceProjects:readonly ProjectBase[]=[
  {
    "slug": "cuneiform-reader",
    "name": "Cuneiform Tablet Reader",
    "category": "Applied machine learning",
    "accent": "cobalt",
    "summary": "A computer vision and language-model pipeline for detecting cuneiform signs and recovering gaps before producing a tentative reading.",
    "distinction": "Detected signs, proposed recoveries and generated interpretation remain distinguishable.",
    "stack": [
      "Python",
      "PyTorch",
      "YOLOv8",
      "Transformers",
      "FastAPI"
    ],
    "repo": null,
    "live": null,
    "problem": "A tablet photograph contains signs in image coordinates, while a language model needs an ordered sequence. Damaged or missing signs make recovery uncertain. I designed the pipeline to carry that distinction through to the final output.",
    "approach": [
      "I designed a vision stage that tiles photographs and locates signs with a fine-tuned YOLOv8s detector. Grouping places detections in reading order and identifies gaps for sequence recovery.",
      "An adapted DistilRoBERTa model supplies language evidence over the sign vocabulary. The pipeline combines detector and language log posteriors using a tunable language weight. Local LLaMA generation then offers a tentative genre-level description."
    ],
    "pipeline": [
      {
        "title": "Detect signs",
        "detail": "Tile photographs · YOLOv8s"
      },
      {
        "title": "Recover sequence",
        "detail": "Reading order · language evidence"
      },
      {
        "title": "Describe cautiously",
        "detail": "Local generation · unresolved signs retained"
      }
    ],
    "decisions": [
      {
        "title": "Order detections before sequence recovery",
        "body": "I separated locating signs from arranging them into lines. The recovery stage receives an ordered sequence rather than an unordered collection of image boxes."
      },
      {
        "title": "Control the weight of language evidence",
        "body": "The fusion rule exposes the contribution of language context. A plausible sequence alone cannot establish which signs appear in the photograph."
      },
      {
        "title": "Leave unsupported positions unresolved",
        "body": "A proposed sign below the documented 0.08 language-posterior threshold remains [x]. The threshold describes an implementation rule, not an accuracy result."
      },
      {
        "title": "Keep the interpretation tentative",
        "body": "I separated the final genre-level description from sign detection and recovery. The generated description does not establish a line-by-line translation."
      }
    ],
    "validation": [
      "The architecture case documents the model choices, pipeline stages, fusion rule and recovery threshold. This portfolio presents an architecture case rather than a reproduced model evaluation.",
      "The labelled diagram contains no reproduced tablet photograph or claimed detection result."
    ],
    "limitations": "Detection and recovered sequences can be wrong. Language context can favour a plausible sign without proving it is correct. The final description is tentative. This portfolio does not run the trained models or reproduce tablet photographs and their derivatives.",
    "attribution": "YOLOv8, PyTorch, Transformers, DistilRoBERTa and LLaMA provide model or tooling foundations. Solo project ownership does not imply authorship of those foundations.",
    "media": [
      {
        "kind": "diagram",
        "caption": "Architecture illustration: observations become an ordered sequence, then a tentative description. An unresolved sign remains unresolved."
      }
    ],
    "role": "Solo project"
  },
  {
    "slug": "gaze-sketchpad",
    "name": "Gaze Sketchpad",
    "category": "Computer vision & input",
    "accent": "petrol",
    "summary": "A drawing application controlled by facial landmarks, with calibration, stroke history and recovery when tracking stops.",
    "distinction": "Calibration and tracking use the same coordinate measurements.",
    "stack": [
      "JavaScript",
      "ml5 FaceMesh",
      "Canvas 2D"
    ],
    "problem": "Small changes in head position, noisy landmarks or a lost camera signal can create unintended strokes. I needed to map facial measurements to a brush while keeping pen state and tracking failures under control.",
    "approach": [
      "I integrated a pretrained ml5 FaceMesh model and measured each iris relative to its eye corners. Calibration and live tracking share those measurements. A dead zone, clipping and exponential smoothing control brush movement.",
      "I used mouth aperture to raise and lower the pen, normalised by eye separation to account for face size. Temporal agreement filters isolated samples. Users can undo strokes, clear the canvas and export a PNG. A pointer demonstration lets them try these tools without a webcam."
    ],
    "pipeline": [
      {
        "title": "Measure",
        "detail": "Iris offsets relative to eye corners"
      },
      {
        "title": "Map & stabilize",
        "detail": "Shared calibration · smoothing · dead zone"
      },
      {
        "title": "Draw safely",
        "detail": "Mouth state · tracking-loss pen lift"
      }
    ],
    "decisions": [
      {
        "title": "Share calibration and tracking calculations",
        "body": "I used the same eye-relative offsets to calibrate the centre and update the brush. Both stages therefore operate in the same coordinate system."
      },
      {
        "title": "Validate pen-state changes",
        "body": "I normalised mouth aperture and required agreement over time before changing pen state. Invalid measurements lift the pen."
      },
      {
        "title": "End strokes on tracking loss",
        "body": "I end the current stroke when tracking fails. After tracking resumes, I start from the new position so the brush does not draw across the missing interval."
      },
      {
        "title": "Separate the drawing demo from camera evaluation",
        "body": "Pointer mode demonstrates drawing tools and history. Camera-session error and jitter measurements describe that session; they do not establish accuracy across people."
      }
    ],
    "validation": [
      "Existing Edge checks cover pointer drawing, undo, PNG export, camera denial and model failure. Synthetic fixtures cover invalid coordinates, collapsed eye geometry, calibration consistency, pen-state handling and gaps in tracking.",
      "A browser-generated synthetic camera confirmed model loading and integration. Human gaze accuracy has not been measured."
    ],
    "limitations": "One-point calibration assumes a stable head position and camera distance. Lighting and camera quality affect the measurements. Camera mode needs a connection for model downloads. This project has no clinical or assistive-device validation.",
    "attribution": "ml5 and its pretrained FaceMesh dependency supply landmarks; the project implements mapping and drawing interaction around them. The separate image-processing mode uses p5.js. Dependency notices remain preserved.",
    "media": [
      {
        "kind": "image",
        "src": siteUrl("/projects/gaze-sketchpad/studio.webp"),
        "width": 1440,
        "height": 1000,
        "alt": "Actual Gaze Sketchpad interface with a drawn line in pointer demonstration mode and tracking controls beside the canvas.",
        "caption": "Actual application, pointer demonstration. These are the drawing tools and history; this capture does not demonstrate camera-based gaze accuracy."
      }
    ],
    "role": "Solo project",
    "repo": "https://github.com/Bharath-Raj-Official/gaze-sketchpad",
    "live": "https://bharath-raj-official.github.io/gaze-sketchpad/"
  },
  {
    "slug": "eyespy",
    "name": "EyeSpy",
    "category": "Mobile & reliable systems",
    "accent": "green",
    "summary": "A mobile nature journal designed to record sightings offline and share less precise locations when it synchronises.",
    "distinction": "Local recording and network synchronisation have separate responsibilities.",
    "stack": [
      "React Native",
      "Expo",
      "SQLite",
      "Firestore"
    ],
    "repo": null,
    "live": null,
    "problem": "People can record wildlife sightings without a dependable connection. An upload requirement would prevent them from saving at that moment. Exact shared coordinates can reveal sensitive locations.",
    "approach": [
      "I designed the recording path around SQLite storage and a queue of operations to synchronise. The application saves the sighting and queued operation before attempting network work.",
      "I kept photographs on the recording device and applied a deterministic location grid before sharing coordinates. Nearby historical GBIF records provide species suggestions; users can leave a sighting unidentified."
    ],
    "pipeline": [
      {
        "title": "Save locally",
        "detail": "Sighting + queued operation · SQLite"
      },
      {
        "title": "Apply privacy",
        "detail": "Deterministic 10 km location grid"
      },
      {
        "title": "Synchronize",
        "detail": "Single-flight loop · bounded retries"
      }
    ],
    "decisions": [
      {
        "title": "Save the sighting before uploading",
        "body": "The local record and queued operation are created before synchronisation begins. The recording screen can save a sighting without waiting for a remote service."
      },
      {
        "title": "Use one synchronisation loop",
        "body": "A single-flight loop prevents competing runs. Failed operations retry with exponential timing, starting at 15 seconds and capped at five minutes. These are retry settings, not guaranteed upload times."
      },
      {
        "title": "Apply consistent location privacy",
        "body": "Coordinates snap to a 10 km grid. Longitude cells use the snapped latitude. A stricter privacy setting applies to earlier shared records."
      },
      {
        "title": "Keep an unidentified option",
        "body": "Nearby species records suggest candidates without identifying an animal from its photograph. Users can save a sighting without selecting a species."
      }
    ],
    "validation": [
      "The existing architecture records cover local storage, the queue, retry policy and retroactive location privacy. This case explains those decisions through a labelled diagram.",
      "This portfolio has not run the mobile application or measured device and cloud reliability."
    ],
    "limitations": "Remote map scripts and tiles need a connection. Historical GBIF records support location-based suggestions, not photographic identification. Photos remain on the recording device, and queued retries depend on the remote service becoming available.",
    "attribution": "React Native and Expo provide the mobile foundation; SQLite and Firestore support storage. GBIF supplies occurrence records. No unverified source or live-app destination is added.",
    "media": [
      {
        "kind": "diagram",
        "caption": "Architecture illustration: recording, privacy, and network work have separate responsibilities. A queued sighting can wait for connectivity."
      }
    ],
    "role": "Solo project"
  },
  {
    "slug": "data-explorer",
    "name": "Data Explorer",
    "category": "Data & accessible software",
    "accent": "cobalt",
    "summary": "A historical-data explorer with eight chart groups, filters, source notes and tables for inspecting the underlying values.",
    "distinction": "Charts, source notes and accessible tables share the same selected data.",
    "stack": [
      "JavaScript",
      "SVG",
      "CSV"
    ],
    "problem": "Historical CSV extracts contain inconsistent labels and incomplete methodology. I needed to let readers inspect the data behind a chart and understand the limits of each source.",
    "approach": [
      "I connected a local CSV parser to dataset selection, cached rows, filters, SVG charts and text tables. The collection covers historical topics including temperature, pay, workforce diversity and baby names.",
      "Chart controls update the current view without discarding application state. Responsive SVG viewBoxes handle resizing. Tables expose the values and their 500-row display cap. Loading, empty-range and failure states explain missing chart data."
    ],
    "pipeline": [
      {
        "title": "Parse",
        "detail": "Quoted fields · local CSVs"
      },
      {
        "title": "Encode",
        "detail": "Filters · cached rows · responsive SVG"
      },
      {
        "title": "Explain",
        "detail": "Units · source notes · HTML tables"
      }
    ],
    "decisions": [
      {
        "title": "Handle quoted CSV fields and stale requests",
        "body": "The parser accepts commas and newlines within quoted fields. I cached parsed rows and added request guards so an older response cannot replace the latest chart selection."
      },
      {
        "title": "Choose scales that reflect the values",
        "body": "Bars start at zero. Superhero axes share a 0 to 100 scale, and baby-name bubble area is proportional to count."
      },
      {
        "title": "Explain gaps in source methodology",
        "body": "I retained caveats about inconsistent BMI and obesity labels and the temperature CSV's unspecified baseline. The interface does not invent missing methodology."
      }
    ],
    "validation": [
      "Existing Edge records cover all eight charts and phone layouts. Quoted-field fixtures check CSV parsing. The original source datasets remain preserved.",
      "Application captures show the temperature chart and its table so readers can inspect the relationship between chart marks and values."
    ],
    "limitations": "The application uses historical extracts rather than a live data service. The source workbooks leave some methodology and observation dates unspecified. Binary workforce categories come from the supplied data and do not represent every gender identity.",
    "attribution": "Dataset provenance is displayed per chart. Original p5 implementations and notices remain. The US map carries its Simplemaps licensing notice.",
    "media": [
      {
        "kind": "image",
        "src": siteUrl("/projects/data-explorer/chart.webp"),
        "width": 1440,
        "height": 1000,
        "alt": "Actual Data Explorer temperature chart with source notes and access to the underlying data table.",
        "caption": "Actual application: units and the missing source baseline are explained alongside the temperature series."
      },
      {
        "kind": "video",
        "src": siteUrl("/projects/data-explorer/chart-table.webm"),
        "poster": siteUrl("/projects/data-explorer/table.webp"),
        "label": "Data Explorer chart and accessible table recording",
        "caption": "Silent recording: the chart and its underlying values are two views of the same historical extract."
      }
    ],
    "role": "Solo project",
    "repo": "https://github.com/Bharath-Raj-Official/data-explorer",
    "live": "https://bharath-raj-official.github.io/data-explorer/"
  },
  {
    "slug": "poetry-assistant",
    "name": "Poetry Assistant",
    "category": "Language & application state",
    "accent": "rust",
    "summary": "A writing notebook that finds rhymes through a pronunciation dictionary and previews word changes before applying them.",
    "distinction": "Pronunciation-based search and replacement previews keep the writer in control.",
    "stack": [
      "JavaScript",
      "CMUdict",
      "HTML / CSS"
    ],
    "problem": "Similar spelling can produce a poor rhyme match. Suggested edits can overwrite a poem that the writer has changed. I needed phonetic matching and an editing flow that protects the current text.",
    "approach": [
      "I parsed the local CMU pronunciation dictionary, including alternate pronunciations. Matching starts at the final stressed vowel and removes numeric stress markers. Syllable filters narrow the results.",
      "I added a replacement preview with Apply and Cancel actions. A proposal stays valid only while the original poem remains unchanged. I render writing as text so HTML-like input remains part of the poem."
    ],
    "pipeline": [
      {
        "title": "Read pronunciation",
        "detail": "Local CMUdict · alternate forms"
      },
      {
        "title": "Match sounds",
        "detail": "Final stressed vowel · syllable filter"
      },
      {
        "title": "Preview & apply",
        "detail": "Explicit approval · unchanged-text check"
      }
    ],
    "decisions": [
      {
        "title": "Match pronunciation rather than spelling",
        "body": "The dictionary distinguishes rhyming words such as light and night from misleading spelling pairs such as cough and though. Unknown words receive a clear response."
      },
      {
        "title": "Invalidate proposals after an edit",
        "body": "Changing the poem cancels an outdated replacement. The writer must review a new proposal against the current text."
      },
      {
        "title": "Keep text handling local",
        "body": "I used textContent and form values for writing and previews. The application uses a pronunciation dictionary; it does not generate poems or send writing to an AI service."
      }
    ],
    "validation": [
      "Existing fixtures cover phonetic matches, misleading spelling pairs, syllable filters and unknown words. Edge records cover preview/apply behaviour and HTML-like text rendering."
    ],
    "limitations": "Dictionary coverage and dialect affect matching. Suggestions are not ranked for meaning, meter or poetic quality. The interface shows at most 250 results. Writing remains in the current tab and is lost on refresh.",
    "attribution": "Pronunciations come from CMUdict, with the complete license preserved. The project implements matching and notebook interaction around that data.",
    "media": [
      {
        "kind": "image",
        "src": siteUrl("/projects/poetry-assistant/notebook.webp"),
        "width": 1440,
        "height": 1000,
        "alt": "Actual Poetry Assistant populated with its built-in sample poem, pronunciation matches, and replacement preview.",
        "caption": "Actual application with its built-in sample poem. Suggestions are pronunciation matches; the writer decides what to apply."
      },
      {
        "kind": "video",
        "src": siteUrl("/projects/poetry-assistant/preview-apply.webm"),
        "poster": siteUrl("/projects/poetry-assistant/notebook.webp"),
        "label": "Poetry Assistant replacement preview and apply recording",
        "caption": "Silent recording: select a suggestion, inspect the proposed change, and apply it explicitly."
      }
    ],
    "role": "Solo project",
    "repo": "https://github.com/Bharath-Raj-Official/poetry-assistant",
    "live": "https://bharath-raj-official.github.io/poetry-assistant/"
  },
  {
    "slug": "snooker",
    "name": "Snooker",
    "category": "Algorithms & state management",
    "accent": "petrol",
    "summary": "A browser snooker game with a geometric computer opponent, match-state controls and protection against outdated computer actions.",
    "distinction": "Match state stays separate from delayed opponent actions and display scaling.",
    "stack": [
      "JavaScript",
      "p5.js",
      "Matter.js"
    ],
    "problem": "A playable match needs clear turns, eligible targets and shot controls. Restarting adds another constraint: an old computer-action timer must not take a shot in the new match.",
    "approach": [
      "I connected match state and p5 rendering to HTML controls for scores, targets, power, pause and restart. Matter.js handles motion and collisions. The computer evaluates eligible objects and pockets with geometric heuristics.",
      "I kept world coordinates stable while CSS scales the table. Pointer aiming and pullback work alongside keyboard aiming and a Shoot button. Practice tools and alternate layouts remain separate from normal match flow."
    ],
    "pipeline": [
      {
        "title": "Choose a shot",
        "detail": "Eligible target · pointer or keyboard"
      },
      {
        "title": "Resolve motion",
        "detail": "Matter.js collisions · pot events"
      },
      {
        "title": "Advance match",
        "detail": "Score · target sequence · guarded CPU turn"
      }
    ],
    "decisions": [
      {
        "title": "Cancel outdated computer actions",
        "body": "Generation checks reject callbacks from an earlier match. Restarting prevents an old thinking timer from changing the new game."
      },
      {
        "title": "Separate game coordinates from display size",
        "body": "CSS scales the table without rebuilding world coordinates. Pause and resize preserve ball positions and turn state."
      },
      {
        "title": "Document the supported rules",
        "body": "The game includes pot values, red/colour alternation, final colours and simplified penalties. The case identifies tournament rules beyond that coverage."
      }
    ],
    "validation": [
      "Existing Edge checks cover shots, paused resizing, reset, foul awards, final-black endgame, eligible computer targets and cancellation of stale callbacks."
    ],
    "limitations": "The game does not implement complete first-contact adjudication, tournament miss/free-ball rules or reliable maximum-per-shot aggregation for simultaneous fouls. The opponent uses heuristics. Physics and tie handling are approximations.",
    "attribution": "p5.js and Matter.js supply rendering and physics foundations. Their licenses and notices remain with the project.",
    "media": [
      {
        "kind": "image",
        "src": siteUrl("/projects/snooker/table.webp"),
        "width": 1440,
        "height": 1233,
        "alt": "Actual Snooker application with the physics table, scores, target status, power, and match controls.",
        "caption": "Actual application: the HTML interface exposes match state around the physics table."
      }
    ],
    "role": "Solo project",
    "repo": "https://github.com/Bharath-Raj-Official/snooker",
    "live": "https://bharath-raj-official.github.io/snooker/"
  },
  {
    "slug": "terra",
    "name": "Terra",
    "category": "Lifecycle & input systems",
    "accent": "rust",
    "summary": "A single-level browser game with keyboard and touch controls, simulation pause and a shared path for resetting the world.",
    "distinction": "A restart clears the old world before rebuilding its objects and state.",
    "stack": [
      "JavaScript",
      "p5.js",
      "p5.play"
    ],
    "problem": "A restart can leave behind hazards, flags or paused sprites. I needed one reset path that rebuilds a consistent level after completion or failure.",
    "approach": [
      "I coordinated sprites, collisions, collectibles and hazards with loading, pause, game-over and completion overlays. Keyboard and touch controls request the same actions.",
      "I used a shared restart to clear sprites and arrays before rebuilding the world and flags. Pause stops sprite updates as well as drawing. The display scales around a 1024 by 576 world, preserving the supplied 50 by 50 player footprint and rectangular collider."
    ],
    "pipeline": [
      {
        "title": "Initialize",
        "detail": "World · sprites · level flags"
      },
      {
        "title": "Run or pause",
        "detail": "Inputs · simulation · HUD agreement"
      },
      {
        "title": "End & rebuild",
        "detail": "Clear entities · reconstruct a consistent level"
      }
    ],
    "decisions": [
      {
        "title": "Rebuild through one reset path",
        "body": "The reset clears collectibles, hazards, hearts, gates and flags before constructing a new level. This prevents entities from a previous run remaining in the new game."
      },
      {
        "title": "Pause the simulation",
        "body": "I stop sprite updates while paused so the world cannot continue changing behind a frozen screen."
      },
      {
        "title": "Handle input and audio readiness",
        "body": "Touch controls mirror keyboard actions. Audio starts after user interaction, and playback skips sound buffers that are not ready. Source comments identify repairs to the supplied older p5.play fork."
      }
    ],
    "validation": [
      "Existing records cover launch, frozen sprites during pause, game-over/completion, restart, mute, phone layout, resizing, late bitmap replacement and device pixel ratios 1 and 2."
    ],
    "limitations": "The project contains one level with desktop-first movement. Automated completion states do not establish a full human playthrough. Listening and touch ergonomics still need device review. Some inherited asset terms remain unresolved, so the case uses an original lifecycle diagram.",
    "attribution": "p5.js and the supplied Code.org p5.play fork retain their notices. This original diagram reproduces no inherited artwork.",
    "media": [
      {
        "kind": "diagram",
        "caption": "Lifecycle illustration: pause preserves the world; restart clears and reconstructs it. No inherited game artwork is reproduced."
      }
    ],
    "role": "Solo project",
    "repo": "https://github.com/Bharath-Raj-Official/terra",
    "live": "https://bharath-raj-official.github.io/terra/"
  }
];
export type ProjectCuration={featured:boolean;group:'vision'|'software'|'data';focus:string;contribution:string;boundary:string;evidenceLabel:string;order:number};
export type Project=ProjectBase & ProjectCuration;
const curation={
  "gaze-sketchpad": {
    "featured": true,
    "group": "vision",
    "focus": "FaceMesh integration & input handling",
    "contribution": "Built calibration, brush control and tracking-loss recovery around a pretrained FaceMesh model.",
    "boundary": "Human gaze accuracy has not been measured.",
    "evidenceLabel": "Demo & source links",
    "order": 0
  },
  "eyespy": {
    "featured": true,
    "group": "software",
    "focus": "SQLite storage & queued synchronisation",
    "contribution": "Designed local SQLite recording, queued synchronisation and location privacy for a mobile sighting journal.",
    "boundary": "Architecture case; device execution and cloud reliability have not been evaluated here.",
    "evidenceLabel": "Architecture case",
    "order": 1
  },
  "cuneiform-reader": {
    "featured": true,
    "group": "vision",
    "focus": "Computer vision & ML pipelines",
    "contribution": "Designed a sign-detection and sequence-recovery pipeline with a tentative final interpretation.",
    "boundary": "Architecture case; this portfolio does not reproduce a model evaluation.",
    "evidenceLabel": "Architecture case",
    "order": 2
  },
  "data-explorer": {
    "featured": false,
    "group": "data",
    "focus": "CSV parsing & request handling",
    "contribution": "Connected historical CSV data to charts and tables, with quoted-field parsing and guards against stale responses.",
    "boundary": "Uses historical extracts with documented source limitations.",
    "evidenceLabel": "Demo & source links",
    "order": 3
  },
  "poetry-assistant": {
    "featured": false,
    "group": "data",
    "focus": "Phonetic matching & safe editing",
    "contribution": "Implemented dictionary-based rhyme matching, syllable filters and replacement previews.",
    "boundary": "Pronunciation-dictionary matching; writing is lost when the tab refreshes.",
    "evidenceLabel": "Demo & source links",
    "order": 4
  },
  "snooker": {
    "featured": false,
    "group": "software",
    "focus": "Match state & callback cancellation",
    "contribution": "Coordinated match state and geometric opponent actions, with cancellation of outdated callbacks.",
    "boundary": "Heuristic opponent and simplified tournament rules.",
    "evidenceLabel": "Demo & source links",
    "order": 5
  },
  "terra": {
    "featured": false,
    "group": "software",
    "focus": "Input, simulation & reset logic",
    "contribution": "Coordinated keyboard/touch input, simulation pause and a shared world-reset path.",
    "boundary": "Single-level game; the case describes lifecycle decisions and existing checks.",
    "evidenceLabel": "Demo & source links",
    "order": 6
  }
} as const satisfies Record<ProjectSlug,ProjectCuration>;
export const projects:readonly Project[]=sourceProjects.map(p=>({...p,...curation[p.slug]}));
export const featuredProjects=[...projects].filter(p=>p.featured).sort((a,b)=>a.order-b.order);

