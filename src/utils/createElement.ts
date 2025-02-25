/** @jsx createElement */
export default function createElement(
  tag: any,
  props: { [key: string]: any } | null,
  ...children: any[]
): HTMLElement | Text {
  if (typeof tag === 'function') {
    return tag(props);
  }

  const element = document.createElement(tag);

  if (props) {
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'children') return;

      (element as any)[key] = value;
    });
  }

  children.flat().forEach((child) => {
    if (typeof child === 'number') {
      child = String(child);
    }

    if (typeof child === 'string') {
      child = document.createTextNode(child);
    }

    element.appendChild(child);
  });

  return element;
}
