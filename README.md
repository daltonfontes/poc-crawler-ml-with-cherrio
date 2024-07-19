# Scraping ML Ofertas 

Realiza a raspagem de dados de ofertas no Mercado Livre, coletando informações sobre produtos, incluindo título, preço, imagem e link para o produto. Os dados raspados são armazenados em um banco de dados SQLite.

## Funcionalidades

- **Raspagem de Dados**: Coleta informações de produtos em oferta no Mercado Livre.
- **Armazenamento**: Salva os dados em um banco de dados SQLite.
- **Automatização**: Utiliza GitHub Actions para executar o script de scraping periodicamente.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Cheerio**: Biblioteca para manipulação e análise de HTML.
- **Got**: Biblioteca para fazer requisições HTTP.
- **SQLite**: Banco de dados.
- **GitHub Actions**: Para automação da execução do script.

## Configuração

### Requisitos

- **Node.js** (versão 16 ou superior)
- **npm** (gerenciador de pacotes do Node.js)
- **SQLite** (para o banco de dados)
