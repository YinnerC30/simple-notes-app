const padZero = (numero) => {
  return numero < 10 ? `0${numero}` : numero;
};

export const getFechaHoraActual = () => {
  const fechaHoraActual = new Date();

  const año = fechaHoraActual.getFullYear();
  const mes = padZero(fechaHoraActual.getMonth() + 1); // Los meses comienzan desde 0
  const dia = padZero(fechaHoraActual.getDate());
  const horas = padZero(fechaHoraActual.getHours());
  const minutos = padZero(fechaHoraActual.getMinutes());
  const segundos = padZero(fechaHoraActual.getSeconds());

  return `${año}-${mes}-${dia}T${horas}:${minutos}:${segundos}`;
};
