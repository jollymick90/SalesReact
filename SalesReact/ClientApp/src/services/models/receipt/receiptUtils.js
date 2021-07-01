const factorRounding = 0.5;
const roundingPolicy = (price) => {
    return Number((Math.round(price / factorRounding) * factorRounding).toFixed(2));
}

export const calculatePriceTax = (good, totalItem) => {
    const taxValue = good.category.tax.value + (good.imported ? 5 : 0)
    return roundingPolicy(good.price + good.price * ( taxValue/ 100)) * totalItem;
}

export const calculatePrice = (good, totalItem, totalTaxPrice) => {
    return good.price * totalItem;
}