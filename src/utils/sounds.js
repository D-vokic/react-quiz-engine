const clickSound = new Audio("/sounds/click.mp3");
const correctSound = new Audio("/sounds/correct.mp3");
const wrongSound = new Audio("/sounds/wrong.mp3");
const finishSound = new Audio("/sounds/finish.mp3");

export function playSound(sound, enabled) {
  if (!enabled) return;

  sound.currentTime = 0;
  sound.play().catch(() => {});
}

export const sounds = {
  click: clickSound,
  correct: correctSound,
  wrong: wrongSound,
  finish: finishSound,
};
