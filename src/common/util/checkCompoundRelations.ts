export function checkCompoundRelations(relations: string[], compoundRelations: string[]): string[] {
  const allRelations = [...relations];

  for (const compoundRelation of compoundRelations) {
    const relationsChain = compoundRelation.split('.');
    let priorRelation: string = relationsChain[0];

    let i = 1;

    while (i < relationsChain.length) {
      if (!allRelations.includes(priorRelation)) {
        allRelations.push(priorRelation);
      }

      priorRelation += `.${relationsChain[i]}`;
      i++;
    }
  }

  return allRelations;
}
