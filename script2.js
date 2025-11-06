slot.addEventListener("dragleave", e => {
    if (slot.dataset.filled === "true") return;
    slot.style.transform = "scale(1)";
});

slot.addEventListener("drop", e => {
    e.preventDefault();
    if (slot.dataset.filled === "true") {
        slot.style.transform = "scale(1)";
        return;
    }

    slot.style.transform = "scale(1)";

    const draggedLetterAlt = e.dataTransfer.getData("text/plain");
    const draggedId = e.dataTransfer.getData("text/id");
    const targetAlt = String(slot.alt).trim().toUpperCase();

    const draggedLetter = document.querySelector(`.letter[data-id="${draggedId}"]`);

    const draggedSrc = draggedLetter ? draggedLetter.src : e.dataTransfer.getData("src");

    if (!draggedLetter && !draggedSrc) {
        return;
    }

    if (String(draggedLetterAlt).trim().toUpperCase() === targetAlt) {
        slot.src = draggedSrc;
        slot.classList.add("filled");
        slot.dataset.filled = "true";

        if (draggedLetter) {
            draggedLetter.style.opacity = "0.3";
            draggedLetter.setAttribute("draggable", "false");
        }
    }
});