import { decode } from "html-entities"
//**********ПОЛУЧЕНИЕ ТЕКСТА **********
const decodeContent = (markup) => {
    return decode(markup.toString())
}
const removeAllTags = (content) => {
    return content.replace(/<.*?>/g, ' ')
}

export const getContent = (markup) => {
    // console.log("getContent = " + markup)
    const decodedContent = decodeContent(markup)
    const content = removeAllTags(decodedContent).slice(0, 400) + ' ...'
    return content 
}



