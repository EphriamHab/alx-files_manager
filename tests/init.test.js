import supertest from 'supertest';
import chai from 'chai';
import api from '../server';

// eslint-disable-next-line no-undef
global.app = api;
// eslint-disable-next-line no-undef
global.request = supertest(api);
// eslint-disable-next-line no-undef
global.expect = chai.expect;
// eslint-disable-next-line no-undef
global.assert = chai.assert;
