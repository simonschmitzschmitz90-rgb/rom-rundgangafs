(function () {
  const stations = {
    'kolosseum.html': {
      title: 'Kolosseum', subtitle: 'Spiele, Kämpfe und Unterhaltung',
      why: 'Warum bauten die Römer ein so großes Gebäude für Spiele und Kämpfe?',
      starter: 'Das Kolosseum zeigt, dass …',
      hints: ['Im Kolosseum fanden Spiele und Gladiatorenkämpfe statt.', 'Viele Menschen konnten zuschauen.', 'Der Kaiser konnte sich vor dem Volk zeigen.']
    },
    'curia-julia.html': {
      title: 'Curia Julia', subtitle: 'Ort des Senats',
      why: 'Warum trafen sich Senatoren in einem eigenen Gebäude?',
      starter: 'Die Curia Julia zeigt, dass …',
      hints: ['In der Curia traf sich der Senat.', 'Dort wurden wichtige politische Fragen besprochen.', 'Nicht alle Menschen hatten gleich viel Macht.']
    },
    'forum-romanum.html': {
      title: 'Forum Romanum', subtitle: 'Zentrum der Stadt',
      why: 'Warum brauchte Rom einen großen öffentlichen Platz?',
      starter: 'Das Forum Romanum zeigt, dass …',
      hints: ['Das Forum war ein wichtiger Treffpunkt.', 'Dort ging es um Politik, Handel, Reden und Feiern.', 'Viele Menschen kamen dort zusammen.']
    },
    'triumphbogen.html': {
      title: 'Triumphbogen', subtitle: 'Siege und Macht zeigen',
      why: 'Warum bauten die Römer große Triumphbögen?',
      starter: 'Der Triumphbogen zeigt, dass …',
      hints: ['Triumphbögen erinnerten an Siege.', 'Sie zeigten Macht und Erfolg.', 'Alle Menschen konnten diese Zeichen im Stadtbild sehen.']
    },
    'wohnhaus.html': {
      title: 'Insula', subtitle: 'Wohnen in der Großstadt',
      why: 'Was erfährst du über das Leben vieler einfacher Menschen in Rom?',
      starter: 'Die Insula zeigt, dass …',
      hints: ['Viele einfache Menschen lebten in Mietshäusern.', 'Oft lebten viele Menschen auf engem Raum.', 'Nicht alle Menschen in Rom waren reich.']
    },
    'aquaedukt.html': {
      title: 'Aquädukt', subtitle: 'Wasser für die Großstadt',
      why: 'Warum investierten die Römer so viel Arbeit in Wasserleitungen?',
      starter: 'Das Aquädukt zeigt, dass …',
      hints: ['Aquädukte brachten Wasser in die Stadt.', 'Im Modell erkennst du Bogenreihen, den offenen Wasserkanal und ein Wasserreservoir.', 'Wasser wurde für Brunnen, Thermen und Menschen gebraucht. Eine große Stadt musste gut versorgt werden.']
    },
    'baeckerei-kornspeicher.html': {
      title: 'Bäckerei und Kornspeicher', subtitle: 'Brot und Getreide für die Stadt',
      why: 'Warum waren Bäckereien und Kornspeicher für eine Großstadt wie Rom so wichtig?',
      starter: 'Die Bäckerei und der Kornspeicher zeigen, dass …',
      hints: ['Getreide war eines der wichtigsten Lebensmittel in Rom.', 'In Bäckereien wurde aus Mehl Brot für viele Menschen gebacken.', 'Kornspeicher halfen dabei, Vorräte sicher zu lagern.']
    },
    'trajansthermen.html': {
      title: 'Trajansthermen', subtitle: 'Bad, Sport und Begegnung',
      why: 'Warum waren Thermen mehr als nur ein Ort zum Baden?',
      starter: 'Die Trajansthermen zeigen, dass …',
      hints: ['Thermen waren große öffentliche Badeanlagen.', 'Menschen trafen sich dort zum Baden, Reden und Ausruhen.', 'Es gab verschiedene Räume, Wasserbecken und oft auch Sportmöglichkeiten.']
    },
    'palatin.html': {
      title: 'Palatin', subtitle: 'Hügel der Macht',
      why: 'Warum lebten Herrscher an einem besonderen Ort?',
      starter: 'Der Palatin zeigt, dass …',
      hints: ['Auf dem Palatin lebten mächtige und reiche Menschen.', 'Später lagen dort Kaiserpaläste.', 'Macht und Reichtum wurden sichtbar gezeigt.']
    },
    'circus-maximus.html': {
      title: 'Circus Maximus', subtitle: 'Wagenrennen und große Veranstaltungen',
      why: 'Warum bauten die Römer eine so große Rennbahn?',
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
  header.innerHTML = '<a class="header-home" href="index.html">← Übersicht</a><div><span class="eyebrow">Forschungsstation</span><h1>' + station.title + '</h1><p>' + station.subtitle + '</p></div><span class="tempus-badge">⌛ Station für Professor Tempus</span>';

  const left = document.querySelector('.station-layout > div:first-child');
  const choices = ['Freizeit und Unterhaltung', 'Politik und Macht', 'Versorgung und Technik', 'Wohnen und soziale Unterschiede', 'Gemeinschaft und Alltag'];
  const index = order.indexOf(file);
  left.className = 'research-column';
  left.innerHTML = `
    <div class="book-note"><strong>Dein Auftrag:</strong> Erforsche das Gebäude und finde einen Hinweis für Professor Tempus.</div>
    <section class="hint-card"><h2>Was du wissen solltest</h2><ul>${station.hints.map(hint => '<li>' + hint + '</li>').join('')}</ul></section>
    <div class="task-stack">
      <section class="task-card"><span class="task-number">1</span><div><h2>Beobachten</h2><p>Schau dir das 3D-Modell genau an. Was fällt dir auf?</p></div></section>
      <section class="task-card"><span class="task-number">2</span><div><h2>Verstehen</h2><p>Wofür wurde dieses Gebäude genutzt? Wer war hier?</p></div></section>
      <section class="task-card why-card"><span class="task-number">3</span><div><h2>Warum-Frage</h2><p>${station.why}</p></div></section>
      <section class="task-card clue-card"><span class="task-number">4</span><div><h2>Forschungshinweis</h2><p>Vervollständige den Satz:</p><p class="sentence-starter">${station.starter}</p></div></section>
      <section class="task-card reconstruction-card"><span class="task-number">5</span><div><h2>Rekonstruktions-Check</h2><p>Das 3D-Modell ist eine Rekonstruktion. Es zeigt, wie das Gebäude früher ausgesehen haben könnte. Nicht jedes Detail ist sicher.</p><p><strong>Was kann man gut erkennen? Was könnte ergänzt sein?</strong></p></div></section>
    </div>
    <fieldset class="life-areas"><legend>Zu welchem Lebensbereich gehörte das Gebäude?</legend><div class="choice-grid">${choices.map((choice, choiceIndex) => '<label><input type="radio" name="lebensbereich" value="' + choice + '"><span>' + choice + '</span></label>').join('')}</div></fieldset>
    <p class="workbook-note">✎ Schreibe deine Antworten in dein Forscherbuch.</p>
    <nav class="station-nav" aria-label="Stationsnavigation"><a href="index.html">← Zur Übersicht</a><a href="${order[(index + 1) % order.length]}">Nächste Station →</a></nav>`;

  document.querySelector('footer').textContent = 'Professor Tempus’ Rom-Rundgang · Forschungsstation ' + station.title;
})();
