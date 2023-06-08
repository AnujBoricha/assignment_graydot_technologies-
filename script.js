const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const successMessage = document.getElementById("success-message");

let colorIndex = 0;
const colors = ["#4CAF50", "#2196F3", "#FF9800", "#E91E63"]; // Define an array of colors

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
    draggable.style.opacity = "0.5";
  });

  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
    draggable.style.opacity = "1"; // Restore opacity of dragged item
  });
});

/* refresh the page on click */
const refreshButton = document.getElementById("refresh-button");

refreshButton.addEventListener("click", () => {
  location.reload();
});

containers.forEach((container) => {
  container.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(container, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });

  container.addEventListener("drop", () => {
    showSuccessMessage();
  });
});

/* displaying succes message with chaning color using colors array */
function showSuccessMessage() {
  successMessage.textContent = "Item dropped successfully!";
  successMessage.style.backgroundColor = colors[colorIndex];
  successMessage.style.display = "block";

  setTimeout(() => {
    successMessage.style.display = "none";
    colorIndex = (colorIndex + 1) % colors.length; // Increment the color index
  }, 2000);
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
