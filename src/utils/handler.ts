// common click handler to prevent default behavior
export const clickHandler = (handler: () => void) => {
  return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    handler();
  };
};
