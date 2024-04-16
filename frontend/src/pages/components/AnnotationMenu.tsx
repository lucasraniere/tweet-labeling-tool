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
                <Characteristics>Linguagem Tóxica</Characteristics>
                <Characteristics>Discurso de Ódio</Characteristics>
                <Characteristics>Linguagem Emotiva</Characteristics>
                <Characteristics>Conspiração</Characteristics>
                <Characteristics>Desumanização</Characteristics>
                <Characteristics>Imputação de crime</Characteristics>
                <Characteristics>Linguagem divisiva</Characteristics>
                <Characteristics>Outros</Characteristics>
            </form>
            <AnnotationButtons />
        </div>
    )
}