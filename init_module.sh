moduleName=$1

mkdir modules/$moduleName
cd modules/$moduleName

mkdir src
mkdir tests

touch src/index.ts
echo "export const foo = () => {}" >> src/index.ts

touch tests/index.test.ts
echo "import {  } from \"../src\";" >> tests/index.test.ts
echo "" >> tests/index.test.ts
echo "describe(\"$moduleName\", () => {" >> tests/index.test.ts
echo "  it(\"should \", () => {});" >> tests/index.test.ts
echo "});" >> tests/index.test.ts