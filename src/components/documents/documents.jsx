import css from './documents.module.css'
import rezultImage from './rezult1.png'
import { useState, useEffect } from 'react'
import instance from '../../utils/axios'
import parse from "html-react-parser"
import DOMPurify from "dompurify"
import Loader from "../loader/loader"
import { getContent } from './decodeContent'
import { getUrl } from './getUrl'
import imageStart from './ooops.jpeg'



const Documents = (props) => {
  const { initToken } = props
  const buf = JSON.parse(localStorage.getItem('searchDocumentsID'))
  const [documents, , setdocuments ] = useState(buf || "")
  const ids = Object.values(documents)[0].map((value) => value.encodedId)//id

  //**********LOADER**********
  const [loader, setLoader] = useState(false)
  useEffect(() => {
    setLoader(true)
    setTimeout(() => {
      setLoader(false);
    }, 2000);

  }, [])

  //**********ИЗМЕНЕНИЕ СОСТОЯНИЯ ОТОБРАЖЕНИЯ КОЛИЧЕСТВА ДОКУМЕНТОВ**********
  const [more, setMore] = useState(2)
  const clickMore = () => {
    setMore(more + 4)
    // console.log("more" + more)
  }

  //**********ФУНКЦИЯ ПОИСКА ПУБЛИКАЦИЙ ПО ИХ ID**********
  const [document, setDocument] = useState("")
  const urlDocuments = "/documents"
  useEffect(() => {
    if (documents) documentsResponse()
  }, [documents])


  const documentsResponse = (event) => {
    // event.preventDefault()
    instance({
      method: 'post',
      url: urlDocuments,
      data: {
        "ids": ids
      },
      headers: {
        'Authorization': `Bearer ${initToken}`
      }
    })
      .then(response => {
        const rezult = response.data
        // console.log("Данные по документам = ", rezult)
        setDocument(rezult)
        localStorage.setItem("document", JSON.stringify(rezult))
        // console.log("document", document)
      })
      .catch(error => {
        // console.log('Ошибка выгрузки документов', error.response);
      });
  }

  const itemsOk = Object.values(document).map(items => items.ok)
  const typeNews = Object.values(itemsOk).map(items => items.entities).map(values => values.companies)
  const typeNewsTags = Object.values(typeNews).map((value) => value[0])
  const typeNewsTagsssss = Object.values(typeNewsTags).map((value) => value.tags)
  const markup = itemsOk.map(item => (item.content)).map(value => (value.markup))
  const test = itemsOk.slice(0, more)
  return (
    <>
      {loader ? (<Loader />) : (
        <div className={css.publications}>
          <div className={css.bulletin}>
            <h3>Список документов</h3>
            <div className={css.documentation}>
              {Object.values(test).map((item, index) => {
                const stringDate = item.issueDate
                const date = new Date(stringDate)
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = (date.getDate()).toString().padStart(2, '0');
                const newDate = `${day}.${month}.${date.getFullYear()}`

                const imageUrl = getUrl(markup[index]);
                const content = getContent(markup[index]);
                return (

                  <div className={css.card}>
                    <p className={css.dataPublication}>{newDate}<span>{item.source.name}</span></p>
                    <div className={css.titleBlock}>
                      <p className={css.title}>{item.title.text}</p>
                      {(typeNewsTagsssss[index].length !== 0) && (<button className={css.btnNews}> {typeNewsTagsssss[index]}</button>)}
                    </div>
                    <div className={css.rezultImageblock}>
                      <img
                        src={imageUrl ? imageUrl : imageStart}
                        alt="Изображение публикации"
                        className={css.rezultImage}></img>
                    </div>

                    <p className={css.text}>{content}</p>

                    <div className={css.wordsCount}>
                      <a className={css.source} href={`${item.url}`} target="_blank">
                        Читать в источнике
                      </a>
                      <span>{item.attributes.wordCount} слова</span>
                    </div>
                  </div>

                )
              })}
            </div>

          </div>
          <button className={css.more} onClick={clickMore}>
            {more === test.length ? "Показать больше" : "Документов нет"}
          </button>
        </div>
      )}
    </>



  );
}

export default Documents
