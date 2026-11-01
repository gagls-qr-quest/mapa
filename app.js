// Modul MAPA – pôdorysy školy a stanovištia
// ------------------------------------------------------------------
// Spoločné funkcie (načítanie questu, postup hráča, adresy) sú v shared/v1/qrq.js.
// Formát dát: https://github.com/gagls-qr-quest/gagls-qr-quest.github.io/blob/main/FORMAT.md
//
// Každé poschodie má floor.imageUrl (adresa obrázka pôdorysu).
// Každé stanovište má floor (id poschodia) a x, y v percentách 0–100.
// ------------------------------------------------------------------
import { loadQuest, getQuestId } from 'https://gagls-qr-quest.github.io/shared/v1/qrq.js';

const nazov = document.querySelector('#nazov');
const obsah = document.querySelector('#obsah');

/** Vytvorí odsek s textom (cez textContent, nie innerHTML). */
function odsek(text, trieda = '') {
  const p = document.createElement('p');
  p.textContent = text;
  if (trieda) p.className = trieda;
  return p;
}

async function spusti() {
  try {
    const quest = await loadQuest(getQuestId());
    nazov.textContent = `${quest.title} – mapa`;

    const zoznam = document.createElement('ul');
    for (const poschodie of quest.floors) {
      const pocet = quest.stations.filter((s) => s.floor === poschodie.id).length;
      const polozka = document.createElement('li');
      polozka.textContent = `${poschodie.name} – počet stanovíšť: ${pocet}`;
      zoznam.append(polozka);
    }

    // TODO (úloha z 3. stretnutia): namiesto zoznamu zobraz obrázok pôdorysu
    //   (poschodie.imageUrl) na celú šírku mobilu a nad ním tlačidlá na prepínanie poschodí.
    obsah.replaceChildren(odsek('Poschodia v queste:'), zoznam);
  } catch (chyba) {
    obsah.replaceChildren(odsek(chyba.message, 'qrq-error'));
    console.error(chyba);
  }
}

spusti();
