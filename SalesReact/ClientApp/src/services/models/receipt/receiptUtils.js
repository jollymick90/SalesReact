export const calculateTaxPrice = (good, totalItem) => {
    console.log(good, totalItem);
    return 2;
}

export const calculatePrice = (good, totalItem, totalTaxPrice) => {
    console.log(good, totalItem, totalTaxPrice);
    return 5 + totalTaxPrice;
}