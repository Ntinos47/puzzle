document.addEventListener("DOMContentLoaded", () => {
    const letters = document.querySelectorAll(".letter");
    const emptySlots = document.querySelectorAll(".empty");

    // Allow dragging letters
    letters.forEach(letter => {
        letter.setAttribute("draggable", "true");

        letter.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", letter.alt); // letter identifier
            e.dataTransfer.setData("src", letter.src);        // image source
            e.target.classList.add("dragging");
        });

        letter.addEventListener("dragend", e => {
            e.target.classList.remove("dragging");
        });
    });

    // Allow dropping onto empty outline slots
    emptySlots.forEach(slot => {
        slot.addEventListener("dragover", e => {
            e.preventDefault();
            slot.style.transform = "scale(1.1)";
            slot.style.transition = "transform 0.1s ease";
        });

        slot.addEventListener("dragleave", e => {
            slot.style.transform = "scale(1)";
        });

        slot.addEventListener("drop", e => {
            e.preventDefault();
            slot.style.transform = "scale(1)";

            const draggedLetterAlt = e.dataTransfer.getData("text/plain");
            const draggedSrc = e.dataTransfer.getData("src");
            const targetAlt = slot.alt.toUpperCase().replace("_OUTLINE", "");

            if (draggedLetterAlt.toUpperCase().includes(targetAlt)) {
                // Place the filled letter image on top of the outline
                slot.src = draggedSrc;
                slot.classList.add("filled");

                // Disable further drops on this slot
                slot.removeEventListener("dragover", () => {});
                slot.removeEventListener("drop", () => {});

                // Optionally disable dragging that letter
                const draggedLetter = [...letters].find(l => l.alt === draggedLetterAlt);
                if (draggedLetter) {
                    draggedLetter.style.opacity = "0.3";
                    draggedLetter.setAttribute("draggable", "false");
                }
            }
        });
    });
});