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

  let withDashes = "+38 (0";

  if (digits.length > 0) {
    withDashes += digits.slice(0, 2);
  }

  if (digits.length >= 3) {
    withDashes += ") " + digits.slice(2, 5);
  }

  if (digits.length >= 6) {
    withDashes += " - " + digits.slice(5, 7);
  }

  if (digits.length >= 8) {
    withDashes += " - " + digits.slice(7, 9);
  }

  let withoutDashes = "+38 (0";

  if (digits.length > 0) {
    withoutDashes += digits.slice(0, 2);
  }

  if (digits.length >= 3) {
    withoutDashes += ") " + digits.slice(2, 5);
  }

  if (digits.length >= 6) {
    withoutDashes += " " + digits.slice(5, 7);
  }
  
  if (digits.length >= 8) {
    withoutDashes += " " + digits.slice(7, 9);
  }

  return { withDashes, withoutDashes };
};