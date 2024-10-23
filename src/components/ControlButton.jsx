function ControlButton({ isFlipping, startFlip }) {
  if (isFlipping) return null;

  return (
    <button onClick={startFlip}>
      <img src="/images/play.svg" alt="" height={"42px"} />
    </button>
  );
}

export default ControlButton;
