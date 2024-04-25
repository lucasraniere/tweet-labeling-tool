interface AnnotationButtonsProps {
    clickFuncAnnot: () => void;
    clickFuncAnnotNext: () => void;
}

export default function AnnotationButtons(props: AnnotationButtonsProps) {
    return (
        <div>
            <button onClick={props.clickFuncAnnot}>Anotar</button>
            <button onClick={props.clickFuncAnnotNext}>Anotar &gt;</button>
        </div>
    )
}