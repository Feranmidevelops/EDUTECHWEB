document.addEventListener("DOMContentLoaded", function () {
  const flashMessage = document.querySelector(".flash-message");
  if (flashMessage) {
    setTimeout(() => {
      flashMessage.style.opacity = "0";
      setTimeout(() => {
        flashMessage.remove();
      }, 500);
    }, 3000);
  }
});