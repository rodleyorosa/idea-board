import { useCallback, useState } from "react";
import { colorClasses } from "../contants";
import { MainContentWrapper } from "../MainContentWrapper";
import type { NoteItem } from "../types";
import { NewNote } from "./NewNote";
import { Note } from "./Note";

export const StickyWall = () => {
  const [selectedNote, setSelectedNote] = useState<NoteItem | null>(null);

  const stickWalls: NoteItem[] = [
    {
      id: 1,
      title: "Social Media",
      content:
        "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.",
      color: "yellow",
    },
    {
      id: 2,
      title: "Social Media Marketing Strategy per il 2024",
      content:
        "Strategia completa per i social media nel 2024:\n\n1. TikTok e Instagram Reels rimangono prioritari\n2. Focus su contenuti video brevi e coinvolgenti\n3. Collaborazioni con micro-influencer\n4. User-generated content campaigns\n5. Analytics e metriche di engagement\n6. Budget allocation: 40% video, 30% static posts, 30% stories\n\nTarget demographics:\n- Gen Z: TikTok, Instagram\n- Millennial: Instagram, LinkedIn\n- Gen X: Facebook, LinkedIn\n\nROI atteso: 15-20% incremento engagement, 25% crescita follower organici.\n\nROI atteso: 15-20% incremento engagement, 25% crescita follower organici.\n\nROI atteso: 15-20% incremento engagement, 25% crescita follower organici.\n\nROI atteso: 15-20% incremento engagement, 25% crescita follower organici.",
      color: "rose",
    },
    {
      id: 3,
      title: "Note Riunione Team - 15 Gennaio",
      content:
        "Punti discussi:\n\n• Progetto Q1 2024 - deadline confermata per fine marzo\n• Nuovo designer da assumere entro febbraio\n• Budget marketing approvato: €50K per trimestre\n• Review processo onboarding clienti\n• Implementazione nuovo CRM entro maggio\n\nAction items:\n- Marco: preparare job description designer\n- Sara: analisi competitor CRM\n- Luca: draft piano marketing Q1\n- Team: feedback su processo onboarding entro venerdì\n\nProssima riunione: 22 gennaio ore 14:30",
      color: "sky",
    },
    {
      id: 4,
      title: "Idee Contenuto Blog",
      content:
        "Lista idee articoli blog aziendali:\n\n📝 SEO & Marketing:\n- 'Come ottimizzare il tuo sito per Google nel 2024'\n- 'Email marketing: 10 strategie che funzionano davvero'\n- 'Social media trends da seguire questo anno'\n\n💡 Tutorial:\n- 'Guida completa a Google Analytics 4'\n- 'Come creare landing page che convertono'\n- 'Automazioni marketing con Zapier'\n\n🎯 Case Studies:\n- Cliente XYZ: +300% traffico organico\n- Campagna Facebook Ads: ROI 400%\n- Rebranding startup tech: lessons learned\n\nScadenze: 2 articoli/mese, pubblicazione martedì e giovedì",
      color: "emerald",
    },
    {
      id: 5,
      title: "Lista Spesa & To-Do Personale",
      content:
        "🛒 Spesa:\n- Latte e uova\n- Pane integrale\n- Verdure fresche (spinaci, pomodori, zucchine)\n- Pasta e riso\n- Detersivi casa\n- Carta igienica\n\n✅ Da fare questa settimana:\n- Prenotare dentista\n- Rinnovare assicurazione auto\n- Comprare regalo compleanno mamma\n- Fissare appuntamento parrucchiere\n- Pagare bollette (luce, gas, internet)\n- Pulire casa weekend\n- Chiamare idraulico per rubinetto\n\n📚 Leggere:\n- Finire libro 'Atomic Habits'\n- Iniziare corso online Python",
      color: "violet",
    },
    {
      id: 6,
      title: "Ricetta Tiramisu della Nonna",
      content:
        "🍰 TIRAMISU CLASSICO\n\nIngredienti (6 persone):\n- 6 uova fresche\n- 600g mascarpone\n- 150g zucchero\n- 300g savoiardi\n- 500ml caffè forte (freddo)\n- 3 cucchiai liquore amaretto\n- Cacao amaro in polvere\n- Cioccolato fondente grattugiato\n\nProcedimento:\n1. Separare tuorli da albumi\n2. Montare tuorli con zucchero fino a crema chiara\n3. Aggiungere mascarpone gradualmente\n4. Montare albumi a neve e incorporare delicatamente\n5. Mescolare caffè con amaretto\n6. Bagnare savoiardi e stratificare con crema\n7. Riposare in frigo 4-6 ore\n8. Spolverare con cacao prima di servire\n\n👩‍🍳 Segreti nonna: uova a temperatura ambiente, non esagerare con il caffè!",
      color: "amber",
    },
    {
      id: 7,
      title: "Viaggio Toscana - Planning",
      content:
        "🗺️ ITINERARIO TOSCANA (5 giorni)\n\nGiorno 1 - Firenze:\n- Arrivo hotel ore 14:00\n- Duomo e Battistero\n- Ponte Vecchio al tramonto\n- Cena Osteria Santo Spirito\n\nGiorno 2 - Firenze:\n- Uffizi (prenotato ore 9:00)\n- Palazzo Pitti e Giardini Boboli\n- Mercato di San Lorenzo\n\nGiorno 3 - Siena e San Gimignano:\n- Partenza ore 8:30\n- Piazza del Campo, Siena\n- Pranzo tipico senese\n- San Gimignano pomeriggio\n- Pernottamento agriturismo\n\nGiorno 4 - Val d'Orcia:\n- Pienza e Montepulciano\n- Degustazione vini\n- Foto campi di girasoli\n\nGiorno 5 - Ritorno:\n- Check-out e viaggio rientro\n\n💰 Budget: €800 totale (hotel, cibo, benzina, ingressi)\n📱 Da scaricare: app Firenze Card, mappe offline",
      color: "yellow",
    },
    {
      id: 8,
      title: "Obiettivi 2024 - Personali e Professionali",
      content:
        "🎯 OBIETTIVI ANNO 2024\n\n💼 Professionali:\n- Ottenere promozione a Senior Marketing Manager\n- Completare certificazione Google Ads e Meta Blueprint\n- Aumentare budget gestito del 40%\n- Parlare a 2 conferenze del settore\n- Costruire team di 3 persone\n- Salary goal: +25% rispetto anno scorso\n\n🌱 Personali:\n- Perdere 8kg e mantenerli\n- Correre mezza maratona a ottobre\n- Leggere 24 libri (2 al mese)\n- Imparare spagnolo base (A2)\n- Viaggiare in 4 paesi nuovi\n- Risparmiare €10.000\n- Corso fotografia professionale\n\n📊 Review trimestrale:\n- Marzo: check primi 3 mesi\n- Giugno: aggiustamenti metà anno\n- Settembre: sprint finale\n- Dicembre: bilancio e obiettivi 2025\n\n🔥 Motto dell'anno: 'Progress over perfection!'",
      color: "emerald",
    },
  ];

  const openNote = useCallback((item: NoteItem) => {
    setSelectedNote(item);
    // block the scroll when the modal is opened
    document.body.style.overflow = "hidden";
  }, []);

  const closeNote = useCallback(() => {
    setSelectedNote(null);
    // unblock the scroll when the modal is closed
    document.body.style.overflow = "unset";
  }, []);

  return (
    <MainContentWrapper title="Sticky Wall">
      <div className="flex">
        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            <NewNote />
            {stickWalls.map((item) => {
              return (
                <div
                  key={item.id}
                  onClick={() => openNote(item)}
                  className={`${
                    colorClasses[item.color]
                  } p-4 rounded-md shadow-md cursor-pointer sm:aspect-square`}
                >
                  <h3 className="text-lg font-semibold mb-2 truncate">
                    {item.title}
                  </h3>
                  <div className="text-sm text-gray-700 line-clamp-7 whitespace-pre-wrap">
                    {item.content}
                  </div>
                </div>
              );
            })}
          </div>
        </main>
      </div>
      {selectedNote && <Note item={selectedNote} closeNote={closeNote} />}
    </MainContentWrapper>
  );
};
