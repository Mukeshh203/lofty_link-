import { useState } from "react";
// import {ReactComponent as logo} from '../images/logo.svg'
import logo from "../images/logo.png";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <header className="header max-width py-5">
        <div className="flex items-center justify-between">
          <article className="flex items-center">
            <ul className="mt-5">
              <li>
                <img src={logo} alt=" logo " height={40} width={200} />
              </li>
            </ul>

            <nav className="hidden md:block md:ml-5">
              <ul className="flex items-start justify-start">
                <li>
                  <button className="text-slate-800">Features</button>
                </li>
                <li className="my-5 md:my-0 md:mx-5">
                  <button className="text-slate-800">Pricing</button>
                </li>
                <li>
                  <button className="text-slate-800">Resources</button>
                </li>
              </ul>
            </nav>
          </article>

          {isOpen && (
            <div className="absolute left-5 right-5 top-20 rounded bg-slate-900 text-slate-200 text-center py-10 md:relative md:top-0 md:left-0 md:right-0 md:bg-transparent md:text-slate-700 md:text-left md:py-0 md:flex md:items-center">
              <nav className="md:hidden">
                <ul className="flex flex-col items-center justify-center mt-0 ">
                  <li>
                    <button>Features</button>
                  </li>
                  <li className="my-5">
                    <button>Pricing</button>
                  </li>
                  <li>
                    <button>Resources</button>
                  </li>
                </ul>
              </nav>
              <ul className="flex flex-col items-center justify-center mt-0 ">
                <li className="my-5">
                  <button className="text-slate-800">Login</button>
                </li>
                <li>
                  <button className="btn-cta rounded-full">Sign Up</button>
                </li>
              </ul>
            </div>
          )}

          <div className="hidden md:block">
            <ul className="flex items-center ml-5">
              <li className="my-5 md:my-0 md:mr-5">
                <button className="text-slate-800">Login</button>
              </li>
              <li>
                <button className="btn-cta rounded-full">Sign Up</button>
              </li>
            </ul>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="uppercase text-sm tracking-wide md:hidden"
          >
            {isOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>
    </>
  );
}
