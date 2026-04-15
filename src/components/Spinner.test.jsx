import { render, screen } from "@testing-library/react"
import Spinner from "./Spinner"

describe( // agrupa tests relacionados
    "Spinner", () => {
        test("render correctly" , () => { 
            render(<Spinner />)  //render monta el comoponente en un dom virtual ; screen representa el dom virtual que render creo
            const containerDiv = screen.getByTestId("spin-container") //buscan en el dom virtual un elemento con ese atributo data-testid
            expect(containerDiv).toBeInTheDocument()

            const innerDiv = screen.getByTestId("inner-container")
            expect(innerDiv).toBeInTheDocument()
        })
    }
)