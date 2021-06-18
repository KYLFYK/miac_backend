import { NodePlopAPI } from 'plop';

enum RestModuleFileType {
  module = 'module',
  controller = 'controller',
  service = 'service',
  entity = 'entity',
  interface = 'interface',
  dto = 'dto',
  factory = 'factory',
  seeder = 'seeder',
  const = 'const',
  exception = 'exception',
  e2e = 'e2e',
}

const availActions: { type: string; path: string; templateFile: string; restModuleFileType: RestModuleFileType }[] = [
  // modules
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/{{Module name}}.ts',
    templateFile: `${__dirname}/templates/Module.ts.hbs`,
    restModuleFileType: RestModuleFileType.module,
  },
  // controllers
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/{{Controller name}}.ts',
    templateFile: `${__dirname}/templates/Controller.ts.hbs`,
    restModuleFileType: RestModuleFileType.controller,
  },
  // services
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/{{Service name}}.ts',
    templateFile: `${__dirname}/templates/Service.ts.hbs`,
    restModuleFileType: RestModuleFileType.service,
  },
  // entities
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/entities/{{Entity name}}.ts',
    templateFile: `${__dirname}/templates/entities/Entity.ts.hbs`,
    restModuleFileType: RestModuleFileType.entity,
  },
  // interfaces
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/interfaces/{{Interface name}}.ts',
    templateFile: `${__dirname}/templates/interfaces/IEntity.ts.hbs`,
    restModuleFileType: RestModuleFileType.interface,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/interfaces/{{Interface name}}Extended.ts',
    templateFile: `${__dirname}/templates/interfaces/IEntityExtended.ts.hbs`,
    restModuleFileType: RestModuleFileType.interface,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/interfaces/{{Interface name}}CreateData.ts',
    templateFile: `${__dirname}/templates/interfaces/IEntityCreateData.ts.hbs`,
    restModuleFileType: RestModuleFileType.interface,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/interfaces/{{Interface name}}UpdateData.ts',
    templateFile: `${__dirname}/templates/interfaces/IEntityUpdateData.ts.hbs`,
    restModuleFileType: RestModuleFileType.interface,
  },
  // const
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/{{camelCase name}}.const.ts',
    templateFile: `${__dirname}/templates/entity.const.ts.hbs`,
    restModuleFileType: RestModuleFileType.const,
  },
  // exceptions
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/exceptions/{{Exception name}}NotFound.ts',
    templateFile: `${__dirname}/templates/exceptions/EEntityNotFound.ts.hbs`,
    restModuleFileType: RestModuleFileType.exception,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/exceptions/{{Exception name}}NotFoundMany.ts',
    templateFile: `${__dirname}/templates/exceptions/EEntityNotFoundMany.ts.hbs`,
    restModuleFileType: RestModuleFileType.exception,
  },
  // dto
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/Create{{pascalCase name}}BodyDto.ts',
    templateFile: `${__dirname}/templates/dto/CreateEntityBodyDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/Update{{pascalCase name}}BodyDto.ts',
    templateFile: `${__dirname}/templates/dto/UpdateEntityBodyDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/{{pascalCase name}}ResponseDto.ts',
    templateFile: `${__dirname}/templates/dto/EntityResponseDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/Update{{pascalCase name}}ResponseDto.ts',
    templateFile: `${__dirname}/templates/dto/UpdateEntityResponseDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/Get{{pascalCase name}}ByIdResponseDto.ts',
    templateFile: `${__dirname}/templates/dto/GetEntityByIdResponseDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/Create{{pascalCase name}}ResponseDto.ts',
    templateFile: `${__dirname}/templates/dto/CreateEntityResponseDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/GetMany{{plural (pascalCase name)}}ResponseDto.ts',
    templateFile: `${__dirname}/templates/dto/GetManyEntityResponseDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/Update{{pascalCase name}}QueryDto.ts',
    templateFile: `${__dirname}/templates/dto/UpdateEntityQueryDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/Get{{pascalCase name}}ByIdQueryDto.ts',
    templateFile: `${__dirname}/templates/dto/GetEntityByIdQueryDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/GetMany{{plural (pascalCase name)}}QueryDto.ts',
    templateFile: `${__dirname}/templates/dto/GetManyEntityQueryDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  {
    type: 'add',
    path: 'src/{{moduleFolder name}}/dto/Create{{pascalCase name}}QueryDto.ts',
    templateFile: `${__dirname}/templates/dto/CreateEntityQueryDto.ts.hbs`,
    restModuleFileType: RestModuleFileType.dto,
  },
  // Factories
  {
    type: 'add',
    path: 'test/factories/{{pascalCase name}}Factory.ts',
    templateFile: `${__dirname}/templates/EntityFactory.ts.hbs`,
    restModuleFileType: RestModuleFileType.factory,
  },
  // Seeders
  {
    type: 'add',
    path: 'test/seeders/{{pascalCase name}}Seeder.ts',
    templateFile: `${__dirname}/templates/EntitySeeder.ts.hbs`,
    restModuleFileType: RestModuleFileType.seeder,
  },
  // e2e
  {
    type: 'add',
    path: 'test/e2e/{{pascalCase name}}.e2e-spec.ts',
    templateFile: `${__dirname}/templates/Entity.e2e-spec.ts.hbs`,
    restModuleFileType: RestModuleFileType.e2e,
  },
];

export function restModuleGenerator(plop: NodePlopAPI): void {
  plop.setGenerator('rest-module', {
    description: 'application controller logic',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'module name please',
      },
      {
        type: 'input',
        name: 'title',
        message: 'entity title on russian please',
        default: (awswers): string => awswers.input,
      },
      {
        type: 'checkbox',
        name: 'types',
        choices: Object.values(RestModuleFileType).map(value => ({
          name: value,
          value,
          checked: true,
        })),
      },
    ],
    actions: (data) => {
      return availActions.filter(action => data.types.includes(action.restModuleFileType));
    },
  });
}
