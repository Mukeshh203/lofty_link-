import { useEffect, useState } from "react";
import bgMobile from "../images/bg-shorten-mobile.svg";
import bgDesktop from "../images/bg-shorten-desktop.svg";

const getLocalStorage = () => {
  let shortLink = localStorage.getItem("shortLink");

  if (shortLink) {
    return JSON.parse(localStorage.getItem("shortLink"));
  } else {
    return [];
  }
};

export default function Shortener() {
  const [longURL, setLongUrl] = useState("");
  const [shortLink, setShortLink] = useState(getLocalStorage());
  const [buttonText, setButtonText] = useState("Copy");

  function handleChange(e) {
    setLongUrl(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!longURL) {
      alert("Input is empty");
    } else {
      await fetch("https://api-ssl.bitly.com/v4/shorten", {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,

          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          long_url: longURL,
          domain: "bit.ly",
          group_guid: `${process.env.REACT_APP_BITLY_GUID}`,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          const new_link = data.link.replace("https://", "");
          fetch(
            `https://api-ssl.bitly.com/v4/bitlinks/${new_link}/qr?image_format=png`,
            {
              mode: "cors",
              headers: {
                Authorization: `Bearer ${process.env.REACT_APP_BITLY_TOKEN}`,
              },
            }
          )
            .then((response) => response.json())
            .then((result) => {
              setShortLink(result);
            });
        });
      setLongUrl("");
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shortLink.link);
    setButtonText("Copied!");
  };

  useEffect(() => {
    localStorage.setItem("shortLink", JSON.stringify(shortLink));
  }, [shortLink]);

  return (
    <>
      <section className="max-width shortener relative mb-2">
        <picture>
          <source media="(min-width: 768px)" srcSet={bgDesktop} />
          <img src={bgMobile} alt="" />
        </picture>

        <form className="form" onSubmit={handleSubmit}>
          <div className="flex flex-col md:flex-row">
            <input
              type="url"
              placeholder="Get your loftyLINK"
              className="w-full py-2 px-5 rounded-lg mb-2 md:mb-0 md:w-2/3"
              value={longURL}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="btn-cta rounded-lg w-full md:w-40 md:ml-5 focus:bg-slate-500"
              onClick={handleSubmit}
            >
              Shorten It!
            </button>
          </div>
        </form>

        <div className="flex flex-col items-center justify-center bg-white text-center md:flex-row md:justify-between p-0 mt-3 rounded-lg">
          <article>
            <img src={shortLink.qr_code} alt=" " height={100} width={300} />
          </article>

          <article>
            <ul className="md:flex md:items-center ">
              <li className="md:mr-0 flex-center">
                <button className="text-slate-700 md:mr-20 sm:pb-10 font-black">
                  {shortLink.link}
                </button>
              </li>
              <li>
                <button
                  onClick={handleCopy}
                  className="btn-cta rounded-lg text-sm sm:mb-10 focus:bg-slate-500 mr-10  "
                >
                  {buttonText}
                </button>
              </li>
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
