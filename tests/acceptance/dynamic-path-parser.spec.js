'use strict';

var expect = require('chai').expect;
var path = require('path');
var dynamicPathParser = require('../../addon/ng2/utilities/dynamic-path-parser');

describe('dynamic path parser', () => {
  var project;
  var entityName = 'temp-name';
  beforeEach(() => {
    project = { root: process.cwd() }
  });

  it('parse from proj root dir', () => {
    process.env.PWD = process.cwd();
    var result = dynamicPathParser(project, entityName);
    expect(result.dir).to.equal('');
    expect(result.name).to.equal(entityName);
  });

  it('parse from proj src dir', () => {
    process.env.PWD = path.join(process.cwd(), 'src');
    var result = dynamicPathParser(project, entityName);
    expect(result.dir).to.equal('');
    expect(result.name).to.equal(entityName);
  });

  it(`parse from proj src${path.sep}app dir`, () => {
    process.env.PWD = path.join(process.cwd(), 'src', 'app');
    var result = dynamicPathParser(project, entityName);
    expect(result.dir).to.equal('');
    expect(result.name).to.equal(entityName);
  });

  it(`parse from proj src${path.sep}app${path.sep}child-dir`, () => {
    process.env.PWD = path.join(process.cwd(), 'src', 'app', 'child-dir');
    var result = dynamicPathParser(project, entityName);
    expect(result.dir).to.equal(`${path.sep}child-dir`);
    expect(result.name).to.equal(entityName);
  });

  it(`parse from proj src${path.sep}app${path.sep}child-dir w/ ..${path.sep}`, () => {
    process.env.PWD = path.join(process.cwd(), 'src', 'app', 'child-dir');
    var result = dynamicPathParser(project, '..' + path.sep + entityName);
    expect(result.dir).to.equal('');
    expect(result.name).to.equal(entityName);
  });

  it(`parse from proj src${path.sep}app${path.sep}child-dir${path.sep}grand-child-dir w/ ..${path.sep}`,
    () => {
      process.env.PWD = path.join(process.cwd(), 'src', 'app', 'child-dir', 'grand-child-dir');
      var result = dynamicPathParser(project, '..' + path.sep + entityName);
      expect(result.dir).to.equal(`${path.sep}child-dir`);
      expect(result.name).to.equal(entityName);
    });
});
