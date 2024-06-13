//Prende in input una data in formato time zone e la trasforma in una stringa leggibile
export const dateBeauty = (date) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString(undefined, options);
}