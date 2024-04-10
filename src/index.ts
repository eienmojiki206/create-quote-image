import nodeHtmlToImage from 'node-html-to-image';
import { getRandomColor } from './utils/random';

import colors, { Color } from './constants/color';

interface Quote {
  text: string;
  author: string;
}

export default async function createQuoteImage(
  quote: Quote,
  out: string,
  color?: Color
) {
  const { text, author } = quote;
  const appliedColor = color ?? getRandomColor();
  const { background, textColor, authorColor } = appliedColor;

  await nodeHtmlToImage({
    output: out,
    html: `<html>
        <head><html>
    <head>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:ital,wght@0,200..900;1,200..900&amp;display=swap" rel="stylesheet">
        <style>
            body {
                font-family: 'Source Code Pro', sans-serif;
                width: 1600px;
                height: 900px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                align-items: center;
                text-align: center;
                font-weight: 400;
                padding: 2em;
                background-color: ${background};
            }

            h1 {
                font-size: 4em;
                line-height: 1.5;
                font-weight: 700;
                color: ${textColor};
            }

            h1::before {
                content: '"';
                color: ${authorColor};
            }

            h1::after {
                content: '"';
                color: ${authorColor};
            }

            h2 {
                font-size: 3em;
                font-style: italic;
                color: ${authorColor};
            }
        </style>
    </head>

    <body>
        <div></div>
        <div>
            <h1>${text}</h1>
            <h2>${author}</h2>
        </div>
        <div></div>
    </body>
</html>
      `,
    puppeteerArgs: {
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
  });
}

createQuoteImage.colors = colors;
