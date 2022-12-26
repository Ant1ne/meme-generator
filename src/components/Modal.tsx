import React, {useState} from 'react'
import { Meme } from './types'

type ModalMeme = Pick<Meme, "id" | "name" | "blank" | "lines">

type ModalProps = ModalMeme & {
    handleCloseModal: () => void
}

type TextInput = {
    [key: number]: string
}

export const Modal = ({
    id,
    name,
    blank,
    lines,
    handleCloseModal,
}: ModalProps) => {
    const [text, setText] = useState<TextInput>({})
    const [isLoading, setIsLoading] = useState(false)
    const [newImg, setNewImg] = useState("")

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const currentInput = event.target.attributes.getNamedItem("data-index")?.value

        if (currentInput) {
            setText((prevState) => ({
                ...prevState,
                [currentInput]: event.target.value
            }))
        }
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        setIsLoading(true)
        const layers = Object.values(text)
        let newImg = `https://api.memegen.link/images/${id}/`

        layers.forEach((value, index) => {
            const isLast = layers.length - 1 === 1
            if (isLast) {
                newImg += encodeURIComponent(`${value}/`)
                return
            }
            newImg += encodeURIComponent(`${value}/`)
        })

        setNewImg(newImg)
    }

    const handleImageLoaded = () => {
        setIsLoading(false)
    }

    const arrayOfLines = Array.from(Array(lines).keys())

  return (
    <div className="module">
        <div className="inner">
            <form onSubmit={handleSubmit}>
                {arrayOfLines.map((line, index) => {
                    return (
                        <input
                            key={line}
                            type="text"
                            placeholder="Add text"
                            data-index={index}
                            onChange={handleChange}
                            title="generate new text"
                        />
                    )
                })}

                <button className="btn btn-primary" type="submit">
                    Generate
                </button>
            </form>
            {isLoading && (
                <strong className="loading-statement primary-gradient">
                    Please wait, generating new text
                </strong>
            )}
            <img src={newImg || blank} alt={name} onLoad={handleImageLoaded} />
            <button
                className="btn btn-primary module-btn"
                onClick={handleCloseModal}
            >
                Change template
            </button>
        </div>
    </div>
  )
}
