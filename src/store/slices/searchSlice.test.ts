import searchReducer, { setSearch, clearSearch } from './searchSlice';

interface SearchState {
  search: string;
}

describe('searchSlice', () => {
  const initialState: SearchState = {
    search: '',
  };

  it('deve retornar o estado inicial', () => {
    expect(searchReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setSearch', () => {
    it('deve definir o termo de busca', () => {
      const searchTerm = 'protetor solar';
      const actual = searchReducer(initialState, setSearch(searchTerm));
      
      expect(actual.search).toBe(searchTerm);
    });

    it('deve atualizar termo de busca existente', () => {
      const previousState: SearchState = {
        search: 'hidratante',
      };
      
      const newSearchTerm = 'creme facial';
      const actual = searchReducer(previousState, setSearch(newSearchTerm));
      
      expect(actual.search).toBe(newSearchTerm);
    });

    it('deve definir busca vazia', () => {
      const previousState: SearchState = {
        search: 'produto',
      };
      
      const actual = searchReducer(previousState, setSearch(''));
      
      expect(actual.search).toBe('');
    });

    it('deve lidar com strings com espaços', () => {
      const searchTerm = '  creme   hidratante  ';
      const actual = searchReducer(initialState, setSearch(searchTerm));
      
      expect(actual.search).toBe(searchTerm);
    });

    it('deve lidar com caracteres especiais', () => {
      const searchTerm = 'protetor-solar & hidratante (facial)';
      const actual = searchReducer(initialState, setSearch(searchTerm));
      
      expect(actual.search).toBe(searchTerm);
    });

    it('deve lidar com acentos e caracteres especiais portugueses', () => {
      const searchTerm = 'proteção facial com vitamina C';
      const actual = searchReducer(initialState, setSearch(searchTerm));
      
      expect(actual.search).toBe(searchTerm);
    });
  });

  describe('clearSearch', () => {
    it('deve limpar o termo de busca', () => {
      const previousState: SearchState = {
        search: 'protetor solar',
      };
      
      const actual = searchReducer(previousState, clearSearch());
      
      expect(actual.search).toBe('');
    });

    it('deve manter estado vazio se busca já estiver vazia', () => {
      const actual = searchReducer(initialState, clearSearch());
      
      expect(actual.search).toBe('');
    });
  });

  describe('múltiplas operações', () => {
    it('deve lidar com múltiplas operações sequenciais', () => {
      let state = initialState;
      
      // Definir primeira busca
      state = searchReducer(state, setSearch('protetor'));
      expect(state.search).toBe('protetor');
      
      // Atualizar busca
      state = searchReducer(state, setSearch('protetor solar'));
      expect(state.search).toBe('protetor solar');
      
      // Atualizar para busca diferente
      state = searchReducer(state, setSearch('hidratante'));
      expect(state.search).toBe('hidratante');
      
      // Limpar busca
      state = searchReducer(state, clearSearch());
      expect(state.search).toBe('');
      
      // Definir nova busca após limpar
      state = searchReducer(state, setSearch('creme facial'));
      expect(state.search).toBe('creme facial');
    });
  });
});