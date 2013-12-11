var assert = require('assert');

describe("require('rendr-handlebars')", function() {
  var defaultCompiledTemplatesFile = 'app/templates/compiledTemplates';

  it('returns a new templateAdapter', function() {
    var templateAdapter, firstPatternSrc;
    var entryPath = '/some/place/';
    templateAdapter = require('../index')({entryPath: entryPath, compiledTemplatesFile: entryPath + defaultCompiledTemplatesFile})

    assert.equal(templateAdapter.templatePatterns.length, 1);
    firstPatternSrc = templateAdapter.templatePatterns[0].src;
    assert.equal(firstPatternSrc, entryPath + defaultCompiledTemplatesFile);
  });

  it('does not squash an old templateAdapter', function() {
    var templateAdapter1, templateAdapter2, firstPatternSrc, secondPatternSrc;

    var entryPath = '/some/place/';
    templateAdapter1 = require('../index')({entryPath: entryPath, compiledTemplatesFile: entryPath + defaultCompiledTemplatesFile})

    entryPath = '/some/other/place/';
    templateAdapter2 = require('../index')({entryPath: entryPath, compiledTemplatesFile: entryPath + defaultCompiledTemplatesFile})

    assert.equal(templateAdapter1.templatePatterns.length, 1);
    assert.equal(templateAdapter2.templatePatterns.length, 1);
    firstPatternSrc = templateAdapter1.templatePatterns[0].src;
    secondPatternSrc = templateAdapter2.templatePatterns[0].src;

    assert.equal(firstPatternSrc, '/some/place/app/templates/compiledTemplates');
    assert.equal(secondPatternSrc, '/some/other/place/app/templates/compiledTemplates');
  });
});
