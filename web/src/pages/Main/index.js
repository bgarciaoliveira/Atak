import React, { Component } from 'react'

import './styles.css'

export default class Main extends Component {

    render() {
        return (
            <div class="main">

                <div className="search-box">
                    <div className="content">
                        <form>
                            <input type="text" className="keyword-input" placeholder="Digite sua pesquisa e clique no motor de buscas desejado" />

                            <div className="button-box">
                                <input type="button" className="google-button" value="Google" />
                                <input type="button" className="bing-button" value="Bing!" />
                            </div>
                        </form>
                    </div>

                </div>

                <div className="result-box">

                    <h3>Mostrando resultados para Bruno Garcia em Google</h3>

                    <article key="1">
                        <strong>Bruno Garcia</strong>
                        <a href="http://google.com" target="_blank" rel="noopener noreferrer">Acessar</a>
                    </article>

                    <article key="2">
                        <strong>Bruno Garcia</strong>
                        <a href="http://google.com" target="_blank" rel="noopener noreferrer">Acessar</a>
                    </article>

                    <article key="3">
                        <strong>Bruno Garcia</strong>
                        <a href="http://google.com" target="_blank" rel="noopener noreferrer">Acessar</a>
                    </article>

                    <article key="4">
                        <strong>Bruno Garcia</strong>
                        <a href="http://google.com" target="_blank" rel="noopener noreferrer">Acessar</a>
                    </article>

                </div>

            </div>
        )
    }
}

