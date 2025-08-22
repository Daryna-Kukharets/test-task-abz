export const formatPhone = (value: string) => {
  let digits = value.replace(/\D/g, "");

  if (digits.startsWith("380")) {
    digits = digits.slice(3);
  } else if (digits.startsWith("38")) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    digits = digits.slice(1);
  }

  digits = digits.slice(0, 9);

  let formatted = "+38 (0";

  if (digits.length > 0) {
    formatted += digits.slice(0, 2);
  }
  if (digits.length >= 3) {
    formatted += ") " + digits.slice(2, 5);
  }
  if (digits.length >= 6) {
    formatted += " - " + digits.slice(5, 7);
  }
  if (digits.length >= 8) {
    formatted += " - " + digits.slice(7, 9);
  }

  return formatted;
};
