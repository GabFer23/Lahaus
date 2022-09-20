export const cleanContainer = (container) => {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };
  
  