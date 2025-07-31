// Cria uma classe chamada User Already Exists Error, que extende a classe Error tradicional do javaScript
export class userAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists!')
  }
}

