import { NodePlopAPI } from 'plop';
import { plural, singular } from 'pluralize';

import { restModuleGenerator } from './generators/rest-module/restModuleGenerator';

export default function main(plop: NodePlopAPI): void {
  plop.setHelper('plural', (word) => plural(word));
  plop.setHelper('singular', (word) => singular(word));

  plop.setHelper('moduleFolder', (word) => plop.getHelper('kebabCase')(word));
  plop.setHelper('Module', (word) => plop.getHelper('pascalCase')(word) + 'Module');
  plop.setHelper('Interface', (word) => 'I' + plop.getHelper('pascalCase')(word));
  plop.setHelper('Entity', (word) => plop.getHelper('pascalCase')(word) + 'Entity');
  plop.setHelper('Controller', (word) => plop.getHelper('pascalCase')(word) + 'Controller');
  plop.setHelper('Service', (word) => plop.getHelper('pascalCase')(word) + 'Service');
  plop.setHelper('Exception', (word) => 'E' + plop.getHelper('pascalCase')(word));
  plop.setHelper('route', (word) => plop.getHelper('plural')(plop.getHelper('kebabCase')(word)));

  restModuleGenerator(plop);
}
