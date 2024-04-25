import AnnotationButtons from "./annotationMenuComponents/AnnotationButtons"
import Characteristics from "./annotationMenuComponents/Characteristics"
import MetaData from "./annotationMenuComponents/MetaData"
import Polarized from "./annotationMenuComponents/Polarized"
import TweetBias from "./annotationMenuComponents/TweetBias"

export default function AnnotationMenu(props: any) {
    return (
        <div className="h-full w-full p-4 m-3 float-right align-middle space-y-8">
            <MetaData />
            <Polarized />
            <TweetBias />
            <form>
                <Characteristics name="linguagem_toxica">Linguagem Tóxica</Characteristics>
                <Characteristics name="discurso_odio">Discurso de Ódio</Characteristics>
                <Characteristics name="linguagem_emotiva">Linguagem Emotiva</Characteristics>
                <Characteristics name="conspiracao">Conspiração</Characteristics>
                <Characteristics name="desumanizacao">Desumanização</Characteristics>
                <Characteristics name="imputacao_crime">Imputação de crime</Characteristics>
                <Characteristics name="linguagem_divisiva">Linguagem divisiva</Characteristics>
                <Characteristics name="outro">Outros</Characteristics>
            </form>
            <AnnotationButtons />
        </div>
    )
}