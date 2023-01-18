import "./assets/style.css";
import pause__mobile from "./assets/images/pattern-divider-mobile.svg";
import pause__desktop from "./assets/images/pattern-divider-desktop.svg";
import icon__dice from "./assets/images/icon-dice.svg";
import {useEffect, useState} from "react";

function App() {
    const [advice, setAdvice] = useState("");
    const [error, setError] = useState("");
    let id = Math.floor(Math.random() * 200 +1);

    useEffect(() => {
        async function fetchdata() {
            const response = await fetch(`https://api.adviceslip.com/advice/${id}`, {
                method: "GET",
                headers: {"Content-Type": "text/plain"}
            });
            const data = await response.json();
            await setAdvice(data.slip);
        }

        fetchdata().catch(err => {
            setError(err);
        });
    }, [])

    const randomAdviceHandler = (e) => {
        e.preventDefault();
        let id = Math.floor(Math.random() * 200 + 1)
        async function fetchdata() {
            const response = await fetch(`https://api.adviceslip.com/advice/${id}`, {
                method: "GET",
                headers: {"Content-Type": "text/plain"}
            });
            const data = await response.json();
            await setAdvice(data.slip);
        }
        fetchdata().catch(err => {
            setError(err);
        });
    }

  return (
      <>
          {error ? <div className="card__error">
               <p>{error}</p>
          </div> : ""}
      <div className="card__position">
        <div className="card__container">
            <header className="header">ADVICE #{advice.id}</header>
            <div className="card__advice__text">
                <p>{advice.advice}</p>
            </div>
            <div className="line__pause">
                <img src={pause__mobile} alt="pause" />
            </div>
            <div className="line__pause__desktop">
                <img src={pause__desktop} alt="pause" />
            </div>
            <button className="circle__btn" onClick={randomAdviceHandler}><img src={icon__dice} alt="dice" /></button>
        </div>
      </div>
      </>
  );
}

export default App;
