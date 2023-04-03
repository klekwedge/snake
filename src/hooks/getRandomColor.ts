export default function getRandomColor() {
  const hexa = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += hexa[Math.floor(Math.random() * 16)];
  }
  return color;
}
