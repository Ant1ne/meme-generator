import React, {useEffect, useState} from 'react';
import { Meme } from "./components/types";
import { Modal } from "./components/Modal";

import './App.css';

type ModalState = Pick<Meme, "id" | "name" | "blank" | "lines">

function App() {
  const [memes, setMemes] = useState<Meme[] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [currentModal, setCurrentModal] = useState<ModalState>({
    id:"",
    name:"",
    blank: "",
    lines: 1,
  })

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((data) => data.json())
      .then((res) => {
        setMemes(res)
      })
  }, [])

  const handleOpenModal = ({id, name, blank, lines}: ModalState) => {
    setCurrentModal({id, name, blank, lines})
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setCurrentModal({id: "", name: "", blank: "", lines: 1})
    setIsModalOpen(false)
  }

  return (
    <div className="App">
      <header>
        <h1 className="primary-gradient">MEME GENERATOR</h1>
        <p>
          Choose a template and customize the text to your likings.
        </p>
        </header>
        <section className='memes'>
          {isModalOpen && currentModal.id && (
            <Modal
              id={currentModal.id}
              name={currentModal.name}
              blank={currentModal.blank}
              lines={currentModal.lines}
              handleCloseModal={handleCloseModal}
            />
          )}

          {memes?.map((meme) => {
            return (
              <div key={meme.id} className="card">
                <img src={meme.blank} alt={meme.name} loading="lazy"></img>
                <p>{meme.name}</p>
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={() =>
                    handleOpenModal({
                      id: meme.id,
                      name: meme.name,
                      blank: meme.blank,
                      lines: meme.lines,
                    })
                  }
                >
                  Generate
                </button>
              </div>
            )
          })}
        </section>
    </div>
  );
}

export default App;
