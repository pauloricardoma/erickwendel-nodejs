// mostrar conexões ativa docker
sudo docker ps
// connectar ao docker mongodb
sudo docker exec -it ebfb30a64640 \
  mongo -u pauloricardoma -p root --authenticationDatabase herois
// databases
show dbs
// mudando o contexto
use herois
// mostrar
show collections
// encontrar todos formatado
db.herois.find().pretty()
// podemos usar codigo js dentro da tabela do mongodb
for ( let i = 0; i <= 1000; i++) {
  db.herois.insert({
    nome: `Clone-${i}`,
    poder: 'Velocidade',
    dataNascimento: '1998-01-01'
  })
}
// quantidade na tabela
db.herois.count()
// busca somente um , no caso o primeiro na tabela
db.herois.findOne()
// busca somente um pelo id
db.herois.findOne({ _id: ObjectId("631d1048ca7db43b118e0332") })
// busca com limit=50 e ordenado do maior pro menor
db.herois.find().limit(50).sort({ nome: -1 })
// busca somente pelo que foi passado, sem o id
db.herois.find({}, { poder: 1, _id: 0 })
// create
db.herois.insert({
  nome: 'Flash',
  poder: 'Velocidade',
  dataNascimento: '1998-01-01'
})
// read
db.herois.find()
// update -> alterar todo o objeto -> alterar somente o que foi passado/set
db.herois.update(
  { _id: ObjectId("631d0fb1ca7db43b118ddc22") }, 
  { nome: 'Mulher Maravilha' }
)
db.herois.update(
  { _id: ObjectId("631d1048ca7db43b118e0332") }, 
  { $set: { nome: 'Lanterna Verde' } }
)
db.herois.update(
  { poder: 'Velocidade' }, 
  { $set: { poder: 'Super força' } }
)
// delete -> remover todos os objetos -> remover somente o que quer
db.herois.remove({})
db.herois.remove({ nome: 'Mulher Maravilha '})