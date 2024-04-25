import AnnotationButtons from "./annotationMenuComponents/AnnotationButtons"
import Characteristics from "./annotationMenuComponents/Characteristics"
import MetaData from "./annotationMenuComponents/MetaData"
import Polarized from "./annotationMenuComponents/Polarized"
import TweetBias from "./annotationMenuComponents/TweetBias"

interface AnnotationMenuProps {
    polarized: number;
    notGood: number;
    highlight: number;
    tweetBias: number;

    toxicLanguage: number;
    hateSpeech: number;
    emotiveLanguage: number;
    conspiracy: number;
    dehumanization: number;
    crimeImputation: number;
    divisiveLanguage: number;
    other: number;

    toxicLanguageTxt: string;
    hateSpeechTxt: string;
    emotiveLanguageTxt: string;
    conspiracyTxt: string;
    dehumanizationTxt: string;
    crimeImputationTxt: string;
    divisiveLanguageTxt: string;
    otherTxt: string;

    highlightHandler: () => void;
    notGoodHandler: () => void;
    polarizedHandler: () => void;
    biasHandler: (bias: number) => void;

    toxicLanguageCheckHandler: () => void;
    hateSpeechCheckHandler: () => void;
    emotiveLanguageCheckHandler: () => void;
    conspiracyCheckHandler: () => void;
    dehumanizationCheckHandler: () => void;
    crimeImputationCheckHandler: () => void;
    divisiveLanguageCheckHandler: () => void;
    otherCheckHandler: () => void;

    toxicLanguageTxtHandler: (tweet: string) => void;
    hateSpeechTxtHandler: (tweet: string) => void;
    emotiveLanguageTxtHandler: (tweet: string) => void;
    conspiracyTxtHandler: (tweet: string) => void;
    dehumanizationTxtHandler: (tweet: string) => void;
    crimeImputationTxtHandler: (tweet: string) => void;
    divisiveLanguageTxtHandler: (tweet: string) => void;
    otherTxtHandler: (tweet: string) => void;

    annotateButton: () => void;
}

export default function AnnotationMenu(props: AnnotationMenuProps) {
    function showId() {
        console.log("Wolololo")
    }
    return (
        <div className="h-full w-full p-4 m-3 float-right align-middle space-y-8">
            <MetaData highlight={props.highlight}
            notGood={props.notGood}
            notGoodHandler={props.notGoodHandler}
            highlightHandler={props.highlightHandler}/>

            <Polarized polarized={props.polarized}
            polarizedHandler={props.polarizedHandler}/>

            <TweetBias tweetBias={props.tweetBias} biasHandler={props.biasHandler}/>

            <form>
                <Characteristics name="linguagem_toxica"
                polarized={props.polarized}
                checked={props.toxicLanguage}
                textValue={props.toxicLanguageTxt}
                checkHandler={props.toxicLanguageCheckHandler}
                textHandler={props.toxicLanguageTxtHandler}
                >Linguagem Tóxica</Characteristics>

                <Characteristics name="discurso_odio"
                polarized={props.polarized}
                checked={props.hateSpeech}
                textValue={props.hateSpeechTxt}
                checkHandler={props.hateSpeechCheckHandler}
                textHandler={props.hateSpeechTxtHandler}
                >Discurso de Ódio</Characteristics>


                <Characteristics name="linguagem_emotiva"
                polarized={props.polarized}
                checked={props.emotiveLanguage}
                textValue={props.emotiveLanguageTxt}
                checkHandler={props.emotiveLanguageCheckHandler}
                textHandler={props.emotiveLanguageTxtHandler}
                >Linguagem Emotiva</Characteristics>

                <Characteristics name="conspiracao"
                polarized={props.polarized}
                checked={props.conspiracy}
                textValue={props.conspiracyTxt}
                checkHandler={props.conspiracyCheckHandler}
                textHandler={props.conspiracyTxtHandler}
                >Conspiração</Characteristics>

                <Characteristics name="desumanizacao"
                polarized={props.polarized}
                checked={props.dehumanization}
                textValue={props.dehumanizationTxt}
                checkHandler={props.dehumanizationCheckHandler}
                textHandler={props.dehumanizationTxtHandler}
                >Desumanização</Characteristics>

                <Characteristics name="imputacao_crime"
                polarized={props.polarized}
                checked={props.crimeImputation}
                textValue={props.crimeImputationTxt}
                checkHandler={props.crimeImputationCheckHandler}
                textHandler={props.crimeImputationTxtHandler}
                >Imputação de crime</Characteristics>

                <Characteristics name="linguagem_divisiva"
                polarized={props.polarized}
                checked={props.divisiveLanguage}
                textValue={props.divisiveLanguageTxt}
                checkHandler={props.divisiveLanguageCheckHandler}
                textHandler={props.divisiveLanguageTxtHandler}
                >Linguagem divisiva</Characteristics>

                <Characteristics name="outro"
                polarized={props.polarized}
                checked={props.other}
                textValue={props.otherTxt}
                checkHandler={props.otherCheckHandler}
                textHandler={props.otherTxtHandler}
                >Outros</Characteristics>
            </form>
            <AnnotationButtons clickFuncAnnot={props.annotateButton}
            clickFuncAnnotNext={showId}
            />
        </div>
    )
}