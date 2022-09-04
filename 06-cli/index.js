const Commander = require('commander')

async function main() {
  Commander
    .version('v1')

    .parse(process.argv)
}
main()