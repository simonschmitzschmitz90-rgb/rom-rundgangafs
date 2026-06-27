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
      infoText: 'Rom war in der Kaiserzeit eine riesige Stadt. Vermutlich lebten dort bis zu eine Million Menschen. Im Kolosseum fanden große Spiele und Kämpfe statt. Sehr viele Menschen konnten dort gleichzeitig zuschauen. Viele Römer*innen kamen dorthin, um sich unterhalten zu lassen. Auch der Kaiser zeigte sich dort dem Volk. Wenn er große Spiele veranstaltete, konnte er beliebt wirken und seine Macht zeigen. Das Kolosseum war also nicht nur ein Ort für Kämpfe, sondern auch ein Ort für Unterhaltung, Gemeinschaft und Macht.'
    },
    'curia-julia.html': {
      title: 'Curia Julia',
      subtitle: 'Ort des Senats',
      question: 'Warum trafen sich Politiker in einem eigenen Gebäude?',
      claim: 'In Rom durften alle Menschen gleich mitentscheiden.',
      modelHelp: 'Schau dir an, ob die Curia eher wie ein öffentlicher Platz oder wie ein besonderer Versammlungsort wirkt.',
      hintHelp: 'Achte darauf, wer sich dort traf und was dort besprochen wurde.',
      starter: 'Die Curia Julia zeigt, dass …',
      infoText: 'Rom wurde nicht von allen Menschen gleich mitbestimmt. In der Curia Julia traf sich der Senat. Der Senat war eine Gruppe mächtiger Männer, die über wichtige politische Fragen sprach. Nicht alle Menschen in Rom durften dort mitentscheiden. Viele einfache Menschen, Frauen und versklavte Menschen hatten keinen direkten Einfluss auf solche Entscheidungen. Die Curia war deshalb ein besonderer Ort der politischen Macht. Sie zeigt, dass Macht in Rom nicht gleich verteilt war.'
    },
    'forum-romanum.html': {
      title: 'Forum Romanum',
      subtitle: 'Zentrum der Stadt',
      question: 'Warum brauchte Rom einen großen öffentlichen Platz im Zentrum der Stadt?',
      claim: 'Das Forum Romanum war einfach nur ein Marktplatz.',
      modelHelp: 'Schau dir an, ob das Forum wie ein einzelnes Gebäude oder eher wie ein wichtiger Platz mit vielen Gebäuden wirkt.',
      hintHelp: 'Achte darauf, was Menschen dort alles machten: kaufen, reden, handeln, feiern oder Politik erleben.',
      starter: 'Das Forum Romanum zeigt, dass …',
      infoText: 'Rom war das Zentrum eines großen Reiches. In der Stadt lebten viele Menschen, und viele wichtige Entscheidungen wurden dort sichtbar. Das Forum Romanum war ein wichtiger öffentlicher Platz in der Stadt. Dort kamen viele Menschen zusammen. Sie handelten, redeten, feierten und erlebten Politik. Um das Forum herum standen wichtige Gebäude. Das Forum war also nicht nur ein Marktplatz, sondern auch ein Zentrum des öffentlichen Lebens. Es zeigt, dass Politik, Handel, Religion und Begegnung in Rom eng miteinander verbunden waren.'
    },
    'triumphbogen.html': {
      title: 'Triumphbogen',
      subtitle: 'Siege und Macht zeigen',
      question: 'Warum bauten die Römer große Triumphbögen mitten in die Stadt?',
      claim: 'Triumphbögen waren nur schöne Tore.',
      modelHelp: 'Schau dir an, wie auffällig und sichtbar der Triumphbogen wirkt.',
      hintHelp: 'Achte darauf, woran ein Triumphbogen erinnern sollte und was er über Macht und Siege zeigte.',
      starter: 'Der Triumphbogen zeigt, dass …',
      infoText: 'Rom war die Hauptstadt eines großen Reiches. Siege und Macht sollten in der Stadt für alle sichtbar sein. Triumphbögen erinnerten an erfolgreiche Feldherren oder Kaiser. Sie standen gut sichtbar in der Stadt. Wer durch Rom ging, sollte die Macht und Erfolge Roms sehen. Auf manchen Triumphbögen waren Bilder oder Inschriften zu sehen. So konnten Siege dauerhaft im Stadtbild erinnert werden. Der Triumphbogen zeigt, dass Macht, Erinnerung und militärischer Erfolg öffentlich gezeigt wurden.'
    },
    'wohnhaus.html': {
      title: 'Insula',
      subtitle: 'Wohnen in der Großstadt',
      question: 'Wie wohnten viele einfache Menschen in der Großstadt Rom?',
      claim: 'Alle Römer wohnten in schönen großen Häusern.',
      modelHelp: 'Schau dir an, ob das Gebäude eher wie ein großes Einzelhaus oder wie ein mehrstöckiges Wohnhaus wirkt.',
      hintHelp: 'Achte darauf, wer dort wohnte und wie viele Menschen dort leben konnten.',
      starter: 'Die Insula zeigt, dass …',
      infoText: 'In Rom lebten sehr viele Menschen auf engem Raum. Viele einfache Menschen wohnten in Insulae, also in mehrstöckigen Mietshäusern. Oft lebten viele Menschen eng zusammen. Die Wohnungen waren meist kleiner und einfacher als die Häuser reicher Römer*innen. Manche Räume waren dunkel, laut oder unbequem. Nicht alle Menschen in Rom lebten also in prächtigen Häusern. Die Insula zeigt, dass es in Rom große Unterschiede zwischen armen und reichen Menschen gab.'
    },
    'aquaedukt.html': {
      title: 'Aquädukt',
      subtitle: 'Wasser für die Großstadt',
      question: 'Warum bauten die Römer lange Wasserleitungen bis in die Stadt?',
      claim: 'Wasser kam in Rom einfach aus Brunnen. Dafür brauchte man keine großen Bauwerke.',
      modelHelp: 'Schau dir an, wie Wasser über eine längere Strecke transportiert werden konnte.',
      hintHelp: 'Achte darauf, wofür eine große Stadt wie Rom viel Wasser brauchte.',
      starter: 'Das Aquädukt zeigt, dass …',
      infoText: 'Rom war eine riesige Stadt mit sehr vielen Einwohner*innen. Für so viele Menschen brauchte man jeden Tag sehr viel Wasser. Aquädukte brachten Wasser über weite Strecken in die Stadt. Das Wasser wurde für Menschen, Brunnen, Badeanlagen und andere öffentliche Orte gebraucht. Damit das Wasser in die Stadt kam, mussten die Römer genau planen und bauen. Ohne solche Technik hätte das Leben in Rom für so viele Menschen nicht gut funktioniert. Das Aquädukt zeigt, dass Rom eine große und gut organisierte Stadt war.'
    },
    'baeckerei.html': {
      title: 'Bäckerei',
      subtitle: 'Brot für die Stadt',
      question: 'Warum waren Bäckereien für eine Großstadt wie Rom so wichtig?',
      claim: 'Brot war für Rom nicht besonders wichtig.',
      modelHelp: 'Schau dir an, welche Teile zum Mahlen, Backen und Verkaufen von Brot gehören könnten.',
      hintHelp: 'Achte darauf, warum viele Menschen in einer großen Stadt regelmäßig mit Brot versorgt werden mussten.',
      starter: 'Die Bäckerei zeigt, dass …',
      infoText: 'In Rom mussten sehr viele Menschen jeden Tag essen. Brot war für viele Römer*innen ein wichtiges Grundnahrungsmittel. In Bäckereien wurde Getreide zu Mehl verarbeitet und daraus Brot gebacken. Dafür brauchte man Mühlen, Öfen, Arbeitskräfte und genug Getreide. Viele Menschen konnten nicht jeden Tag selbst Brot backen und kauften es deshalb. Eine Bäckerei zeigt, dass die Versorgung der Menschen in einer Großstadt gut organisiert sein musste. Sie zeigt auch, dass einfache Dinge wie Brot für das Leben in Rom sehr wichtig waren.'
    },
    'kornspeicher.html': {
      title: 'Kornspeicher',
      subtitle: 'Getreidevorräte für Rom',
      question: 'Warum brauchte Rom große Kornspeicher?',
      claim: 'Getreide konnte in Rom einfach immer frisch gekauft werden. Vorräte waren nicht wichtig.',
      modelHelp: 'Schau dir an, ob das Gebäude eher zum Wohnen oder zum Lagern großer Vorräte passt.',
      hintHelp: 'Achte darauf, warum eine Stadt mit sehr vielen Menschen trockene und sichere Getreidelager brauchte.',
      starter: 'Der Kornspeicher zeigt, dass …',
      infoText: 'In Rom lebten vermutlich bis zu eine Million Menschen. Eine so große Stadt brauchte sehr viel Getreide, vor allem für Brot. Das Getreide kam nicht nur aus der Umgebung, sondern auch mit Schiffen aus anderen Teilen des Römischen Reiches. In Kornspeichern wurde Getreide gelagert, damit es später verteilt oder verarbeitet werden konnte. Das Getreide musste trocken und sicher aufbewahrt werden. Ohne Kornspeicher hätte die Versorgung der Stadt schnell schwierig werden können. Der Kornspeicher zeigt, dass Rom auf Planung, Handel und Versorgung aus dem ganzen Reich angewiesen war.'
    },
    'trajansthermen.html': {
      title: 'Thermen',
      subtitle: 'Bad, Sport und Begegnung',
      question: 'Warum waren Thermen mehr als nur ein Ort zum Baden?',
      claim: 'Thermen waren einfach nur große Badezimmer.',
      modelHelp: 'Schau dir an, wie groß die Anlage ist und ob sie aus mehreren Bereichen besteht.',
      hintHelp: 'Achte darauf, was die Menschen dort außer Baden noch tun konnten.',
      starter: 'Die Thermen zeigen, dass …',
      infoText: 'In Rom lebten so viele Menschen, dass es große öffentliche Orte für den Alltag brauchte. Thermen waren große Badeanlagen, die viele Menschen nutzen konnten. Die Menschen gingen dort nicht nur baden, sondern trafen andere, ruhten sich aus und machten Sport. In Thermen gab es verschiedene Räume, zum Beispiel für warmes und kaltes Wasser. Für solche Anlagen brauchte man viel Wasser, gute Technik und viele Arbeitskräfte. Thermen waren deshalb mehr als Badezimmer. Sie waren wichtige Orte für Körperpflege, Freizeit und Begegnung.'
    },
    'palatin.html': {
      title: 'Palatin',
      subtitle: 'Hügel der Macht',
      question: 'Warum lebten mächtige Menschen an einem besonderen Ort über der Stadt?',
      claim: 'Alle Menschen in Rom lebten ungefähr gleich.',
      modelHelp: 'Schau dir an, wie groß und auffällig die Gebäude auf dem Palatin wirken.',
      hintHelp: 'Achte darauf, wer dort lebte und was dieser Ort über Macht und Reichtum zeigt.',
      starter: 'Der Palatin zeigt, dass …',
      infoText: 'In Rom lebten sehr viele unterschiedliche Menschen. Einige waren reich und mächtig, viele andere lebten viel einfacher. Der Palatin war ein besonderer Hügel in Rom. Dort lebten sehr mächtige und reiche Menschen, später auch Kaiser. Von dort aus konnte man auf die Stadt blicken. Die großen Gebäude auf dem Palatin zeigten Reichtum und Macht. Nicht alle Menschen in Rom konnten so wohnen. Der Palatin macht deutlich, dass es in Rom große Unterschiede zwischen mächtigen, reichen und einfachen Menschen gab.'
    },
    'circus-maximus.html': {
      title: 'Circus Maximus',
      subtitle: 'Wagenrennen und große Veranstaltungen',
      question: 'Warum brauchten die Römer eine so große Rennbahn?',
      claim: 'Wagenrennen waren nur ein Hobby einzelner Römer.',
      modelHelp: 'Schau dir an, wie lang und groß die Rennbahn wirkt.',
      hintHelp: 'Achte darauf, wie viele Menschen dort zusammenkommen konnten und was sie dort erlebten.',
      starter: 'Der Circus Maximus zeigt, dass …',
      infoText: 'Rom war eine Großstadt mit sehr vielen Menschen. Deshalb brauchte die Stadt auch große Orte, an denen viele Menschen gemeinsam etwas erleben konnten. Im Circus Maximus fanden Wagenrennen statt. Die Rennbahn war sehr lang und groß, weil sehr viele Zuschauerinnen dabei sein konnten. Die Menschen jubelten für ihre Lieblingsfahrer und erlebten gemeinsam spannende Rennen. Solche Rennen waren für viele Römerinnen ein wichtiges Freizeitereignis. Der Circus Maximus zeigt, dass Unterhaltung und gemeinsame Erlebnisse in Rom eine große Bedeutung hatten.'
    }
  };

  const order = ['kolosseum.html', 'curia-julia.html', 'forum-romanum.html', 'triumphbogen.html', 'wohnhaus.html', 'aquaedukt.html', 'baeckerei.html', 'kornspeicher.html', 'trajansthermen.html', 'palatin.html', 'circus-maximus.html'];
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
    <section class="hint-card"><h2>Was du wissen solltest</h2><p>${station.infoText}</p></section>
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
