const languageButtons = document.querySelectorAll('[data-language]');
const translatableElements = document.querySelectorAll('[data-en][data-nl]');
const accessibleElements = document.querySelectorAll('[data-en-aria][data-nl-aria]');
let currentLanguage = localStorage.getItem('portfolio-language') || 'en';

function setLanguage(language) {
  const selectedLanguage = language === 'nl' ? 'nl' : 'en';
  currentLanguage = selectedLanguage;

  translatableElements.forEach((element) => {
    element.innerHTML = element.dataset[selectedLanguage];
  });

  accessibleElements.forEach((element) => {
    element.setAttribute('aria-label', element.dataset[`${selectedLanguage}Aria`]);
  });

  document.documentElement.lang = selectedLanguage;
  localStorage.setItem('portfolio-language', selectedLanguage);

  languageButtons.forEach((button) => {
    const isSelected = button.dataset.language === selectedLanguage;
    button.setAttribute('aria-pressed', String(isSelected));
  });

  document.dispatchEvent(new CustomEvent('languagechange'));
}

languageButtons.forEach((button) => {
  button.addEventListener('click', () => setLanguage(button.dataset.language));
});

setLanguage(currentLanguage);

const buttons = document.querySelectorAll('.PersoonsButtons button');
const contents = document.querySelectorAll('.tab-content');
const topnavToggle = document.querySelector('.topnav-toggle');
const topnavLinks = document.getElementById('topnav-links');

if (topnavToggle && topnavLinks) {
  topnavToggle.addEventListener('click', () => {
    const isOpen = topnavToggle.getAttribute('aria-expanded') === 'true';
    topnavToggle.setAttribute('aria-expanded', String(!isOpen));
    topnavLinks.classList.toggle('is-open', !isOpen);
    topnavToggle.querySelector('span').textContent = isOpen
      ? (currentLanguage === 'nl' ? 'Navigatie openen' : 'Open navigation')
      : (currentLanguage === 'nl' ? 'Navigatie sluiten' : 'Close navigation');
  });
}

if (document.getElementById('profile')) {
  document.getElementById('profile').classList.add('active');
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    // 1. Hide all content sections
    contents.forEach(content => content.classList.remove('active'));

    // 2. Get the ID from the clicked button's data-target attribute
    const targetId = button.getAttribute('data-target');

    // 3. Add 'active' class to the target section to display it
    document.getElementById(targetId).classList.add('active');
  });
});

const projectData = {
  'art-sales': {
    title: 'Art Sales',
    text: 'Assignment start: June 2026\nMade for: DAATlab\nTime spent: a few days\nProject finished: Yes\n\nWhat I am proud of: This is the first visual I have made. While it could definitely be improved, it shows the information needed and is visually appealing. I am proud that I was able to create this visual from scratch and make it look good.\n\nWhat I could have improved: I could have improved the visual by using drillthroughs, bookmarks, and multiple pages to make it more inclusive and easier to navigate. I could also have improved it by using more advanced DAX formulas to make the visual more dynamic and interactive.\n\nCustomer requirements: The customer wanted a visual that shows the sales of art pieces over time, with the ability to filter by artist and art piece. The visual should also show total sales, profit/loss, and the performance of the art pieces and artists.\n\nHow I worked: I created a wireframe of the visual to get a general idea of how it should look and which DAX formulas I would need to use. I then made sure to import and clean the data before creating the visual. While working on the visual, I realised some of my plans were not feasible or were redundant.\n\nConclusion: I am proud of the visual I made. While it could definitely be improved, it shows the necessary information and is visually appealing. I am proud that I was able to create this visual from scratch and make it look good.',
    images: ['Images/Artsales-1.png', 'Images/Artsales-2.png', 'Images/Artsales-3.png', 'Images/Artsales-4.png'],
    gameUrl: ''
  },
  'CBS': {
    title: 'CBS',
    text: 'Assignment start: June 2026\nMade for: DAATlab\nTime spent: a few days\nProject finished: Yes\n\nWhat I am proud of: I am proud of how the visual looks. Although it took some effort to determine the layout, I was able to show all the information the customer asked for. After a few adjustments, my coach at DAATlab approved the assignment. During the presentation, it was said that the dashboard looked good and no further suggestions were made.\n\nWhat I could have improved: There may have been other ways to present the information more efficiently.\n\nCustomer requirements: The customer wanted a visual that showed the development of CBS in the Netherlands, divided by people based on gender, origin, and age group. They wanted to quickly see which group had the greatest influence on the number of people with CBS in the Netherlands.\n\nHow I worked: First I made a wireframe. Then I checked which data I needed and wrote down which columns and connections were important. After that, I cleaned the data before building the dashboard.\n\nConclusion: At the time, I found this to be a fairly simple assignment, but the next assignment, Finals - DUO, showed that I still had a lot to learn, especially about importing and cleaning data.',
    images: ['Images/CBS-1.png', 'Images/CBS-2.png', 'Images/CBS-3.png', 'Images/CBS-4.png', 'Images/CBS-5.png'],
    gameUrl: ''
  },
  'finals-duo': {
    title: 'Finals - DUO',
    text: 'Assignment start: July 2026\nMade for: DAATlab\nTime spent: a few weeks\nProject finished: Not yet\n\nWhat I am proud of: I am proud that the visual is very inclusive. The visual shows what is needed and offers drillthrough with a total of six pages.\n\nWhat I could have improved: I could have used more DAX formulas. That is still a work in progress.\n\nCustomer requirements: The customer wanted a visual that shows the average grade of students per school, region, or subject. The development over time in each category also had to be visible.\n\nHow I worked: I made a wireframe to get a general idea of the layout and the DAX formulas needed. Then I imported and cleaned the data before creating the visual. While working on it, I noticed that some plans were not feasible or were redundant.\n\nConclusion: There is still a lot of room for improvement, but this is a good start.',
    images: ['Images/Examens-1.png', 'Images/Examens-2.png'],
    gameUrl: ''
  },
  'monthly-report': {
    title: 'Monthly Report',
    text: 'Assignment start: August 2026\nMade for: DAATlab\nTime spent: 3 days\nProject finished: Yes\n\nWhat I am proud of: The assignment was clear and looks appealing.\n\nWhat I could have improved: I could have checked more carefully what exactly needed to be adjusted. I had forgotten to change the data type of several columns, which caused problems when I started building the dashboard.\n\nCustomer requirements: A monthly overview of changes over the course of a month. It had to contain only the most recent month, and the information had to be available quickly.\n\nHow I worked: There was a step-by-step document that had to be followed. Some information was unclear or missing, but I was still able to figure out most things. When I encountered a larger mistake, I tried to solve it myself first; when that did not work, I asked my coach for help.\n\nConclusion: A simple assignment that taught me a few new techniques and showed me some mistakes I often make. I now know better what to look out for.',
    images: ['Images/Maandrapport-1.png', 'Images/Maandrapport-2.png'],
    gameUrl: ''
  },
  'paint-blasters': {
    title: 'Paint Blasters',
    text: 'Status: Finished\nGenre: Action arcade shooter\nFocus: Painting the environment and exploring it\nCurrent goal: Build a short prototype that takes place in The Kien, a location in the Netherlands. The goal is to collect paint blobs and paint buildings you find.\nTeam setup: Group project - 2 people\nSchool assignment: Yes\nFor: Aventus, in working with Trouw\n\nWhat I am working on: I worked on creating the assets, mainly the paint blobs you could find on the map and the blaster in your hands among a few other small things. Movement and other coding was mainly done by my colleague, with some minor input from me where needed. \nWhat I want to improve: Currently nothing, the project was delivered and approved byt the teacher at that time.\nHow I work: I focused on creating the visual assets, making some concept art for them and modeling them in blender.\nConclusion: This project was a fun experience to work on, and I learned a lot about working in a team and how to create assets for a game.',
    images: ['Images/Paintblasters-1.png'],
    gameUrl: 'https://gamejolt.com/games/Paint-blasters/859021'
  },
  'little-mage': {
    title: 'Little Mage',
    text: 'Status: Finished\nGenre: Top down, arcade\nFocus: Avoiding enemies\nCurrent goal: Create a working prototype for a top down game, this should show that I\'ve understood the core C# mechanics. This was the first game I ever made.\nTeam setup: Solo project\nSchool assignment: Yes\nFor: Programming class\n\nWhat I am working on: I am building the player movement, enemy AI and spawning of items. The player was meant to have the ability to attack and kill said enemies but I did not have enough time. The project was a bit too ambitious for the time I had.\nWhat I want to improve: I should improve on time management and keep better track of the amount of time I spend on each task. If I had not tried to make the core mechanics perfect before making sure i had all the core mechanics, I would have been able to implement all core mechanics. \nHow I work: I made sure the character could move and not exit the bounds of the camera. Then I made the enemy AI before creating teh spawning item.\nConclusion: This project was a good show of my understanding of C# and that i still had a lot to improve upon. I took some of the things I learned here about my way of working and applied them to future projects.',
    images: ['Images/LittleMage1.jpg', 'Images/LittleMage2.jpg'],
    gameUrl: 'https://gamejolt.com/games/little-mage/859012'
  },
  'strange-nights': {
    title: 'Strange Nights at Jesse Jester\'s',
    text: 'Status: Finished with missing animations\nGenre: Point and click, horror\nFocus: Atmosphere, interaction, environment\nCurrent goal: Bring my characters to life in a setting similar to that of the FNAF(Five Nights at Freddy\'s) franchise.\nTeam setup: Solo project\nSchool assignment: No\nFor: Personal project\n\nWhat I am working on: I am shaping the world, character presence, and mood so that the game feels tense and memorable. I created the environment and characters in Blender, and put it together in Unity.\nWhat I want to improve: I could improve on the atmosphere by adding more dynamic lighting, sounds, ambience and poses for the characters. Maybe add some sound cues when they move. And lastly, implement a night system, the code is there to increase the difficulty each night but I have not added the functionality to actually progress to the next night. The nights are currently neverending.\nHow I work: I created the characters first, they gave me a general idea of the world I would be building around them and what their areas would look like on the map.\nConclusion: This project was a passion project of mine, I wanted to create a game that was similar to FNAF but with my own characters and world. I learned a lot about creating a world and characters in Blender and putting them together in Unity. I could have improved on the general environment had I put some more effort in sound design and posing.',
    images: ['Images/SNAJJ-Jesse.png', 'Images/SNAJJ-Jesse Render.png', 'Images/SNAJJ-Nightingale.png', 'Images/SNAJJ-Restaurant.png', 'Images/SNAJJ-HeighChart.png'],
    gameUrl: 'https://gamejolt.com/games/snjj/858314'
  },
  'tb-d': {
    title: 'Neurophase - testing grounds',
    text: 'Status: Finished as testing grounds\nGenre: Testing grounds\nFocus: New ideas and experimentation\nCurrent goal: Create core mechanics for a game I wish to create in the future.\nTeam setup: Solo project\nSchool assignment: No\nFor: Personal project\n\nWhat I am working on: I am collecting inspiration and testing ideas for the next mechanic, theme, or gameplay loop.\nWhat I want to improve: I want to use this space to try new concepts and keep my creative direction evolving.\nHow I work: I explore ideas quickly, evaluate what feels unique, and build only when the concept has strong potential.\nConclusion: This project is intentionally open-ended so I can keep experimenting and develop the next idea with more clarity.',
    images: ['Images/Neurophase1.jpg', 'Images/Neurophase2.jpg'],
    gameUrl: 'https://gamejolt.com/games/Neurophase-Testing-Grounds/817152'
  }
};

const projectTranslations = {
  'art-sales': {
    title: 'Kunstverkoop',
    text: 'Opdracht gestart: juni 2026\nGemaakt voor: DAATlab\nTijd besteed: een paar dagen\nOpdracht afgerond: Ja\n\nWaar ik trots op ben: Dit is de eerste visual die ik heb gemaakt. Hoewel deze zeker verbeterd kan worden, laat hij de benodigde informatie zien en ziet hij er aantrekkelijk uit. Ik ben trots dat ik deze visual vanaf nul heb kunnen maken en er goed uit heb laten zien.\n\nWat beter kon: Ik had de visual kunnen verbeteren met drillthroughs, bookmarks en meerdere pagina\'s, zodat deze uitgebreider en eenvoudiger te navigeren zou zijn. Ook had ik geavanceerdere DAX-formules kunnen gebruiken om de visual dynamischer en interactiever te maken.\n\nKlantwensen: De klant wilde een visual die de verkoop van kunstwerken door de tijd heen toont, met filters voor kunstenaar en kunstwerk. De visual moest ook de totale verkoop, winst/verlies en de prestaties van de kunstwerken en kunstenaars tonen.\n\nWerkwijze: Ik maakte een wireframe om een algemeen idee te krijgen van de indeling en de benodigde DAX-formules. Daarna importeerde en bewerkte ik de data voordat ik de visual maakte. Tijdens het werken merkte ik dat sommige plannen niet haalbaar of overbodig waren.\n\nConclusie: Ik ben trots op de visual die ik heb gemaakt. Hoewel deze zeker verbeterd kan worden, toont hij de nodige informatie en ziet hij er aantrekkelijk uit.',
  },
  'CBS': {
    title: 'CBS',
    text: 'Opdracht gestart: juni 2026\nGemaakt voor: DAATlab\nTijd besteed: een paar weken\nOpdracht afgerond: augustus 2026\n\nWaar ik trots op ben: Ik ben trots op hoe de visual eruitziet. Hoewel het moeite kostte om de indeling te bepalen, heb ik alle informatie kunnen tonen waar de klant om vroeg. Na enkele aanpassingen keurde mijn coach bij DAATlab de opdracht goed. Bij de presentatie werd gezegd dat het dashboard er goed uitzag en had niemand verdere suggesties.\n\nWat beter kon: Misschien waren er andere manieren om de informatie efficiënter te tonen.\n\nKlantwensen: De klant wilde een visual die de ontwikkeling van CBS in Nederland toont, verdeeld over mensen op basis van geslacht, afkomst en leeftijdsgroep. Ze wilden snel kunnen zien welke groep de grootste invloed had op het aantal mensen met CBS in Nederland.\n\nWerkwijze: Eerst maakte ik een wireframe. Daarna controleerde ik welke data ik nodig had en noteerde ik welke kolommen en verbindingen belangrijk waren. Vervolgens maakte ik de data schoon voordat ik het dashboard bouwde.\n\nConclusie: Destijds vond ik dit een vrij eenvoudige opdracht, maar de volgende opdracht, Finals - DUO, liet zien dat ik nog veel moest leren, vooral over het importeren en opschonen van data.',
  },
  'finals-duo': {
    title: 'Finals - DUO',
    text: 'Opdracht gestart: juli 2026\nGemaakt voor: DAATlab\nTijd besteed: een paar weken\nOpdracht afgerond: Nog niet\n\nWaar ik trots op ben: Ik ben trots dat de visual erg inclusief is. De visual toont wat nodig is en biedt drillthrough met in totaal zes pagina\'s.\n\nWat beter kon: Ik had meer DAX-formules kunnen gebruiken. Daar wordt nog aan gewerkt.\n\nKlantwensen: De klant wilde een visual die het gemiddelde cijfer van leerlingen per school, regio of vak toont. Ook moest de ontwikkeling door de tijd heen in elke categorie zichtbaar zijn.\n\nWerkwijze: Ik maakte een wireframe om een algemeen idee te krijgen van de indeling en de benodigde DAX-formules. Daarna importeerde en bewerkte ik de data voordat ik de visual maakte. Tijdens het werken merkte ik dat sommige plannen niet haalbaar of overbodig waren.\n\nConclusie: Er is nog veel ruimte voor verbetering, maar dit is een goed begin.',
  },
  'monthly-report': {
    title: 'Maandrapport',
    text: 'Opdracht gestart: augustus 2026\nGemaakt voor: DAATlab\nTijd besteed: 3 dagen\nOpdracht afgerond: Ja\n\nWaar ik trots op ben: De opdracht was duidelijk en ziet er aantrekkelijk uit.\n\nWat beter kon: Ik had beter kunnen controleren wat er precies aangepast moest worden. Ik was vergeten het datatype van verschillende kolommen te wijzigen, wat problemen veroorzaakte toen ik het dashboard ging bouwen.\n\nKlantwensen: Een maandoverzicht van de veranderingen gedurende een maand. Dit moest alleen de meest recente maand bevatten en de informatie moest snel beschikbaar zijn.\n\nWerkwijze: Er was een stapsgewijs document dat gevolgd moest worden. Sommige informatie was onduidelijk of ontbrak, maar toch kon ik de meeste dingen uitzoeken. Wanneer ik een grotere fout tegenkwam, probeerde ik die zelf op te lossen; wanneer dat niet lukte, vroeg ik mijn coach om hulp.\n\nConclusie: Een eenvoudige opdracht die me een paar nieuwe technieken leerde en fouten liet zien die ik vaak maak. Nu weet ik beter waar ik op moet letten.',
  },
  'paint-blasters': {
    title: 'Paint Blasters',
    text: 'Status: Afgerond\nGenre: Actie-arcade shooter\nFocus: De omgeving verven en verkennen\nHuidig doel: Een kort prototype bouwen dat plaatsvindt in The Kien, een locatie in Nederland. Het doel is om verfklonten te verzamelen en gebouwen te verven die je tegenkomt.\nTeam setup: Groepsproject - 2 personen\nSchoolopdracht: Ja\nVoor: Aventus, in samenwerking met Trouw\n\nWaar ik aan werk: Ik werkte aan de assets, voornamelijk de verfklonten die je op de kaart kunt vinden en de blaster in je hand, naast een paar andere kleine dingen. De beweging en de rest van de code werden voornamelijk gedaan door mijn collega, met een kleine bijdrage van mij waar nodig.\nWat ik wil verbeteren: Momenteel niets, het project is opgeleverd en goedgekeurd door de docent op dat moment.\nHoe ik werk: Ik focuste me op het maken van de visuele assets, maakte wat concept art en modelleerde deze in Blender.\nConclusie: Dit project was een leuke ervaring om aan te werken en ik heb veel geleerd over samenwerken en het maken van assets voor een game.',
  },
  'little-mage': {
    title: 'Little Mage',
    text: 'Status: Afgerond\nGenre: Top-down, arcade\nFocus: Vijanden ontwijken\nHuidig doel: Een werkend prototype maken voor een top-down game om aan te tonen dat ik de kernmechanica van C# begrijp. Dit was mijn eerste game ooit.\nTeam setup: Solo project\nSchoolopdracht: Ja\nVoor: Programmerenles\n\nWaar ik aan werk: Ik bouw aan de beweging van de speler, de AI van vijanden en het spawnen van items. De speler had de mogelijkheid om aan te vallen en vijanden te verslaan, maar ik had daar geen tijd meer voor. Het project was iets te ambitieus voor de tijd die ik had.\nWat ik wil verbeteren: Ik zou beter moeten omgaan met tijdmanagement en beter bijhouden hoeveel tijd ik aan elke taak besteed. Als ik niet had geprobeerd de kernmechanica perfect te maken voordat ik zeker wist dat ik alle kernmechanica had, had ik ze allemaal kunnen implementeren.\nHoe ik werk: Ik zorgde ervoor dat de speler kon bewegen zonder buiten het beeld te gaan. Daarna maakte ik de AI van de vijanden voordat ik het spawnen van items maakte.\nConclusie: Dit project was een goede demonstratie van mijn kennis van C# en liet zien dat ik nog veel had te verbeteren. Ik heb een aantal dingen uit dit project meegenomen over mijn manier van werken en toegepast op toekomstige projecten.',
  },
  'strange-nights': {
    title: 'Strange Nights at Jesse Jester\'s',
    text: 'Status: Afgerond, met ontbrekende animaties\nGenre: Point-and-click, horror\nFocus: Sfeer, interactie, omgeving\nHuidig doel: Mijn personages tot leven brengen in een setting vergelijkbaar met die van de FNAF-serie (Five Nights at Freddy\'s).\nTeam setup: Solo project\nSchoolopdracht: Nee\nVoor: Persoonlijk project\n\nWaar ik aan werk: Ik vorm de wereld, de aanwezigheid van de personages en de stemming zodat het spel gespannen en memorabel voelt. Ik maakte de omgeving en personages in Blender en zette alles samen in Unity.\nWat ik wil verbeteren: Ik zou de sfeer kunnen verbeteren door meer dynamische verlichting, geluid, ambiance en poses voor de personages toe te voegen. Misschien wat geluidssignalen als ze bewegen. En ten slotte: een nachtsysteem implementeren; de code staat er al voor om de moeilijkheid elke nacht te verhogen, maar ik heb nog niet de functionaliteit toegevoegd om daadwerkelijk naar de volgende nacht te gaan. De nachten duren momenteel eindeloos.\nHoe ik werk: Ik maakte eerst de personages; die gaven me een algemeen idee van de wereld die ik eromheen zou bouwen en hoe hun ruimtes op de kaart eruit zouden zien.\nConclusie: Dit project was een passieproject van mij. Ik wilde een game maken die vergelijkbaar was met FNAF, maar dan met mijn eigen personages en wereld. Ik heb veel geleerd over het creëren van een wereld en personages in Blender en alles samenbrengen in Unity. Ik had de algemene omgeving kunnen verbeteren als ik meer moeite had gestoken in geluidsontwerp en poses.',
  },
  'tb-d': {
    title: 'Neurophase - testing grounds',
    text: 'Status: Afgerond als testomgeving\nGenre: Testomgeving\nFocus: Nieuwe ideeën en experimenten\nHuidig doel: Kernmechanieken creëren voor een game die ik in de toekomst wil maken.\nTeam setup: Solo project\nSchoolopdracht: Nee\nVoor: Persoonlijk project\n\nWaar ik aan werk: Ik verzamel inspiratie en test ideeën voor de volgende mechanic, een thema of gameplay-loop.\nWat ik wil verbeteren: Ik wil deze ruimte gebruiken om nieuwe concepten uit te proberen en mijn creatieve richting verder ontwikkelen.\nHoe ik werk: Ik onderzoek ideeën snel, beoordeel wat uniek voelt en bouw alleen verder als het concept veel potentie heeft.\nConclusie: Dit project is bewust open eindig zodat ik door kan blijven experimenteren en het volgende idee met meer duidelijkheid kan ontwikkelen.',
  }
};

function getProjectValue(project, property) {
  if (currentLanguage === 'nl' && projectTranslations[project]) {
    return projectTranslations[project][property];
  }

  return projectData[project][property];
}

const projectButtons = document.querySelectorAll('.project-list [data-project]');
const projectTitle = document.getElementById('project-title');
const projectText = document.getElementById('project-text');
const projectLink = document.getElementById('project-link');
const projectImage = document.getElementById('project-image');
const projectDescription = document.querySelector('.project-description');
const imageCounter = document.getElementById('image-counter');
const previousImage = document.getElementById('previous-image');
const nextImage = document.getElementById('next-image');
const imageModal = document.getElementById('image-modal');
const fullscreenTitle = document.getElementById('fullscreen-title');
const fullscreenImage = document.getElementById('fullscreen-image');
const fullscreenCounter = document.getElementById('fullscreen-counter');
const openFullscreen = document.getElementById('open-fullscreen');
const closeFullscreen = document.getElementById('close-fullscreen');
const fullscreenPrevious = document.getElementById('fullscreen-previous');
const fullscreenNext = document.getElementById('fullscreen-next');
let selectedProject;
let selectedImageIndex = 0;

function restartAnimation(element) {
  if (!element) {
    return;
  }

  element.classList.remove('is-changing');
  void element.offsetWidth;
  element.classList.add('is-changing');
}

function formatProjectText(text) {
  return text.split('\n').map((line) => {
    if (!line) {
      return '';
    }

    const firstColon = line.indexOf(':');
    const highlightedEnd = firstColon === -1 ? line.length : firstColon + 1;
    const highlighted = line.slice(0, highlightedEnd);
    const remainder = line.slice(highlightedEnd);

    return `<strong><u>${highlighted}</u></strong>${remainder}`;
  }).join('<br>');
}

function renderProject(animateDescription = true) {
  if (!selectedProject) {
    return;
  }

  const selectedProjectId = document.querySelector('.project-list [aria-pressed="true"]')?.dataset.project;
  const projectId = selectedProjectId || Object.keys(projectData).find((key) => projectData[key] === selectedProject);
  projectTitle.textContent = getProjectValue(projectId, 'title');
  projectText.innerHTML = formatProjectText(getProjectValue(projectId, 'text'));

  if (projectLink) {
    projectLink.href = selectedProject.gameUrl || '#';
    projectLink.hidden = !selectedProject.gameUrl;
    projectLink.textContent = currentLanguage === 'nl' ? 'Bezoek GameJolt' : 'Visit GameJolt';
  }

  projectImage.src = selectedProject.images[selectedImageIndex];
  projectImage.alt = currentLanguage === 'nl'
    ? `${getProjectValue(projectId, 'title')} projectvoorbeeld ${selectedImageIndex + 1}`
    : `${getProjectValue(projectId, 'title')} project preview ${selectedImageIndex + 1}`;
  imageCounter.textContent = `${selectedImageIndex + 1} / ${selectedProject.images.length}`;

  if (animateDescription) {
    restartAnimation(projectDescription);
  }
  restartAnimation(projectImage);

  if (fullscreenImage) {
    fullscreenTitle.textContent = getProjectValue(projectId, 'title');
    fullscreenImage.src = projectImage.src;
    fullscreenImage.alt = projectImage.alt;
    fullscreenCounter.textContent = imageCounter.textContent;
    restartAnimation(fullscreenImage);
  }
}

if (projectButtons.length && projectTitle && projectText && projectImage) {
  selectedProject = projectData[projectButtons[0].dataset.project];
  renderProject();

  document.addEventListener('languagechange', () => renderProject(false));

  projectButtons.forEach((button) => {
    button.addEventListener('click', () => {
      selectedProject = projectData[button.dataset.project];
      selectedImageIndex = 0;
      projectButtons.forEach((projectButton) => {
        projectButton.setAttribute('aria-pressed', projectButton === button ? 'true' : 'false');
      });
      renderProject();
    });
  });

  previousImage.addEventListener('click', () => {
    selectedImageIndex = (selectedImageIndex - 1 + selectedProject.images.length) % selectedProject.images.length;
    renderProject(false);
  });

  nextImage.addEventListener('click', () => {
    selectedImageIndex = (selectedImageIndex + 1) % selectedProject.images.length;
    renderProject(false);
  });

  function changeFullscreenImage(direction) {
    selectedImageIndex = (selectedImageIndex + direction + selectedProject.images.length) % selectedProject.images.length;
    renderProject(false);
  }

  openFullscreen.addEventListener('click', () => {
    imageModal.hidden = false;
    document.body.classList.add('modal-open');
    closeFullscreen.focus();
  });

  closeFullscreen.addEventListener('click', () => {
    imageModal.hidden = true;
    document.body.classList.remove('modal-open');
    openFullscreen.focus();
  });

  fullscreenPrevious.addEventListener('click', () => changeFullscreenImage(-1));
  fullscreenNext.addEventListener('click', () => changeFullscreenImage(1));

  imageModal.addEventListener('click', (event) => {
    if (event.target === imageModal) {
      closeFullscreen.click();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (imageModal.hidden) {
      return;
    }

    if (event.key === 'Escape') {
      closeFullscreen.click();
    } else if (event.key === 'ArrowLeft') {
      changeFullscreenImage(-1);
    } else if (event.key === 'ArrowRight') {
      changeFullscreenImage(1);
    }
  });
}

const copyNotice = document.getElementById("copyNotice");

const artItems = window.artItems || [];

const artGrid = document.getElementById('art-grid');
const artFilter = document.getElementById('art-filter');
const artEmpty = document.getElementById('art-empty');
const artModal = document.getElementById('art-modal');
const artModalClose = document.getElementById('art-modal-close');
const artModalImage = document.getElementById('art-modal-image');
const artModalTitle = document.getElementById('art-modal-title');
const artModalArtist = document.getElementById('art-modal-artist');
const artModalCollection = document.getElementById('art-modal-collection');
const artModalDate = document.getElementById('art-modal-date');
const artModalTime = document.getElementById('art-modal-time');
const artModalDescription = document.getElementById('art-modal-description');
const artModalImageWrap = document.querySelector('.art-modal-image-wrap');
const artZoom = document.getElementById('art-zoom');
const artZoomValue = document.getElementById('art-zoom-value');
const artZoomReset = document.getElementById('art-zoom-reset');
let lastArtTrigger;
let artPanX = 0;
let artPanY = 0;
let artIsPanning = false;
let artPanStartX = 0;
let artPanStartY = 0;

function getArtValue(item, property) {
  if (currentLanguage === 'nl' && item.nl?.[property]) {
    return item.nl[property];
  }

  return item[property];
}

function clampArtPan() {
  const zoom = Number(artZoom.value);
  const maximumPanX = Math.max(0, (zoom - 1) * artModalImageWrap.clientWidth);
  const maximumPanY = Math.max(0, (zoom - 1) * artModalImageWrap.clientHeight);
  artPanX = Math.min(maximumPanX, Math.max(-maximumPanX, artPanX));
  artPanY = Math.min(maximumPanY, Math.max(-maximumPanY, artPanY));
}

function renderArtZoom() {
  const zoom = Number(artZoom.value);
  clampArtPan();
  artModalImage.style.transform = `translate(${artPanX}px, ${artPanY}px) scale(${zoom})`;
  artZoomValue.textContent = `${Math.round(zoom * 100)}%`;
  artModalImageWrap.classList.toggle('is-zoomed', zoom > 1);
}

function resetArtZoom() {
  artZoom.value = '1';
  artPanX = 0;
  artPanY = 0;
  renderArtZoom();
}

function renderArtGallery() {
  if (!artGrid) {
    return;
  }

  const query = artFilter.value.trim().toLowerCase();
  const visibleItems = artItems.filter((item) =>
    `${getArtValue(item, 'title')} ${getArtValue(item, 'collection')} ${getArtValue(item, 'artist')}`.toLowerCase().includes(query)
  );

  artGrid.innerHTML = visibleItems.map((item, index) => `
    <button class="art-card" type="button" data-art-index="${artItems.indexOf(item)}" aria-label="Open ${getArtValue(item, 'title')}">
      <span class="art-thumbnail"><img src="${item.preview || item.image}" alt="" loading="lazy" decoding="async"></span>
      <span class="art-card-title">${getArtValue(item, 'title')}</span>
    </button>
  `).join('');
  artEmpty.hidden = visibleItems.length > 0;

  artGrid.querySelectorAll('[data-art-index]').forEach((card) => {
    const title = card.querySelector('.art-card-title');
    if (title.scrollHeight > title.clientHeight) {
      card.classList.add('has-long-title');
    }
    card.addEventListener('click', () => openArtModal(artItems[card.dataset.artIndex], card));
  });
}

function openArtModal(item, trigger) {
  lastArtTrigger = trigger;
  artModalImage.src = item.image;
  artModalImage.alt = getArtValue(item, 'title');
  artModalTitle.textContent = getArtValue(item, 'title');
  artModalArtist.textContent = getArtValue(item, 'artist') || 'Not provided';
  artModalCollection.textContent = getArtValue(item, 'collection') || 'Other';
  artModalDate.textContent = getArtValue(item, 'dateDrawn') || 'Not provided';
  artModalTime.textContent = getArtValue(item, 'timeSpent') || 'Not provided';
  artModalDescription.textContent = getArtValue(item, 'description') || 'No description provided.';
  resetArtZoom();
  artModal.hidden = false;
  document.body.classList.add('modal-open');
  artModalClose.focus();
}

function closeArtModal() {
  artModal.hidden = true;
  document.body.classList.remove('modal-open');
  lastArtTrigger?.focus();
}

if (artGrid && artFilter && artModal) {
  renderArtGallery();
  document.addEventListener('languagechange', () => {
    renderArtGallery();
    if (!artModal.hidden) {
      const selectedIndex = Number(lastArtTrigger?.dataset.artIndex);
      if (artItems[selectedIndex]) {
        openArtModal(artItems[selectedIndex], lastArtTrigger);
      }
    }
  });
  artFilter.addEventListener('input', renderArtGallery);
  artModalClose.addEventListener('click', closeArtModal);
  artZoom.addEventListener('input', renderArtZoom);
  artZoomReset.addEventListener('click', resetArtZoom);
  artModalImageWrap.addEventListener('wheel', (event) => {
    event.preventDefault();
    const nextZoom = Math.min(3, Math.max(1, Number(artZoom.value) - event.deltaY * 0.001));
    artZoom.value = nextZoom.toFixed(2);
    renderArtZoom();
  }, { passive: false });
  artModalImageWrap.addEventListener('pointerdown', (event) => {
    if (event.button !== 0 || Number(artZoom.value) === 1) {
      return;
    }

    event.preventDefault();
    artIsPanning = true;
    artPanStartX = event.clientX - artPanX;
    artPanStartY = event.clientY - artPanY;
    artModalImageWrap.setPointerCapture(event.pointerId);
  });
  artModalImageWrap.addEventListener('pointermove', (event) => {
    if (!artIsPanning) {
      return;
    }

    artPanX = event.clientX - artPanStartX;
    artPanY = event.clientY - artPanStartY;
    renderArtZoom();
  });
  artModalImageWrap.addEventListener('pointerup', () => { artIsPanning = false; });
  artModalImageWrap.addEventListener('pointercancel', () => { artIsPanning = false; });
  artModal.addEventListener('click', (event) => {
    if (event.target === artModal) {
      closeArtModal();
    }
  });
  document.addEventListener('keydown', (event) => {
    if (!artModal.hidden && event.key === 'Escape') {
      closeArtModal();
    }
  });
}

function copyContact(contact) {
  const text = contact.dataset.copyValue;

  if (!text) {
    return;
  }

  navigator.clipboard.writeText(text).then(() => {
    copyNotice.textContent = currentLanguage === 'nl' ? `${text} gekopieerd` : `${text} copied`;
    copyNotice.classList.add("show");
    setTimeout(() => copyNotice.classList.remove("show"), 2000);
  });
}

document.querySelectorAll(".copy-contact").forEach((contact) => {
  contact.addEventListener("click", () => copyContact(contact));
  contact.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      copyContact(contact);
    }
  });
});