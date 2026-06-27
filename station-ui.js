(function () {
  const stations = {
    'kolosseum.html': {
      title: 'Kolosseum',
      subtitle: 'Spiele, Kämpfe und Unterhaltung',
      question: 'Warum brauchten die Römer ein riesiges Gebäude für Kämpfe und Spiele?',
      claim: 'Das Kolosseum war nur ein Ort für spannende Kämpfe.',
      modelHelp: 'Schau dir an, wie groß das Gebäude ist und wie viele Menschen dort Platz haben konnten.',
      hintHelp: 'Achte darauf, wer dort zuschaute und warum solche Spiele für den Kaiser wichtig sein konnten.',
      starter: 'Das Kolosseum zeigt, dass …',
      hints: ['Im Kolosseum fanden Spiele und Gladiatorenkämpfe statt.', 'Viele Menschen konnten zuschauen.', 'Der Kaiser konnte sich vor dem Volk zeigen.']
    },
    'curia-julia.html': {
      title: 'Curia Julia',
      subtitle: 'Ort des Senats',
      question: 'Warum trafen sich Politiker in einem eigenen Gebäude?',
      claim: 'In Rom durften alle Menschen gleich mitentscheiden.',
      modelHelp: 'Schau dir an, ob die Curia eher wie ein öffentlicher Platz oder wie ein besonderer Versammlungsort wirkt.',
      hintHelp: 'Achte darauf, wer sich dort traf und was dort besprochen wurde.',
      starter: 'Die Curia Julia zeigt, dass …',
      hints: ['In der Curia traf sich der Senat.', 'Dort wurden wichtige politische Fragen besprochen.', 'Nicht alle Menschen hatten gleich viel Macht.']
    },
    'forum-romanum.html': {
      title: 'Forum Romanum',
      subtitle: 'Zentrum der Stadt',
      question: 'Warum brauchte Rom einen großen öffentlichen Platz im Zentrum der Stadt?',
      claim: 'Das Forum Romanum war einfach nur ein Marktplatz.',
      modelHelp: 'Schau dir an, ob das Forum wie ein einzelnes Gebäude oder eher wie ein wichtiger Platz mit vielen Gebäuden wirkt.',
      hintHelp: 'Achte darauf, was Menschen dort alles machten: kaufen, reden, handeln, feiern oder Politik erleben.',
      starter: 'Das Forum Romanum zeigt, dass …',
      hints: ['Das Forum war ein wichtiger Treffpunkt.', 'Dort ging es um Politik, Handel, Reden und Feiern.', 'Viele Menschen kamen dort zusammen.']
    },
    'triumphbogen.html': {
      title: 'Triumphbogen',
      subtitle: 'Siege und Macht zeigen',
      question: 'Warum bauten die Römer große Triumphbögen mitten in die Stadt?',
      claim: 'Triumphbögen waren nur schöne Tore.',
      modelHelp: 'Schau dir an, wie auffällig und sichtbar der Triumphbogen wirkt.',
      hintHelp: 'Achte darauf, woran ein Triumphbogen erinnern sollte und was er über Macht und Siege zeigte.',
      starter: 'Der Triumphbogen zeigt, dass …',
      hints: ['Triumphbögen erinnerten an Siege.', 'Sie zeigten Macht und Erfolg.', 'Alle Menschen konnten diese Zeichen im Stadtbild sehen.']
    },
    'wohnhaus.html': {
      title: 'Insula',
      subtitle: 'Wohnen in der Großstadt',
      question: 'Wie wohnten viele einfache Menschen in der Großstadt Rom?',
      claim: 'Alle Römer wohnten in schönen großen Häusern.',
      modelHelp: 'Schau dir an, ob das Gebäude eher wie ein großes Einzelhaus oder wie ein mehrstöckiges Wohnhaus wirkt.',
      hintHelp: 'Achte darauf, wer dort wohnte und wie viele Menschen dort leben konnten.',
      starter: 'Die Insula zeigt, dass …',
      hints: ['Viele einfache Menschen lebten in Mietshäusern.', 'Oft lebten viele Menschen auf engem Raum.', 'Nicht alle Menschen in Rom waren reich.']
    },
    'aquaedukt.html': {
      title: 'Aquädukt',
      subtitle: 'Wasser für die Großstadt',
      question: 'Warum bauten die Römer lange Wasserleitungen bis in die Stadt?',
      claim: 'Wasser kam in Rom einfach aus Brunnen. Dafür brauchte man keine großen Bauwerke.',
      modelHelp: 'Schau dir an, wie Wasser über eine längere Strecke transportiert werden konnte.',
      hintHelp: 'Achte darauf, wofür eine große Stadt wie Rom viel Wasser brauchte.',
      starter: 'Das Aquädukt zeigt, dass …',
      hints: ['Aquädukte brachten Wasser in die Stadt.', 'Im Modell erkennst du Bogenreihen, den offenen Wasserkanal und ein Wasserreservoir.', 'Wasser wurde für Brunnen, Thermen und Menschen gebraucht. Eine große Stadt musste gut versorgt werden.']
    },
    'baeckerei-kornspeicher.html': {
      title: 'Bäckerei und Kornspeicher',
      subtitle: 'Brot und Getreide für die Stadt',
      question: 'Warum waren Bäckereien und Kornspeicher für eine Großstadt wie Rom so wichtig?',
      claim: 'Brot und Getreide waren für Rom nicht besonders wichtig.',
      modelHelp: 'Schau dir an, welche Teile zum Backen und Lagern von Vorräten gehören könnten.',
      hintHelp: 'Achte darauf, warum viele Menschen in einer großen Stadt regelmäßig mit Nahrung versorgt werden mussten.',
      starter: 'Die Bäckerei und der Kornspeicher zeigen, dass …',
      hints: ['Getreide war eines der wichtigsten Lebensmittel in Rom.', 'In Bäckereien wurde aus Mehl Brot für viele Menschen gebacken.', 'Kornspeicher halfen dabei, Vorräte sicher zu lagern.']
    },
    'trajansthermen.html': {
      title: 'Trajansthermen',
      subtitle: 'Bad, Sport und Begegnung',
      question: 'Warum waren Thermen mehr als nur ein Ort zum Baden?',
      claim: 'Thermen waren einfach nur große Badezimmer.',
      modelHelp: 'Schau dir an, wie groß die Anlage ist und ob sie aus mehreren Bereichen besteht.',
      hintHelp: 'Achte darauf, was die Menschen dort außer Baden noch tun konnten.',
      starter: 'Die Trajansthermen zeigen, dass …',
      hints: ['Thermen waren große öffentliche Badeanlagen.', 'Menschen trafen sich dort zum Baden, Reden und Ausruhen.', 'Es gab verschiedene Räume, Wasserbecken und oft auch Sportmöglichkeiten.']
    },
    'palatin.html': {
      title: 'Palatin',
      subtitle: 'Hügel der Macht',
      question: 'Warum lebten mächtige Menschen an einem besonderen Ort über der Stadt?',
      claim: 'Alle Menschen in Rom lebten ungefähr gleich.',
      modelHelp: 'Schau dir an, wie groß und auffällig die Gebäude auf dem Palatin wirken.',
      hintHelp: 'Achte darauf, wer dort lebte und was dieser Ort über Macht und Reichtum zeigt.',
      starter: 'Der Palatin zeigt, dass …',
      hints: ['Auf dem Palatin lebten mächtige und reiche Menschen.', 'Später lagen dort Kaiserpaläste.', 'Macht und Reichtum wurden sichtbar gezeigt.']
    },
    'circus-maximus.html': {
      title: 'Circus Maximus',
      subtitle: 'Wagenrennen und große Veranstaltungen',
      question: 'Warum brauchten die Römer eine so große Rennbahn?',
      claim: 'Wagenrennen waren nur ein Hobby einzelner Römer.',
      modelHelp: 'Schau dir an, wie lang und groß die Rennbahn wirkt.',
      hintHelp: 'Achte darauf, wie viele Menschen dort zusammenkommen konnten und was sie dort erlebten.',
      starter: 'Der Circus Maximus zeigt, dass …',
      hints: ['Dort fanden Wagenrennen statt.', 'Sehr viele Menschen konnten zuschauen.', 'Wettkämpfe und Unterhaltung waren wichtig.']
    }
  };

  const order = ['kolosseum.html', 'curia-julia.html', 'forum-romanum.html', 'triumphbogen.html', 'wohnhaus.html', 'aquaedukt.html', 'baeckerei-kornspeicher.html', 'trajansthermen.html', 'palatin.html', 'circus-maximus.html'];
  const file = location.pathname.split('/').pop() || '';
  const station = stations[file];
  if (!station) return;

  document.title = station.title + ' – Professor Tempus’ Rom-Rundgang';
  const header = document.querySelector('header');
  header.innerHTML = '<a class="header-home" href="index.html">← Übersicht</a><div><span class="eyebrow">Forschungsstation</span><h1>' + station.title + '</h1><p>' + station.subtitle + '</p></div><span class="tempus-badge">Station für Professor Tempus</span>';

  const left = document.querySelector('.station-layout > div:first-child');
  const choices = ['Freizeit und Unterhaltung', 'Politik und Macht', 'Versorgung und Technik', 'Wohnen und soziale Unterschiede', 'Gemeinschaft und Alltag'];
  const index = order.indexOf(file);
  left.className = 'research-column';
  left.innerHTML = `
    <div class="book-note"><strong>Dein Auftrag:</strong> Prüfe die Behauptung und finde einen Hinweis für Professor Tempus.</div>
    <section class="hint-card"><h2>Was du wissen solltest</h2><ul>${station.hints.map(hint => '<li>' + hint + '</li>').join('')}</ul></section>
    <div class="task-stack">
      <section class="task-card why-card"><span class="task-number">1</span><div><h2>Forscherfrage</h2><p>${station.question}</p></div></section>
      <section class="task-card"><span class="task-number">2</span><div><h2>Behauptung</h2><p>${station.claim}</p></div></section>
      <section class="task-card reconstruction-card"><span class="task-number">3</span><div><h2>Deine Hilfen</h2><p><strong>Nutze das 3D-Modell:</strong><br>${station.modelHelp}</p><p><strong>Nutze die Hinweise:</strong><br>${station.hintHelp}</p></div></section>
      <section class="task-card"><span class="task-number">4</span><div><h2>Schreibe ins Forscherbuch</h2><p class="sentence-starter">Die Behauptung stimmt / stimmt nicht ganz, weil …</p></div></section>
      <section class="task-card clue-card"><span class="task-number">5</span><div><h2>Forschungshinweis</h2><p>Vervollständige den Satz:</p><p class="sentence-starter">${station.starter}</p></div></section>
    </div>
    <fieldset class="life-areas"><legend>Zu welchem Lebensbereich gehörte das Gebäude?</legend><div class="choice-grid">${choices.map(choice => '<label><input type="radio" name="lebensbereich" value="' + choice + '"><span>' + choice + '</span></label>').join('')}</div></fieldset>
    <p class="workbook-note">✎ Schreibe deine Antworten in dein Forscherbuch.</p>
    <nav class="station-nav" aria-label="Stationsnavigation"><a href="index.html">← Zur Übersicht</a><a href="${order[(index + 1) % order.length]}">Nächste Station →</a></nav>`;

  document.querySelector('footer').textContent = 'Professor Tempus’ Rom-Rundgang · Forschungsstation ' + station.title;
})();
