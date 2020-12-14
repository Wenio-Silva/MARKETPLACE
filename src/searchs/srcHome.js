import React from 'react';
const cheerio = require('react-native-cheerio');
// import { HomeScreen } from './pages/homeScreen';
// import { called } from './pages/searchScreen';
const baseURL = "https://www.magazinevoce.com.br/magazinesrbarato/";
const error = "Verifique sua conexão com a internet e tente novamente! ;-)"
export let homeData = [];

//HomePage's products
export async function searchMain() { 
    //clean the array
    homeData.splice(0, homeData.length);
    //search and load the html
    const response = await fetch(baseURL).catch(() => {alert(error)});
	const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    $('ol.g-items li').each((i, e) => { 
        const id = i;
        const title = $(e).find('.g-desc > a > h3').text();
        const image = $(e).find('.g-img-wrapper > img').attr("data-original");
        const price = $(e).find('.g-desc > .g-price').text();
        const installment = $(e).find('.g-desc > .g-installment').text();
        const link = "https://www.magazinevoce.com.br" + $(e).find('.g-img-wrapper').attr("href");

        const data = {id, title, image, price, installment, link};
        homeData.push(data);
    });
}
searchMain();
