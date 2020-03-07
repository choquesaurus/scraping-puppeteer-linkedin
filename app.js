require('dotenv').config();
import '@babel/polyfill';
import RealizarOperacion from './operation/operations';
//const {RealizarOperacion}=require('./operation/operations');
import puppeteer from 'puppeteer';
(
    async()=>{
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
        //window.location.href='https://www.linkedin.com/mynetwork/invite-connect/connections/';
        await page.waitForSelector(listConnectionCard);
        
	






        
        const data=await page.evaluate(()=>
          
            
        [...document.querySelectorAll('.mn-connection-card')].map(e=> {
               let ocupacion=e.querySelector('.mn-connection-card__occupation').innerText
               let urlimage=e.querySelector('img').getAttribute('src')
               let nombre=e.querySelector('.mn-connection-card__name').innerText
                return {
                    nombre,
                    urlimage,
                    ocupacion
                }
            })
           // data.push({ocupacion: e.querySelector('.mn-connection-card__occupation').innerText})  
            )
            RealizarOperacion(data,process.env.operacion)
            
            //RealizarOperacion.default(data,process.env.operacion)
        //console.log(data);
            // const lista=await page.$$eval(listConnectionCard,lis=>lis.length);
            // const lista2=await page.$$eval(listConnectionCard);
            // const trabajo=await lista2[0].$eval('.mn-connection-card__occupation',el=>el.textContent)
            // console.log(trabajo)
            //   for (let index = 0; index < lista; index++) {
            //       let element = await lista[index].$eval('.mn-connection-card__occupation',el=>el.textContent);
            //       console.log(element)
                  
            //   }
       
           
    }
)();
