interface TweetNavigationProps {
    prevButton: () => void;
    nextButton: () => void;
    goToNext: () => void;
    gotToId: (id: number) => void;
}

export default function TweetNavigation(props: any) {
    return (
        <div>
            <div>
                <span>Id: </span>
                <textarea id="idToGo" rows={1} cols={6} />
                {/* <button onClick={() => props.goToId(1)}>Ir</button> */}
                <button onClick={() => props.goToId(
                    document.getElementById("idToGo").value,
                )}>Ir</button>
                <button onClick={props.goToNext}>Ir para próximo</button>
            </div>
            <div className="my-2">
                <button onClick={props.prevButton}>&lt; Anterior</button>
                <button onClick={props.nextButton}>Próximo &gt;</button>
            </div>
        </div>
    )
}