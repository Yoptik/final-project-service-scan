import { decode } from "html-entities"
//**********ПОЛУЧЕНИЕ АДРЕСА ИЗОБРАЖЕНИЯ**********
const getImages = (decodedContent) => {
    const images = decodedContent.match(/<img src="(.*?)"/m)
    // console.log("images = " + images)
    return images ? images[1] : null
}
const decodeContent = (markup) => { 
    return decode(markup.toString())
}

 const getUrl = (markup) => {
    const decodedContent = decodeContent(markup)
    // console.log("decodedContent = " + decodedContent)
    const url = getImages(decodedContent)
    return  url
}
export {getUrl}


