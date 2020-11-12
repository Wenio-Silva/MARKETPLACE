import React from 'react';
const cheerio = require('react-native-cheerio');
// import { HomeScreen } from './pages/homeScreen';
// import { called } from './pages/searchScreen';
const baseURL = "https://www.magazinevoce.com.br/magazinesrbarato/";
const error = "Verifique sua conexão com a internet e tente novamente! ;-)"
export let homeData = [], searchData = [], detailsData = [];

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
        const link = $(e).find('.g-img-wrapper').attr("href");

        const data = {id, title, image, price, installment, link};
        homeData.push(data);
    });
}
searchMain();

//searchPage's products

// Handle the user search
export function handle(UserSearch) {
    const addString = "busca/";
    const handleUS = UserSearch.replace(/ /g, "%20");
    
    const urlHandled = baseURL+addString+handleUS;
    searchSecond(urlHandled);
}

async function searchSecond(URL) { 
    //clean the array
    searchData.splice(0, searchData.length);
    //search and load the html
    const response = await fetch(URL).catch(() => {alert(error)});
	const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    $('ol.g-items li').each((i, e) => { 
        const id = i;
        const title = $(e).find('.g-desc > a > h3').text();
        const image = $(e).find('.g-img-wrapper > img').attr("data-original");
        const price = $(e).find('.g-desc > .g-price').text();
        const installment = $(e).find('.g-desc > .g-installment').text();
        const link = $(e).find('.g-img-wrapper').attr("href");

        const data = {id, title, image, price, installment, link};
        searchData.push(data);
    })
};

//DetailsPage's products
export async function searchDetails(link) {
    //clean the array
    detailsData.splice(0, detailsData.length);
    //search and load the html
    console.log(link);
    const base = "https://www.magazinevoce.com.br";
    const response = await fetch(base + link).catch(() => {alert(error)});
	const htmlString = await response.text();
    const $ = cheerio.load(htmlString);

    const title = $('.product > .hide-mobile').text();
    const imgMean = $('.product > .pgallery > .photo.hide-mobile > img').attr('src');
    //imgs aren't working
    /*const imgs = $('.product > .pgallery > .pcarousel > div.jcarousel-container.jcarousel-container-horizontal > jcarousel-clip.jcarousel-clip-horizontal > ul > li').each((i, e)=>{
        const img = $(e).find('a').attr('href');

        const data = {img};
        imgs.push(data);
        console.log("CONTAAAAA");
    });*/

    // prop delivery are incomplete
    const delivered = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .delivered-by-label').text();
    const priceBefore = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .p-through').text();
    const priceNow = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .p-price').text();
    const installment = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .p-installment').text();
    //Add some conditionals // Just will be renderized if the user to want, for save internet
    //const types = $('.product > .pdetailpage > .pdetailbox > .m-variations > ');

    /*const nav_tabs = $('.product > .ptabs > .product-factsheet > .nav nav-tabs > li').each((i, e)=>{
        const tab = $(e).find('a').text();
    }) */

    const description = $('.product > .ptabs > .product-factsheet > .tab-content > .tab-pane.active > .tab.descricao > tbody > .attribute.level1 > td').text();
    
    const dataTotal = {title, imgMean, delivered, priceBefore, priceNow, installment, description};
    detailsData.push(dataTotal);
    
    console.log(detailsData);
}