interface localStorageRated {
  [x: string]: number
}

export default class MovieService {
  _apiBase = 'https://api.themoviedb.org/3'
  _apiKey = '?api_key=29aa99406ab37ae56592216823a7b9fc'

  async getResource(url: string, page = 1, query?: string) {
    let response

    query
      ? (response = await fetch(`${url}${this._apiKey}&page=${page}&query=${query}`))
      : (response = await fetch(`${url}${this._apiKey}&page=${page}`))

    if (!response.ok) {
      throw new Error(`Could not fetch ${url}, received ${response.status}`)
    }

    const result = await response.json()

    return {
      response,
      result,
    }
  }

  async getPopularMovies() {
    const a = await this.getResource(`${this._apiBase}/movie/popular`)
    return {
      movies: a.result.results,
      totalPages: a.result.total_pages,
      url: a.response.url,
    }
  }

  async switchPage(url: string, page: number, query?: string) {
    const res = await this.getResource(url, page, query)
    return {
      movies: res.result.results,
      totalPages: res.result.total_pages,
      url: res.response.url,
    }
  }

  async searchMovie(query: string) {
    const a = await this.getResource(`${this._apiBase}/search/movie`, 1, query)
    return {
      movies: a.result.results,
      totalPages: a.result.total_pages,
      url: a.response.url,
    }
  }

  async getGenres() {
    return await this.getResource(`${this._apiBase}/genre/movie/list`)
  }

  async createGuestSession() {
    const a = await fetch(`${this._apiBase}/authentication/guest_session/new${this._apiKey}`)
    return await a.json()
  }

  async rateMovie(rate: number, id: number) {
    const session = localStorage.getItem('session')
    const key = String(id)
    if (localStorage.getItem('rated') === null) {
      const obj: localStorageRated = {}
      obj[key] = rate
      localStorage.setItem('rated', JSON.stringify(obj))
    } else {
      const obj: localStorageRated = JSON.parse(localStorage.getItem('rated')!)
      obj[key] = rate
      localStorage.setItem('rated', JSON.stringify(obj))
    }
    return await fetch(`${this._apiBase}/movie/${id}/rating${this._apiKey}&guest_session_id=${session}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({
        value: rate,
      }),
    })
  }

  async getRatedMovies() {
    const session = localStorage.getItem('session')
    const a = await this.getResource(`${this._apiBase}/guest_session/${session}/rated/movies`)
    return {
      movies: a.result.results,
      totalPages: a.result.total_pages,
      url: a.response.url,
    }
  }
}
