export const handlePreparePriceData = (data) => {
    const formData = new FormData();
    data.forEach((el, index) => {
        if (!String(el?.id)?.includes('new')) {
            formData.append(`price_list[${index}][id]`, el.id)
        }
        formData.append(`price_list[${index}][name]`, el.name)
        formData.append(`price_list[${index}][unit]`, el.unit)
        formData.append(`price_list[${index}][worker_bit]`, el.worker_bit)
        formData.append(`price_list[${index}][client_bit]`, el.client_bit)
        formData.append(`price_list[${index}][min_time]`, el.min_time)
    })


    return formData


}