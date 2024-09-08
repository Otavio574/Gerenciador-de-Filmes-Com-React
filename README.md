# Gerenciador de Filmes com React

## Descrição
Este projeto é uma aplicação de gerenciamento de filmes desenvolvida com React. A aplicação permite que os usuários adicionem, editem e excluam filmes de uma lista, com suporte a scroll infinito para carregar mais filmes à medida que o usuário navega. Também há feedback visual de sucesso para cada ação realizada, garantindo uma experiência de usuário clara e direta.

## Funcionalidades
- **Adicionar Filme**: Adicione novos filmes preenchendo o formulário na parte superior da página.
- **Editar Filme Inline**: Edite filmes diretamente na lista. Ao clicar em "Editar", um formulário é exibido no próprio item do filme, com botões de Salvar e Cancelar.
- **Excluir Filme**: Exclua filmes da lista com um clique, após uma confirmação para garantir a exclusão intencional.
- **Feedback Visual**: Mensagens de sucesso para adição, edição e exclusão de filmes, que desaparecem automaticamente após 3 segundos.
- **Scroll Infinito**: Carregamento automático de mais filmes conforme o usuário rola a página, melhorando a performance e a usabilidade.

## Pré-requisitos
- **Node.js**: Certifique-se de que o Node.js esteja instalado na sua máquina.
- **npm**: Gerenciador de pacotes utilizado para instalar as dependências do projeto.
Instalação

## Instalação
1. Clone o repositório:
    ```bash
    git clone [https://github.com/Otavio574/Gerenciador-de-Filmes.git](https://github.com/Otavio574/Gerenciador-de-Filmes-Com-React)
    ```
### Frontend
2. Navegue para o diretório do projeto:
    ```bash
    cd client
    ```

3. Instale as dependências:
    ```bash
    npm install
    ```

4. Inicie o servidor de desenvolvimento:
    ```bash
    npm start
    ```

5. Abra o navegador e acesse [http://localhost:3000](http://localhost:3000) para ver a aplicação em funcionamento.

### Backend

6. Navegue para o diretório do backend:
    ```bash
    cd api
    ```

7. Instale as dependências do backend:
    ```bash
    npm install
    ```

8. Inicie o servidor backend:
    ```bash
    npm start
    ```

    O servidor estará rodando em [http://localhost:5000](http://localhost:5000) por padrão. 


## Uso

### Adicionar Filme
Preencha o formulário na parte superior da página com o título e ano do filme e clique em "Adicionar Filme" para salvar.

### Editar Filme Inline
Clique em "Editar" ao lado de um filme para exibir o formulário de edição diretamente no item da lista. Faça as alterações necessárias e clique em "Salvar" para aplicar as mudanças ou "Cancelar" para descartar.

### Excluir Filme
Clique em "Excluir" ao lado de um filme. Será exibida uma confirmação para garantir que a exclusão foi intencional.

### Scroll infinito
Aplique o scroll infinito para carregar mais filmes automaticamente à medida que o usuário rola para baixo.

# Estrutura do Projeto
A estrutura do projeto segue um padrão organizado e modular:

## Hooks importantes

- **useMovies.js**: Hook customizado que lida com a adição, edição, exclusão e listagem de filmes.
= **useInfinityScroll.js**: Hook customizado para implementar o scroll infinito.

# Exemplos de código

## Formulário de edição InLine

## Função de edição

## Tecnologias Utilizadas
- **React**: Biblioteca principal para construção da interface de usuário.
- **Axios**: Biblioteca para realizar requisições HTTP.
- **CSS**: Para estilização dos componentes.
- **React Hooks**: Para gerenciar o estado e efeitos colaterais.

## Contribuição
Sinta-se à vontade para contribuir com melhorias. Para isso, faça um fork do repositório, realize suas alterações e envie um pull request.

## Licença
Este projeto está licenciado sob a MIT License.
