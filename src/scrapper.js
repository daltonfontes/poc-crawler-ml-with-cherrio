import { gotScraping } from 'got-scraping';
import * as cheerio from 'cheerio';
import { BASE_URL, MAX_PAGES } from './config.js';
import { sanitizeText } from './utils.js';
import { saveToDatabase } from './db.js';
import { queue } from 'async';

async function scrapePage(url) {
  try {
    console.log(`Raspando a página: ${url}`);
    const response = await gotScraping({ url, https: { rejectUnauthorized: false } });
    const html = response.body;
    const $ = cheerio.load(html);

    const itemList = [];
    const products = $('.promotion-item');

    products.each((index, product) => {
      const titleElement = $(product).find('.promotion-item__title');
      const name = sanitizeText(titleElement.text());

      const priceElement = $(product).find('.andes-money-amount__fraction').eq(0);
      const price = `R$: ${sanitizeText(priceElement.text())}`;

      const link = sanitizeText($(product).find('a.promotion-item__link-container').attr('href'));

      const image = sanitizeText($(product).find('.promotion-item__img-container img').attr('src'));

      itemList.push({ name, price, image, link });
    });

    return { itemList, $ };
  } catch (error) {
    console.error(`Erro ao buscar a página ${url}:`, error);
    return { itemList: [], $: null };
  }
}

function getNextPageUrl($) {
  const nextPageButton = $('a.andes-pagination__link[title="Próxima"]').attr('href');
  return nextPageButton ? `https://www.mercadolivre.com.br${nextPageButton}` : null;
}

export async function scrapeAllPages() {
  const q = queue(async (url, callback) => {
    const { itemList, $ } = await scrapePage(url);
    saveToDatabase(itemList);
    callback(null, $);
  }, 2);

  let currentPageUrl = BASE_URL;
  let pageCount = 0;

  q.drain(() => {
    console.log('Raspagem completa.');
  });

  while (currentPageUrl && pageCount < MAX_PAGES) {
    q.push(currentPageUrl, (err, $) => {
      if ($) {
        currentPageUrl = getNextPageUrl($);
      } else {
        currentPageUrl = null;
      }
    });
    pageCount++;
  }

  await q.drain();
}
