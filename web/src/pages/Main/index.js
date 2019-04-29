import React, { Component } from 'react'

import api from '../../services/api'

import './styles.css'

export default class Main extends Component {

    state = {

        //Keyword da caixa de pesquisa
        keyword: '',

        buttonGoogleDisabled: false,
        buttonBingDisabled: false,        

        search: {

            //Keyword utilizada na pesquisa
            keyword: '',

            //Engine utilizada para a pesquisa            
            engine: '',

            //Total de resultados encontrados
            count: -1,

            //Pagina atual
            page: 0,

            //Resultados da pesquisa
            results: [],

            // Action buttons
            previousDisabled: false,
            nextDisabled: false,
        }
    }

    handleChange(e) {
        this.setState({ keyword: e.target.value })
    }

    resetSearch = () => {

        this.setState({
            search: {
                keyword: '',
                engine: '',
                count: -1,
                page: 0,
                results: [],
                previousEnabled: false,
                nextEnabled: false
            }
        })
    }

    googleOnClick = async () => {

        const keyword = this.state.keyword

        if(keyword === ''){
            this.resetSearch()
        }
        else{

            this.setState({
                buttonGoogleDisabled: true,
                buttonBingDisabled: true
            })

            const response = await api.get(`/search?keyword=${this.state.keyword}&engine=google&first=1`)

            if(response.status === 200 || response.status === 204){

                this.setState({
                    search: {
                        keyword,
                        engine: 'google',
                        count: response.status === 200 ? response.data.resultStat : 0,
                        results: response.data.titlesAndLinks,
                        page: 1
                    }
                })

            }else{
                this.resetSearch()
            }

            this.setState({
                buttonGoogleDisabled: false,
                buttonBingDisabled: false
            })
        }
    }

    bingOnClick = async () => {

        const keyword = this.state.keyword

        if(keyword === ''){
            this.resetSearch()
        }
        else{

            this.setState({
                buttonGoogleDisabled: true,
                buttonBingDisabled: true
            })

            const response = await api.get(`/search?keyword=${this.state.keyword}&engine=bing&first=1`)

            if(response.status === 200 || response.status === 204){

                this.setState({
                    search: {
                        keyword,
                        engine: 'bing',
                        count: response.status === 200 ? response.data.resultStat : 0,
                        results: response.data.titlesAndLinks,
                        page: 1
                    }
                })

            }else{
                this.resetSearch()
            }

            this.setState({
                buttonGoogleDisabled: false,
                buttonBingDisabled: false
            })
        }
    }

    calculateFirst = (page) => {
        if(page === 1) return 1

        return (page * 10) - 10
    }

    calculateMaxPage = () => {
        return parseInt(this.state.search.count / 10)
    }

    getBrLocaleNumber = (number) => {
        return Number(number).toLocaleString('pt-BR')
    }

    previousPage = async () => {

        if(this.state.search.page === 1) return

        this.setState({
            search: {
                ...this.state.search,
                previousDisabled: true,
                nextDisabled: true
            }
        })

        const first = this.calculateFirst(this.state.search.page -1)

        const response = await api.get(`/search?keyword=${this.state.search.keyword}&engine=${this.state.search.engine}&first=${first}`)

        if(response.status === 200 || response.status === 204){

            this.setState({
                search: {
                    ...this.state.search,
                    results: response.data.titlesAndLinks,
                    page: this.state.search.page -1
                }
            })

        }else{
            this.resetSearch()
        }

        this.setState({
            search: {
                ...this.state.search,
                previousDisabled: false,
                nextDisabled: false
            }
        })
    }

    nextPage = async () => {
        if(this.state.search.page >= this.calculateMaxPage()) return

        this.setState({
            search: {
                ...this.state.search,
                previousDisabled: true,
                nextDisabled: true
            }
        })

        const first = this.calculateFirst(this.state.search.page + 1)

        const response = await api.get(`/search?keyword=${this.state.search.keyword}&engine=${this.state.search.engine}&first=${first}`)

        if(response.status === 200 || response.status === 204){

            this.setState({
                search: {
                    ...this.state.search,
                    results: response.data.titlesAndLinks,
                    page: this.state.search.page +1
                }
            })

        }else{
            this.resetSearch()
        }

        this.setState({
            search: {
                ...this.state.search,
                previousDisabled: false,
                nextDisabled: false
            }
        })
    }

    render() {
        return (
            <div className="main">

                <div className="search-box">
                    <div className="content">
                        <form>
                            <input type="text" className="keyword-input" placeholder="Digite sua pesquisa e clique no motor de buscas desejado" value={this.state.keyword} onChange={this.handleChange.bind(this)} />

                            <div className="button-box">
                                <input type="button" disabled={this.state.buttonGoogleDisabled} className="google-button" value="Google" onClick={this.googleOnClick} />
                                <input type="button" disabled={this.state.buttonBingDisabled} className="bing-button" value="Bing!" onClick={this.bingOnClick} />
                            </div>
                        </form>
                    </div>
                </div>

                {this.state.search.count !== -1 ? (
                    <div className="result-box">

                        {this.state.search.count === 0 ? (

                            <h3>Não há resultados para '{this.state.search.keyword}' em {this.state.search.engine}</h3>

                        ) : (
                            <div>
                                <h3>Mostrando resultados para {this.state.search.keyword} em {this.state.search.engine}</h3>
                                <h6>Aproximadamente {this.getBrLocaleNumber(this.state.search.count)} resultados</h6> 

                                {this.state.search.results.map((result, index) => {
                                    return (
                                        <article key={index}>                                        
                                            <strong>{result.title}</strong>                                        
                                            <a href={result.link} target="_blank" rel="noopener noreferrer">Acessar</a>
                                        </article>
                                    )
                                })}

                                <div className="actions">
                                    <button disabled={this.state.search.previousDisabled} onClick={this.previousPage}>Anterior</button>
                                    <span>Pagina atual: {this.state.search.page}</span>
                                    <button disabled={this.state.search.nextDisabled} onClick={this.nextPage}>Proxima</button>   
                                </div>

                            </div>
                        ) }                      

                    </div>
                ) : null}

            </div>
        )
    }
}

