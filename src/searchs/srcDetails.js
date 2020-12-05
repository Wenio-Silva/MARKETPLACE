import React from 'react';
const cheerio = require('react-native-cheerio');
const error = "Verifique sua conexão com a internet e tente novamente! ;-)"
export let detailsDataMean = [], detailsDataImgs = [], detailsDataInfo = [];

let DetailsDataBase = {
    "delivered": "SrBarato",
    "description": "** **************** ***************** ******************** ********************** *** ************ **********",
    "imgMean": "https://media.istockphoto.com/vectors/vector-tshirt-design-for-gamers-with-word-gg-it-is-the-abbreviation-vector-id954026166",
    "installment": "ou em 3x de R$ **,** sem juros",
    "priceBefore": "*********",
    "priceNow": "******",
    "title": "******************",
};
detailsDataMean.push(DetailsDataBase);

//For all functions get the html
let html = "";
export async function searchDetailsMean(link) {
    //clean the array
    detailsDataMean.splice(0, detailsDataMean.length);
    //add the data base for the DetailsScreen.js handler it
    detailsDataMean.push(DetailsDataBase);
    //search and load the html
    const base = "https://www.magazinevoce.com.br";
    const fullLink = base + link;
    const response = await fetch(fullLink).catch(() => {alert(error)});
    const htmlString = await response.text();
    // html to another functions
    html = htmlString;
    const $ = cheerio.load(htmlString);
    //clean the array
    detailsDataMean.splice(0, detailsDataMean.length);

    const title = $('.product > .hide-mobile').text();
    const imgMean = $('.product > .pgallery > div.photo.hide-mobile > img').attr('src');
    // prop delivery are incomplete
    const delivered = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .delivered-by-label > .seller').text();
    const priceBefore = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .p-through').text();
    const priceNow = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .p-price').text();
    const installment = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .p-installment').text();
    //const types = $('.product > .pdetailpage > .pdetailbox > .m-variations > ');

    const description = $('.product > .ptabs > .product-factsheet > .tab-content > .tab-pane.active > .tab.descricao > tbody > .attribute.level1 > td').text();
    
    const dataTotal = {title, imgMean, delivered, priceBefore, priceNow, installment, description, fullLink};
    detailsDataMean.push(dataTotal);
    
    searchDetailsImgs();
}

export async function searchDetailsImgs() { 
    detailsDataImgs.splice(0, detailsDataImgs.length);
    //load the html
    const $ = cheerio.load(html);

    //imgs aren't working
    // '.product > .pgallery > .pcarousel > div.jcarousel-container.jcarousel-container-horizontal > jcarousel-clip.jcarousel-clip-horizontal > ul > li'
    $('.jcarousel-container.jcarousel-container-horizontal > .jcarousel-clip.jcarousel-clip-horizontal > ul > li').each((i, e)=>{
        const id = i;
        const img = $(e).find('a > img').attr('src');

        const data = { id, img };
        detailsDataImgs.push(data);
    });
    console.log(detailsDataImgs);
}

export async function searchDetailsInfo(link) { 
    detailsDataInfo.splice(0, detailsDataInfo.length);
    //load the html
    const $ = html;
    
    const nav_tabs = $('.product > .ptabs > .product-factsheet > .nav.nav-tabs > li').each((i, e)=>{
        const tab = $(e).find('a').text();
    }) 
    const fichatecnica = '';

    const dataTotal = { imgs };
    detailsDataInfo.push(dataTotal);
    
    console.log(detailsDataInfo);
}