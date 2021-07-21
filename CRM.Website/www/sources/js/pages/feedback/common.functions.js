export const validateNoOfInquiry = event => {
    return event.target.validity.valid
        || event.target.value < 1 && (event.target.value = 1)
        || event.target.value > 32000 && (event.target.value = 32000);
};