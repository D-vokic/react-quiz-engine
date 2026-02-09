import { useRef } from "react";

import clickSound from "../../assets/sounds/click.mp3";
import correctSound from "../../assets/sounds/correct.mp3";
import wrongSound from "../../assets/sounds/wrong.mp3";

export function useSounds(enabled) {
  const clickAudio = useRef(null);
  const correctAudio = useRef(null);
  const wrongAudio = useRef(null);

  const play = (audio) => {
    if (enabled && audio?.current) {
      audio.current.currentTime = 0;
      audio.current.play();
    }
  };

  return {
    playClick: () => play(clickAudio),
    playCorrect: () => play(correctAudio),
    playWrong: () => play(wrongAudio),
    audioElements: (
      <>
        <audio ref={clickAudio} src={clickSound} />
        <audio ref={correctAudio} src={correctSound} />
        <audio ref={wrongAudio} src={wrongSound} />
      </>
    ),
  };
}
