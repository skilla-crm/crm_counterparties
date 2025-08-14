export const handleSearchCompany = (query, list) => {
    const result = list?.filter(el => (el.name || el.partnership_name) && (el.name ? el?.name : el.partnership_name)?.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
    const result2 = list?.filter(el => el?.inn && el?.inn?.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
    const result3 = list?.filter(el => el?.kpp && el?.kpp?.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
    const result4 = list?.filter(el => el?.bank && el?.bank?.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
    const result5 = list?.filter(el => el?.rs && el?.rs?.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
    const result6 = list?.filter(el => el?.name_button && el?.name_button?.toLowerCase().indexOf(query?.toLowerCase()) !== -1);
    const result7 = list?.filter(el => el?.name_service && el?.name_service?.toLowerCase().indexOf(query?.toLowerCase()) !== -1);

    if (result?.length >= 1) {
        return result
    }

    if (result2?.length >= 1) {
        return result2
    }

    if (result3?.length >= 1) {
        return result3
    }

    if (result4?.length >= 1) {
        return result4
    }

    if (result5?.length >= 1) {
        return result5
    }

    if (result6?.length >= 1) {
        return result6
    }

    if (result7?.length >= 1) {
        return result7
    }



    if (result?.length == 0 && result2?.length == 0 && result3?.length == 0 && result4?.length == 0 && result5?.length == 0 && result6?.length == 0 && result7?.length == 0) {
        return []
    }
}
