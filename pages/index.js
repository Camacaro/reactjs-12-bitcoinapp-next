import MasterPage from "../componentes/Master";
import fetch from 'isomorphic-unfetch';
import Precio from "../componentes/Precio";
import Noticias from "../componentes/Noticias";

/**
 * 
 * @param {*} props 
 * viene del getInitalProps
 */
const Index = (props) => (
    <MasterPage>
        <div className="row">
            <div className="col-12">
                <h2>Precio del Bitcoin</h2>
                
                <Precio
                    precio={props.precioBitcoin}
                />
            </div>

            <div className="col-md-8">
                <h2>Noticias sobre Bitcoin</h2>

                <Noticias 
                    noticias={props.noticias}
                />
            </div>

            <div className="col-md-4">
                <h2>Proximos eventos de Bitcoin</h2>
            </div>
        </div>
    </MasterPage>
);

/**
 * ALternatina a componentDidMount,
 * la respuesta de esto es generada en los props
 */
Index.getInitialProps = async () => {

    let url = 'https://api.coinmarketcap.com/v2/ticker/1/';

    const precio = await fetch(url);

    const resPrecio = await precio.json();

    const keyNoticia = '8c5efa20eb664a04af76e19ba1b0dd0f'; 

    const UrlNoticia = `https://newsapi.org/v2/everything?q=bitcoin&sortBy=publishedAt&apiKey=${keyNoticia}&language=es`;

    const noticia = await fetch(UrlNoticia);

    const resNoticia = await noticia.json();

    /*const eventos = await fetch(url);

    const resEventos = await eventos.json();*/

    // eventos: resEventos

    return {
        precioBitcoin: resPrecio.data.quotes.USD,
        noticias: resNoticia.articles,
        
    }
}

export default Index;

