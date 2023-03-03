import assert from 'assert';
import app from '../../src/app';

describe('\'post\' service', () => {
  it('registered the service', () => {
    const service = app.service('post');

    assert.ok(service, 'Registered the service');
  });
});
