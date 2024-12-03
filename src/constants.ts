export function debounce(func: any) {
  let timer: any;
  return function (event: any) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(func, 500, event);
  };
}

export const MOVE_BUFFER = 100;
