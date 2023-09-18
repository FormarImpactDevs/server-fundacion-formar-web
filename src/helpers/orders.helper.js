const { v4: uuidv4 } = require('uuid');

function generateOrderNumber(orderType) {
  const uniqueId = uuidv4(); // Genera un UUID único
  const firstLetter = orderType.charAt(0).toUpperCase();

  // Combina la primera letra y una parte del UUID para crear un código alfanumérico único
  const uniqueValue = `${firstLetter}-${uniqueId.substr(0, 6)}`;

  return uniqueValue;
}

module.exports = { generateOrderNumber }