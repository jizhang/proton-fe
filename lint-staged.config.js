module.exports = {
  '*': 'prettier --write --ignore-unknown',
  '*.{tsx,ts,js}': 'eslint --fix',
  '*.ts?(x)': () => 'tsc -p tsconfig.json --noEmit',
}
