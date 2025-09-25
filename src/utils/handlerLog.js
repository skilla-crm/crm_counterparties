export const handlerLog = (log) => {
    const position = log?.person?.position === 'director' ? 'Руководитель' : log?.person?.position === 'accountant' ? 'Бухгалтер' : 'Менеджер'
    const person = `${log?.person?.name} ${position}`
    if (log?.action === 'created') {
        return `${person} создал акт сверки`
    }

    if (log?.action === 'updated') {
        return `${person} изменил акт сверки`
    }

    if (log?.action === 'download') {
        return `${person} скачал/распечатал акт сверки`
    }

    if (log?.action === 'sent') {
        return `${person} отправил e-mail ${log?.description?.split('на email ').pop()}`
    }

    if (log?.action === 'sent_edo') {
        return `${person} отправил оригинал по ЭДО`
    }

    if (log?.action === 'sent_courier') {
        return `${person} передал оригинал курьеру`
    }

    if (log?.action === 'sent_post') {
        return `${person} отправил оригинал по почте`
    }

    if (log?.action === 'sent_self_pickup') {
        return `${person} передал оригинал в офисе`
    }

    if (log?.action === 'unmark_send') {
        return `${person} снял отметку об отправке`
    }

    if (log?.action === 'sign_pepper') {
        return `${person} подписал бумажный оригинал`
    }

    if (log?.action === 'sign_edo') {
        return `${person} подписал оригинал по ЭДО`
    }

    if (log?.action === 'unmark_sign') {
        return `${person} снял отметку о подписании`
    }
}