require('dotenv').config();
import '@babel/polyfill';
//import RealizarOperacion from './operation/operations';
//const {RealizarOperacion}=require('./operation/operations');
import scrollPageToBottom from 'puppeteer-autoscroll-down';
import puppeteer from 'puppeteer';

async function  Init(){
        const browser=await puppeteer.launch({headless:false});
        const page=await browser.newPage();
        await page.goto('https://www.linkedin.com/login');
      
        /*
        const Searchtitle=await page.$('h1');
        const title=await page.evaluate(data=>data.textContent,Searchtitle);
        */
        // const title2=await page.$eval('h1',data=>data.textContent);
        // console.log(title2);
        const inputUser='#username';
        const inputPass='#password';
        const listConnectionCard='.mn-connection-card';
        await page.waitForSelector(inputUser)
        await page.waitForSelector(inputUser)
        
        await page.type(inputUser,process.env.usuario)
        await page.type(inputPass,process.env.password)
        await page.click('.btn__primary--large');
        await page.goto('https://www.linkedin.com/mynetwork/invite-connect/connections/')
        const lastPosition = await scrollPageToBottom(page)
        console.log(`lastPosition: ${lastPosition}`)
        //await page.goto('https://www.linkedin.com/search/results/people/?facetConnectionOf=%5B%22ACoAACKn2EUB7RCzmHTGJTXizkeVg9ToXsTUu_8%22%5D&facetNetwork=%5B%22F%22%2C%22S%22%5D&origin=MEMBER_PROFILE_CANNED_SEARCH')
        //window.location.href='https://www.linkedin.com/mynetwork/invite-connect/connections/';
      //   await page.evaluate( () => {
      //     window.scrollBy(0, window.innerHeight);
      // });
        await page.waitForSelector(listConnectionCard);
        const data=await page.evaluate(()=>
        [...document.querySelectorAll(".mn-connection-card")].map(e=> {
          let ocupacion=e.querySelector('.mn-connection-card__occupation').innerText
               let urlimage=e.querySelector('img').getAttribute('src')
               let nombre=e.querySelector('.mn-connection-card__name').innerText
                return {
                    nombre,
                    urlimage,
                    ocupacion
                }
            })
            )
            await page.close();
            await browser.close();
           return data;   
    };
export default Init;
//Init();
//go();