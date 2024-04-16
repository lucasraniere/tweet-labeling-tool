export default function TweetBias() {
    return (
        <div>
            {/* <select>
                <option value="none">Nenhum</option>
                <option value="left">Esquerda</option>
                <option value="right">Direita</option>
                <option value="center">Centro</option>
            </select> */}
            <form className="mx-3">
                <span>Viés do Tweet:</span>
                <label htmlFor="Esquerda" className="mx-3">Esquerda</label>
                <input type="radio" id="Esquerda" name="ideology" className="w-4 h-4"/>
                <label htmlFor="Centro" className="mx-3">Centro</label>
                <input type="radio" id="Centro" name="ideology" className="w-4 h-4" />
                <label htmlFor="Direita" className="mx-3">Direita</label>
                <input type="radio" id="Direita" name="ideology" className="w-4 h-4" />
            </form>
        </div>
    )
}