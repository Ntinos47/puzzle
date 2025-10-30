document.addEventListener("DOMContentLoaded", () => {
    const letters = document.querySelectorAll(".letter");
    const emptySlots = document.querySelectorAll(".empty");


    letters.forEach(letter => {
        letter.setAttribute("draggable", "true");

        letter.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text/plain", letter.alt);
            e.dataTransfer.setData("src", letter.src);
            e.target.classList.add("dragging");
        });

        letter.addEventListener("dragend", e => {
            e.target.classList.remove("dragging");
        });
    });



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

                slot.src = draggedSrc;
                slot.classList.add("filled");

                slot.removeEventListener("dragover", () => {});
                slot.removeEventListener("drop", () => {});

                const draggedLetter = [...letters].find(l => l.alt === draggedLetterAlt);
                if (draggedLetter) {
                    draggedLetter.style.opacity = "0.3";
                    draggedLetter.setAttribute("draggable", "false");
                }
            }
        });
    });



});