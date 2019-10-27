export default class OccurrenceCategorySchema {
  static schema = {
    name: 'OccurrenceCategory',
    primaryKey: 'id',
    properties: {
      id: {type: 'string', indexed: true},
      description: 'string',
    },
  };
}
