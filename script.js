const tasks = [
    { question: "Ich esse viel Obst. - Ich bleibe gesund.", answer: "Ich esse viel Obst, um gesund zu bleiben." },
    { question: "Sie sucht einen neuen Job. - Sie verdient mehr.", answer: "Sie sucht einen neuen Job, um mehr zu verdienen." },
    { question: "Wir lernen viel. - Wir bestehen die Prüfung.", answer: "Wir lernen viel, um die Prüfung zu bestehen." },
    { question: "Er kauft ein großes Auto. - Seine Familie hat mehr Platz.", answer: "Er kauft ein großes Auto, damit seine Familie mehr Platz hat." },
    { question: "Ich gehe früh ins Bett. - Ich bin morgen fit.", answer: "Ich gehe früh ins Bett, um morgen fit zu sein." },
    { question: "Die Eltern sparen. - Die Kinder können studieren.", answer: "Die Eltern sparen, damit die Kinder studieren können." },
    { question: "Ich esse keine Süßigkeiten. - Ich nehme ab.", answer: "Ich esse keine Süßigkeiten, um abzunehmen." },
    { question: "Abends sehen wir fern. - Wir entspannen uns.", answer: "Abends sehen wir fern, um uns zu entspannen." },
    { question: "Marco kocht etwas Leckeres. - Seine Frau freut sich.", answer: "Marco kocht etwas Leckeres, damit sich seine Frau freut." },
    { question: "Rita kauft ein kleines Auto. - Sie findet leichter einen Parkplatz.", answer: "Rita kauft ein kleines Auto, um leichter einen Parkplatz zu finden." },
    { question: "Er hat sein Handy immer an. - Sein Chef kann ihn erreichen.", answer: "Er hat sein Handy immer an, damit sein Chef ihn erreichen kann." },
    { question: "Ich muss meine Frau anrufen. - Sie holt mich ab.", answer: "Ich muss meine Frau anrufen, damit sie mich abholt." },
    { question: "Familie Bär zieht aufs Land. - Die Kinder haben frische Luft.", answer: "Familie Bär zieht aufs Land, damit die Kinder frische Luft haben." },
    { question: "Ich mache das Radio an. - Ich höre den Wetterbericht.", answer: "Ich mache das Radio an, um den Wetterbericht zu hören." },
    { question: "Wir machen die Musik leiser. - Charly kann schlafen.", answer: "Wir machen die Musik leiser, damit Charly schlafen kann." },
    { question: "Wir beeilen uns. - Wir verpassen den Bus nicht.", answer: "Wir beeilen uns, um den Bus nicht zu verpassen." },
    { question: "Andrea und Pedro fliegen nach Peru. - Pedros Mutter lernt Andrea kennen.", answer: "Andrea und Pedro fliegen nach Peru, damit Pedros Mutter Andrea kennenlernt." },
    { question: "Markus spricht langsam. - Nicolas versteht ihn besser.", answer: "Markus spricht langsam, damit Nicolas ihn besser versteht." }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);