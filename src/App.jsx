import { createEffect, createSignal, For } from "solid-js";

function App() {
  const [cards, setCards] = createSignal([
    { id: 1, content: "🍕" },
    { id: 2, content: "🍕" },
    { id: 3, content: "🍔" },
    { id: 4, content: "🍔" },
    { id: 5, content: "🍟" },
    { id: 6, content: "🍟" },
    { id: 7, content: "🍦" },
    { id: 8, content: "🍦" },
  ]);

  const [flipped, setFlipped] = createSignal([]);

  const [currentFlipOne, setCurrentFlipOne] = createSignal(null);
  const [currentFlipTwo, setCurrentFlipTwo] = createSignal(null);

  const handleOnClickCard = (card) => {
    if (currentFlipOne() === null) {
      setCurrentFlipOne(card);
      return;
    } else if (currentFlipTwo() === null) {
      setCurrentFlipTwo(card);
    }
  };

  createEffect(() => {
    console.log("flipped", flipped());
    console.log("currentFlipOne", currentFlipOne());
    console.log("currentFlipTwo", currentFlipTwo());

    if (currentFlipOne() !== null && currentFlipTwo() !== null) {
      if (currentFlipOne().content === currentFlipTwo().content) {
        setFlipped([...flipped(), currentFlipOne(), currentFlipTwo()]);
      }
      setCurrentFlipOne(null);
      setTimeout(() => {
        setCurrentFlipTwo(null);
      }, 1000);
    }
  });

  return (
    <main>
      <h1>Match Pair Game</h1>
      <For each={cards()}>
        {(item) => (
          <Show
            when={
              !flipped().includes(item) &&
              currentFlipOne() !== item &&
              currentFlipTwo() !== item
            }
            fallback={<button>{item.content}</button>}
          >
            <button onClick={() => handleOnClickCard(item)}>👀</button>
          </Show>
        )}
      </For>
    </main>
  );
}

export default App;
