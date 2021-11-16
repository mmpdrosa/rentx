# RentX API

## Requisitos
### Cadastro de Carro
**RF**\
Deve ser possível cadastrar um novo carro.\

**RN**\
Não deve ser possível cadastrar um carro com uma placa já existente.\
O carro por padrão deve ser cadastrado como disponível.\
* Não deve ser possível um usuário não administrador cadastrar um carro ou alterar a placa de um já existente.

### Listagem de Carros
**RF**\
Deve ser possível possível listar os carros disponíveis.\
Deve ser possível listar todos os carros disponíveis por categoria.\
Deve ser possível listar todos os carros disponíveis por marca.\
Deve ser possível listar todos os carros disponíveis por nome.\

**RN**\
Não deve ser preciso um usuário ser administrador para listar.\

### Cadastro de Especificações do Carro
**RF**\
Deve ser possível cadastrar uma especifição no carro.\

**RN**\
Não deve ser possível cadastrar uma especificação em um carro não existente.\
Não deve ser possível cadastrar uma mesma especificação mais de uma vez em um carro.\
Não deve ser possível um usuário não administrador cadastrar especificações em um carro.

### Cadastro de Imagens do Carro
**RF**\
Deve ser possível cadastrar uma ou mais imagens do carro.\
Deve ser possível listar todos os carros.

**RNF**\
Utilizar o multer para upload dos arquivos.

**RN**\
Não deve ser possível um usuário não administrador cadastrar imagens em um carro.

### Aluguel de Carro
**RF**\
Deve ser possível cadastrar um aluguel.

**RN**\
O aluguel deve ter duração mínima de 24 horas.\
Não deve ser possível um usuário cadastrar mais de um aluguel.\
Não deve ser possível alugar um carro já alugado.
