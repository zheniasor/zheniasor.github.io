const video = document.getElementById("video");
const rewindButton = document.getElementById("back");
const forwardButton = document.getElementById("forward");

rewindButton.addEventListener("click", () => {
  video.currentTime = Math.max(0, video.currentTime - 10);
});

forwardButton.addEventListener("click", () => {
  video.currentTime = Math.min(video.duration, video.currentTime + 10);
});

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case " ":
      event.preventDefault();
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
      break;
    case "ArrowLeft":
      video.currentTime = Math.max(0, video.currentTime - 10);
      break;
    case "ArrowRight":
      video.currentTime = Math.min(video.duration, video.currentTime + 10);
      break;
  }
});
