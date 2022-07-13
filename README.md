1. Renomei o arquivo `.env.example` para `.env`;
2. Preencha os campos de credencias necessarios com os dados do banco postgres a ser utilizado;
3. Crie as tabelas no banco de dados executando o seguinte comando:
```bash
export $(cat .env) && yarn typeorm migration:run
```
4. Execute a aplicação com o seguinte comando:
```bash
yarn dev
```