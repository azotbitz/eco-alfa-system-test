import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {error, getItemSelector, loader} from "../redux/reducer/itemSelector";
import {loadItem} from "../redux/reducer/itemReducer";
import {deleteItems} from "../redux/actions";

const HomePage = () => {
    const items = useSelector(getItemSelector);
    const dispatch = useDispatch();
    const loading = useSelector(loader);
    const err = useSelector(error);
    const [isVisible, setIsVisible] = useState(true)





    useEffect(() => {
        dispatch(loadItem())


    }, [dispatch])

    const toggleLike = (e) => {
        if(e.target.classList.contains('love--active')){
            e.target.classList.remove('love--active')
        } else {
            e.target.classList.add('love--active')
        }
    }

    const toggleDelete = (id) => {
        dispatch(deleteItems(id))
    }


    const filterLike = () => {
        setIsVisible(!isVisible);
        let display = isVisible ? 'none' : 'flex';

        const cardAll = document.querySelectorAll('.card--product')
        cardAll.forEach(card => {
            if(!card.firstChild.firstChild.firstChild.firstChild.classList.contains('love--active')){
                card.style.display = display
            }
        })
    }

    if(loading) {
        return (
            <div><h2>Загрузка...</h2></div>
        )
    }

    if(err) {
        return (
            <div>
                <h2>Ошибка</h2>
                <button onClick={() => dispatch(loadItem())}>Перезагрузить страницу</button>
            </div>
        )
    }



    return (
        <>
            <div className="selections--page">

                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h2 className="text-white pt-5">Товары</h2>
                        </div>
                    </div>


                    <div className="row mt-4">
                        <div className="col-12">
                            <label style={{color: 'white'}} className={'filter d-flex justify-content-end mb-3'}>
                                Фильтр по лайкам
                                <input onChange={filterLike} style={{marginLeft: '5px'}} type={"checkbox"}/>
                            </label>
                            <div className="card--product--wrapper">

                                {items.map((item) => {
                                    return (
                                            <div style={{display: 'flex'}} key={item.id} className={`card--product justify-content-center align-items-center flex-column p-3`}>
                                                <div className="card--content card--image mb-3"
                                                     style={{backgroundImage: `url(${item.thumbnail})`}}>
                                                    <div className="love--wrapper" onClick={(e) => toggleLike(e)}>
                                                        <svg className="love--svg" width="18" height="15" viewBox="0 0 18 15"
                                                             fill="none"
                                                             xmlns="http://www.w3.org/2000/svg">
                                                            <path className="love"
                                                                  d="M13.2188 0C12.242 0 11.3465 0.292168 10.5572 0.868407C9.80044 1.42085 9.29661 2.12449 9 2.63615C8.70339 2.12446 8.19956 1.42085 7.44282 0.868407C6.6535 0.292168 5.758 0 4.78125 0C2.05552 0 0 2.10455 0 4.89538C0 7.91044 2.5644 9.97331 6.44657 13.0962C7.10582 13.6265 7.85306 14.2277 8.62973 14.8688C8.73211 14.9534 8.86359 15 9 15C9.13641 15 9.26789 14.9534 9.37027 14.8688C10.147 14.2276 10.8942 13.6265 11.5539 13.0959C15.4356 9.97331 18 7.91044 18 4.89538C18 2.10455 15.9445 0 13.2188 0Z"
                                                                  />
                                                        </svg>
                                                    </div>
                                                    <div className="bin--wrapper" onClick={() => toggleDelete(item.id)}>
                                                        <svg className="bin--svg" fill="none" xmlns="http://www.w3.org/2000/svg"
                                                             width="18" height="15" viewBox="0 0 439.039 439.039">
                                                            <path className="bin" d="M369.514,49.094H69.525c-6.903,0-12.5,5.597-12.5,12.5v50.561c0,6.904,5.597,12.5,12.5,12.5h8.529l34.731,303.308
                                                                    c0.723,6.312,6.065,11.076,12.419,11.076h188.627c6.354,0,11.695-4.766,12.418-11.076l34.733-303.309h8.529
                                                                    c6.903,0,12.5-5.596,12.5-12.5v-50.56C382.014,54.691,376.417,49.094,369.514,49.094z M82.025,74.094h274.988v25.561h-7.18H89.206
                                                                    h-7.18V74.094z M302.682,414.041H136.355l-33.137-289.385H335.82L302.682,414.041z M382.014,27.625c0,6.903-5.598,12.5-12.5,12.5
                                                                    c-4.172,0-7.867-2.044-10.138-5.186h-0.819h-5.828h-54.453h-4.568H79.664c-2.271,3.142-5.966,5.186-10.138,5.186
                                                                    c-6.903,0-12.5-5.597-12.5-12.5v-5.186c0-6.903,5.597-12.5,12.5-12.5h216.512C287.22,4.264,292.251,0,298.275,0h54.453
                                                                    c6.025,0,11.056,4.264,12.237,9.939h4.548c6.903,0,12.5,5.597,12.5,12.5V27.625L382.014,27.625z"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                                <div
                                                    className="card--title justify-content-center flex-column">
                                                    <h5 className={'text-center'}>{item.brand}</h5>
                                                    <p className="w-100 text-center m-0 card--title-name">{item.title}</p>
                                                    <div className="w-100 d-flex justify-content-around">
                                                        <div className={'d-flex'}>
                                                            <div className="justify-content-center align-items-center me-4 text-center">
                                                                <p className={'justify-content-center'}>Цена:</p>
                                                                <span className="card--price">{item.price}</span>
                                                            </div>
                                                            <div className="justify-content-center align-items-center text-center">
                                                                <p className={'justify-content-center'}>Рейтинг:</p>
                                                                <span>{item.rating}</span>
                                                            </div>
                                                            <div className="justify-content-center align-items-center ms-4 text-center">
                                                                <p className={'justify-content-center'}>Остаток:</p>
                                                                <span className="card--bonus">{item.stock}</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                    )})}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HomePage;