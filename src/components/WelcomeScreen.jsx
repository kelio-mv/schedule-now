import "./WelcomeScreen.css";

export default function Tutorial(props) {
  Notification.requestPermission();

  return (
    <div id="first-time-screen">
      <img className="logo" src="today.png" />
      <h1 className="title">Seja bem-vindo(a)</h1>
      <p>
        Oii, me chamo Kélio, e eu desenvolvi esse aplicativo com o intuito de ajudar as pessoas a
        organizarem sua rotina e suas tarefas em um só lugar.
      </p>
      <p>
        Clique em "permitir" no canto superior esquerdo da tela, para que eu possa te notificar
        quando chegar a hora de uma determinada tarefa.
      </p>
      <p>Espero que goste :)</p>
      <button
        className="start-btn"
        onClick={() => {
          localStorage.setItem("tasks", "[]");
          props.onClose();
        }}
      >
        Começar
      </button>
    </div>
  );
}
