export default function TweetNavigation(props: any) {
    return (
        <div>
            <div>
                <span>Id: </span>
                <textarea id="idToGo" rows={1} cols={6} />
                <button>Ir</button>
                <button>Ir para próximo</button>
            </div>
            <div className="my-2">
                <button>&lt; Anterior</button>
                <button>Próximo &gt;</button>
            </div>
        </div>
    )
}