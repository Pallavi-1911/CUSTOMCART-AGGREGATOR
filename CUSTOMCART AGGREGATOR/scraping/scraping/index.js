const puppeteer = require("puppeteer");
const fs = require("fs");

async function scrapeGoogleSearch({ url, color, category }) {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    await page.waitForSelector(".sh-dgr__grid-result");

    const results = await page.evaluate(
      ({ color, category }) => {
        const items = document.querySelectorAll(".sh-dgr__grid-result");
        const data = [];
        items.forEach((item) => {
          const titleElement = item.querySelector(".tAxDx");
          const priceElement = item.querySelector(".a8Pemb");
          const linkElement = item.querySelector("a");
          const platformElement = item.querySelector(".aULzUe");
          const imageElement = item.querySelector("img");

          if (
            titleElement &&
            priceElement &&
            linkElement &&
            platformElement &&
            imageElement
          ) {
            const title = titleElement.textContent.trim();
            const price = priceElement.textContent.trim().substring(1);
            const link = linkElement.href;
            const platform = platformElement.textContent.trim();
            const imageUrl = imageElement.src;
            data.push({
              title,
              price,
              link,
              platform,
              imageUrl,
              color,
              category,
            });
          }
        });
        return data;
      },
      { color, category }
    );

    await browser.close();
    return results;
  } catch (error) {
    console.error("Error scraping Google search:", error);
    return [];
  }
}

async function main() {
  // const categories = [
  //   {
  //     color: "red",
  //     name: "red bedroom",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&biw=1536&bih=793&tbm=shop&sxsrf=ACQVn0_4v9JfKW6I6ImEyjxrHt7Kv-D6vQ%3A1712082380781&q=red%20bedroom%20furniture%20under%2015000&tbs=mr%3A1%2Cprice%3A1%2Cppr_min%3A0%2Cppr_max%3A15000&ei=zE0MZo_0Lrmmvr0Pja24-AU&ved=0ahUKEwiPiofxk6SFAxU5k68BHY0WDl8QuisI1wYoBQ",
  //   },
  //   {
  //     color: "green",
  //     name: "green bedroom",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=green%20bedroom%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  //   {
  //     color: "blue",
  //     name: "blue bedroom",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=blue%20bedroom%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  //   {
  //     color: "yellow",
  //     name: "yellow bedroom",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=yellow%20bedroom%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  //   {
  //     color: "red",
  //     name: "red living room",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=red%20living%20room%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  //   {
  //     color: "green",
  //     name: "green living room",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=green%20living%20room%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  //   {
  //     color: "blue",
  //     name: "blue living room",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=blue%20living%20room%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  //   {
  //     color: "yellow",
  //     name: "yellow living room",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=yellow%20living%20room%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  //   {
  //     color: "red",
  //     name: "red Balcony",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=red%20balcony%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  //   {
  //     color: "green",
  //     name: "green Balcony",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=green%20balcony%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  //   {
  //     color: "blue",
  //     name: "blue Balcony",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=blue%20balcony%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  //   {
  //     color: "yellow",
  //     name: "yellow Balcony",
  //     url:
  //       "https://www.google.com/search?sca_esv=aa28fc080d8e673c&tbm=shop&sxsrf=ACQVn08tqHnPpQKtlA5EQsve7LYBRxe1og:1711315938977&q=yellow%20balcony%20furniture%20under%2015000&tbs=mr:1,price:1,ppr_max:15000,merchagg:g140768507|g11214002|g114495872|m141020976|m523703932|m129695232&sa=X&ved=0ahUKEwjF48bu8I2FAxXFXmwGHUQ5CtEQsysIgAcoEA&biw=1523&bih=787&dpr=1.25",
  //   },
  // ];
  // let allResults = [];
  // for (const category of categories) {
  //   const results = await scrapeGoogleSearch({
  //     url: category.url,
  //     color: category.color,
  //     category: category.name,
  //   });

  //   allResults = allResults.concat(results);

  //   console.log(`Scraped data for ${category.name}`);
  // }

  // const jsonData = JSON.stringify(allResults, null, 2);

  // fs.writeFileSync(`./data/all_results.json`, jsonData);

  // console.log("All data saved to all_results.json");

  function filterData(filePath, key, maxLength) {
    try {
      // Read the JSON file
      const jsonData = fs.readFileSync(filePath, "utf8");

      // Parse the JSON data
      let data = JSON.parse(jsonData);

      // Filter out objects where the value of the specified key has length greater than maxLength
      data = data.filter((item) => item[key].length <= maxLength);

      // Write the filtered data back to the file
      fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

      console.log("Filtered data written to file successfully.");
    } catch (error) {
      console.error("Error filtering data:", error);
    }
  }
  function getUniqueValuesFromFile(filePath, key) {
    try {
      // Read the JSON file
      const jsonData = fs.readFileSync(filePath, "utf8");

      // Parse the JSON data
      const data = JSON.parse(jsonData);

      // Create a Set to store unique values
      const uniqueValues = new Set();

      // Iterate over each object in the data array
      data.forEach((item) => {
        // Add the value of the specified key to the Set
        uniqueValues.add(item[key]);
      });

      // Convert the Set back to an array
      return Array.from(uniqueValues);
    } catch (error) {
      console.error("Error reading JSON file:", error);
      return [];
    }
  }

  // Example usage:
  const filePath = "./data/all_results.json"; // Change this to your JSON file path
  const key = "platform"; // Change this to the key for which you want unique values
  const uniqueValues = getUniqueValuesFromFile(filePath, key);
  console.log(uniqueValues);
  const maxLength = 59; // Change this to the maximum length allowed
  filterData(filePath, key, maxLength);
}

main();
