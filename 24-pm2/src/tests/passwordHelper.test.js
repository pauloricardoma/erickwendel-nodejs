const assert = require('assert')
const PasswordHelper = require('./../helpers/passwordHelper')

const SENHA = 'Paul@123321'
const HASH = '$2b$04$WEnpuL8EMpTaLTfRlRvq..eV5PPH9s2.2cM6pmwyTo.40AieTjNcO'

describe('UserHelper test suite', function() {
  it('deve gerar um hash a partir de uma senha', async () => {
    const result = await PasswordHelper.hashPassword(SENHA)
    
    assert.ok(result.length > 10)
  })
  it('deve comparar uma senha e seu hash', async () => {
    const result = await PasswordHelper.comparePassword(SENHA, HASH)

    assert.ok(result)
  })
})