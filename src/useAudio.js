import { useCallback } from "react";

export function useAudio(audioFile) {
  const audio = new Audio(audioFile);

  const playAudio = useCallback(() => {
    audio.play();
  }, [audio]);

  return playAudio;
}
