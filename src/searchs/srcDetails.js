import React from 'react';
const cheerio = require('react-native-cheerio');
const error = "Verifique sua conexão com a internet e tente novamente! ;-)"
export let detailsDataMean = [], detailsDataImgs = [], detailsDataInfo = [];
//For all functions get the html 
let html = "";
//DetailsPage's products

export async function searchDetailsMean(link) {
    //clean the array
    detailsDataMean.splice(0, detailsDataMean.length);
    //search and load the html
    console.log(link);
    const base = "https://www.magazinevoce.com.br";
    const response = await fetch(base + link).catch(() => {alert(error)});
	const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    html = $;

    const title = $('.product > .hide-mobile').text();
    const imgMean = $('.product > .pgallery > .photo.hide-mobile > img').attr('src');

    // prop delivery are incomplete
    const delivered = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .delivered-by-label > .seller').text();
    const priceBefore = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .p-through').text();
    const priceNow = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .p-price').text();
    const installment = $('.product > .pdetailpage > .pdetailbox > .product-info-container > .info > .p-installment').text();
    //const types = $('.product > .pdetailpage > .pdetailbox > .m-variations > ');

    const description = $('.product > .ptabs > .product-factsheet > .tab-content > .tab-pane.active > .tab.descricao > tbody > .attribute.level1 > td').text();
    
    const dataTotal = {title, imgMean, delivered, priceBefore, priceNow, installment, description};
    detailsDataMean.push(dataTotal);
    
    console.log(detailsDataMean);
}

export async function searchDetailsImgs(link) { 
    detailsDataImgs.splice(0, detailsDataImgs.length);
    //load the html
    const $ = html;

    //imgs aren't working
    let imgs = [];
    $('.product > .pgallery > .pcarousel > div.jcarousel-container.jcarousel-container-horizontal > jcarousel-clip.jcarousel-clip-horizontal > ul > li').each((i, e)=>{
        const img = $(e).find('a > img').attr('src');

        imgs.push(img);
    });

    const dataTotal = { imgs };
    detailsDataImgs.push(dataTotal);
    
    console.log(detailsDataImgs);
}

export async function searchDetailsInfo(link) { 
    detailsDataInfo.splice(0, detailsDataInfo.length);
    //load the html
    const $ = html;
    
    const nav_tabs = $('.product > .ptabs > .product-factsheet > .nav nav-tabs > li').each((i, e)=>{
        const tab = $(e).find('a').text();
    }) 
    const fichatecnica = '';

    const dataTotal = { imgs };
    detailsDataInfo.push(dataTotal);
    
    console.log(detailsDataInfo);
}