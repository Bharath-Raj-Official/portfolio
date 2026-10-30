/** Facts and copy shared by the portfolio pages and résumé. */
export const profile={
 name:'Bharath',fullName:'Bharath Raj Rajamohan',title:'How I build software.',
 introduction:'I’m a computer science graduate focused on software engineering, computer vision and applied AI.',
 homeIntroduction:'I’m a computer science graduate with internship experience in debugging and testing. My projects focus on computer vision and applied AI.',
 resumeProfile:'Computer science graduate with internship experience in application maintenance, debugging and testing. Project work includes facial-landmark input, offline-first application design and computer vision pipelines.',
 about:'During my TechVerse internship, I helped maintain an employee management portal and built the company website as a solo developer. My projects let me work on input handling, data processing and the decisions around using machine-learning models.',
 location:'',availability:'21 December 2026',availabilityISO:'2026-12-21',roles:'Software engineering, computer vision, data handling and testing',
 email:'official.bharathraj@gmail.com' as string|null,linkedin:'https://www.linkedin.com/in/bharath-raj-920900444' as string|null,resume:null as string|null,github:'https://github.com/Bharath-Raj-Official',
 experience:[{role:'Full Stack Developer Intern',organization:'TechVerse Consulting Pte. Ltd.',dates:'6 Apr – 18 Sep 2026',description:'Helped maintain an employee management portal through debugging, stress testing and unit testing. Built the company website as a solo developer and handed it over at the end of the internship.',bullets:['Helped maintain an employee management portal through debugging, stress testing and unit testing.','Built the complete company website as a solo developer and handed it over at the end of the internship.']}],
 education:[{qualification:'BSc (Honours) Computer Science',institution:'University of London / SIM Global Education',dates:'Oct 2023 – Sep 2026',details:'Specialisation in Machine Learning and Artificial Intelligence. Awarded by the University of London, with study at SIM.'}],
 educationProjects:'My project work applies computer science to facial-landmark input, offline-first application design and machine-learning pipelines.',
 nextRole:'I’m seeking a software engineering role where I can develop my experience in computer vision and applied AI.',
 dataInterest:'I’m also interested in data engineering and want to build on my work with parsing, storage and synchronisation.',
 capabilities:[
  {name:'Software engineering',lines:['Software','engineering'],body:'At TechVerse, I helped maintain an employee management portal through debugging and testing. I built the complete company website as a solo developer and handed it over at the end of my internship.',tags:['Application maintenance','Debugging','Testing']},
  {name:'Data handling',lines:['Data handling','& processing'],body:'In Data Explorer, I handled quoted CSV fields and guarded chart updates against outdated requests. In Poetry Assistant, I used a pronunciation dictionary to match rhymes and preview word replacements.',tags:['CSV parsing','Request handling','Phonetic matching']},
  {name:'Reliability',lines:['Testing','& recovery'],body:'I plan for interrupted input and state changes. In Gaze Sketchpad, I lift the pen when tracking stops. EyeSpy saves a sighting before attempting synchronisation, and Terra clears the old world before restarting.',tags:['Tracking recovery','Local storage','Reset logic']},
  {name:'Vision & applied ML',lines:['Computer vision','& applied ML'],body:'I integrated a pretrained FaceMesh model into Gaze Sketchpad. For Cuneiform Tablet Reader, I designed a pipeline that separates sign detection, sequence recovery and tentative interpretation. My degree specialises in Machine Learning and Artificial Intelligence.',tags:['Model integration','Computer vision','ML pipelines']}
 ],
 workChapters:[
  {title:'Use consistent inputs.',tag:'INPUTS AND STATE',body:'In Gaze Sketchpad, I use the same eye-relative measurements for calibration and brush tracking. In EyeSpy, I save the sighting and its queued operation before starting network work.',tags:['CALIBRATION','STATE','LOCAL STORAGE']},
  {title:'Explain model suggestions.',tag:'MODEL OUTPUTS',body:'In Cuneiform Tablet Reader, I keep detected signs separate from proposed recoveries and leave unsupported positions unresolved. In Poetry Assistant, I preview a suggested replacement so the writer can decide whether to apply it.',tags:['DETECTION','RECOVERY','REVIEW']},
  {title:'Test interrupted behaviour.',tag:'CHECKS AND RECOVERY',body:'I end a stroke when Gaze Sketchpad loses tracking. I prevent an old Data Explorer response from replacing a newer selection. In Terra, I use one reset path to clear and reconstruct the game world.',tags:['TRACKING LOSS','STALE REQUESTS','RESTART']}
 ]
};
export {projects,featuredProjects} from './projects';
export type {Project,ProjectSlug} from './projects';
