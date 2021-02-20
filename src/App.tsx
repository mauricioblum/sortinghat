import { FormEvent, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import './App.css';
import seedrandom from 'seedrandom';

function getRandomInt(min: number, max: number, randomFn: () => number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(randomFn() * (max - min)) + min;
}

function App() {
  const [name, setName] = useState('');
  const [result, setResult] = useState('');
  const [resultColor, setResultColor] = useState('black');
  const resultRef = useRef<HTMLHeadingElement>(null);

  const { t, i18n } = useTranslation();

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const sortHouse = (e: FormEvent) => {
    e.preventDefault();

    if (name.length <= 1 || name.match(/^[0-9]+$/) !== null) {
      alert(t('invalidName'));
      return;
    }

    const random = seedrandom(name);
    const houseNumber = getRandomInt(1, 5, random);
    const yourHouseIs = t('yourHouseIs');

    setResultColor('black');
    setResult(t('hatThinking'));

    setTimeout(() => {
      switch (houseNumber) {
        case 1:
          setResult(yourHouseIs + t('houses.gryffindor'));
          setResultColor('red');
          break;
        case 2:
          setResult(yourHouseIs + t('houses.slytherin'));
          setResultColor('green');
          break;
        case 3:
          setResult(yourHouseIs + t('houses.ravenclaw'));
          setResultColor('blue');
          break;
        case 4:
          setResult(yourHouseIs + t('houses.hufflepuff'));
          setResultColor('orange');
          break;
        default:
          setResult(yourHouseIs + t('houses.hufflepuff'));
          setResultColor('orange');
      }
      resultRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
  };

  return (
    <div className="App">
      <div className="langSelector">
        <button type="button" onClick={() => changeLanguage('en')}>
          EN
        </button>
        <button type="button" onClick={() => changeLanguage('pt')}>
          PT
        </button>
      </div>

      <img src="images/Hogwarts.webp" alt="hogwarts crest" height="150" />
      <h1 className="title">{t('title')}</h1>
      <form>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          min={2}
          className="name"
          onChange={(e) => setName(e.target.value)}
          placeholder={t('inputPlaceholder')}
        />
        <button
          type="submit"
          className="copperBtn generalBtn"
          onClick={sortHouse}
        >
          {t('inputText')}
        </button>
      </form>
      <div className={`result ${resultColor}`}>
        {result && (
          <>
            {result.includes(t('houses.hufflepuff')) && (
              <img
                src="images/Hufflepuff.webp"
                height="200"
                alt="house crest"
              />
            )}
            {result.includes(t('houses.ravenclaw')) && (
              <img src="images/Ravenclaw.webp" height="200" alt="house crest" />
            )}
            {result.includes(t('houses.slytherin')) && (
              <img src="images/Slytherin.webp" height="200" alt="house crest" />
            )}
            {result.includes(t('houses.gryffindor')) && (
              <img
                src="images/Gryffindor.webp"
                height="200"
                alt="house crest"
              />
            )}
            <h2
              ref={resultRef}
              className={
                result.includes(t('hatThinking'))
                  ? 'loading appendMovingDots'
                  : 'house'
              }
            >
              {result}
            </h2>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
