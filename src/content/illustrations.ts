import type { ProjectSlug } from './projects';

/** Explanations drawn only from the existing approved project narratives. */
export const illustrationNotes: Record<ProjectSlug, readonly [string, string, string]> = {
  'cuneiform-reader': [
    'Detection locates signs in image tiles. Grouping then puts those observations into reading order.',
    'Detector and language evidence contribute separately. A position below the documented recovery floor stays unresolved as [x].',
    'Generation supplies a tentative genre-level description. It does not establish a translation.',
  ],
  'gaze-sketchpad': [
    'Iris offsets are measured relative to the eye corners. Calibration and tracking use the same calculation.',
    'Sensitivity, clipping, a dead zone and exponential smoothing stabilize the mapped position.',
    'Mouth state controls the pen. Losing tracking ends the stroke; reacquisition cannot bridge the missing interval.',
  ],
  eyespy: [
    'The sighting and its queued operation are saved locally before any network work begins.',
    'A deterministic 10 km grid reduces location precision before sharing. Photos stay on the recording device.',
    'One synchronization loop processes queued work with bounded retries. Queueing cannot guarantee remote success.',
  ],
  'data-explorer': [
    'The parser handles quoted CSV fields and keeps cached rows available for later selections.',
    'Filters and responsive SVG connect the selected values to the chart. Stale requests cannot replace a newer selection.',
    'Units, source caveats and accessible tables keep the picture connected to its underlying values.',
  ],
  'poetry-assistant': [
    'The local CMU dictionary includes alternate pronunciations. Coverage and dialect remain limitations.',
    'Matching starts at the final stressed vowel, with syllable filters narrowing the suggestions.',
    'The writer previews a replacement before applying it. Editing the poem invalidates an older proposal.',
  ],
  snooker: [
    'Pointer or keyboard aiming becomes a shot at an eligible target. The computer uses geometric heuristics.',
    'Matter.js resolves motion and collisions in stable world coordinates, separate from CSS display scaling.',
    'Scores and target sequence advance together. Generation checks discard delayed callbacks from an earlier match.',
  ],
  terra: [
    'Initialization builds the world, sprites and level flags around a fixed presentation-independent world size.',
    'Keyboard and touch request the same actions. Pause stops simulation updates as well as drawing.',
    'One restart path clears entities and arrays, then reconstructs the level and its flags together.',
  ],
};

export type ImageNote = { label: string; text: string; box: readonly [number, number, number, number] };
/** Percentages refer to the unmodified, supplied portfolio captures. */
export const imageNotes: Partial<Record<ProjectSlug, readonly ImageNote[]>> = {
  'gaze-sketchpad': [
    { label: 'Drawing surface', text: 'This line was made in pointer demonstration mode. It shows canvas interaction, not gaze accuracy.', box: [3, 39, 64, 55] },
    { label: 'Tracking controls', text: 'The session controls explain calibration, tracking and the pen state around the drawing surface.', box: [68, 34, 29, 60] },
  ],
  'data-explorer': [
    { label: 'Chart & units', text: 'The temperature-anomaly series identifies its units. It is a historical extract, not a live data feed.', box: [24, 33, 72, 55] },
    { label: 'Source caveat', text: 'The note below the chart states that the supplied processed CSV does not identify its baseline. The recording further down opens the underlying table.', box: [24, 94, 72, 6] },
  ],
  'poetry-assistant': [
    { label: 'Your writing', text: 'The notebook keeps the poem visible beside suggestions. The capture uses the application\'s built-in sample.', box: [9, 32, 56, 59] },
    { label: 'Sound matches', text: 'Suggestions use dictionary pronunciations and a syllable filter, rather than spelling alone.', box: [67, 34, 25, 65] },
    { label: 'Replacement preview', text: 'The preview begins below the notebook. The accompanying recording shows approval before the replacement is applied.', box: [9, 92, 56, 8] },
  ],
  snooker: [
    { label: 'Table & controls', text: 'The actual application presents the physics table alongside match controls. The diagram below separates the shot, motion and match-state responsibilities.', box: [3, 12, 94, 75] },
  ],
};
