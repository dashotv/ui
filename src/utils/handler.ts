// common click handler to prevent default behavior
export const clickHandler = (handler: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void) => {
  return (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    handler(event);
  };
};
