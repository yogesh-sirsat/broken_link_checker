import { load as cheerioLoad } from "cheerio";
import axios from "axios";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  if (!url) {
    return new Response("No URL provided", { status: 400 });
  }

  try {
    const response = await axios.get(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/108.0.0.0 Safari/537.36",
      },
    });
    const $ = cheerioLoad(response.data);

    const links = $("a")
      .map((_, element) => $(element).attr("href"))
      .get();

    const invalidLinks = await Promise.all(
      links.map(async (link) => {
        try {
          if (link.startsWith("#", 0) || link === "/") {
            return null;
          }

          const linkUrl = new URL(link, url);
          const response = await fetch(linkUrl, {
            method: "HEAD",
          });

          if (response.status === 404) {
            return linkUrl.href;
          }
          return null;
        } catch {
          return null;
        }
      })
    );

    const filteredInvalidLinks = invalidLinks.filter(
      (link) => link !== null
    );
    return new Response(
      JSON.stringify({
        invalidLinks: filteredInvalidLinks,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
