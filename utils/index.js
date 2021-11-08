export function areSameObject(obj1, obj2) {
  return JSON.stringify(obj1) === JSON.stringify(obj2);
}

export function validateFormula(formula) {
  formula = formula.replaceAll(' ', '');

  const braketsPositions = getBraketsPositions(formula);

  for (let i = braketsPositions.length - 1; i >= 0; i--) {
    const subFormula = formula.substring(
      braketsPositions[i].open + 1,
      braketsPositions[i].close
    );
    formula = formula.replace(`(${subFormula})`, 'x');

    if (!validateFormula(subFormula)) {
      return false;
    }
  }

  if (!firstCharacterIsCorrect(formula[0])) {
    return false;
  }
  for (let i = 1; i < formula.length; i++) {
    if (!thisCharacterIsCorrect(formula[i], formula[i - 1])) {
      return false;
    }
  }
  return true;
}

function getBraketsPositions(formula) {
  let openBrakets = 0;
  let braketsPositions = [];
  for (let i = 0; i < formula.length; i++) {
    if (formula[i] === '(') {
      if (openBrakets === 0) {
        braketsPositions.push({ open: i });
      }
      openBrakets++;
    } else if (formula[i] === ')') {
      if (openBrakets === 1) {
        const lastBraket = braketsPositions.pop();
        lastBraket.close = i;
        braketsPositions.push(lastBraket);
      }
      openBrakets--;
    }
  }

  return braketsPositions;
}

function firstCharacterIsCorrect(character) {
  if (!isNaN(character)) return true;

  if (['+', '-', 'x', 'X', '.'].includes(character)) {
    return true;
  }
  return false;
}

function thisCharacterIsCorrect(char, charBefore) {
  if (!isNaN(char)) {
    if (charBefore === 'x' || charBefore === 'X') {
      return false;
    }
  } else {
    switch (char) {
      case '-':
      case '+':
      case '.':
        break;
      case 'x':
      case 'X':
        if (!isNaN(charBefore)) {
          return false;
        }
        break;
      case '*':
        if (['+', '-', '/', '%', '^', '.'].includes(charBefore)) {
          return false;
        }
        break;
      case '^':
      case '/':
      case '%':
        if (['+', '-', '/', '*', '%', '^', '.'].includes(charBefore)) {
          return false;
        }
        break;
      default:
        return false;
    }
  }
  return true;
}

export function aplyFormula(value, formula) {
  formula = formula.replaceAll('x', value);
  formula = formula.replaceAll('X', value);
  return eval(formula);
}
