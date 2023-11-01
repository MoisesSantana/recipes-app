<h1 align="center">
  <img src="https://camo.githubusercontent.com/e1e113df83e7731fdb90f6f0ab2eeb155fd1b48c27d99814dcf1c23c0acdc6a2/68747470733a2f2f6173736574732e76657263656c2e636f6d2f696d6167652f75706c6f61642f76313636323133303535392f6e6578746a732f49636f6e5f6461726b5f6261636b67726f756e642e706e67" width="100px" alt="NextJS">
</h1>

<p align="center">
  <img src="https://img.shields.io/static/v1?label=TypeScript&message=5.2.2&color=blue&labelColor=202024" alt="TypeScript version 5.2.2" />
  <img src="https://img.shields.io/static/v1?label=NPM&message=9.8.1&color=red&labelColor=202024" alt="NPM version 9.8.1" />
  <img src="https://img.shields.io/static/v1?label=Node&message=18.18.2&color=green&labelColor=202024" alt="NodeJs versuib 18.18.2" />
  <img src="https://img.shields.io/static/v1?label=NextJS&message=13.5.5&color=black&labelColor=202024" alt="NextJS version 13.5.5" />
  <img src="https://img.shields.io/static/v1?label=React&message=18.2.0&color=blue&labelColor=202024" alt="React version 18.2.0" />
  <img src="https://img.shields.io/static/v1?label=zod&message=3.22.2&color=darkblue&labelColor=202024" alt="zod version 3.22.2" />
  <img src="https://img.shields.io/static/v1?label=zustand&message=4.4.3&color=yellow&labelColor=202024" alt="zustand version 4.4.3" />
  <img src="https://img.shields.io/static/v1?label=react-query&message=3.39.3&color=tomato&labelColor=202024" alt="react-query version 3.39.3" />
  <img src="https://img.shields.io/static/v1?label=react-hook-form&message=7.47.0&color=pink&labelColor=202024" alt="react-hook-form version 7.47.0" />
</p>

## 💻 Projeto

  Esse projeto é uma aplicação web responsiva de receitas e drinks.
  
  Neste projeto é possível listar receitas e drinks, ver mais detalhes de uma receita ou drink selecionado, filtrar a lista de receitas ou drinks por categorias, por ingrediente, nome, primeira letra ou local de origem.

  Esta aplicação tem rotas protegidas, para acessar as rotas é necessário fazer uma simulação de login na página inicial validando se o campo de email é um email válido e se a senha possuí ao menos 6 digitos.

  Você poderá favoritar e marcar como concluídas as receitas e drinks e posteriormente acessa-lás na pagina de profile.

  Este projeto utiliza APIs de terceiros são elas:
  - https://themealdb.com/
  - https://www.thecocktaildb.com/

  Assim sendo possível ter uma vasta quantidade de receitas.

## 💻 Tecnologias
  
![Static Badge](https://img.shields.io/badge/NextJS-black)
![Static Badge](https://img.shields.io/badge/TypeScript-blue)

Para a realização desse projeto foi utilizado o framework [Nextjs](https://nextjs.org/) com [TypeScript](https://www.typescriptlang.org/), o _NextJS_ é um framework que faz uso do ecossistema _React_ mas traz algumas vantagens como SSR  que auxilia no sistemas de buscas(SEO) e faz caching o que torna a navegação muito mais rápida, roteamento automatico, sem a necessidade de libs como [React Router](https://reactrouter.com/en/main). Sendo um projeto relativamente grande, o TypeScript auxilia muito na manutenção do código, trazendo um intelisense que aumenta a produtividade mesmo após muito tempo sem ver o código.

![Static Badge](https://img.shields.io/badge/Zustand-yellow)

Para gerenciar os estados globais fiz a escolha do [Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction), apesar de ser uma lib relativamente nova, é uma lib que vem ganhando bastante notoriedade, por se tratar de um gerenciador de estado simples e intuitivo sem perder a escalabilidade, se comparado ao [ContextAPI](https://react.dev/reference/react/useContext) e [Redux](https://redux.js.org/) o nível de complexidade é menor, porém tão bem estruturado quanto, mas o grande destaque do _zustand_ é que não é necessário envolver os componentes em um contexto, você pode acessar seus estados e actions através de um hook, e isso não gera uma atualização desnecessária de componentes que estariam envolvidos em um contexto, além disso tem integrações nativas como por exemplo o persist que é utilizado neste projeto.

![Static Badge](https://img.shields.io/badge/react%20query-tomato)

Apesar de não ter utilizado de todo o potencial do [react-query](https://tanstack.com/query/v3/) ele é uma lib simples de ser utilizada e tem cache automático, dessa forma após fazer a primeira requisição a segunda já é automatica enquanto você não encerrar a seção, o que torna a navegação entre as páginas muito rápidas apesar das requisições, além disso ele gerencia o status da solicitação sem a necessidade de criar useEffects e estados para lidar com carregamento, erro e resultado da requisição, o _react-query_ faz isso por você.

![Static Badge](https://img.shields.io/badge/react%20hook%20form-pink)
![Static Badge](https://img.shields.io/badge/zod-darkblue)

Para lidar com os formulários foi utilizado o [react-hook-form](https://react-hook-form.com/) em conjunto com o [zod](https://zod.dev/), o _react-hook-form_ é uma excelente lib para gerenciar os formulários, sem a necessidade de ter formulários controlados, diminuindo a quantidade de renderizações a cada alteração em um campo de input, já o _zod_ é uma ótima lib para validação de dados, o que destaca ele entre outras libs, é ele ter sido construído com TypeScript, tornando o trabalho de fazer tipagens e validações mais eficiente. 

## ✍️ Instrução

### Pré configuração.
>Para executar esse projeto será necessário ter o [node](https://nodejs.org/en) instalado, de preferência para as versões apresentadas nas tags do início desse readme.

>Para conseguir transitar bem entre as versões sugiro o uso do [nvm](https://github.com/nvm-sh/nvm)

### Configuração

Agora você deve executar os seguintes passos no seu terminal:
```bash
# instalação dos pacotes
$ npm install

# execução do servidor
$ npm run dev
```
