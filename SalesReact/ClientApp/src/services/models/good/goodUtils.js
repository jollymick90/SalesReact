export const extractCategory = (good) => {
  let cat = "";
  if (good && good.category && good.category.categoryName) {
    cat = good.category.categoryName.trim();
  }

  return cat;
}

export const extractTaxDescription = (good) => {
  let tax = "";
  if (good && good.category && good.category.tax && good.category.tax.description) {
    tax = good.category.tax.description.trim();
  }

  return tax;
}

export const extractTaxValue = (good) => {
  let tax = 0;
  if (good && good.category && good.category.tax && good.category.tax.value) {
    tax = good.category.tax.value;
  }

  return tax;
}