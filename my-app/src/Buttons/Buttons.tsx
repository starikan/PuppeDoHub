import React, { useState } from 'react';

type TButton = { id: string; name: string };

function Buttons() {
  const [buttons] = useState([
    { id: 'runServer', name: 'Запуск сервера PuppeDo' },
    { id: 'argsInit', name: 'Инициализация аргументов' },
    { id: 'getAllTestsData', name: 'Получить все данные тестов' },
    { id: 'createEnvs', name: 'Запустить Environments' },
    { id: 'setCurrentTest', name: 'Установить текущий тест' },
    { id: 'runCurrentTest', name: 'Запустить текущий тест' },
  ] as TButton[]);

  const clickButtonHandler = (v: TButton) => {
    console.log(v.id);
  };

  const stylesContainer: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: 200,
  };

  const stylesButtons: React.CSSProperties = {
    width: 200,
  };

  return (
    <div style={stylesContainer}>
      {buttons.map((v) => {
        return (
          <button id={v.id} key={v.id} onClick={clickButtonHandler.bind(null, v)} style={stylesButtons}>
            {v.name}
          </button>
        );
      })}
    </div>
  );
}

export default Buttons;
