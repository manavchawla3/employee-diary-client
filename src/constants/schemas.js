import { schema } from 'normalizr';

export const employee = new schema.Entity('employee', {}, { idAttribute: 'id' });
