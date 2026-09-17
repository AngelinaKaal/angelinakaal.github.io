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
    text: 'Assignment start: June 2026\nMade for: DAATlab\nTime spent: a few days\nProject finished: Yes\n\nWhat I\'m proud of: This is the first visual I have made. While it could definitely be improved, it shows the information needed and is visually appealing. I am proud that I was able to create this visual from scratch and make it look good.\n\nWhat I could have improved: I could have improved the visual by using drillthroughs, bookmarks, and multiple pages to make it more inclusive and easier to navigate. I could also have improved it by using more advanced DAX formulas to make the visual more dynamic and interactive.\n\nCustomer requirements: The customer wanted a visual that shows the sales of art pieces over time, with the ability to filter by artist and art piece. The visual should also show total sales, profit/loss, and the performance of the art pieces and artists.\n\nHow I worked: I created a wireframe of the visual to get a general idea of how it should look and which DAX formulas I would need to use. I then made sure to import and clean the data before creating the visual. While working on the visual, I realised some of my plans were not feasible or were redundant.\n\nConclusion: I am proud of the visual I made. While it could definitely be improved, it shows the necessary information and is visually appealing. I am proud that I was able to create this visual from scratch and make it look good.',
    images: ['Images/ArtSales-4.png', 'Images/ArtSales-1.png', 'Images/ArtSales-2.png', 'Images/ArtSales-3.png']
  },
  'CBS': {
    title: 'CBS',
    text: 'Assignment start: June 2026\nMade for: DAATlab\nTime spent: a few weeks\nProject finished: August 2026\n\nWhat I\'m proud of: I am proud of the way the visual looks. While it took some effort to figure out the layout, I did manage to show all the information the customer requested. After some revisions, my coach at DAATlab approved the assignment. When it was presented, I was told the dashboard looked good and no one had any suggestions at the time.\n\nWhat I could have improved: Perhaps there were other ways to show the information that may have been more efficient.\n\nCustomer requirements: The customer wanted a visual that showed the development of CBS in the Netherlands and how this is divided among people based on gender, origin, and age group. They wanted to be able to quickly tell which group had the most impact on the number of people with CBS in the Netherlands.\n\nHow I worked: First, I made a wireframe of the visual. Then I checked which data I needed and noted down which columns were needed and which connections were important. After that, I cleaned up the data before I started building the dashboard.\n\nConclusion: I felt it was quite an easy assignment at the time, but the following assignment, \'Finals - DUO,\' showed me that I still had a lot to learn, especially when it came to importing and cleaning up data.',
    images: ['Images/CBS-1.png', 'Images/CBS-2.png', 'Images/CBS-3.png', 'Images/CBS-4.png', 'Images/CBS-5.png']
  },
  'finals-duo': {
    title: 'Finals - DUO',
    text: 'Assignment start: July 2026\nMade for: DAATlab\nTime spent: a few weeks\nProject finished: Not yet\n\nWhat I\'m proud of: I am proud that the visual is very inclusive; it shows what it needs to and allows for drillthrough, using a total of six pages.\n\nWhat I could have improved: I could have improved the visual by using more DAX formulas, which will still be changed.\n\nCustomer requirements: The customer wanted a visual that shows the average grade of students per school, region, or subject. It also needed to show development over time in each category.\n\nHow I worked: I made a wireframe of the visual to get a general idea of how it should look and which DAX formulas I would need to use. I then made sure to import and clean the data before creating the visual. While working on it, I realised some of my plans were not feasible or were redundant.\n\nConclusion: There is still a lot of improvement to be made, but it is a good start.',
    images: ['Images/Examens-1.png', 'Images/Examens-2.png']
  },
  'monthly-report': {
    title: 'Monthly Report',
    text: 'Assignment start: August 2026\nMade for: DAATlab\nTime spent: 3 days\nProject finished: Yes\n\nWhat I\'m proud of: The assignment was easy to follow and looks visually pleasing.\n\nWhat I could have improved: I could have checked more carefully what needed to be changed. I had forgotten to change the data type of several columns, which caused some issues as I started building the dashboard.\n\nCustomer requirements: Monthly overview of the changes during a month. This should only cover the latest month, and the information should be quickly available.\n\nHow I worked: There was a step-by-step document that needed to be followed. Some information was unclear or missing, but despite that, I managed to figure out how to do most of it. When I came across a larger error, I tried to fix it myself; when I couldn\'t, I asked my coach for help.\n\nConclusion: An easy assignment that taught me a few new tricks and showed me some errors I tend to make, which I now know I need to pay attention to.',
    images: ['Images/Maandrapport-1.png', 'Images/Maandrapport-2.png'],
  }
};

const projectTranslations = {
  'art-sales': {
    title: 'Kunstverkoop',
    text: 'Opdracht gestart: juni 2026\nGemaakt voor: DAATlab\nTijd besteed: een paar dagen\nOpdracht afgerond: Ja\n\nWaar ik trots op ben: Dit is de eerste visual die ik heb gemaakt. Hoewel deze zeker verbeterd kan worden, laat hij de benodigde informatie zien en ziet hij er aantrekkelijk uit. Ik ben trots dat ik deze visual vanaf nul heb kunnen maken en er goed uit heb laten zien.\n\nWat beter kon: Ik had de visual kunnen verbeteren met drillthroughs, bookmarks en meerdere pagina\'s, zodat deze uitgebreider en eenvoudiger te navigeren zou zijn. Ook had ik geavanceerdere DAX-formules kunnen gebruiken om de visual dynamischer en interactiever te maken.\n\nKlantwensen: De klant wilde een visual die de verkoop van kunstwerken door de tijd heen toont, met filters voor kunstenaar en kunstwerk. De visual moest ook de totale verkoop, winst/verlies en de prestaties van de kunstwerken en kunstenaars tonen.\n\nWerkwijze: Ik maakte een wireframe om een algemeen idee te krijgen van de indeling en de benodigde DAX-formules. Daarna importeerde en bewerkte ik de data voordat ik de visual maakte. Tijdens het werken merkte ik dat sommige plannen niet haalbaar of overbodig waren.\n\nConclusie: Ik ben trots op de visual die ik heb gemaakt. Hoewel deze zeker verbeterd kan worden, toont hij de nodige informatie en ziet hij er aantrekkelijk uit.',
  },
  CBS: {
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