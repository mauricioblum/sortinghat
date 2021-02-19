import { FormEvent, useState, useRef } from 'react';
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

  const sortHouse = (e: FormEvent) => {
    e.preventDefault();

    if (name.length <= 1 || name.match(/^[0-9]+$/) !== null) {
      alert('Digite um nome válido!');
      return;
    }

    const random = seedrandom(name);
    const houseNumber = getRandomInt(1, 4, random);
    const yourHouseIs = 'Sua casa é ';

    setResultColor('black');
    setResult('O chapéu está pensando.');

    setTimeout(() => {
      switch (houseNumber) {
        case 1:
          setResult(yourHouseIs + 'Grifinória');
          setResultColor('red');
          break;
        case 2:
          setResult(yourHouseIs + 'Sonserina');
          setResultColor('green');
          break;
        case 3:
          setResult(yourHouseIs + 'Corvinal');
          setResultColor('orange');
          break;
        case 4:
          setResult(yourHouseIs + 'Lufa Lufa');
          setResultColor('blue');
          break;
        default:
          setResult(yourHouseIs + 'Lufa Lufa');
          setResultColor('blue');
      }
      resultRef?.current?.scrollIntoView({ behavior: 'smooth' });
    }, 3000);
  };

  return (
    <div className="App">
      <img src="images/Hogwarts.webp" alt="hogwarts crest" height="150" />
      <h1 className="title">Descubra sua casa em Hogwarts</h1>
      <form>
        <input
          id="name"
          type="text"
          name="name"
          value={name}
          min={2}
          className="name"
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o seu nome completo"
        />
        <button
          type="submit"
          className="copperBtn generalBtn"
          onClick={sortHouse}
        >
          Ver a sua casa
        </button>
      </form>
      <div className={`result ${resultColor}`}>
        {result && (
          <>
            {result.includes('Lufa Lufa') && (
              <img
                src="images/Hufflepuff.webp"
                height="200"
                alt="house crest"
              />
            )}
            {result.includes('Corvinal') && (
              <img src="images/Ravenclaw.webp" height="200" alt="house crest" />
            )}
            {result.includes('Sonserina') && (
              <img src="images/Slytherin.webp" height="200" alt="house crest" />
            )}
            {result.includes('Grifinória') && (
              <img
                src="images/Gryffindor.webp"
                height="200"
                alt="house crest"
              />
            )}
            <h2
              ref={resultRef}
              className={result.includes('pensando') ? 'appendMovingDots' : ''}
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
